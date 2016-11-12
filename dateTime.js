/* global Config */
/**
 * @summary Sarah endpoint for dateTime plugin
 *
 * @requires dateTimePlugin
 * @requires sarah-lib-utils/logger
 * @requires sarah-lib-utils/version
 * @requires sarah-lib-utils/actionContext
 * @requires sarah-lib-utils/actionHelper
 */
const SarahLogger = require('sarah-lib-utils/logger');
const version = require('sarah-lib-utils/version');
const SarahActionContext = require('sarah-lib-utils/actionContext');
const SarahActionHelper = require('sarah-lib-utils/actionHelper');
const DateTimePlugin = require('./lib/dateTimePlugin');

/**
 * SARAH server plugin init function. Could be called at server startup or if plugin is reloaded
 *
 * @param {SARAH} SARAH
 */
exports.init = function(SARAH) {// eslint-disable-line no-unused-vars
    this.logger = new SarahLogger('DateTime');
    this.logger.info('initialization ...');

    this.plugin = new DateTimePlugin(
        version.isV3()
            ? true
            : getYearOnDateConfig(Config)
    );
    this.logger.info(this.plugin.getDateTimeMessage());

    this.logger.info('initialized !');
};
/**
 * SARAH server plugin dispose function. Called before plugin will be reloaded
 */
exports.dispose = function() {
    this.plugin = null;
    this.logger.info('uninitialized !');
    this.logger = null;
};
/**
 * SARAH server plugin action function. Called when SARAH client reach the server at plugin endpoint
 * @param {object} data
 * @param {callable} callback
 * @param {Config} config
 * @param {SARAH} SARAH
 */
exports.action = function(data, callback, config, SARAH) {
    var context = new SarahActionContext(data, callback);
    var helper = new SarahActionHelper(context);
    if (version.isV3()) {
        context.setSARAH(SARAH);
        this.plugin.setYearOnDate(
            getYearOnDateConfig(config)
        );
    }
    this.plugin.fromAction(data.action, helper);
};

/**
 * @param {object} config
 *
 * @returns {boolean}
 */
function getYearOnDateConfig(config) {
    return config.modules.dateTime.yearOnDate === true;
}
