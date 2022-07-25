const pycess = function(script, args, callback) {
    console.log(`Sending data to ${script}: ${JSON.stringify(args)}`);
    var path = require('path');
    var {PythonShell} = require('python-shell');
    var kvargs = {
        scriptPath: path.join(__dirname, '../python/'),
        args: JSON.stringify(args)
    }
    PythonShell.run(script, kvargs, callback);
}