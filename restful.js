var http = require("http");
var config = require("./configs");
var logger = require('./configs/log').logger('restful');

var RestClient = function() {
};

var merge = function (jsonbject1, jsonbject2) {  
	var resultJsonObject={};  
	for(var attr in jsonbject1){  
		resultJsonObject[attr]=jsonbject1[attr];  
	}  
	for(var attr in jsonbject2){  
		resultJsonObject[attr]=jsonbject2[attr];  
	}  

	return resultJsonObject;  
};  

var request = function(options, req, res) {
	return http.request(options, function(response) {
	  response.setEncoding('utf8');
	  var data = "";
	  response.on('data', function (chunk) {
		data += chunk;
	  });
	  response.on('end', function() {
		res.status(response.statusCode);
		if (response.statusCode === 500) {
			logger.error(data);
			res.send({"status":"failed", "message": "call api failed."})
		} else if (response.statusCode === 404) {
			logger.error(data);
			res.send({"status":"failed", "message": "api not found."})
		} else {
			res.send(JSON.parse(data));
		}
	  });
	});
}

RestClient.prototype.post = function (options, req, res) {
	var postData = JSON.stringify(req.body);
	var defaultOptions = {
			  hostname: config.host,
			  //port: 8080,
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
				'Content-Length': postData.length
				}
		};
	var mergedOptions = merge(options, defaultOptions);
	var resquest = request(mergedOptions, req, res);
	
	resquest.on('error', function(e) {
		logger.error('problem with request: ' + e.message);
	});
	resquest.write(postData);
	resquest.end();
}

RestClient.prototype.get = function(url, req, res) {
	var options = {
			  hostname: config.host,
			  path: url,
			  //port: 8080,
			  method: 'GET'
		};
	var resquest = request(options, req, res);
	
	resquest.on('error', function(e) {
		logger.error('problem with request: ' + e.message);
	});
	resquest.end();
}

module.exports = RestClient;