var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url ='mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title:'Form Validation',success:!req.session.errors,errors:req.session.errors});
 // req.session.errors = null;
});
router.get('/get-data', function(req, res, next) {
    var resultArray = [];
    mongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('user-data').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('index', {items: resultArray});
        });
    });
});
router.post('/insert',function(req,res,next){
    var item = {
      title: req.body.title,
      content:req.body.content,
      author: req.body.author
    };
    mongoClient.connect(url,function(err,db){
        assert.equal(null,err);
        db.collection('user-data').insertOne(item,function(err,result){
           assert.equal(null,err);
           console.log('Item Updated');
           db.close();
        });
    });
});
router.post('/delete',function(req,res,next){
    var id = req.body.id;
    mongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('user-data').updateOne({"_id":objectId(id)}, function(err, result) {
            assert.equal(null, err);
            console.log('Item Deleted');
            db.close();
        });
    });

    res.redirect('/');
});

router.post('/update', function(req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
    var id = req.body.id;

    mongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('user-data').updateOne({"_id":objectId(id)},{$set:item} ,function(err, result) {
            assert.equal(null, err);
            console.log('Item Updated');
            db.close();
        });
    });

    res.redirect('/');
});

module.exports = router;
