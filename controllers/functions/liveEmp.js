module.exports={
  ActiveLive:function(req,empId,LiveEmployees,callback){
    LiveEmployees.findOne({emp_id:empId},function(err,data){
      if(err) throw err;

      if(data){
        LiveEmployees.update({emp_id:empId},{live:1,date: new Date()},function(err,d){
          if(err) throw err;
          req.session.liveid=data._id;
          callback();
        })
      }else{
        LiveEmployees({emp_id:empId,live:1}).save(function(err,r){
          if(err) throw err;
          req.session.liveid=r._id;
          callback();
        });
      }
    })

  },

  OFFLive:function(req,res,LiveEmployees,callback){
    LiveEmployees.update({_id:req.session.liveid,emp_id:req.session.Fulldata._id},{live:0,date: new Date()},function(err,result){
      if(err) throw err;
      if(result.ok){
        callback();
      }
    });
  },

  LiveEmpFind:function(LiveEmployees ,callback){
    LiveEmployees.find({live:1},{emp_id:1,live:1},function(err,result){
      if(err) throw err;
      callback(result);
    });

  }

}
