import sys, ast, json

class Pycessor():
    def __init__(self):
        self.input = ast.literal_eval(sys.argv[1])
        self.output = self.input

    def flush(self):
        print(json.dumps(self.output))
        sys.stdout.flush()