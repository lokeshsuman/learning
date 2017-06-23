var mongoose=require('mongoose');
function DataBase(){
  return {
    connection:function(){
      mongoose.connect('mongodb://localhost:27017/company',function(err,db){
        if (err) throw err;
        console.log('DB connect');
      });
    }
  }
}
module.exports=DataBase;
