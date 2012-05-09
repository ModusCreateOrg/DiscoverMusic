exports = function() {
    var response = Json.encode(fetchGenresExternal(req.data.lastUpdate || new Date().getJulian()));
    if (req.data.callback) {
        res.contentType = 'text/javascript';

        response = req.data.callback + '(' + response + ')';
    }
    res.write(response);
    res.stop();
};
