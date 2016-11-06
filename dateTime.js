/**
 * @summary Sarah endpoint for dateTime plugin
 *
 * @requires dateTimeModule
 * @requires sarahLogger
 * @requires sarahActionContext
 * @requires sarahActionHelper
 * @requires sarahVersion
 */

const SarahLogger = require('sarahLogger');
const SarahActionContext = require('sarahActionContext');
const SarahActionHelper = require('sarahActionHelper');
const DateTimeModule = require('dateTimeModule');
const version = require('sarahVersion');

/**
 * SARAH server plugin init function. Could be called at server startup or if plugin is reloaded
 *
 * @param {SARAH} SARAH
 */
exports.init = function(SARAH)
{
    this.logger = new SarahLogger('DateTime');
    this.logger.info('initialization ...');

    this.module = new DateTimeModule(
        version.isV4()
            ? getYearOnDateConfig(Config)
            : true
    );
    this.logger.info(this.module.getDateTimeMessage());

    this.logger.info('initialized !');
};
/**
 * SARAH server plugin dispose function. Called before plugin will be reloaded
 */
exports.dispose = function(){
    this.module = null;
    this.logger.info('uninitialized !');
    this.logger = null;
};
/**
 * SARAH server plugin action function. Called when SARAH client reach the server at plugin endpoint
 * {@inheretedDoc}
 */
exports.action = function (data, callback, config, SARAH) {
    var context = new SarahActionContext(data, callback);
    var helper = new SarahActionHelper(context);
    if (version.isV3()) {
        context.setSARAH(SARAH);
        this.module.setYearOnDate(
            getYearOnDateConfig(config)
        );
    }
    this.module.fromAction(data.action, helper);
};

/**
 * @param {object} config
 *
 * @returns {boolean}
 */
function getYearOnDateConfig(config) {
    return true == config.modules.dateTime.yearOnDate;
}