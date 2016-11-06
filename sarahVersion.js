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

    return SarahVersion;
}());