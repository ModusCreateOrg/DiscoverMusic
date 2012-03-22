<?php

$url = $_REQUEST['url'];
$callback = $_REQUEST['callback'];


if ($url) {
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

    $lines = explode('
', $r);

    foreach($lines as &$line) {
        preg_match('/File1/i', $line, $match);

        if ($match) {
            $file = explode('=', $line);
            $file = $file[1];

        }
    }
}

if ($file) {
    $out = '{file : "' . trim($file) . '"}';
}
else {
    $out = '{}';
}

if ($callback) {
    $out = $callback . '('. $out . ')';
}

echo $out;