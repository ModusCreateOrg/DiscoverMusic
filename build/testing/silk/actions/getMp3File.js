var doCallback = function(fileUri) {
    res.contentType = 'text/javascript';

    var response = JSON.stringify({
            file : fileUri
        });
    response = req.data.callback + '(' + response + ')';
    res.write(response);
    res.stop();
};

var getMp3File = function(inboundUrl, justReturnFileString) {
    var url   = req.data.url,
        data  = doCurlRequest(inboundUrl || url),
        m3uRe = /\.mp3/i,
        plsRe = /File1/i,
        callback = req.data.callback,
        lines,
        foundM3uLine,
        foundPlsLine,
        file;


    if (data && data.length > 0) {
        lines = data.split(/\n|\r/);

        lines.each(function(line) {
            foundPlsLine = line.match(plsRe);
            if (foundPlsLine) {
                file = line.split('=')[1];
                if (callback) {
                    doCallback(file);
                }

                return false;
            }

            foundM3uLine = line.match(m3uRe);
            if (foundM3uLine) {
                file = line;
                if (callback) {
                    doCallback(file);
                }

                return false;
            }
        });
    }





    if (! justReturnFileString) {
        file = Json.encode({ file : file });
        if (req.data.callback) {
            file = req.data.callback + '(' + file + ')';
        }
        if (callback) {
            doCallback(file);
        }
        return file;
    }

    if (callback) {
        doCallback(file);
    }
    return file;


};


exports = getMp3File;
global.getMp3File_action = getMp3File;