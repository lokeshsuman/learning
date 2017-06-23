var express=require('express');
var router=express.Router();
var schema=require('../controllers/admin/schema');

var Employee=schema.NewEmployee;

router.get('/employee-profile',function(req,res){
  if(req.session.Fulldata.usertype=='employee' && req.session.Fulldata.status==1){
    res.render('employee-profile',{employee:req.session.Fulldata,
      myprofile_pic:req.session.Fulldata.profile_pic,
    });
  }else{
    res.redirect('/');
  }
});

router.get('/detail',function(req,res){

  if(req.session.Fulldata.usertype=='employee' && req.session.Fulldata.status==1){
    res.render('employ-views/details.ejs',{employee:req.session.Fulldata});
  }else{
    res.redirect('/');
  }
});

router.get('/inbox',function(req,res){
  if(req.session.Fulldata.usertype=='employee' && req.session.Fulldata.status==1){
    res.render('employ-views/inbox.ejs',{employee:req.session.Fulldata});
  }else{
    res.redirect('/');
  }
});

router.get('/change-profile-pic',function(req,res){

  if(req.session.Fulldata.usertype=='employee' && req.session.Fulldata.status==1){
    res.render('employ-views/profile-pic.ejs',{employee:req.session.Fulldata,
      myprofile_pic:req.session.Fulldata.profile_pic,});
  }else{
    res.redirect('/');
  }
});

router.get('/change-password',function(req,res){
  if(req.session.Fulldata.usertype==='employee' && req.session.Fulldata.status===1){
    res.render('employ-views/change-password.ejs',{employee:req.session.Fulldata});
  }else{
    res.redirect('/');
  }
});

router.put('/change-password',function(req,res){
  if(req.session.Fulldata.usertype==='employee' && req.session.Fulldata.status===1){
    Employee.update({_id:req.session.Fulldata._id},{password:req.body.conPassword},function(err,data){
      if(err) throw err;
      res.json(data.ok)
    });
  }else{
    res.redirect('/');
  }
})

module.exports=router;
