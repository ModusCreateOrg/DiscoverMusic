exports = function() {
    return Json.encode(fetchGenresExternal(req.data.lastUpdate || new Date().getJulian()));
};
