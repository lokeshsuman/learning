var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
//var layoutController=require('./controllers/layout');

//var adminControl=require('./controllers/admin/adminControl');
var sessionFile=require('express-session');
var app=express();

var router = express.Router();

//app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

router.use(sessionFile({
  secret:'&^%^&$#^hgdgsjad%',
  resave:true,
  saveUninitalized:true
}));

app.use( router);
app.use('/employee', router);

app.use(express.static(path.join(__dirname,'public')));

app.use(require('./controllers/admin/adminControl'));

app.use('/employee',require('./routes/profile-pic'));

app.use('/employee',require('./routes/profile-employee'));

app.listen(3000,function(){
  console.log('Server listening on 3000');
});
