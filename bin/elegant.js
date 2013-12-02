#!/usr/bin/env node
var program = require('commander');
var mkdirp = require('mkdirp');
var fs = require('fs');
var ncp = require("ncp").ncp;

var package = require('../package.json');

var myPath = __dirname;
var myPathArr = myPath.split("/");
myPathArr.pop();
var elegantPath = myPathArr.join("/");

// program basic options
program.version(package.version)
    .usage("[command] [options]")
    .option('-m, --more', 'use with --help to show more help')
    .on('--help', function () {
        if (program.rawArgs && (program.rawArgs.indexOf('--more') != -1 || program.rawArgs.indexOf('-m') != -1)) {
            if (fs.existsSync(myPath + "/help.txt")) {
                var help = fs.readFileSync(myPath + "/help.txt", "UTF-8");
                console.log(help);
            }
        }
    });

// commands
program.command("create")
    .description("create new elegant project")
    .action(function (name) {
        var path = process.env.PWD;
        if (typeof name == "string") {
            path += "/" + name;
        }
        emptyDirectory(path, function (empty) {
            if (empty) {
                createApp(path);
            } else {
                /*
                 program.confirm('target directory is not empty, continue? ', function(ok) {
                 if (ok) {
                 process.stdin.destroy();
                 create(path);
                 } else {
                 console.error("operation canceled!");
                 process.exit(1);
                 }
                 });
                 */
            }
        });
    });

program.parse(process.argv);

if (program.args.length <= 0) {
    program.help();
}

// util
function createApp(path) {
    mkdir(path, function () {
        ncp(elegantPath, path, {filter: function (file) {
            //console.log("\033[36mcreate\033[0m : " + file);
            return true;
        }}, function () {
            console.log("\033[36mnew elegant project created at \033[0m : " + path);
        });
    });
}
// special thanks for locomotive framework for this great functions
function emptyDirectory(path, fn) {
    fs.readdir(path, function (err, files) {
        if (err && 'ENOENT' != err.code) throw err;
        fn(!files || !files.length);
    });
}

function mkdir(path, fn) {
    mkdirp(path, 0755, function (err) {
        if (err) throw err;
        fn && fn();
    });
}
