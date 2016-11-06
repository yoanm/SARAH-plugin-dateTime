/******************************************************************
 * @summary Sarah version helper
 * @description Provide useful methods to deal with Sarah version
 *
 * @example
 * var sarahVersion = require('sarahVersion');
 *
 * @example <caption>Helper</caption>
 *  sarahVersion.isV3();
 *  sarahVersion.isV4();
 *  sarahVersion.getVersion();
 *
 * @example <caption>getVersion usage</caption>
 *  var sarahVersionNumber = sarahVersion.getVersion();
 *  if (sarahVersion.v3 == sarahVersionNumber) {
 *      ...
 *  }
 *  if (sarahVersion.v4 == sarahVersionNumber) {
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
    SarahVersion.getVersion = function ()
    {
        return this.isV3() ? this.v3 : this.v4;
    };

    return SarahVersion;
}());
