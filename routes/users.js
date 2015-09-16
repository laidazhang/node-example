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

router.get('/get/:id', function(req, res, next) {
	var url = "http://jia-tuku.suryani.cn/hybrid/user/get?userId=" + req.params.id;
    restClient.get(url, req, res);
});

module.exports = router;
