module.exports = function (channel) {
    return new SarahLogger(channel);
};

/**
 * Simple wrapper to have a channel in log entries
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
