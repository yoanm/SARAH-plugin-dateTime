/******************************************************************
 * @summary SARAH action helper
 * @description SarahActionHelper provide useful methods regarding action
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

const ParameterBag = require('parameterBag');
const version = require('sarahVersion');

/**
 * @constructor
 *
 * @param {SarahActionContext} actionContext
 */
function SarahActionHelper(actionContext) {
    this.config = new ParameterBag();
    this.actionContext = actionContext;
}

/**
 * @public
 *
 * @param {string} tts Text to speach
 */
SarahActionHelper.prototype.speak = function(tts) {
    var callback = this.actionContext.getCallback();
    if (!version.isV3()) {
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

/* Export class */
module.exports = SarahActionHelper;
