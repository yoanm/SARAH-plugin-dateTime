/* globals describe, it, beforeEach, global, afterEach */
const expect = require('chai').expect;
const sinon = require('sinon');
const SarahActionContext = require('sarah-lib-utils/actionContext');
const SarahActionHelper = require('sarah-lib-utils/actionHelper');
const SarahLogger = require('sarah-lib-utils/logger');
const SarahVersion = require('sarah-lib-utils/version');
var DateTimePlugin = require('../lib/dateTimePlugin');
var proxyquire = require('proxyquire').noPreserveCache();

var SarahLoggerClassMock;
var SarahActionContextClassMock;
var SarahActionHelperClassMock;
var DateTimePluginClassMock;

var logger;
var sarahActionContext;
var sarahActionHelper;
var version = sinon.stub(SarahVersion);
var dateTimePlugin;
var dateTime;

var globalBeforeEach = function() {
    DateTimePluginClassMock = sinon.stub();
    SarahLoggerClassMock = sinon.stub();
    SarahActionContextClassMock = sinon.stub();
    SarahActionHelperClassMock = sinon.stub();

    dateTimePlugin = sinon.createStubInstance(DateTimePlugin);
    DateTimePluginClassMock.returns(dateTimePlugin);
    logger = sinon.createStubInstance(SarahLogger);
    SarahLoggerClassMock.returns(logger);
    sarahActionContext = sinon.createStubInstance(SarahActionContext);
    SarahActionContextClassMock.returns(sarahActionContext);
    sarahActionHelper = sinon.createStubInstance(SarahActionHelper);
    SarahActionHelperClassMock.returns(sarahActionHelper);

    dateTime = proxyquire(
        '../dateTime',
        {
            'sarah-lib-utils/logger': SarahLoggerClassMock,
            'sarah-lib-utils/actionContext': SarahActionContextClassMock,
            'sarah-lib-utils/actionHelper': SarahActionHelperClassMock,
            'sarah-lib-utils/version': version,
            './lib/dateTimePlugin': DateTimePluginClassMock
        }
    );
};
describe('sarah-plugin-datetime', function() {
    beforeEach(globalBeforeEach);

    it('has init function - v3', function() {
        version.isV3.returns(true);
        dateTime.init();
        expect(SarahLoggerClassMock.calledWithNew()).to.equal(true);
        expect(logger.info.calledWithExactly('initialization ...')).to.equal(true);
        expect(DateTimePluginClassMock.calledWithNew()).to.equal(true);
        expect(DateTimePluginClassMock.calledWithExactly(false, false)).to.equal(true);
        expect(logger.info.calledWithExactly('initialized !')).to.equal(true);
    });
    it('has init function - v4', function() {
        global.Config = {
            modules: {
                dateTime: {
                    yearOnDate: true,
                    twelveHourFormat: true
                }
            }
        };
        version.isV4.returns(true);
        dateTime.init();
        expect(SarahLoggerClassMock.calledWithNew()).to.equal(true);
        expect(logger.info.calledWithExactly('initialization ...')).to.equal(true);
        expect(DateTimePluginClassMock.calledWithNew()).to.equal(true);
        expect(DateTimePluginClassMock.calledWithExactly(true, true)).to.equal(true);
        expect(logger.info.calledWithExactly('initialized !')).to.equal(true);
    });

    it('has dispose function', function() {
        dateTime.logger = logger;

        dateTime.dispose();

        expect(logger.info.calledWithExactly('uninitialized !')).to.equal(true);
        expect(dateTime.logger).to.equal(null);
        expect(dateTime.plugin).to.equal(null);
    });

    it('has action function - v3', function() {
        var data = {
            action: DateTimePlugin.ACTION_HOUR
        };
        var callback = sinon.stub();
        var config = {
            modules: {
                dateTime: {
                    yearOnDate: false
                }
            }
        };
        var sarah = {sarah: 'sarah'};
        dateTime.logger = logger;
        dateTime.plugin = dateTimePlugin;

        version.isV3.returns(true);

        dateTime.action(data, callback, config, sarah);

        expect(dateTimePlugin.fromAction.calledWithExactly(data.action, sarahActionHelper)).to.equal(true);
    });

    it('has action function - v4', function() {
        var data = {
            action: DateTimePlugin.ACTION_HOUR
        };
        var callback = sinon.stub();
        var config = {config: 'config'};
        var sarah = {sarah: 'sarah'};
        dateTime.logger = logger;
        dateTime.plugin = dateTimePlugin;

        version.isV3.returns(false);

        dateTime.action(data, callback, config, sarah);

        expect(dateTimePlugin.fromAction.calledWithExactly(data.action, sarahActionHelper)).to.equal(true);
    });

    afterEach(function() {
        delete global.Config;
    });
});
