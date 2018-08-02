var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title:'Form Validation',success:!req.session.errors,errors:req.session.errors});
 // req.session.errors = null;
});

router.post('/submit',function(req,res,next){
   //Check validity;
    req.check('email','Invalid Email Address').isEmail();
    req.check('password','Password is invalid').isLength({min:4}).equals(req.body.confirm_password);
    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.success= false;

    }else{
        req.session.success = true;
    }
    res.redirect('/');

});
module.exports = router;
