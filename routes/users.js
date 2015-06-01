var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource1');
});

//注册
router.all('/registered', function(req, res, next) {

    var User = DB.get("User");
    var table = req.body;
    table.SEX = table.sex;

    User.insert(table,function(err,users){
        res.json(users);
    })

});
//手机号码验证
router.post('/mobile', function(req, res, next) {

    var User = DB.get("User");
    var table = req.body;
    var mobile = table.mobile;
    var sql = "select id from DML_USER where mobile = '"+mobile+"'";

    User.countBySql(sql,function(err,count){
        res.json(count);
    })

});
module.exports = router;
