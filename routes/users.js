var express = require('express');
var Users = require("./../controllers/users.js");
var router = express.Router();
var users = new Users();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/post', users.createUser);

router.get('/get/:id', users.getUser);

module.exports = router;
