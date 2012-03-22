<?php

$lat = $_REQUEST['lat'];
$lon = $_REQUEST['lon'];
$zip = $_REQUEST['zip'];

$url = "http://api.npr.org/stations.php?apiKey=MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001";
$ok = false;

if ($lat && $lon) {
    $url .= "&lon=$lon&lat=$lat";
    $ok = true;
}

if ($zip) {
    $url .= "&zip=$zip";
    $ok = true;
}

if ($ok) {
	echo $url;
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
    echo $r;
}
else {
    echo "{}";
}