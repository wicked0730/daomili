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
    return;
    User.insert(table,function(err,users){
        console.log(users);
    })

});
module.exports = router;
