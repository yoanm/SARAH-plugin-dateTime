# [S.A.R.A.H.](http://encausse.net/s-a-r-a-h) - DateTime plugin

This plugin is an add-on for the framework [S.A.R.A.H.](http://encausse.net/s-a-r-a-h), an Home Automation project built 
on top of:
* C# (Kinect) client for Voice, Gesture, Face, QRCode recognition. 
* NodeJS (ExpressJS) server for Internet of Things communication

## License

```
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2012 S.A.R.A.H. <sarah.project@encausse.net>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
```

```
 This program is free software. It comes without any warranty, to
 the extent permitted by applicable law. You can redistribute it
 and/or modify it under the terms of the Do What The Fuck You Want
 To Public License, Version 2, as published by S.A.R.A.H. See
 http://www.wtfpl.net/ for more details.
```


## Description

A plugin to manage date and time


## Quick Start
### Download
Clone or download the plugin from github into SARAH plugin directory :
```bash
#Go to SARAH plugin directory
> cd plugins
#Clone the repository with proper name
> git clone https://github.com/yoanm/SARAH-plugin-dateTime.git dateTime
Cloning into 'dateTime'...
Checking connectivity... done.
#Go to dateTime plugin directory
> cd dateTime
```

### Install
 1. (Optional) Replace all `Alfred` occurences in [`dateTime.xml`](./dateTime.xml) file with the name that you use (Sarah, jarvis, yuri, ...)
 2. Simply reload SARAH server, plugin will be automatically loaded.

### How to use

#### Time
Say one the following sentences (replace `Alfred` with the one used) to have time : 
```
Alfred, quelle heure est il ?
Alfred, il est quelle heure ?
```

#### Date
Say one the following sentences (replace `Alfred` with the one used) to have date : 
```
Alfred, quel jour sommes-nous ?
Alfred, on est quel jour ?
Alfred, quelle date sommes-nous ?
Alfred, on est quelle date ?
```

## Todo
 - Use word instead of numbers for instance for 12h00
 - Internationalization
 - Event emitter ?
