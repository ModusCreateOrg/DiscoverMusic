exports = function() {
    var data = Json.encode(fetchGenresExternal(req.data.lastUpdate || new Date().getJulian()));
    if (req.data.callback) {
        data = req.data.callback + '(' + data + ')';
    }

    return data;
};
