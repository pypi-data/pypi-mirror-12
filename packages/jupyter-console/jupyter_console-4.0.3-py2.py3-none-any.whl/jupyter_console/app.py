""" A minimal application using the ZMQ-based terminal IPython frontend.

This is not a complete console app, as subprocess will not be able to receive
input, there is no real readline support, among other limitations.
"""

# Copyright (c) IPython Development Team.
# Distributed under the terms of the Modified BSD License.

import signal

from IPython.terminal.ipapp import TerminalIPythonApp, frontend_flags as term_flags

from traitlets import (
    Dict, Any
)
from IPython.utils.warn import error

from jupyter_core.application import JupyterApp, base_aliases, base_flags, NoStart
from jupyter_client.consoleapp import (
        JupyterConsoleApp, app_aliases, app_flags,
    )

from jupyter_console.interactiveshell import ZMQTerminalInteractiveShell
from jupyter_console import __version__

#-----------------------------------------------------------------------------
# Globals
#-----------------------------------------------------------------------------

_examples = """
jupyter console # start the ZMQ-based console
jupyter console --existing # connect to an existing ipython session
"""

#-----------------------------------------------------------------------------
# Flags and Aliases
#-----------------------------------------------------------------------------

# copy flags from mixin:
flags = dict(base_flags)
# start with mixin frontend flags:
frontend_flags = dict(app_flags)
# add TerminalIPApp flags:
frontend_flags.update(term_flags)
# disable quick startup, as it won't propagate to the kernel anyway
frontend_flags.pop('quick')
# update full dict with frontend flags:
flags.update(frontend_flags)

# copy flags from mixin
aliases = dict(base_aliases)
# start with mixin frontend flags
frontend_aliases = dict(app_aliases)
# load updated frontend flags into full dict
aliases.update(frontend_aliases)
aliases['colors'] = 'InteractiveShell.colors'

# get flags&aliases into sets, and remove a couple that
# shouldn't be scrubbed from backend flags:
frontend_aliases = set(frontend_aliases.keys())
frontend_flags = set(frontend_flags.keys())


#-----------------------------------------------------------------------------
# Classes
#-----------------------------------------------------------------------------


class ZMQTerminalIPythonApp(TerminalIPythonApp, JupyterApp, JupyterConsoleApp):
    name = "jupyter-console"
    version = __version__
    """Start a terminal frontend to the IPython zmq kernel."""

    description = """
        The Jupyter terminal-based Console.

        This launches a Console application inside a terminal.

        The Console supports various extra features beyond the traditional
        single-process Terminal IPython shell, such as connecting to an
        existing ipython session, via:

            jupyter console --existing

        where the previous session could have been created by another ipython
        console, an ipython qtconsole, or by opening an ipython notebook.

    """
    examples = _examples
    _config_file_name_default = JupyterApp._config_file_name_default

    classes = [ZMQTerminalInteractiveShell] + JupyterConsoleApp.classes
    flags = Dict(flags)
    aliases = Dict(aliases)
    frontend_aliases = Any(frontend_aliases)
    frontend_flags = Any(frontend_flags)
    
    subcommands = Dict()
    
    force_interact = True

    def parse_command_line(self, argv=None):
        super(ZMQTerminalIPythonApp, self).parse_command_line(argv)
        self.build_kernel_argv(self.extra_args)

    def init_shell(self):
        if self._dispatching:
            raise NoStart()
        JupyterConsoleApp.initialize(self)
        # relay sigint to kernel
        signal.signal(signal.SIGINT, self.handle_sigint)
        self.shell = ZMQTerminalInteractiveShell.instance(parent=self,
                        display_banner=False, profile_dir=self.profile_dir,
                        ipython_dir=self.ipython_dir,
                        manager=self.kernel_manager,
                        client=self.kernel_client,
        )
        self.shell.own_kernel = not self.existing

    def init_gui_pylab(self):
        # no-op, because we don't want to import matplotlib in the frontend.
        pass

    def handle_sigint(self, *args):
        if self.shell._executing:
            if self.kernel_manager:
                # interrupt already gets passed to subprocess by signal handler.
                # Only if we prevent that should we need to explicitly call
                # interrupt_kernel, until which time, this would result in a 
                # double-interrupt:
                # self.kernel_manager.interrupt_kernel()
                pass
            else:
                self.shell.write_err('\n')
                error("Cannot interrupt kernels we didn't start.\n")
        else:
            # raise the KeyboardInterrupt if we aren't waiting for execution,
            # so that the interact loop advances, and prompt is redrawn, etc.
            raise KeyboardInterrupt
    
    def initialize(self, argv=None):
        try:
            super(ZMQTerminalIPythonApp, self).initialize(argv)
        except NoStart:
            pass

    def init_code(self):
        # no-op in the frontend, code gets run in the backend
        pass
    
    def start(self):
        # JupyterApp.start dispatches on NoStart
        JupyterApp.start(self)
        super(ZMQTerminalIPythonApp, self).start()


main = launch_new_instance = ZMQTerminalIPythonApp.launch_instance


if __name__ == '__main__':
    main()

