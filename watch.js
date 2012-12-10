#!/usr/local/bin/silkjs

console = require('console');
fs = require('fs');
process = require('builtin/process');

(function() {

    var sleepTime = 2, // time to sleep
        target    = 'testing',
        webAppDir = 'html5',
        buildDir  = 'build/$target',
        iosDir    = 'ios/www',
        devNullRd = ' >/dev/null 2>&1',
        commands  = {
            senchaBuild  : 'cd ' + webAppDir + '; sencha app build ' + target,
            sayDeploying : 'say Deploying' + devNullRd,
            sayDone      : 'say done building' + devNullRd,
            // todo migrate to notification
            reportError  : ('').concat(
                'osascript -e \'tell application "Finder"\'',
                ' -e "activate"',
                ' -e \'display alert \"Error with Sencha Touch 2 build\"\'',
                ' -e "end tell"'
            ),
            copyResources : [
                //iOS
                [
                    'rm -rf ' + iosDir + '/*',
                    'cp -Rf ' + buildDir + '/* ' + iosDir + '/',
                    'cp ' + webAppDir + '/lib/cordova-1.9.0.ios.js ' + iosDir +'/cordova-1.9.0.js',
                    'cp ' + webAppDir + '/lib/ChildBrowser.ios.js ' + iosDir  + '/ChildBrowser.js'
                ],

                // android
                [

                ]
                // anything else?
            ]
        };

    var exec = function(cmd) {
        console.log('Executing : ' + cmd);
        return process.exec(cmd);
    };

    var deploy = function() {

        exec(commands.sayDeploying);
        var out = exec(commands.senchaBuild);

        // Sencha SDK tools do not exit with status code > 0. :(
        // So we have to scrape for the error.
        if (out.match('ERROR')) {
            exec(commands.reportError);
            console.log('<<<<<<<< OUTPUT >>>>>>>');
            console.log(out);
        }
        else {
            var copyResourceCommands = commands.copyResources;

            copyResourceCommands.each(function(commands) {
                commands.each(function(cmd) {
                    exec(cmd);
                    out = exec(cmd);
                    if (! out.success) {
                        console.log(out);
                        return false;
                    }
                });

            });

        }
    };

    var projectName   = 'discovermusic',
        fileName      = '/tmp/' + projectName + '_watcher.md5',
        md5           = fs.readFile(fileName),
        getChangesStr = 'ls -lR html5/ | md5',
        newMd5;

    while (1) {
        newMd5 = exec(getChangesStr);
        if (md5 == null || md5 != newMd5 ) {
            deploy();

            md5 = newMd5;
            fs.writeFile(fileName, newMd5);
        }

        process.sleep(sleepTime);
    }
})();
