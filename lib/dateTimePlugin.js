/**
 * @summary dateTime module
 *
 * @requires sarah-lib-utils/logger
 * @requires moment
 *
 * @example <caption>Instantiation</caption>
 * const DateTimePlugin = require('dateTimePlugin');
 * var plugin = new DateTimePlugin(data, callback);
 *
 * @example <caption>Setter</caption>
 *  plugin.setYearOnDate(yearOnDate);
 *
 * @example <caption>Getter</caption
 *  plugin.getYearOnDate();
 *  plugin.getTimeMessage();
 *  plugin.getDateTimeMessage();
 *  plugin.getShortTimeMessage();
 *  plugin.getShortDateMessage();
 **/

const SarahLogger = require('sarah-lib-utils/logger');
const moment = require('moment');

/**
 * @constructor
 *
 * @param {bool} yearOnDate Whether or not year must be appended
 * @param {bool} twelveHourFormat 12H time format or not
 */
function DateTimePlugin(yearOnDate, twelveHourFormat) {
    moment.locale('fr');
    this.logger = new SarahLogger('DateTimePlugin');
    this.setYearOnDate(yearOnDate === true);
    this.setTwelveHourFormat(twelveHourFormat === true);
}
/**
 * @public
 * @readOnly
 * @type {string}
 */
DateTimePlugin.ACTION_DATE = 'DATE';
/**
 * @public
 * @readOnly
 * @type {string}
 */
DateTimePlugin.ACTION_HOUR = 'HOUR';
/**
 * @public
 * @readOnly
 * @type {string}
 */
DateTimePlugin.ACTION_FULL = 'FULL';

/**
 * @public
 * @param {boolean} yearOnDate
 */
DateTimePlugin.prototype.setYearOnDate = function(yearOnDate) {
    this.yearOnDate = yearOnDate;
};

/**
 * @public
 * @param {boolean} twelveHourFormat
 */
DateTimePlugin.prototype.setTwelveHourFormat = function(twelveHourFormat) {
    this.twelveHourFormat = twelveHourFormat;
};

/**
 * @public
 * @returns {boolean}
 */
DateTimePlugin.prototype.getYearOnDate = function() {
    return this.yearOnDate === true;
};

/**
 * @public
 * @returns {boolean}
 */
DateTimePlugin.prototype.isTwelveHourFormat = function() {
    return this.twelveHourFormat === true;
};

/**
 * @public
 *
 * @param {string}            action
 * @param {SarahActionHelper} helper
 */
DateTimePlugin.prototype.fromAction = function(action, helper) {
    var message;
    switch (action) {
        case DateTimePlugin.ACTION_DATE:
            message = this.getDateMessage();
            break;
        case DateTimePlugin.ACTION_HOUR:
            message = this.getTimeMessage();
            break;
        case DateTimePlugin.ACTION_FULL:
            message = this.getDateTimeMessage();
            break;
        default:
            message = 'Hum j\'ai raté quelque chose !';
    }
    this.logger.info('says "' + message + '"');
    helper.speak(message);
};

/**
 * @public
 * Will return the current time as text to speach
 *
 * @returns {string} Current time sentence
 */
DateTimePlugin.prototype.getTimeMessage = function() {
    var message = 'Il est ';
    message += this.getShortTimeMessage();
    message += '.';

    return message;
};

/**
 * @public
 * Will return the current date as text to speach
 *
 * @returns {string} Current date sentence
 */
DateTimePlugin.prototype.getDateMessage = function() {
    var message = 'Nous sommes le ';
    message += this.getShortDateMessage();
    message += '.';

    return message;
};

/**
 * @public
 * Will return the current date and time as text to speach
 *
 * @returns {string} Current date and time sentence
 */
DateTimePlugin.prototype.getDateTimeMessage = function() {
    var message = 'Nous sommes le ';
    message += this.getShortDateMessage();
    message += ' à ';
    message += this.getShortTimeMessage();
    message += '.';

    return message;
};

/**
 * @public
 * Will return the current time as text to speach
 *
 * @returns {string} Time sentence
 */
DateTimePlugin.prototype.getShortTimeMessage = function() {
    var now = moment();
    return this.naturalLanguage(
        now.hour(),
        now.minute()
    );
};

/**
 * @public
 * Will return the current time as text to speach
 *
 * @returns {string} Date sentence
 */
DateTimePlugin.prototype.getShortDateMessage = function() {
    return moment()
        .format(
            this.getYearOnDate() === true
                ? 'dddd, DD MMMM YYYY'
                : 'dddd, DD MMMM'
        );
};

/**
 * @private
 * Will convert hour and minute on natural language
 *
 * @param {int} hour   24h format
 * @param {int} minute
 *
 * @returns {string} The time on natural language
 */
DateTimePlugin.prototype.naturalLanguage = function(hour, minute) {
    hour = parseInt(hour, 10);
    minute = parseInt(minute, 10);
    var hourMessage = hour;
    var minuteMessage = minute;
    var separator = ' heure ';

    if (hour > 12 && this.isTwelveHourFormat()) {
        hourMessage = hour - 12;
    }

    switch (hour) {// eslint-disable-line default-case
        case 12:
            hourMessage = 'midi';
            separator = ' ';
            break;
        case 24:
            hourMessage = 'minuit';
            separator = ' ';
            break;
    }

    if (minute === 0) {
        minuteMessage = '';
    }
    // eslint-enable default-case
    var message = hourMessage + separator + minuteMessage;
    return message.trim();
};

/**
 * @private
 * @type {boolean}
 */
DateTimePlugin.prototype.yearOnDate = null;
/**
 * @private
 * @type {boolean}
 */
DateTimePlugin.prototype.twelveHourFormat = null;
/**
 * @private
 * @type {SarahLogger}
 */
DateTimePlugin.prototype.logger = null;

/* Export class */
module.exports = DateTimePlugin;
