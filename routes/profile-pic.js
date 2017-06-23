var express=require('express');
var router=express.Router();
var schema=require('../controllers/admin/schema');
var multer  = require('multer');
//var path=require('path');
var file_name;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    file_name=Date.now() + file.originalname;
    cb(null, file_name );
  }

})

//schema

var profileDp=schema.ProfileImage;
var Employee=schema.NewEmployee;

var upload = multer({ storage: storage,
  fileFilter: function (req, file, callback) {
          if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ||  file.mimetype === 'image/jpeg') {
              callback(null, true);

          }else{

            return callback(new Error('Only upload image Not other file'));

          }


  }
}).single('profile-pic');

router.addImage=function(image,callback){
    profileDp.create(image,callback);
};

router.getEmp_DP=function(id,callback){
  profileDp.findOne(id,callback);
};

router.post('/profile-pic',function(req,res){
upload(req,res,function(err){

  if(err){
    res.send("!!! "+err);

  }else{
    Employee.update({_id:req.session.Fulldata._id},{profile_pic:file_name},function(err,data){
      if(err) throw err;
      if(data.ok){
        req.session.Fulldata.profile_pic=file_name;
        res.json(file_name);
      }
      //res.redirect('/employee/employee-profile');
    });
  }
});

});

module.exports=router;
