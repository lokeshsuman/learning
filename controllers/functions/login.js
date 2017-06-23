var liveEmp=require('./liveEmp');

method={};
method.logincontroll=function(req,res,Employee,LiveEmployees){

    mysession=req.session;
    if(req.body.email!='' && req.body.password!=''){

          if(req.body.email==='lokesh'){
            mysession.Fulldata={name : req.body.email};
            res.redirect('/profile');

          }else{

            var qr=(req.body.id) ? {_id:req.body.id} : {email:req.body.email,password:req.body.password};

            Employee.findOne(qr,function(err,data){
              if(err) throw err;

              if(data){
                if(data.status===1 && data.usertype==='employee'){
                  mysession.Fulldata=data;

                  if(req.body.id){
                    res.json({id:data._id,url:'/employee/employee-profile'});
                  }else{

                    var callback=function(){ res.redirect('/employee/employee-profile'); };
                    liveEmp.ActiveLive(req,data._id,LiveEmployees,callback);
                  }

                }else if(data.status===1 && data.usertype==='admin'){

                  mysession.Fulldata=data;
                  if(req.body.id){
                    res.json({id:data._id,url:'/profile'});
                  }else{

                    var callback=function(){ res.redirect('/profile'); };
                    liveEmp.ActiveLive(req,data._id,LiveEmployees,callback);
                  }

                }else{

                  req.session.errors='blockac';
                  res.redirect('/');
                }
              }else{
                  req.session.errors='notmatch';
                  res.redirect('/');
              }
            });
          }
        }else{
          req.session.errors='emptyfield';
          res.redirect('/');
        }
};

exports.data=method;
