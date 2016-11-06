/*****************************************************************************************************************
 * @summary Factory to create a SARAH action context
 * @description SarahActionContext provide useless method regarding action context
 * for module which want to run in SARAH v3 AND v4
 *
 * @requires ParameterBag
 *
 * @example <caption>Multiple context instantiation</caption>
 * var sarahContextFactory = require('sarahContextFactory');
 * var sarahContext1 = sarahContextFactory(data1, callback1);
 * var sarahContext2 = sarahContextFactory(data2, callback2);
 *
 * @example <caption>Single context instantiation</caption>
 * var sarahContext = require('sarahContextFactory')(data, callback);
 *
 * @example <caption>Setter</caption>
 *  sarahContext.setSARAH(SARAHInstance);
 *
 * @example <caption>Getter</caption
 *  sarahContext.getData();
 *  sarahContext.getCallback();
 *  sarahContext.getSARAH();
 *****************************************************************************************************************/
module.exports = function (data, callback) {
    return new SarahActionContext(data, callback);
};

/**
 * @constructor
 *
 * @param {object}   data     Action data
 * @param {callable} callback Action Callback
 */
function SarahActionContext(data, callback) {
    this.context = require('./parameterBagFactory')();
    this.context.set('data', data);
    this.context.set('callback', callback);
}

/**
 * @public
 * @returns {Object}
 */
SarahActionContext.prototype.getData = function () {
    return this.context.get('data');
};

/**
 * @public
 * @returns {callable}
 */
SarahActionContext.prototype.getCallback = function () {
    return this.context.get('callback');
};

/**
 * @public
 * For SARAH v3 (For SARAH v4 Sarah instance is global)
 * @param {SARAH} SARAH SARAH instance
 */
SarahActionContext.prototype.setSARAH = function(SARAH) {
    this.context.set('SARAH', SARAH);
};

/**
 * @public
 * @returns {SARAH}
 */
SarahActionContext.prototype.getSARAH = function () {
    return SARAH
        ? SARAH // Sarah v4
        : this.context.get('SARAH');
};

/**
 * @private
 * @type {ParameterBag}
 */
SarahActionContext.prototype.context = null;
