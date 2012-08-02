global.stationFinder_action = function() {
    var url        = "http://api.npr.org/stations.php?apiKey=MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001",
        reqData    = req.data,
        zip        = reqData.zip,
        lat        = reqData.latitude,
        lon        = reqData.longitude,
        stations   = [],
        validItems = {
            'PodCast'          : 1,
            'Audio MP3 Stream' : 1,
            'Newscast'         : 1
        },
        stationUrls,
        obj,
        response,
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
//        xmlString = xmlString.replace(/\$t/g, 'content');
//        console.log(typeof xmlString);
//        console.log(xmlString);
        obj  = xml.toObject(xmlString);
        if (typeof obj == 'object') {
            obj.stations.station.each(function(station) {
                if (! station.url) {
                    return;
                }

                stationUrls = [];

                delete station.signal;
                delete station.memberStatus;
                delete station.id;
                delete station.callLetters;
//                delete station.state;
                delete station.marketCity;
                delete station.image;
                delete station.band;

                delete station.orgDisplayName;

                delete station.identifierAudioUrl;

                station.url.each(function(url) {
                    if (! validItems[url.type]) {
                        return;
                    }
                    delete url.typeId;
                    delete url.type;

                    stationUrls.push(url);
                });

                if (stationUrls.length < 1) {
                    return;
                }

                station.url = stationUrls;

                stations.push(station);
            });
        }




        response = JSON.stringify(stations).replace(/\$t/g, 'content');


        if (req.data.callback) {
            res.contentType = 'text/javascript';

            response = req.data.callback + '(' + response + ')';
        }
        res.write(response);
        res.stop();
    }
};
