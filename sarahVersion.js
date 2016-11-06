/******************************************************************
 * @summary Sarah version helper
 * @description Provide usefull method to guess Sarah version
 *
 * @example
 * var sarahVersion = require('sarahVersion');
 *
 * @example <caption>Helper</caption>
 *  sarahVersion.isV3();
 *  sarahVersion.isV4();
 *
 * @example <caption>Usage</caption
 *  var sarahVersionNumber = sarahVersion.getVersion();
 *  if (SARAH_VERSION_V3 == sarahVersionNumber) {
 *      ...
 *  }
 *  if (SARAH_VERSION_V4 == sarahVersionNumber) {
 *      ...
 *  }
 *
 *******************************************************************/
module.exports = (function() {
    var SarahVersion = {};

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
    SarahVersion.getVersion = function ()
    {
        return this.isV3() ? SARAH_VERSION_V3 : SARAH_VERSION_V4;
    };

    return SarahVersion;
}());
/**
 * @typedef {int} SarahVersionNumber
 */
/**
 * @public
 * @type {SarahVersionNumber}
 */
const SARAH_VERSION_V3 = 3;
/**
 * @public
 * @type {SarahVersionNumber}
 */
const SARAH_VERSION_V4 = 4;
