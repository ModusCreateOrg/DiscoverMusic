exports = function() {
    Json.success(fetchGenresExternal(req.data.lastUpdate || new Date().getJulian()))
};
