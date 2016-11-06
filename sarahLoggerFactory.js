/******************************************************************
 * @summary Factory to create a SARAH logger
 * @description SARAH logger will automatically add the channel 
 *  in front of the message string
 *
 * @example <caption>Multiple loggger instantiation</caption>
 * var sarahLoggerFactory = require('sarahLoggerFactory');
 * var sarahLogger1 = sarahLoggerFactory('channel1');
 * var sarahLogger2 = sarahLoggerFactory('channel2');
 *
 * @example <caption>Single loggger instantiation</caption>
 * var sarahLogger = require('sarahLoggerFactory')('channel');
 *
 * @example <caption>Helper</caption>
 *  sarahLogger.debug(message);
 *  sarahLogger.log(message);
 *  sarahLogger.info(message);
 *  sarahLogger.warn(message);
 *  sarahLogger.error(message);
 *******************************************************************/
module.exports = function (channel) {
    return new SarahLogger(channel);
};

/**
 * @constructor
 *
 * @param {string} channel
 */
function SarahLogger(channel) {
    this.channel = channel;
}
/**
 * @public
 * @see global debug function
 */
SarahLogger.prototype.debug = function (msg) {
    debug.apply(this, [this.prependChannel(msg)]);
};
/**
 * @public
 * @see global log function
 */
SarahLogger.prototype.log = function (msg) {
    log.apply(this, [this.prependChannel(msg)]);
};
/**
 * @public
 * @see global info function
 */
SarahLogger.prototype.info = function (msg) {
    info.apply(this, [this.prependChannel(msg)]);
};
/**
 * @public
 * @see global warn function
 */
SarahLogger.prototype.warn = function (msg) {
    warn.apply(this, [this.prependChannel(msg)]);
};
/**
 * @public
 * @see global error function
 */
SarahLogger.prototype.error = function (msg) {
    error.apply(this, [this.prependChannel(msg)]);
};
/**
 * @private
 *
 * @returns {string}
 */
SarahLogger.prototype.prependChannel = function(msg) {
    return '[' + this.channel + '] ' + msg;
};

/**
 * @private
 * @type {string}
 */
SarahLogger.prototype.channel = null;
