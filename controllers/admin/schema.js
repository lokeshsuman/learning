var mongoose=require('mongoose');

var RegisterSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile_no:String,
    dob:String,
    department:String,
    age:Number,
    gender:String,
    profile_pic:{type:String,reqired:true,trim:true},
    usertype:{type:String, default:'employee'},
    status:{type:Number,default:0},
    date:{type:String,default: new Date()},
  });

  LiveEmployees= new mongoose.Schema({
      emp_id:String,
      live:{type:Number,default:0},
      date:{type:String,default: new Date()}
    });

    ProfileImage=new mongoose.Schema({
        emp_id:{type:String,required:true,trim:true},
        profile_img:{type:String,required:true,trim:true},
        date:{type:String,default: new Date()},
        Prifix:{type:String,default: Date.now()},
      });




var NewEmployee= mongoose.model('Employees',RegisterSchema);
var liveHistory= mongoose.model('livehistories',LiveEmployees);
var ProfileImage=mongoose.model('profiledps',ProfileImage);

module.exports={

    NewEmployee:NewEmployee,

    liveHistory:liveHistory,

    ProfileImage:ProfileImage

}
