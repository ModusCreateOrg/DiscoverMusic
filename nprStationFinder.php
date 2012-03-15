<?php

$lat = $_REQUEST['lat'];
$lon = $_REQUEST['lon'];
$url = "http://api.npr.org/stations.php?apiKey=MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001";


if ($lat && $lon) {
        $url .= "&lon=$lon&lat=$lat";
        // fetch XML
        $c = curl_init();
        curl_setopt_array($c, array(
                CURLOPT_URL => $url,
                CURLOPT_HEADER => false,
                CURLOPT_TIMEOUT => 10,
                CURLOPT_RETURNTRANSFER => true
        ));
        $r = curl_exec($c);
        curl_close($c);
}
if ($r) {
    echo json_encode(new SimpleXMLElement($r));
}
else {
    echo "WTF";
}
