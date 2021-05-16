var logger = require("./logger.js");
var express = require("express");
var app = express();
var fs = require("fs");

function start(host, port) {

	// GET root
	app.get("/", (req, res) => {
		setHeaders(res);

		let rpc_connected = false;
		let bridge_status = false;

		let services = {
			"rpc_connected": rpc_connected,
		};

		let failed_services = getFailedServicesArray(services);

		const info = {
			"name": global.name,
			"version": global.version,
			"description": "A REST API web server for Clank",
			"source": "https://github.com/hashsploit/clank-rest",
			"status": failed_services.length == 0 ? "OK" : "ERROR",
			"errors": failed_services,
			"endpoints": {
				"/": {
					"GET": {
						"query": null,
						"description": "Basic information on endpoints and the clank-rest bridge server."
					},
					"PUT": null,
					"POST": null,
					"DELETE": null
				},
				"/players": {
					"GET": {
						"query": null,
						"description": "Returns all players currently online."
					}
				}
			}
		};
		return res.send(info);
	});

	app.get("/players", (req, res) => {
		setHeaders(res);
		var player_list = {};
		return res.send(player_list);
	});




	// Handle 404
	app.use(function(req, res) {
		setHeaders(res);
		return res.status(404).send({"error": "404: Resource Not Found"});
	});

	// Handle 500
	app.use(function(error, req, res, next) {
		setHeaders(res);
		return res.status(500).send({"error": "500: Internal Server Error"});
	});

	var server = app.listen(port, host, function() {
		var host = server.address().address
		var port = server.address().port
		logger.log("info", "HTTP server listening on http://{0}:{1}".format(host, port))
	});

}

function getFailedServicesArray(services) {
	var msg = {};

	for (var key in services) {
		var value = services[key];
		if (value != null) {
			msg[key] = value;
		}
	}

	return msg;
}

function setHeaders(res) {
	res.setHeader("X-Powered-By", "https://github.com/hashsploit/clank-rest");
	res.setHeader("X-Bridge", "{0} v{1}".format(global.name, global.version));
}

/*
app.get('/:id', function (req, res) {
	// First read existing users.
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
		var users = JSON.parse( data );
		var user = users["user" + req.params.id]
		console.log(user);
		res.end(JSON.stringify(user));
	});
});

app.get('/', (req, res) => {
	return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
	return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
	return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
	return res.send('Received a DELETE HTTP method');
});

app.get('/users', (req, res) => {
	return res.send('GET HTTP method on user resource');
});

app.post('/users', (req, res) => {
	return res.send('POST HTTP method on user resource');
});

app.put('/users', (req, res) => {
	return res.send('PUT HTTP method on user resource');
});

app.delete('/users', (req, res) => {
	return res.send('DELETE HTTP method on user resource');
});
*/

module.exports.start = start;
