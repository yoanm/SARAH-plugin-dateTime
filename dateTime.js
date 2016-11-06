/**
 * SARAH server plugin init function. Could be called at server startup or if plugin is reloaded
 *
 * @param {SARAH} SARAH
 */
exports.init = function(SARAH)
{
    this.logger = require('./sarahLoggerFactory')('DateTime');
    this.logger.info('initialization ...');
    var yearOnDate = true;
    if (Config) {
        // For SARAH v4
        yearOnDate = true == Config.modules.dateTime.yearOnDate;
    }
    this.dateTimePlugin = require('./dateTimeModule')(yearOnDate);
    this.logger.info(this.dateTimePlugin.getDateTimeMessage());
    this.logger.info('initialized !');
};
/**
 * SARAH server plugin dispose function. Called plugin reload
 */
exports.dispose = function(){
    this.dateTimePlugin = null;
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
    if (!Config) {
        // For SARAH v3
        context.setSARAH(SARAH);
        this.dateTimePlugin.setYearOnDate(
            true == config.modules.dateTime.yearOnDate
        );
    }
    this.dateTimePlugin.speakFromAction(data.action, helper);
};
