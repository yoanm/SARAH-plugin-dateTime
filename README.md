# [S.A.R.A.H.](http://encausse.net/s-a-r-a-h) - DateTime plugin

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/yoanm/SARAH-plugin-datetime/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/yoanm/SARAH-plugin-datetime/?branch=master) [![Code Coverage](https://scrutinizer-ci.com/g/yoanm/SARAH-plugin-datetime/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/yoanm/SARAH-plugin-datetime/?branch=master) [![Build Status](https://scrutinizer-ci.com/g/yoanm/SARAH-plugin-datetime/badges/build.png?b=master)](https://scrutinizer-ci.com/g/yoanm/SARAH-plugin-datetime/build-status/master)

This plugin is an add-on for the framework [S.A.R.A.H.](http://encausse.net/s-a-r-a-h), an Home Automation project built     
on top of:
 * C# (Kinect) client for Voice, Gesture, Face, QRCode recognition. 
 * NodeJS (ExpressJS) server for Internet of Things communication

Allow interaction regarding date and time

## [S.A.R.A.H.](http://encausse.net/s-a-r-a-h) integration
### Download
```bash
> cd SARAH_PLUGIN_DIR
#Clone the repository with proper name
> git clone https://github.com/yoanm/SARAH-plugin-dateTime.git dateTime
```

### Install
```bash
> cd dateTime
# install dependencies
> npm install --production
```
 * (Optional) Replace all Alfred occurences in [dateTime.xml](./dateTime.xml) file with the name that you use (Sarah, jarvis, yuri, ...)
 * Edit [dateTime.prop](./dateTime.prop) file and set the right value for `yearOnDate` option.
    * true : year will be appended in date response. Example : `Nous somme le 11 janvier 2001`
    * false : date response will not contain year. Example : `Nous somme le 23 juin`

   This option can also be updated directly on Sarah web interface (see "Plugin's configuration" or "Configuration")
 * Simply reload SARAH server, plugin will be automatically loaded.

### Usage
Sarah will respond to the following sentences (replace `Alfred` with the one used) :
 * Hour (tts examples : `Il est midi 53`, `Il est 8 heure 12`)
    * `Alfred, quelle heure est il [s'il te plait ]?`
    * `Alfred, il est quelle heure [s'il te plait ]?`
 * Date (tts examples : `Nous somme le 11 janvier 2001`, `Nous somme le 23 juin`)
    * `Alfred, quel jour somme-nous [s'il te plait ]?`
    * `Alfred, quelle date somme-nous [s'il te plait ]?`
    * `Alfred, On est quel jour [s'il te plait ]?`
    * `Alfred, On est quelle date [s'il te plait ]?`

## Tests
```bash
> npm install
> npm test
```

## Coverage
```bash
> npm install
> npm run coverage
```
Then open the `coverage/index.js.html` file in a browser

## EsLint
```bash
> npm install
> npm run eslint
```

## Release History

* `1.0.0` : Initial release
