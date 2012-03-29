exports = function(inboundUrl, justReturnFileString) {
    var url   = req.data.url,
        data  = doCurlRequest(inboundUrl || url),
        m3uRe = /\.mp3/i,
        plsRe = /File1/i,
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
                return false;
            }

            foundM3uLine = line.match(m3uRe);
            if (foundM3uLine) {
                file = line;
                return false;
            }
        });
    }

    if (! justReturnFileString) {
        file = Json.encode({ file : file });
        if (req.data.callback) {
            file = req.data.callback + '(' + file + ')';
        }
        return file;
    }
    return file;

//    Json.success({ data : data });
};

