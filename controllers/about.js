var settings = require("../settings.js");
var view = require("../modules/view.js");
var db = require("../modules/db.js");
var redirect = require("../modules/redirect.js");
var control = require("../modules/control.js");
var fs = require("fs");
var web = require("../modules/web.js");
var url = require("url");
var http = require("http");

exports["/about"] = {
    handler: function (data) {
        // Prepare Vars
        var vars = {};
        db("SELECT * FROM `auth_user`",
            function (err, rows, fields) {
                vars.users = rows;
            }
        );
        db("SELECT * FROM `auth_user` where `id`=1",
            function (err, rows, fields) {
                vars.user = rows[0];
            }
        );

        control("controls/bar.html",
            function (err, data) {

                vars.bar = data;
            }
        );

        vars.bars = "<P>sda</P>";


        return view("product.html", vars);
    }
};

exports["/test"] = {
    handler: function (data) {
        return view("test.html");
    }
};


exports["/static"] = {

    handler: function (data) {

        /////
        // In this Firs Block We are getting the File name after the "Static/" controller
        // then we go the the Static Directory that is predefined in the Framework Settings
        // and depending on the file type the framework knows what folder to use.
        // We Check if the File Type Is Downloadable from our Main Settings and if it is
        // We Download the File to the user.
        ////

        var GetFile = data.path.split("/");
        var file = GetFile[1];
        var GetFileType = file.split(".");
        var FileType = GetFileType[1];
        var fileName = settings.FILES.FOLDER + FileType + "/" + file;
        var DownloadableFiles = settings.FILES.Downloadable;
        console.log(fileName);

        var Downloadable = false;
        for (i = 0; i < DownloadableFiles.length && !Downloadable; i++) {
            if (DownloadableFiles[i] == FileType) {
                Downloadable = true;
            }
        }

        console.log(Downloadable);
        // Check if the File Is Configured as Downloadable in Our Project Settings
        if (!Downloadable) {

            // Check if the file request exists in the files directory
            fs.exists(fileName, function (exists) {

                // exists object returns true or false
                if (exists) {

                    // Get The File Stat
                    fs.stat(fileName, function (error, stats) {

                        // Open the File in writble mode
                        fs.open(fileName, "r", function (error, fd) {

                            // Create a new buffer object and pass the stat size
                            var buffer = new Buffer(stats.size);

                            // Read File
                            fs.read(fd, buffer, 0, buffer.length, null, function (error, bytesRead, buffer) {

                                //Get File Contents
                                var data = buffer.toString("utf8", 0, buffer.length);

                                console.log("Reading file : " + fileName);

                                fs.close(fd);
                                return data;
                            });
                        });
                    });
                } else {

                    console.log("file Not Found");
                }
            });

        } else {

            // The File Is Downloadable , Lets Download our file.
            var Domain = settings.DOMAIN;
            var file = fs.createWriteStream(fileName);
            var request = http.get("http://" + Domain + "/static/" + fileName, function (response) {
                response.pipe(file);
                console.log(file);
            });
        }

    }

}


exports["/download"] = {
    handler: function (data) {


    }

}