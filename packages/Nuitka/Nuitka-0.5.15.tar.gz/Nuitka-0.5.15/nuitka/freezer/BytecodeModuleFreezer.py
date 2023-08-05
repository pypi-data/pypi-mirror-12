#     Copyright 2015, Kay Hayen, mailto:kay.hayen@gmail.com
#
#     Part of "Nuitka", an optimizing Python compiler that is compatible and
#     integrates with CPython, but also works on its own.
#
#     Licensed under the Apache License, Version 2.0 (the "License");
#     you may not use this file except in compliance with the License.
#     You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
#     Unless required by applicable law or agreed to in writing, software
#     distributed under the License is distributed on an "AS IS" BASIS,
#     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#     See the License for the specific language governing permissions and
#     limitations under the License.
#
"""
Freezer for bytecode compiled modules. Not real C compiled modules.

This is including modules as bytecode and mostly intended for modules, where
we know compiling it useless or does not make much sense, or for standalone
mode to access modules during CPython library init that cannot be avoided.

The level of compatibility for C compiled stuff is so high that this is not
needed except for technical reasons.
"""


from collections import namedtuple
from logging import info

from nuitka import Options
from nuitka.codegen import ConstantCodes
from nuitka.codegen.Indentation import indented
from nuitka.codegen.templates. \
    CodeTemplatesFreezer import template_frozen_modules
from nuitka.PythonVersions import python_version
from nuitka.utils import Utils

frozen_modules = []

FrozenModuleDescription = namedtuple(
    "FrozenModuleDescription",
    ("module_name", "bytecode", "is_package", "filename", "is_late"),
)

def addFrozenModule(frozen_module):
    """ Add a module discovered for freezing.

    """
    assert not isFrozenModule(frozen_module.module_name, frozen_module.filename), frozen_module.module_name

    frozen_modules.append(frozen_module)


def removeFrozenModule(module_name):
    """ Remove a module from the to freeze list.

        Typically this is because it was shadowed by a compiled version.
    """
    for count, frozen_module in enumerate(frozen_modules):
        if frozen_module.module_name == module_name:
            break
    else:
        count = None

    if count is not None:
        del frozen_modules[count]

    return count is not None


def getFrozenModuleCount():
    return len(frozen_modules)


def _normalizeModuleFilename(filename):
    if python_version >= 300:
        filename = filename.replace("__pycache__", "")

        suffix = ".cpython-%d.pyc" % (python_version // 10)

        if filename.endswith(suffix):
            filename = filename[:-len(suffix)] + ".py"
    else:
        if filename.endswith(".pyc"):
            filename = filename[:-3] + ".py"

    if Utils.basename(filename) == "__init__.py":
        filename = Utils.dirname(filename)

    return filename


def isFrozenModule(module_name, module_filename):
    for frozen_module in frozen_modules:
        if module_name == frozen_module.module_name:
            return Utils.areSamePaths(
                _normalizeModuleFilename(module_filename),
                _normalizeModuleFilename(frozen_module.filename)
            )

    return False


stream_data = ConstantCodes.stream_data

def generateBytecodeFrozenCode():
    frozen_defs = []

    for frozen_module in frozen_modules:
        module_name, code_data, is_package, _filename, _is_late = frozen_module

        size = len(code_data)

        # Packages are indicated with negative size.
        if is_package:
            size = -size

        frozen_defs.append(
            """\
{{ (char *)"{module_name}", (unsigned char *){data}, {size} }},""".format(
                module_name = module_name,
                data        = stream_data.getStreamDataCode(
                    value      = code_data,
                    fixed_size = True
                ),
                size        = size
            )
        )

        if Options.isShowInclusion():
            info("Embedded as frozen module '%s'.", module_name)

    return template_frozen_modules % {
        "frozen_modules" : indented(frozen_defs)
    }
