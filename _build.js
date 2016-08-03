var watch = require('node-watch');
var exec = require('child_process').exec;
var spawn = require('cross-spawn');
var chalk = require('chalk');


// Spawn NPM asynchronously
console.log(chalk.yellow.bgBlue('                                          '));
console.log(chalk.yellow.bgBlue('>   Real Time Dashboard build: started    '));
console.log(chalk.yellow.bgBlue('                                          '));

var clientInProgress = false;
watch(['./src/client/']).on('change', function () {
    if (clientInProgress) return;
    clientInProgress = true;
    var child = spawn('webpack', ['--config', 'webpack.client.js'], { stdio: 'inherit' });
    //spawn('webpack', ["params"], {stdio: "inherit"});
    child.on('close', function(){
        clientInProgress = false;
        console.log(chalk.yellow.bgBlue ('                                          '));
        console.log(chalk.yellow.bgBlack('=========    Client ready...     ========='))
        console.log(chalk.yellow.bgBlue ('                                          '));
    })
});




var serverInProgress = false;
watch(['./src/server/']).on('change', function () {
    if (serverInProgress) return;
    clientInProgress = true;
    var child = spawn('webpack', ['--config', 'webpack.server.js'], { stdio: 'inherit' });
    //spawn('webpack', ["params"], {stdio: "inherit"});
    child.on('close', function(){
        serverInProgress = false;
        console.log(chalk.yellow.bgBlue ('                                          '));
        console.log(chalk.yellow.bgBlack('=========    Server ready...     ========='))
        console.log(chalk.yellow.bgBlue ('                                          '));
    })
});