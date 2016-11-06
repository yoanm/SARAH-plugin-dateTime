module.exports = function (actionContext) {
    return new SarahActionHelper(actionContext);
};

var SARAH_VERSION_3 = 3;
var SARAH_VERSION_4 = 4;

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