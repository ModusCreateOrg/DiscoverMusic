var NUM_URLS_KEY = 'amazon-web-app-num-urls';
var URL_KEY_PREFIX = 'amazon-web-app-url';

function loadURLs() {
    var n = localStorage.getItem(NUM_URLS_KEY) || 0;
    n = Number(n);

    for (var i = 0; i < n; i++) {
        var url = localStorage.getItem(URL_KEY_PREFIX + i);
        if (url) {
            addURL(i, url);
        }
    }
}

function addURL(i, url) {
    var li = $('<li>');
    li.attr('id', 'url' + i);

    // children of li
    var d = $('<div>');
    d.html(url);

    var links = $('<ul>');

    // chilrdren of links
    var wv_l = $('<li>');
    var wv_a = $('<a>');
    wv_a.attr('href', url);
    wv_a.html('web view');
    wv_l.append(wv_a);

    var silk_l = $('<li>');
    var silk_a = $('<a>');
    silk_a.attr('href', 'silk-' + url);
    silk_a.html('silk');
    silk_l.append(silk_a);

    links.append(wv_l, silk_l);
    li.append(d, links);
    $("#urls").append(li);
}

function saveURL() {
    var url = $("#new_url").val();
    var i = localStorage.getItem(NUM_URLS_KEY) || 0;
    i = Number(i);

    localStorage.setItem(URL_KEY_PREFIX + i, url);
    localStorage.setItem(NUM_URLS_KEY, i + 1);

    addURL(i, url);
    $("#new_url").val("http://");
}

function toggleUtils() {
    $("#utils").toggle(1);
}

function clearAppCache() {
    AmazonWebAppCache.clearAppCache();
}

function clearFormData() {
    AmazonWebAppCache.clearFormData();
}

function clearHistory() {
    AmazonWebAppCache.clearHistory();
}

function clearAllCookies() {
    AmazonWebAppCache.clearAllCookies();
}

function clearExpiredCookies() {
    AmazonWebAppCache.clearExpiredCookies();
}

function clearSessionCookies() {
    AmazonWebAppCache.clearSessionCookies();
}

function init() {
    $("#save_url").click(saveURL);
    $("#utils-title").click(toggleUtils);
    $("#clear-app-cache").click(clearAppCache);
    $("#clear-form-data").click(clearFormData);
    $("#clear-history").click(clearHistory);
    $("#clear-all-cookies").click(clearAllCookies);
    $("#clear-expired-cookies").click(clearExpiredCookies);
    $("#clear-session-cookies").click(clearSessionCookies);
    loadURLs();
}
window.onload = init;
