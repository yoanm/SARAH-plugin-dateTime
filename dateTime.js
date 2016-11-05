/**
 * SARAH server plugin init function. Could be called at server startup or if plugin is reloaded
 *
 * @param {SARAH} SARAH
 */
exports.init = function(SARAH)
{
    this.dateTimePlugin = new DateTimePlugin();
    info('[DateTime] initialization ...');
    info('[DateTime] : ', this.dateTimePlugin.getDateTimeMessage());
    info('[DateTime] initialized !');
};
/**
 * SARAH server plugin dispose function. Called on server shutdown
 */
exports.dispose = function(){
    this.dateTimePlugin = null;
    info('[DateTime] uninitialized !');
};
/**
 * SARAH server plugin action function. Called when SARAH client reach the server at plugin endpoint
 * {inhertedDoc}
 */
exports.action = function (data, callback, config, SARAH) {
    this.dateTimePlugin.action(data, callback, config, SARAH);
};

/***
 * DateTimePlugin Object
 */

const SARAH_VERSION_3 = 3;
const SARAH_VERSION_4 = 4;

const DATETIMEPLUGIN_ACTION_DATE = 'DATE';
const DATETIMEPLUGIN_ACTION_HOUR = 'HOUR';
const DATETIMEPLUGIN_ACTION_FULL = 'FULL';

function DateTimePlugin() {
    this.moment = require('moment');
    this.moment.locale('fr');
    this.loadSarahVersion();
}

/**
 * @public
 *
 * @param {object}   data
 * @param {callable} callback
 * @param {object}   config
 * @param {SARAH}    SARAH
 */
DateTimePlugin.prototype.action = function (data, callback, config, SARAH) {
    var message = 'Hum j\'ai raté quelque chose !';
    switch (data.action) {
        case DATETIMEPLUGIN_ACTION_DATE:
            message = this.getDateMessage();
            break;
        case DATETIMEPLUGIN_ACTION_HOUR:
            message = this.getTimeMessage();
            break;
        case DATETIMEPLUGIN_ACTION_FULL:
            message = this.getDateTimeMessage();
            break;
    }
    this.speak(message, callback, SARAH);
};

/**
 * @public
 * Will return the current time as text to speach
 *
 * @returns {string} Current time sentence
 */
DateTimePlugin.prototype.getTimeMessage = function () {
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
DateTimePlugin.prototype.getDateMessage = function () {
    var message = 'Nous sommes le ';
    message += this.moment().format("dddd, DD MMMM YYYY");
    message += '. ';
    return message;
};

/**
 * @public
 * Will return the current date and time as text to speach
 *
 * @returns {string} Current date and time sentence
 */
DateTimePlugin.prototype.getDateTimeMessage = function () {
    var message = 'Nous sommes le ';
    message += this.moment().format("dddd, DD MMMM YYYY");
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
DateTimePlugin.prototype.getShortTimeMessage = function () {
    return this.naturalLanguage(
        parseInt(this.moment().format('HH')),
        parseInt(this.moment().format('mm'))
    );
};

/**
 * @protected
 *
 * @param {string}        tts
 * @param {callable|null} callback
 * @param {SARAH|null}    SARAH
 */
DateTimePlugin.prototype.speak = function(tts, callback, SARAH) {
    info('[DateTime] says "', tts, '"');
    if (this.isV3() && SARAH) {
        SARAH.speak(tts);
    }
    if (!this.isV3() || !SARAH) {
        callback({'tts': tts});
    } else {
        callback();
    }
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
DateTimePlugin.prototype.naturalLanguage = function(hour, minute) {
    var hourMessage = hour;
    var minuteMessage = minute;
    var separator = ' heure ';
    switch (hour) {
        case 12:
            hourMessage = 'midi';
            separator = ' ';
            break;
        case 24:
            hourMessage = 'minuit';
            separator = ' ';
            break;
    }

    if (minute > 12) {
        minute -= 12;
        minuteMessage = minute;
    }

    return hourMessage + separator + minuteMessage;
};
/**
 * @private
 *
 * @return bool true if SARAH v3 else false (SARAH v4)
 */
DateTimePlugin.prototype.isV3 = function ()
{
    return SARAH_VERSION_3 == this.sarahVersion;
};

/**
 * Will determine sarah version
 *
 * @private
 */
DateTimePlugin.prototype.loadSarahVersion = function ()
{
    if (typeof Config === "undefined" )
    {
        this.sarahVersion = SARAH_VERSION_3;
    }
    else
    {
        this.sarahVersion = SARAH_VERSION_4;
    }
};

/**
 * @private
 * @type {Moment}
 */
DateTimePlugin.prototype.moment = null;
/**
 * @private
 * @type {int}
 */
DateTimePlugin.prototype.sarahVersion = SARAH_VERSION_3;
