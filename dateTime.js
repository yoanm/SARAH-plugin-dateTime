exports.init = function(SARAH)
{
	this.dateTimePlugin = new DateTimePlugin();
	info('[DateTime] initialization ...');
	info('[DateTime] : ', this.dateTimePlugin.getDateTimeMessage());
	info('[DateTime] initialized !');
}
exports.dispose = function(){
	this.dateTimePlugin = null;
	info('[DateTime] uninitialized !');
}
exports.action = function(data, callback, config, SARAH)
{
	//var config = config.modules.time;
	var command = data.command
	var message = 'Hum j\'ai raté quelque chose !';
	switch (command) {
		case 'DATE':
			message = this.dateTimePlugin.getDateMessage();
			break;
		case 'HOUR':
			message = this.dateTimePlugin.getTimeMessage();
			break;
		case 'FULL':
			message = this.dateTimePlugin.getDateTimeMessage();
			break;
	}
    info('[DateTime] : ', message);
	callback({'tts': message});
};

function DateTimePlugin() {
	this.moment = require('moment');
	this.moment.locale('fr');
}
DateTimePlugin.prototype.getTimeMessage = function () {
	var message = ' Il est : ';
	message += this.moment().format("HH [heure] mm");
	message += '. ';
	return message;
};
DateTimePlugin.prototype.getDateMessage = function () {
	var message = 'Nous sommes le ';
	message += this.moment().format("dddd, DD MMMM YYYY");
	message += '. ';
	return message;
};

DateTimePlugin.prototype.getDateTimeMessage = function () {
	var message = 'Nous sommes le ';
	message += this.moment().format("dddd, DD MMMM YYYY");
	message += ' à ';
	message += this.moment().format("HH [heure] mm");
	message += '. ';
	return message;
};
