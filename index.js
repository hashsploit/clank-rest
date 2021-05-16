"use strict";
const chalk = require("chalk");
const logger = require("./clank-rest/logger.js");
const server = require("./clank-rest/rest_server.js");
const rpc = require("./clank-rest/rpc_client.js");

global.name = "clank-rest";
global.version = "0.1.0";

require('./clank-rest/utils.js')();

let logo = [
	"_|_|_|  _|          _|_|    _|      _|  _|    _|",
	"_|      _|        _|    _|  _|_|    _|  _|  _|",
	"_|      _|        _|_|_|_|  _|  _|  _|  _|_|",
	"_|      _|        _|    _|  _|    _|_|  _|  _|",
	"_|_|_|  _|_|_|_|  _|    _|  _|      _|  _|    _|  REST API Bridge ~ v{0}".format(global.version)
];

console.log(chalk["cyan"].bold(logo.join("\n")) + "\n");
global.logger = logger;

try {
	global.config = require("./config.json");
} catch (err) {
	console.error("Invalid config.json file or does not exist: {0}".format(err));
	process.exit(-1);
}

logger.setLogLevel(global.config.log_level);

logger.log("info", "Starting {0} v{1} ...".format(global.name, global.version));

server.start(global.config.host, global.config.port);
