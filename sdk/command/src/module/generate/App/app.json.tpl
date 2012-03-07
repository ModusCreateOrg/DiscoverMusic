{
    /**
     * The application's namespace, used by Sencha Command to generate classes
     */
    "name": "{name}",

    /**
     * List of all JavaScript assets in the right execution order.
     * Each item is an object with the following format:
     *      {
     *          "path": "path/to/script.js" // Relative path to this app.json file
     *          "update": "delta"           // (Optional)
     *                                      //  - If not specified, this file will only be loaded once, and
     *                                      //    cached inside localStorage until this value is changed.
     *                                      //  - "delta" to enable over-the-air delta update for this file
     *                                      //  - "full" means full update will be made when this file changes
     *
     *      {[ "\}"]}
     */
    "js": [
        {
            "path": "sdk/sencha-touch<tpl if="library == 'all'">-all</tpl>.js"
        {[ "\}"]},
        {
            "path": "app.js",
            "update": "delta"
        {[ "\}"]}
    ],

    /**
     * List of all CSS assets in the right inclusion order.
     * Each item is an object with the following format:
     *      {
     *          "path": "path/to/item.css" // Relative path to this app.json file
     *          "update": "delta"          // (Optional)
     *                                     //  - If not specified, this file will only be loaded once, and
     *                                     //    cached inside localStorage until this value is changed to either one below
     *                                     //  - "delta" to enable over-the-air delta update for this file
     *                                     //  - "full" means full update will be made when this file changes
     *
     *      {[ "\}"]}
     */
    "css": [
        {
            "path": "resources/css/app.css",
            "update": "delta"
        {[ "\}"]}
    ],

    /**
     * Used to automatically generate cache.manifest (HTML 5 application cache manifest) file when you build
     */
    "appCache": {
        /**
         * List of items in the CACHE MANIFEST section
         */
        "cache": [
            "index.html"
        ],
        /**
         * List of items in the NETWORK section
         */
        "network": [
            "*"
        ],
        /**
         * List of items in the FALLBACK section
         */
        "fallback": []
    {[ "\}"]},

    /**
     * Extra resources to be copied along when build
     */
    "extras": [
        "resources/images",
        "resources/icons",
        "resources/loading"
    ],

    /**
     * Directory path to store all previous production builds. Note that the content generated inside this directory
     * must be kept intact for proper generation of delta between updates
     */
    "archivePath": "archive",

    /**
     * Default paths to build this application to for each environment
     */
    "buildPaths": {
        "testing": "build/testing",
        "production": "build/production",
        "package": "build/package",
        "native": "build/native"
    {[ "\}"]},

    /**
     * Build options
     */
    "buildOptions": {
        "product": "touch",
        "minVersion": 3,
        "debug": false,
        "logger": "no"
    {[ "\}"]},

    /**
     * Uniquely generated id for this application, used as prefix for localStorage keys.
     * Normally you should never change this value.
     */
    "id": "{uniqueId}"
{[ "\}"]}
