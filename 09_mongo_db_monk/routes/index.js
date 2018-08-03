var express = require('express');
var router = express.Router();
var database =require('monk')('localhost:27017/test');
var userData = database.get('user-data');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title:'Form Validation',success:!req.session.errors,errors:req.session.errors});
 // req.session.errors = null;
});
router.get('/get-data', function(req, res, next) {
    var data = userData.find({});
    console.log(data);
    data.on('success',function(docs){
       res.render('index',{items:docs});
    });
});
router.post('/insert',function(req,res,next){

    var item = {
        title: req.body.title,
        content:req.body.content,
        author: req.body.author
    };
    userData.insert(item);
    res.redirect('/');

});
router.post('/delete',function(req,res,next){
    var id = req.body.id;
    userData.removeById(id);

});

router.post('/update', function(req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
    var id = req.body.id;
    userData.updateById(id,item);
    res.redirect('/');
});

module.exports = router;
