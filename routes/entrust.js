var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');//日期格式化

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource1');
});

//委托登记
router.all('/entrust', function(req, res, next) {

    var Entrust = DB.get("Entrust");
    var table = req.body;

	var now = new Date();
	table.CREATEDATE = now;

    Entrust.insert(table,function(err,entrusts){
        res.json(entrusts);
    })
});

module.exports = router;
