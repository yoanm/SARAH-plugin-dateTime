/*****************************************************************************************************************
 * @summary Factory to create simple parameter bag module, inspired by Symfony ParameterBag
 * @description ParameterBag prrovide Object oriented way to store key value pair
 *
 * @example <caption>Multiple parameter bag instantiation</caption>
 * var parameterBagFactory = require('parameterBagFactory');
 * var parameterBag1 = parameterBagFactory();
 * var parameterBag2 = parameterBagFactory();
 *
 * @example <caption>Single parameter bag instantiation</caption>
 * var parameterBag = require('parameterBagFactory')();
 *
 * @example <caption>Setter</caption>
 *  parameterBag.set('key', value);
 *
 * @example <caption>Getter</caption
 *  var myValue = sarahContext.get('key');
 *****************************************************************************************************************/
module.exports = function () {
    return new ParameterBag();
};

/**
 * @constructor
 */
function ParameterBag() {
    this.store = new Array();
}

/**
 * @public
 * @param {string} key
 * @param {mixed}  data
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
 * @private
 * @type {Array}
 */
ParameterBag.prototype.store = null;
