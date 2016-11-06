/*****************************************************************************************************************
 * @summary SARAH action context
 * @description SarahActionContext provide useful methods regarding action context
 * for module which want to run in SARAH v3 AND v4
 *
 * @requires parameterBag
 *
 * @example <caption>Instantiation</caption>
 * const SarahActionContext = require('sarahContext');
 * var context = new SarahActionContext(data, callback);
 *
 * @example <caption>Setter</caption>
 *  context.setSARAH(SARAHInstance);
 *
 * @example <caption>Getter</caption
 *  context.getData();
 *  context.getCallback();
 *  context.getSARAH();
 *****************************************************************************************************************/

const ParameterBag = require('parameterBag');

/**
 * @constructor
 *
 * @param {object}   data     Action data
 * @param {callable} callback Action Callback
 */
function SarahActionContext(data, callback) {
    this.context = new ParameterBag();
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

/* Export class */
module.exports = SarahActionContext;
