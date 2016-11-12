/* globals describe, it, beforeEach */
const expect = require('chai').expect;
const sinon = require('sinon');
const SarahLogger = require('sarah-lib-utils/logger');
var Moment = require('moment');
var proxyquire = require('proxyquire').noPreserveCache();

var DateTimePlugin;
var LoggerClass;
var MomentClass;
var module;
var logger;
var moment;

var globalBeforeEach = function() {
    LoggerClass = sinon.stub();
    MomentClass = sinon.stub();
    moment = sinon.createStubInstance(Moment);
    logger = sinon.createStubInstance(SarahLogger);
    LoggerClass.returns(logger);
    MomentClass.returns(moment);
    DateTimePlugin = proxyquire(
        '../../lib/dateTimePlugin',
        {
            'sarah-lib-utils/logger': LoggerClass,
            'moment': MomentClass
        }
    );
    module = new DateTimePlugin();
};
describe('sarah-plugin-datetime/dateTimePlugin', function() {
    beforeEach(globalBeforeEach);

    it('is loadable', function() {
        expect(LoggerClass.calledWithNew()).to.equal(true);
    });

    it('has a fallback on yearOnDate = false', function() {
        expect(module.getYearOnDate()).to.equal(false, 'yearOnDate = false');
    });

    it('has setter for yearOnDate', function() {
        var yearOfDate = true;
        module = new DateTimePlugin(yearOfDate);

        expect(module.getYearOnDate()).to.equal(yearOfDate, 'initial value');
        yearOfDate = false;
        module.setYearOnDate(yearOfDate);
        expect(module.getYearOnDate()).to.equal(yearOfDate, 'after setter');
    });

    it('return date and time in long format', function() {
        var hour = 8;
        var minute = 34;
        var date = 'myDate';
        var expectedMessage = getExpectedGetDateTimeMessage(
            hour,
            minute,
            date
        );

        var message = module.getDateTimeMessage();

        expect(message).to.equal(expectedMessage);
    });
});
describe('sarah-plugin-datetime/dateTimePlugin - time', function() {
    beforeEach(globalBeforeEach);

    it('return time in short format', function() {
        var hour = 8;
        var minute = 34;
        var expectedTime = getExpectedGetShortTimeMessage(hour, minute);

        var time = module.getShortTimeMessage();

        expect(time).to.equal(expectedTime);

        verifyGetShortTimeMessage();
    });

    it('speak natural language', function() {
        var separator = ' heure ';
        var list = {
            '> 12h ==> -12': {
                hour: 14,
                minute: 0,
                expected: '2' + separator + '0'
            },
            '12h ==> midi': {
                hour: 12,
                minute: 34,
                expected: 'midi 34'
            },
            '24h ==> minuit': {
                hour: 24,
                minute: 34,
                expected: 'minuit 34'
            }
        };

        var data;
        for (var caseTitle in list) {
            if ({}.hasOwnProperty.call(list, caseTitle)) {
                data = list[caseTitle];
                expect(module.naturalLanguage(data.hour, data.minute)).to.equal(data.expected, caseTitle);
            }
        }
    });

    it('return time in long format', function() {
        var hour = 8;
        var minute = 34;
        var expectedMessage = getExpectedGetTimeMessage(hour, minute);

        var message = module.getTimeMessage();

        expect(message).to.equal(expectedMessage);
    });
});
describe('sarah-plugin-datetime/dateTimePlugin - date', function() {
    beforeEach(globalBeforeEach);

    it('return date in short format with year if yearOnDate = true', function() {
        var expectedDate = getExpectedGetShortDateMessage('myDate');
        module.setYearOnDate(true);

        var date = module.getShortDateMessage();

        expect(date).to.equal(expectedDate);
        verifyGetShortDateMessage('dddd, DD MMMM YYYY');
    });

    it('return date in short format without year if yearOnDate = false', function() {
        var expectedDate = getExpectedGetShortDateMessage('myDate');
        module.setYearOnDate(false);

        var date = module.getShortDateMessage();

        expect(date).to.equal(expectedDate);
        verifyGetShortDateMessage('dddd, DD MMMM');
    });

    it('return date in long format', function() {
        var expectedDate = 'myDate';
        var expectedMessage = getExpectedGetDateMessage(expectedDate);

        var message = module.getDateMessage();

        expect(message).to.equal(expectedMessage);
    });
});
describe('sarah-plugin-datetime/dateTimePlugin - action', function() {
    beforeEach(globalBeforeEach);

    it('say time', function() {
        var hour = 8;
        var minute = 34;
        var helperMock = {
            speak: sinon.spy()
        };
        var expectedMessage = getExpectedGetTimeMessage(hour, minute);

        module.fromAction(DateTimePlugin.ACTION_HOUR, helperMock);

        expect(helperMock.speak.calledWith(expectedMessage)).to.equal(true);
        expect(logger.info.calledWith('says "' + expectedMessage + '"')).to.equal(true);
    });

    it('say date', function() {
        var expectedDate = 'myDate';
        var helperMock = {
            speak: sinon.spy()
        };
        var expectedMessage = getExpectedGetDateMessage(expectedDate);

        module.fromAction(DateTimePlugin.ACTION_DATE, helperMock);

        expect(helperMock.speak.calledWith(expectedMessage)).to.equal(true);
        expect(logger.info.calledWith('says "' + expectedMessage + '"')).to.equal(true);
    });

    it('say date and time', function() {
        var expectedDate = 'myDate';
        var hour = 8;
        var minute = 34;
        var helperMock = {
            speak: sinon.spy()
        };
        var expectedMessage = getExpectedGetDateTimeMessage(
            hour,
            minute,
            expectedDate
        );

        module.fromAction(DateTimePlugin.ACTION_FULL, helperMock);

        expect(helperMock.speak.calledWith(expectedMessage)).to.equal(true);
        expect(logger.info.calledWith('says "' + expectedMessage + '"')).to.equal(true);
    });

    it('have dummy response', function() {
        var helperMock = {
            speak: sinon.spy()
        };
        var expectedMessage = 'Hum j\'ai raté quelque chose !';

        module.fromAction('plop', helperMock);

        expect(helperMock.speak.calledWith(expectedMessage)).to.equal(true);
        expect(logger.info.calledWith('says "' + expectedMessage + '"')).to.equal(true);
    });
});
/**
 * @param {int} hour
 * @param {int} minute
 *
 * @returns {string}
 */
