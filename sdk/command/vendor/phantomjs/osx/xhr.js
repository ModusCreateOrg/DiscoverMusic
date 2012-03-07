var page = new WebPage();

page.onConsoleMessage = function (msg) {
    console.log(msg);
};
page.settings.localToRemoteUrlAccessEnabled = true;

page.open("file://localhost/Users/NKTPRO/Development/Web/Projects/Sencha/SDK/touch/examples/kitchensink/index.html", function(status) {
    page.evaluate(function() {
        console.log(status);
        console.log(document.body.innerHTML);
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://localhost/sdk/touch/sencha-touch.js', false);
        xhr.send(null);

        console.log(xhr.responseText);
    });
    phantom.exit();
});
////
//var content = page.evaluate(function() {
//    var xhr = new XMLHttpRequest();
//
//    xhr.open('GET', 'http://localhost/', false);
//    xhr.send(null);
//
//    return xhr.responseText;
//});
////
//console.log(content);
//console.log("Damn!");
