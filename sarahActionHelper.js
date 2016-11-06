/******************************************************************
 * @summary SARAH action helper
 * @description SarahActionHelper provide useful method regarding action
 * for module which want to run in SARAH v3 AND v4
 *
 * @requires parameterBag
 * @requires sarahVersion
 *
 * @example <caption>Instantiation</caption>
 * const SarahHelper = require('sarahHelper');
 * var helper = new SarahHelper(<SarahActionContext> actionContext);
 *
 * @example <caption>Helper</caption>
 *  helper.speak(tts);
 *
 * @example <caption>Getter</caption
 *  helper.getContext();
 *******************************************************************/

/**
 * @constructor
 *
 * @param {SarahActionContext} actionContext
 */
function SarahActionHelper(actionContext) {
    const ParameterBag = require('parameterBag');
    this.config = new ParameterBag();
    this.version = require('sarahVersion');
    this.actionContext = actionContext;
}

/**
 * @public
 *
 * @param {string} tts Text to speach
 */
SarahActionHelper.prototype.speak = function(tts) {
    var callback = this.actionContext.getCallback();
    if (!this.version.isV3()) {
        callback({'tts': tts});
    } else {
        this.actionContext
            .getSARAH()
            .speak(tts);
        callback();
    }
};

/**
 * @public
 *
 * @returns {ParameterBag}
 */
SarahActionHelper.prototype.getContext = function () {
    return this.actionContext;
};

/**
 * @private
 * @type {ParameterBag}
 */
SarahActionHelper.prototype.config = null;
/**
 * @private
 * @type {SarahActionContext}
 */
SarahActionHelper.prototype.actionContext = null;
/**
 * @private
 * @type {SarahVersion}
 */
SarahActionHelper.prototype.version = null;

/* Export class */
module.exports = SarahActionHelper;
