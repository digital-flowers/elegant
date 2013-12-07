#!/usr/bin/env node
var program = require('commander-plus');
var mkdirp = require('mkdirp');
var fs = require('fs');
var ncp = require("ncp").ncp;
var package = require('../package.json');
var myPath = __dirname;

var myPathArr = myPath.split("/");
myPathArr.pop();
var elegantPath = myPathArr.join("/");
var colorStart = "   \x1b[35;2m";
var colorEnd = "\x1b[0m";


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
            package.name = name;
            path += "/" + name;
        } else {
            package.name = "new elegant project";
        }
        emptyDirectory(path, function (empty) {
            if (empty) {
                createApp(path);
            } else {
                program.confirm('target directory is not empty, continue? ', function (ok) {
                    if (ok) {
                        process.stdin.destroy();
                        createApp(path);
                    } else {
                        console.error("operation canceled!");
                        process.exit(1);
                    }
                });
            }
        });
    });

program.parse(process.argv);
if (program.args.length <= 0) {
    program.help();
}

// util
function createApp(path) {
    var dontCopyFiles = [];
    dontCopyFiles.push(elegantPath + "/package.json");
    dontCopyFiles.push(elegantPath + "/README.md");
    dontCopyFiles.push(elegantPath + "/LICENSE");
    dontCopyFiles.push(elegantPath + "/bin");

    mkdir(path, function () {
        ncp(elegantPath, path, {filter: function (file) {
            if (dontCopyFiles.indexOf(file) >= 0) {
                return false;
            }
            return true;
        }}, function () {
            // create project package.json
            // delete unwanted properties
            delete package.readme, package.bin, package._id, package._from, package.dist;
            // change properties
            package.description = "new elegant project";
            package.private = true;
            package.elegant = package.version;
            package.version = "0.0.1";
            package.repository = {
                type: "your project repository type",
                url: "your project repository url"
            };
            package.keywords = ["keyword1", "keyword2"];
            package.author = {
                name: "your name"
            };
            package.license = "your project license";
            package.bugs = {
                "url": "your project repository bugs url"
            };
            package.homepage = "your project website";
            // write project package
            write(path + "/package.json", JSON.stringify(package));
            // write read me and LICENSE
            write(path + "/README.md", "your project READ ME");
            write(path + "/LICENSE", "your project LICENSE");

            // project created
            console.log(colorStart + "new elegant project created at" + colorEnd + " : " + path);
        });
    });
}
// special thanks for locomotive framework for these great functions
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
function write(path, str) {
    fs.writeFile(path, str);
    console.log(colorStart + 'create' + colorEnd + " : " + path);
}