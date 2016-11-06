/******************************************************************
 * @summary Sarah version helper
 * @description Provide useful methods to deal with Sarah version
 *
 * @example
 * var version = require('version');
 *
 * @example <caption>Helper</caption>
 *  version.isV3();
 *  version.isV4();
 *  version.get();
 *
 * @example <caption>get usage</caption>
 *  var versionNumber = version.get();
 *  if (version.v3 == versionNumber) {
 *      ...
 *  }
 *  if (version.v4 == sarahVersionNumber) {
 *      ...
 *  }
 *
 *******************************************************************/
module.exports = (function() {
    var SarahVersion = {};

    /**
     * @typedef {int} SarahVersionNumber
     */
    /**
     * @public
     * @readOnly
     * @type {SarahVersionNumber}
     */
    SarahVersion.v3 = 3;
    /**
     * @public
     * @readOnly
     * @type {SarahVersionNumber}
     */
    SarahVersion.v4 = 4;

    /**
     * @public
     *
     * @returns {boolean}
     */
    SarahVersion.isV3 = function ()
    {
        return typeof Config === "undefined";
    };

    /**
     * @public
     *
     * @returns {boolean}
     */
    SarahVersion.isV4 = function ()
    {
        return !this.isV3();
    };

    /**
     * @public
     *
     * @returns {SarahVersionNumber}
     */
    SarahVersion.get = function ()
    {
        return this.isV3() ? this.v3 : this.v4;
    };

    return SarahVersion;
}());
