/*jslint devel: true, white: true, maxerr : 1000*/

/*
 * sudo npm init
 * npm install express --save
 * npm install ws --save
 * npm install -g strongloop
 * npm install express-ws --save
 * npm install redis --save
 * npm install cfenv --save
 */



// =>>>>>> ENV
var cfenv = require( 'cfenv' );
var environment = cfenv.getAppEnv();
console.log(process.env.VCAP_APP_PORT);
console.log(process.env.VCAP_SERVICES);
console.log(environment);

var port = process.env.VCAP_APP_PORT || 4080;
//var host = (process.env.VCAP_APP_HOST || '0.0.0.0');

var credentials;
// Verifique se estamos no Bluemix ou localhost
if ( !environment.isLocal ) {
	// No Bluemix, leia as configurações de conexão da
	// variável de ambiente VCAP_SERVICES
	//var env = JSON.parse(process.env.VCAP_SERVICES);

	if( environment.services['redis-2.6'] )
	{
		credentials = environment.services['redis-2.6'][0].credentials;
	}
	else if( environment.services['user-provided'] )
	{
		credentials = environment.services['user-provided'][0].credentials;
	}

	
} else {
	credentials = {
		host: "127.0.0.1",
		port: 6379
	};
}
console.log(credentials);



// =>>>>>> ENV

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var app_name = 'dhtmlxNodeChat';
var redis = require('redis');

var subscriber = redis.createClient( credentials.port, credentials.host );
var redis_client = redis.createClient( credentials.port, credentials.host );
if (credentials.hasOwnProperty('password') ) {

	subscriber.auth(credentials.password);
	redis_client.auth(credentials.password);
}

//var users = [];
var total_users_online = 0;
var def_channel = '#random';
var users_online_list_name = 'dhtmlxNodeChat_users_online';

//var passport = require('passport');
//var Authentication = require('./authentication');

try
{
	redis_client.del(users_online_list_name, function(err, reply) {
		'use strict';
		if( err ) { throw err; }

		console.log(reply);
		console.log('The online list users was restarted');
	});
}
catch(e)
{
	console.log(e);
}


//app.use(express.cookieParser());
//app.use(express.session({ secret: 'i am not telling you' }));
//app.use(express.bodyParser());

// Add csrf support
//app.use(express.csrf({value: Authentication.csrf}));
//app.use(function(req, res, next) {
//   res.cookie('XSRF-TOKEN', req.session._csrf);
//   next();
//});

app.use(express.static(__dirname + '/public'));

//app.use( function(req, res, next) {
//console.log('middleware');
//req.testing = 'testing';
//	return next();
//} );

app.get('/', function(req, res, next) {
	'use strict';
	res.send('Hello World!');
	//console.log('get route', req.testing);
	res.end();
});

subscriber.on("message", function(channel, message) {
	'use strict';
	//message.channel = channel;
	var aWss = expressWs.getWss('/');
	aWss.clients.forEach(function(client) {
		client.send(message);
	});
});



app.ws('/', function(ws, req) {
	'use strict';
	var client_id = Math.random(),
		person_entity = null,
		publisher = redis.createClient( credentials.port, credentials.host ),
		mstring = null;

	if (credentials.hasOwnProperty('password') ) {
		publisher.auth(credentials.password);
	}

	subscriber.subscribe(def_channel);

	ws.on('message', function(envelope) {
		envelope = JSON.parse(envelope);
		var msg = JSON.parse(envelope.msg);
		msg.type = msg.type || 'message'; // disconnect, message, new_user
		msg.channel = msg.channel || def_channel; // disconnect, message, new_user

		msg.time = 10000000;
		msg.address = '';
		msg.client_id = client_id;

		if (msg.type == "new_username") 
		{
			if (msg.person) {
				msg.person.client_id = client_id;
				person_entity = msg.person;

				mstring = JSON.stringify(person_entity);

				redis_client.rpush([users_online_list_name, mstring], function(err, reply) {
					// reply returns total users online
					//console.log(reply);
					total_users_online = reply;
					redis_client.lrange(users_online_list_name, 0, -1, function(err, reply) {
						var users = [], index;
						for (index = 0; index < reply.length; index++) {
							var user = JSON.parse(reply[index]);
							users.push(user);
						}
						msg.users = users;
						console.log('client id ' + client_id + ' is identified as ' + person_entity.nick );
						publisher.publish(msg.channel, JSON.stringify(msg));
					});

				});
			}
		} 
		else if (msg.type == "disconnect") 
		{
			redis_client.lrange(users_online_list_name, 0, -1, function(err, reply) {
				var users = [], index;
				for (index = 0; index < reply.length; index++) {
						var user = JSON.parse(reply[index]);
						users.push(user);
				}
				users.forEach(function(userObj, index, array) {
					if (userObj.client_id == client_id) {
						//users.splice(index, 1);

						mstring = JSON.stringify(userObj);
						var msg = {};
						msg.type = 'disconnect'; // disconnect, message, new_user
						msg.client_id = client_id;
						//console.log('lrem ', mstring);

						redis_client.lrem(users_online_list_name, 0, mstring, function(err, reply) {
							if( reply == 1)
							{
								redis_client.lrange(users_online_list_name, 0, -1, function(err, reply) {
									console.log('remaining online users');
									console.log(reply);
								});
								publisher.publish(msg.channel, JSON.stringify(msg));
							}
						});	
					}
				});
			});
		} else {
			publisher.publish(msg.channel, JSON.stringify(msg));
		}
	});

	ws.on('close', function() {
		console.log('client id ' + client_id + ' is disconnected ');
	});

	console.log('client id ' + client_id + ' is connected ');
});


app.all('*', function(req, res) { 
  res.redirect('/404.html'); 
});


var server = app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log(app_name + ' is listening at http://%s:%s', host, port);
});

module.exports = app;