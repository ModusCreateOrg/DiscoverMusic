function success(message) {
    console.log(message);
    phantom.exit(0);
}

function error(message) {
    console.log(message);
    phantom.exit(1);
}

var args = phantom.args,
    uri = args[0],
    dependencies, timer;

var page = new WebPage();

page.settings.localToRemoteUrlAccessEnabled = true;
page.settings.ignoreSslErrors = true;

page.onAlert = function(message) {
    error("Error thown from your application with message: " + message);
};

page.open(uri, function(status) {
    if (status !== 'success') {
        error("Failed openning: '" + uri + "', please verify that the URI is valid");
    }

    page.evaluate(function() {
        window.onerror = function(e) {
            alert(e);
        };

        Ext.onReady(function() {
            var documentLocation = document.location,
                currentLocation = documentLocation.origin + documentLocation.pathname + documentLocation.search,
                dependencies = [],
                path;

            function getRelativePath(from, to) {
                var fromParts = from.split('/'),
                    toParts = to.split('/'),
                    index = null,
                    i, ln;

                for (i = 0, ln = toParts.length; i < ln; i++) {
                    if (toParts[i] !== fromParts[i]) {
                        index = i;
                        break;
                    }
                }

                if (index === null || index === 0) {
                    return from;
                }

                fromParts = fromParts.slice(index);

                for (i = 0; i < ln - index - 1; i++) {
                    fromParts.unshift('..');
                }

                for (i = 0, ln = fromParts.length; i < ln; i++) {
                    if (fromParts[i] !== '..' && fromParts[i+1] === '..') {
                        fromParts.splice(i, 2);
                        i -= 2;
                        ln -= 2;
                    }
                }

                return fromParts.join('/');
            }

            Ext.Loader.history.forEach(function(item) {
                path = Ext.Loader.getPath(item);
                path = getRelativePath(path, currentLocation);

                dependencies.push({
                    path: path,
                    className: item
                });
            });

            Ext.__dependencies = dependencies;
        });
    });

    timer = setInterval(function() {
        dependencies = page.evaluate(function() {
            return Ext.__dependencies;
        });

        if (dependencies) {
            clearInterval(timer);
            success(JSON.stringify(dependencies, null, 4));
        }
    }, 100);
});