function getExpectedNaturalLanguage(hour, minute) {
    hour = parseInt(hour, 10);
    minute = parseInt(minute, 10);
    var hourMessage = hour;
    var minuteMessage = minute;
    var separator = ' heure ';

    if (hour > 12) {
        hour -= 12;
        hourMessage = hour;
    }
    switch (hourMessage) {// eslint-disable-line default-case
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
}
/**
 * @param {int} hour
 * @param {int} minute
 *
 * @returns {string}
 */
function getExpectedGetShortTimeMessage(hour, minute) {
    moment.hour = sinon.stub();
    moment.minute = sinon.stub();

    moment.hour.returns(hour);
    moment.minute.returns(minute);

    return getExpectedNaturalLanguage(hour, minute);
}
/**
 * @param {string} dateNow
 *
 * @returns {string}
 */
function getExpectedGetShortDateMessage(dateNow) {
    moment.format = sinon.stub();
    moment.format.returns(dateNow);

    return dateNow;
}
/**
 * @param {int} hour
 * @param {int} minute
 *
 * @returns {string}
 */
function getExpectedGetTimeMessage(hour, minute) {
    return ' Il est '
        + getExpectedGetShortTimeMessage(hour, minute)
        + '. ';
}
/**
 * @param {string} dateNow
 *
 * @returns  {string}
 */
function getExpectedGetDateMessage(dateNow) {
    return 'Nous sommes le '
        + getExpectedGetShortDateMessage(dateNow)
        + '. ';
}
/**
 * @param {int} hour
 * @param {int} minute
 * @param {string} date
 *
 * @returns {string}
 */
function getExpectedGetDateTimeMessage(hour, minute, date) {
    var expectedMessage = 'Nous sommes le ';
    expectedMessage += getExpectedGetShortDateMessage(date);
    expectedMessage += ' à ';
    expectedMessage += getExpectedGetShortTimeMessage(hour, minute);
    expectedMessage += '. ';
    return expectedMessage;
}
function verifyGetShortTimeMessage() { // eslint-disable-line require-jsdoc
    expect(moment.hour.calledOnce).to.equal(true);
    expect(moment.minute.calledOnce).to.equal(true);
}
/**
 *
 * @param {string|null} expectedDateFormat
 */
function verifyGetShortDateMessage(expectedDateFormat) {
    if (typeof expectedDateFormat === 'string') {
        expect(moment.format.calledWithExactly(expectedDateFormat)).to.equal(true);
    }
    expect(moment.format.calledOnce).to.equal(true);
}
