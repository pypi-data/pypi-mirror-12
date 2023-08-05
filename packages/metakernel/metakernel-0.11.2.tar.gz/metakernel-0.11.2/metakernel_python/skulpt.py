from metakernel import MetaKernel
from IPython.display import HTML, Javascript
import sys
import re

class SkulptPythonKernel(MetaKernel):
    implementation = 'Skulpt Python'
    implementation_version = '1.0'
    language = 'python'
    language_version = '0.1'
    language_info = {
        'mimetype': 'text/x-python',
        'name': 'python',
        'codemirror_mode': {
            "version": 2,
            "name": "text/x-python"
        },
        # 'pygments_lexer': 'language',
        # 'version'       : "x.y.z",
        'file_extension': '.py',
    }
    banner = "Skulpt Python kernel - evaluates Python programs in the browser"
    canvas_id = 0
    keywords = []

    def get_usage(self):
        return "This is a Skulpt Python kernel"

    def do_execute_direct(self, code):
        """%%processing - run contents of cell as a Skulpt Python script"""
        if code.strip() == "":
            return
        self.canvas_id += 1

        env = {"code": repr(code)[1:] if sys.version.startswith('2') else repr(code),
               "id": self.canvas_id}
        code = '' % env
        html = HTML(code)
        self.Display(html)

    def get_completions(self, info):
        token = info["full_obj"]
        self.last_info = info
        return [command for command in self.keywords if command.startswith(token)]

    def get_kernel_help_on(self, info, level=0, none_on_fail=False):
        expr = info["full_obj"]
        self.last_info = info
        url = None
        if expr in self.keywords:
            return "Help on " + expr
        elif none_on_fail:
            return None
        else:
            return "Sorry, no available help for '%s'" % expr


#if __name__ == '__main__': 
#    from IPython.kernel.zmq.kernelapp import IPKernelApp 
#    IPKernelApp.launch_instance(kernel_class=SkulptPythonKernel) 

