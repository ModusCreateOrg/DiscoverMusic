<?php

$genres = array(
    array(
        "id" => 135408474,
        "key" => "electronicDance",
        "name" => "Electronic"
    ),
    array(
        "id" => 10005,
        "key" => "hipHop",
        "name" => "Hip-Hop"
    ),
    array(
        "id" => 139998808,
        "key" => "rnb",
        "name" => "R&B / Soul"
    ),
    array(
        "id" => 10001,
        "key" => "rock",
        "name" => "Rock"
    ),
    array(
        "id" => 139997200,
        "key" => "pop",
        "name" => "Pop"
    ),
    array(
        "id" => 10002,
        "key" => "jazzBlues",
        "name" => "Jazz & Blues"
    ),
    array(
        "id" => 10004,
        "key" => "world",
        "name" => "World"
    ),
    array(
        "id" => 92792712,
        "key" => "country",
        "name" => "Country"
    ),
    array(
        "id" => 139996449,
        "key" => "latinAlternative",
        "name" => "Latin"
    ),
    array(
        "id" => 10003,
        "key" => "classical",
        "name" => "Classical"
    )
);

function genUrl($genreId)
{

    return "http://api.npr.org/query"
        . "?apiKey=MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001"
        . '&id=$genreId'
        . '&requiredAssets=audio,image'
        . '&numResults=10'
        . '&fields=title,teaser,storyDate,text,audio,image,artist'
        . '&transform=source'
        . '&output=JSON';
};


/*
 * http://api.npr.org/query',
apiKey       : 'MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001
 */

function fetchData($url){
    if ($url) {
        // fetch M3u
        $c = curl_init();
        curl_setopt_array($c, array(
            CURLOPT_URL => $url,
            CURLOPT_HEADER => false,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_RETURNTRANSFER => true
        ));
        $r = curl_exec($c);
        curl_close($c);

        return json_decode($r);
    }
    return false;
};



foreach ($genres as &$genre) {
//    echo "Fetching " . $genre['id'] . '<hr/>';

    $data  = fetchData(genUrl($genre['id']));

    $genre['data'] = $data;

//    echo var_dump($genre['data']);
//    echo '<hr/>';
    
}

$data = json_encode($genres);

//
//if ($callback) {
//    $data = $callback . '(' .
//}

json_encode($genres);




//