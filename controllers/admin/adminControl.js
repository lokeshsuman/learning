var express=require('express');
var router=express.Router();

var dbconnection=require('../db/dbconnection');
var schema=require('./schema');
var login=require('../functions/login');
var liveEmp=require('../functions/liveEmp');

var DB= new dbconnection();
DB.connection();

var Employee=schema.NewEmployee;
var LiveEmployees=schema.liveHistory;


var mysession;
var lastRegisterUser;

  router.get('/',function(req,res){
    res.render('loginform',{success:req.session.success, errors:req.session.errors});
    req.session.errors=null;
  });

  router.post('/',function(req,res){login.data.logincontroll(req,res,Employee,LiveEmployees)});


  

  router.get('/profile',function(req,res){

    if(req.session.Fulldata.name=='lokesh' || req.session.Fulldata.usertype=='admin'){

        res.render('adminprofile',{employee:req.session.Fulldata});


    }else{
      res.redirect('/');
    }

  });

  router.get('/alluser',function(req,res){

    Employee.find({},function(err,data){
        if(err) throw err;
        var result=[lastRegisterUser,data];
        res.json(result);
      }).sort({ date: 1 }).skip().limit();
  });

router.get('/liveemployee',function(req,res){
  liveEmp.LiveEmpFind(LiveEmployees,function(Emplive){
    LiveEmployees.find({live:1},function(err,data){
      if(err) throw err;
      var result=[data.length,Emplive]
      res.json(result)
    });
  });
});

  router.get('/newEmployee',function(req,res){
    if(req.session.Fulldata.name=='lokesh' || req.session.Fulldata.usertype=='admin'){
      res.render('newEmployee',{success:req.session.success, employ:req.session.employ});
    }else{
      res.end();
    }
  });

  router.post('/newEmployee',function(req,res){

    Employee.find({email:req.body.email},function(err,employ){

      if(employ.length){
        req.session.success='already';
        req.session.employ=req.body;
        res.json(employ)
      }else{
        Employee(req.body).save(function(err,data){
    			if(err){
            throw err;
            req.session.success=2;
          }else{
            req.session.employ=2;
            req.session.success=true;
            lastRegisterUser=data._id;
            res.json(data);

          }
    		});
      }
    });


  });

  router.get('/contact',function(req,res){
    res.render('contact');
  })

  router.get('/logout',function(req,res){

    var callback=function(){
          req.session.destroy();
          res.redirect('/');
        };
    liveEmp.OFFLive(req,res,LiveEmployees,callback);

  });

  router.delete('/profile',function(req,res){
    Employee.remove({_id:req.body.id},function(err,data){
      if(err) throw err;
      res.json(data.result.n);
    });
  });

  router.put('/profile',function(req,res){

      var chnstatus=(req.body.status==1) ? '0' : '1';

    Employee.update({_id:req.body.id},{status:chnstatus},function(err,data){
      if(err) throw err;
      res.json(data.ok)
    });
  });

  router.put('/empTypeChange',function(req,res){
    if(req.session.Fulldata.name=='lokesh' || req.session.Fulldata.usertype=='admin'){
      var chngtype=(req.body.Etype=='employee') ? 'admin' : 'employee';
      Employee.update({_id:req.body.id},{usertype:chngtype},function(err,data){
        if(err) throw err;

        res.json(data.ok)
      });
    }else{
      res.end();
    }
  });

  router.get('/employee-edit/:id',function(req,res){
    if(req.session.Fulldata.name=='lokesh' || req.session.Fulldata.usertype=='admin'){
      Employee.find({_id:req.params.id},function(err,data){
        if(err) throw err;
        res.render('employee-edit',{employee:data,success:req.session.editsuccess});
      });
    }else{
      res.redirect('/');
    }

  });

  router.put('/employee-edit/:id',function(req,res){
    if(req.session.Fulldata.name=='lokesh' || req.session.Fulldata.usertype=='admin'){
      Employee.update({_id:req.params.id},req.body,function(err,data){
        if(err) throw err;
        req.session.editsuccess=1;
        res.json(data.ok);
      });
    }
  });


router.post('/searchEmploy',function(req,res){
  var s_value= new RegExp("^"+req.body.search_val);
  var findval= req.body.search_by;
  var qry;

  if(findval=='name'){
    qry={name:s_value};
  }
  else if(findval=='dept'){
    qry={department:s_value};
  }else if(findval=='mobile_no'){
    qry={mobile_no:s_value};
  }else if(findval=='email'){
    qry={email:s_value};
  }

  Employee.find(qry, function(err,data){
    if(err) throw err;
    var result=[lastRegisterUser,data];
    res.json(result);
  });
});



module.exports=router;
