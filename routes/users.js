var express = require('express');
var http = require("http");
var RestClient = require("./../ajax.js");
var router = express.Router();
var restClient = new RestClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/post', function (req, res) {
	var options = {path: '/hybrid/design-case/find'};
	restClient.post(options, req, res);
});

router.get('/get', function(req, res, next) {
  restClient.get("http://jia-tuku.suryani.cn/hybrid/user/get?userId=6183863", req, res);
});

module.exports = router;
