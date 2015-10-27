# dhtmlxDesktopChat  [![NPM version](https://badge.fury.io/js/dhtmlx-desktop-chat.png)](http://badge.fury.io/js/dhtmlx-node-chat) [![Build Status](https://travis-ci.org/web2solutions/dhtmlxDesktopChat.svg?branch=master)](https://travis-ci.org/web2solutions/dhtmlxDesktopChat)

Just a simple desktop chat built using DHTMLX on client and Node.js (Express + ws) && Redis on back end



[![screen1](http://i.imgur.com/2NLQCUL.png)](http://i.imgur.com/2NLQCUL.png)
[![screen2](http://i.imgur.com/xT9Vs1q.png)](http://i.imgur.com/xT9Vs1q.png)



## Installation

List of softwares that you need to have already installed:

 - Redis (running on localhost)
 - Node.js
 - Grunt

Download this repository and uncompress to a given directory, lets assume: ***/Users/YourName/apps/dhtmlxNodeChat/***

Or, use ***npm***

    npm i dhtmlx-desktop-chat


##  Command line testing

#### Step 1

On terminal, navigate to the project directory:

    $ cd /Users/YourName/apps/dhtmlxDesktopChat/

Install grunt (if you don't have it installed):

    $ npm install -g grunt-cli

Install dependencies:

    $ npm install grunt-contrib-qunit --save-dev

    $ npm install express --save

    $ npm install --save ws

    $ npm install grunt-express --save-dev

    $ npm install redis

    $ npm install passport

    $ npm install passport-local

    $ npm install lodash

    $ npm install electron-prebuilt -g

    $ npm install electron-prebuilt --save-dev


#### Step 2

Now , type on terminal:

    $ grunt test


##  Browser testing

#### Step 1

    $ grunt server

Then open the browser and reach the following address to see the tests: 

	http://localhost:4080/test/t.html

Or open the browser and reach the following address to see the application running:

	http://localhost:4080/


## Starting desktop application

    $ cd /Users/YourName/apps/dhtmlxDesktopChat/

    $ electron .

Now you are able to talk with the web instance previously opened on browser.

## Starting application with node

	 $ cd /Users/YourName/apps/dhtmlxDesktopChat/

	 $ node app.js
