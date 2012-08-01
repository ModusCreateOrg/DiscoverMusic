global.stationFinder_action = function() {
    var url     = "http://api.npr.org/stations.php?apiKey=MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001",
        reqData = req.data,
        zip     = reqData.zip,
        lat     = reqData.lat,
        lon     = reqData.lon,
        xmlString,
        ok;

    if (lat && lon) {
        url += "&lon=" + lon + '&lat=' + lat;
        ok = true;
    }

    if (zip) {
        url += '&zip=' + zip;
        ok = true;
    }



    if (ok) {
         xmlString = doCurlRequest(url);

       var obj  = xml.toObject(xmlString),
           json = xml.toJson(xmlString);

        console.dir(obj);
        return json;
    }
};
