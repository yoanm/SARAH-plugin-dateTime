/**
 * @summary Sarah endpoint for dateTime plugin
 *
 * @requires dateTimeModule
 * @requires sarahLogger
 * @requires sarahActionContextFactory
 * @requires sarahActionHelperFactory
 * @requires sarahVersion
 */

/**
 * SARAH server plugin init function. Could be called at server startup or if plugin is reloaded
 *
 * @param {SARAH} SARAH
 */
exports.init = function(SARAH)
{
    this.version = require('sarahVersion');
    const SarahLogger = require('sarahLogger');
    this.logger = new SarahLogger('DateTime');
    this.logger.info('initialization ...');
    var yearOnDate = true;
    if (this.version.isV4()) {
        // For SARAH v4
        yearOnDate = true == Config.modules.dateTime.yearOnDate;
    }
    this.dateTimeModule = require('./dateTimeModule')(yearOnDate);
    this.logger.info(this.dateTimeModule.getDateTimeMessage());
    this.logger.info('initialized !');
};
/**
 * SARAH server plugin dispose function. Called before plugin will be reloaded
 */
exports.dispose = function(){
    this.dateTimeModule = null;
    this.logger.info('uninitialized !');
    this.logger = null;
};
/**
 * SARAH server plugin action function. Called when SARAH client reach the server at plugin endpoint
 * {@inheretedDoc}
 */
exports.action = function (data, callback, config, SARAH) {
    var context = require('./sarahActionContextFactory')(data, callback);
    var helper = require('./sarahActionHelperFactory')(context);
    if (this.version.isV3()) {
        // For SARAH v3
        context.setSARAH(SARAH);
        this.dateTimeModule.setYearOnDate(
            true == config.modules.dateTime.yearOnDate
        );
    }
    this.dateTimeModule.speakFromAction(data.action, helper);
};