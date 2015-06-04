var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var parm = req.body;
  console.log(parm);
  res.render('search/index', { title: '搜索结果_稻米粒' });
});

module.exports = router;
