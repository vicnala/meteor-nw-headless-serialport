# meteor-nw-headless-serialport

Meteor with node-webkit as a headless client using serialport.

I said headless but, by now, you still need an X display to run nw.js. The easiest way is to start the graphic system (currently using a Raspberry Pi 2 default display).

## What is this?

Is an approach to run a Meteor app in a client device and use hardware resources on it, like the serial port.

I like this because I can use hot code push and manage what devices are running at every time.

## What this should be?

This should be the same as Meteor do for cordova so you can write a package, and then use meteor api to manage this code only on these devices. I'm trying to run this setup in a Raspberry but for now it can be any ```x86```.

```
api.addFiles('serial-conrtroller.js', ['web.anyX86']);
```

## Install Meteor and run the app

http://www.meteor.com/install

```
git clone https://github.com/vicnala/meteor-nw-headless-serialport.git
cd meteor-nw-headless-serialport.git
meteor
```

## Install node version manager in the headless client

https://github.com/creationix/nvm

```
nvm install 0.12.3
nvm use 0.12
npm install node-pre-gyp -g
npm install nw-gyp -g

```

## Download nw.js

https://github.com/nwjs/nw.js/wiki/Downloads-of-old-versions

```
cd nwjs-v0.12.2-linux-ia32
npm install serialport
cd node_modules/serialport
node-pre-gyp clean
node-pre-gyp configure --runtime=node-webkit --target=0.12.3
node-pre-gyp build --runtime=node-webkit --target=0.12.3
cd ../..
```

## Create the nw.js manifest file

```
touch package.json
```

```
{
  "main": "http://127.0.0.1:3000",
  "node-remote": "http://127.0.0.1:3000",
  "name": "meteor-nw",
  "description": "Meteor and node-webkit",
  "version": "0.1.0",
  "keywords": [ "meteor", "node-webkit" ],
  "window": {
    "show": false
  }
}
```

*Fix serialport module not found*:

"Uncaught Error: Cannot find module './node_modules/serialport/build/serialport/v1.7.4/Release/node-webkit-v0.12.2-linux-ia32/serialport.node'"

It's only about version in path name (v0.12.3 > v0.12.2):

```
mv node_modules/serialport/build/serialport/v1.7.4/Release/node-webkit-v0.12.3-linux-ia32 node_modules/serialport/build/serialport/v1.7.4/Release/node-webkit-v0.12.2-linux-ia32
```

## Run the nw.js app

```
./nw
```

or, if you are inside a SSH session:

```
DISPLAY:0 ./nw
```
