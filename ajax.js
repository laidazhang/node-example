var http = require("http");

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

RestClient.prototype.post = function (options, req, res) {
	var postData = JSON.stringify(req.body);
	var defaultOptions = {
			  hostname: 'jia-tuku.suryani.cn',
			  //port: 8080,
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
				'Content-Length': postData.length
				}
		};
	console.log(options);	
	var requestOptions = merge(options, defaultOptions);
		console.log(postData);
		
	var resquest = http.request(requestOptions, function(response) {
	  console.log('STATUS: ' + response.statusCode);
	  response.setEncoding('utf8');
	  var data = "";
	  response.on('data', function (chunk) {
		data += chunk;
	  });
	  response.on('end', function() {
		res.send(JSON.parse(data));
	  })
	});
	
	resquest.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
	resquest.write(postData);
	resquest.end();
}

RestClient.prototype.get = function(url, req, res) {
	http.get(url, function (response) { 
		var data = "";
		response.on("data", function (chunk) {
		data += chunk;
		}); 

		response.on("end", function (err) {
			res.send(JSON.parse(data));
		}); 
	}); 
}

module.exports = RestClient;