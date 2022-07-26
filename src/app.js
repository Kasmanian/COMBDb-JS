var path = require('path');

const pycess = function(script, args, callback) {
    console.log(`Sending data to ${script}: ${JSON.stringify(args)}`);
    let {PythonShell} = require('python-shell');
    let kvargs = {
        scriptPath: path.join(__dirname, '../python/'),
        args: JSON.stringify(args)
    }
    PythonShell.run(script, kvargs, callback);
}

class App {
    constructor() {
        let msg = {'path': path.join(__dirname, '../data/user.json')};
        pycess('dbcheck.py', msg, (err, results)=> {
            if (err) console.log(err); else {
                let data = JSON.parse(results[0]);
                if (data['ret']) {
                    console.log(`Succeeded: ${data['ret']}`);
                    this.loadAppIntoDom();
                }
                else console.log(`Failed: ${data['err']}`);
            }
        });
    }
    handleSignIn() {
        let user = document.getElementById('user').value;
        let pswd = document.getElementById('pswd').value;
        console.log(`User: ${user}, Password: ${pswd}`);
        let msg = {'path': path.join(__dirname, '../data/user.json'), 'user': user, 'pswd': pswd}
        pycess('signin.py', msg, (err, results)=> {
            if (err) console.log(err); else {
                let data = JSON.parse(results[0]);
                if (data['ret'].length>0) {
                    console.log(`Succeeded: ${data['ret']}`);
                }
                else console.log(`Failed: ${data['err']}`);
            }
        });
    }
    loadAppIntoDom() {
        const app = this;
        //const $main = document.getElementById('sign-in-container');
        document.getElementById('sign-in').addEventListener('click', function() {app.handleSignIn()});
    }
}

new App();