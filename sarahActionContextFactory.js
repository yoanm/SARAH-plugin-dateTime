module.exports = function (data, callback) {
    return new SarahActionContext(data, callback);
};

/**
 * @constructor
 *
 * @param {object}   data Action data
 * @param {callable} callback Action Callback
 */
function SarahActionContext(data, callback) {
    this.context = require('./parameterBagFactory')();
    this.context.set('data', data);
    this.context.set('callback', callback);
}
/***********
 * DATA
 ***********/
/**
 * @public
 * @returns {Object}
 */
SarahActionContext.prototype.getData = function () {
    return this.context.get('data');
};
/***********
 * CALLBACK
 ***********/
/**
 * @public
 * @returns {callable}
 */
SarahActionContext.prototype.getCallback = function () {
    return this.context.get('callback');
};
/***********
 * SARAH
 ***********/
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
    return this.context.get('SARAH');
};

/**
 * @type {ParameterBag}
 */
SarahActionContext.prototype.context = null;