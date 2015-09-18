var RestClient = require("./../restful.js");
var restClient = new RestClient();

var Users = function() {};

Users.prototype.getUser = function(req, res, next) {
	var url = "/hybrid/user/get?userId=" + req.params.id;
    restClient.get(url, req, res);
}

Users.prototype.createUser = function (req, res) {
	var options = {path: '/hybrid/design-case/find'};
	restClient.post(options, req, res);
};

module.exports = Users;