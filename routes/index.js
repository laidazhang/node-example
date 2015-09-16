var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '<h1>welcome</h1>'
                          ,users:[{username: 'kimi lai'}] 
            });
});

module.exports = router;