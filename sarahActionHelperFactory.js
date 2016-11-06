/******************************************************************
 * @summary Factory to create a SARAH action helper
 * @description SarahActionHelper provide useless method regarding action
 * for module which want to run in SARAH v3 AND v4
 *
 * @requires parameterBagFactory
 * @requires sarahVersion
 *
 * @example <caption>Multiple context instantiation</caption>
 * var sarahHelperFactory = require('sarahHelperFactory');
 * var sarahHelper1 = sarahHelperFactory(actionContext);
 * var sarahHelper2 = sarahHelperFactory(actionContext);
 *
 * @example <caption>Single context instantiation</caption>
 * var sarahHelper = require('sarahHelperFactory')(actionContext);
 *
 * @example <caption>Helper</caption>
 *  sarahHelper.speak(tts);
 *
 * @example <caption>Getter</caption
 *  sarahHelper.getContext();
 *******************************************************************/
module.exports = function (actionContext) {
    return new SarahActionHelper(actionContext);
};

/**
 * @constructor
 *
 * @param {SarahActionContext} actionContext
 */
function SarahActionHelper(actionContext) {
    this.config = require('./parameterBagFactory')();
    this.version = require('./sarahVersion');
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
