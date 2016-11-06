module.exports = function () {
    return new ParameterBag();
};

/**
 * Simple wrapper for key value storage
 * @constructor
 */
function ParameterBag() {
    this.store = new Array();
}

/**
 * @public
 * @param {string} key
 * @param {mixed} data
 */
ParameterBag.prototype.set = function(key, data) {
    this.store[key] = data;
};
/**
 * @public
 * @param {string} key
 *
 * @returns {mixed}
 */
ParameterBag.prototype.get = function (key) {
    return this.store[key];
};

/**
 * @type {Array}
 */
ParameterBag.prototype.store = null;