module.exports = function(yearOnDate) {
    return new DateTimeModule(yearOnDate);
};

const ACTION_DATE = 'DATE';
const ACTION_HOUR = 'HOUR';
const ACTION_FULL = 'FULL';

/**
 * @constructor
 *
 * @param {bool} yearOnDate Whether or not year must be appended
 */
function DateTimeModule(yearOnDate) {
    this.moment = require('moment');
    this.moment.locale('fr');
    this.logger = require('./sarahLoggerFactory')('DateTimeModule');
    this.config = require('./parameterBagFactory')();
    this.setYearOnDate(yearOnDate);
}

/**
 * @public
 * @param {bool} yearOnDate
 */
DateTimeModule.prototype.setYearOnDate = function (yearOnDate) {
    this.config.set('yearOnDate', yearOnDate);
};

/**
 * @public
 * @returns {boolean}
 */
DateTimeModule.prototype.getYearOnDate = function () {
    return true == this.config.get('yearOnDate');
};

/**
 * @public
 *
 * @param {string}            action
 * @param {SarahActionHelper} helper
 */
DateTimeModule.prototype.speakFromAction = function (action, helper) {
    var message = 'Hum j\'ai raté quelque chose !';
    switch (action) {
        case ACTION_DATE:
            message = this.getDateMessage();
            break;
        case ACTION_HOUR:
            message = this.getTimeMessage();
            break;
        case ACTION_FULL:
            message = this.getDateTimeMessage();
            break;
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
DateTimeModule.prototype.getTimeMessage = function () {
    var message = ' Il est ';
    message += this.getShortTimeMessage();
    message += '. ';

    return message;
};

/**
 * @public
 * Will return the current date as text to speach
 *
 * @returns {string} Current date sentence
 */
DateTimeModule.prototype.getDateMessage = function () {
    var message = 'Nous sommes le ';
    message += this.getShortDateMessage();
    message += '. ';

    return message;
};

/**
 * @public
 * Will return the current date and time as text to speach
 *
 * @returns {string} Current date and time sentence
 */
DateTimeModule.prototype.getDateTimeMessage = function () {
    var message = 'Nous sommes le ';
    message += this.getShortDateMessage();
    message += ' à ';
    message += this.getShortTimeMessage();
    message += '. ';

    return message;
};

/**
 * @public
 * Will return the current time as text to speach
 *
 * @returns {string} Time sentence
 */
DateTimeModule.prototype.getShortTimeMessage = function () {
    return this.naturalLanguage(
        this.moment().format('HH'),
        this.moment().format('mm')
    );
};

/**
 * @public
 * Will return the current time as text to speach
 *
 * @returns {string} Date sentence
 */
DateTimeModule.prototype.getShortDateMessage = function () {
    return this.moment()
        .format(
            false == this.getYearOnDate()
                ? 'dddd, DD MMMM'
                : 'dddd, DD MMMM YYYY'
        );
};

/**
 * @private
 * Will convert hour and minute on natural language
 *
 * @param {int} hour 24h format
 * @param {int} minute
 *
 * @returns {string} The time on natural language
 */
DateTimeModule.prototype.naturalLanguage = function(hour, minute) {
    hour = parseInt(hour);
    minute = parseInt(minute);
    var hourMessage = hour;
    var minuteMessage = minute;
    var separator = ' heure ';

    if (hour > 12) {
        hour -= 12;
        hourMessage = hour;
    }
    switch (hourMessage) {
        case 12:
            hourMessage = 'midi';
            separator = ' ';
            break;
        case 24:
            hourMessage = 'minuit';
            separator = ' ';
            break;
    }

    return hourMessage + separator + minuteMessage;
};

/**
 * @private
 * @type {ParameterBag}
 */
DateTimeModule.prototype.config = null;
/**
 * @private
 * @type {SarahLogger}
 */
DateTimeModule.prototype.logger = null;
/**
 * @private
 * @type {Moment}
 */
DateTimeModule.prototype.moment = null;
