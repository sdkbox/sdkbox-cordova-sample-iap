cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/sdkbox-plugin-iap/www/sdkbox_iap.js",
        "id": "sdkbox-plugin-iap.IAPService",
        "pluginId": "sdkbox-plugin-iap",
        "clobbers": [
            "sdkbox.PluginIAP"
        ],
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "sdkbox-plugin-iap": "1.0.1"
}
// BOTTOM OF METADATA
});