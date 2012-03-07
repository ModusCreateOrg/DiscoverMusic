(function() {
    var coreFiles = [
            "Ext.js",
            "version/Version.js",
            "lang/String.js",
            "lang/Number.js",
            "lang/Array.js",
            "lang/Function.js",
            "lang/Object.js",
            "lang/Date.js",
            "lang/JSON.js",
            "class/Base.js",
            "class/Class.js",
            "class/ClassManager.js",
            "class/Loader.js",
            "lang/Error.js"
        ],
        path = require('path'),
        currentPath = __dirname,
        srcPath = path.resolve(currentPath, '../src'),
        corePath = path.join(srcPath, 'core'),
        command;

    coreFiles.forEach(function(file) {
        require(path.join(corePath, file));
    });

    Ext.Loader.setConfig({
        enabled: true,
        paths: {
            Ext: srcPath,
            Command: path.join(currentPath, 'src')
        }
    });

    command = Ext.create('Command.Cli', {
        version: '2.0.0',
        currentPath: currentPath,
        modules: {
            'app': 'Application',
            'fs': 'FileSystem',
            'manifest': 'Manifest',
            'test': 'Test',
            'generate': 'Generate',
            'package': 'Package'
        },
        logger: Ext.create('Ext.log.Logger', {
            writers: {
                cli: Ext.create('Command.log.writer.Cli', {
                    formatter: Ext.create('Command.log.formatter.Cli')
                })
            },
            minPriority: 'verbose'
        })
    });
    command.run(Array.prototype.slice.call(process.argv, 2));
})();
