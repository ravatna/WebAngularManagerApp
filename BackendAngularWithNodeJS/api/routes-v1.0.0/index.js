var express = require('express');
var router = express.Router();
//#imort router
var feeds = require('./feeds');
var users = require('./users');
//#Database
var pool = require('../../providers/db')
var authens = require('../../config/authen.json');
const knex= require('../../providers/knex');

var AllFolorws = ["Adams Baker" ,"Clark Davis", "Evans Frank", "Ghosh Hills", "Irwin Jones", "Klein Lopez", "Mason Nalty", "Ochoa Patel", "Quinn Reily", "Smith Trott", "Usman Valdo", "White Xiang" ,"Yakub Zafar"];
var AllAccounts = [
  {
    "AccountId": "1000","AccountName":"Jump Cheng","username":"jc", "password":"jc","secretcode":"qaz1wsx2","ProfileImg":"account.png","FollowBy":["Adams Baker" ,"Clark Davis", "Evans Frank", "Ghosh Hills", "Irwin Jones", "Klein Lopez", "Mason Nalty", "Ochoa Patel", "Quinn Reily", "Smith Trott", "Usman Valdo", "White Xiang" ,"Yakub Zafar"]
  }
];

//Function UUID-V4
function uuidv4() { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); }); }

//.Start -Secure Method 
const jwt = require("jwt-simple");
const passport = require("passport");
//ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt;
//ใช้ในการประกาศ Strategy
const JwtStrategy = require("passport-jwt").Strategy;

const SECRET = "WebAngularManagerApp@RattanapronSoftware";
//สร้าง Strategy
const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromHeader("x-access-token-authorization"), /** KEY=authorization,GivyAuthorization */
   secretOrKey: SECRET
};
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log("Access JWTAuth", [{exp: payload.exp, comapre: payload.exp < Date.now() / 1000}]);
  //1.Expire?
  if(payload.exp * 1000 < Date.now()){
    console.log("Payload Expire => ", payload);
    done(null, false)
  }
  //2. Check User to Database
  // if (payload.sub === "admin"){
  //   console.log("Payload User Pass => ", payload);
  //   done(null, true);
  // }
  const getAccounts = AllAccounts.filter((account, index) => {
    return (account.username == payload.sub);
  });
  if(getAccounts.length > 0){
    done(null, true);
  }
  //Pass All Check End: False!
  done(null, false)
});
//เสียบ Strategy เข้า Passport
passport.use(jwtAuth);
//ทำ Passport Middleware
const requireJWTAuth = passport.authenticate("jwt",{session:false});

//ทำ Middleware สำหรับขอ JWT
const loginMiddleWareWithJWT = (req, res, next) => {
  // if (req.body.username === "admin" && req.body.password === "12345"){
  //   console.log("loginMiddleWareWithJWT() => ", [req.body.username, req.body.password]);
  //   next();
  // }else if(req.body.username === '' || req.body.password === ''){
  //   res.send({code: 200, message:"Package valid Fail!"})
  // }else{ 
  //   res.send({code: 200, message:"Authenticate Fail!"})
  // };
  //Find User Database
  const getAccounts = AllAccounts.filter((account, index) => {
    console.log("loginMiddleWareWithJWT() => ", req.body);
    return (account.username == req.body.username);
  });
  if(getAccounts.length > 0){
    next();
  }else{
    res.send({code: 200, message:"Authenticate Fail!"})
  }
};

//เสียบ middleware ยืนยันตัวตน JWT เข้าไป
router.get("/getloginJWT", requireJWTAuth, (req, res) => {
  console.log("Access URL getLoginJWT");
  res.send("Access Data From Login!!");
});

router.get("/Knex", async(req, res) => {
  // knex.select().from('personal').then((data) => {
  //   console.log(data);
  //   return res.status(200).json(data);
  // });
  console.log("Access API Knex:: ");
  var data = await knex.select().from('personal');
  console.log("awaite:personal => ", data);
  return res.status(200).json(data);
});

router.post("/postloginJWT",loginMiddleWareWithJWT, (req, res) => {
  /**
    – iss (issuer) : เว็บหรือบริษัทเจ้าของ token
    – sub (subject) : subject ของ token
    – aud (audience) : ผู้รับ token
    – exp (expiration time) : เวลาหมดอายุของ token
    – nbf (not before) : เป็นเวลาที่บอกว่า token จะเริ่มใช้งานได้เมื่อไหร่
    – iat (issued at) : ใช้เก็บเวลาที่ token นี้เกิดปัญหา
    – jti (JWT id) : เอาไว้เก็บไอดีของ JWT แต่ละตัวนะครับ
   */
  const payload = {
     iss: 'rattanapronsoftware.com/th',
     name: 'Web Application',
     aud: 'everyone',
     sub: req.body.username,
     iat: new Date().getTime(),
     uuid: uuidv4(),
     exp: new Date().getTime()  + (10 * 60 * 1000) /** with 1Hour */,
  };
  res.send(jwt.encode(payload, SECRET));
});


router.get('/ShopProfile', requireJWTAuth, function(req, res, next) {
  var output = {code:0,message:"",type:"",data:[],debug:null};
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var CurrentDatetime = date+' '+time;
  //Default
  output.code = 200;
  output.message = "Response OK!";
  output.type = "OK";
  output.data = [];
  output.debug = [req.body];

  //Find Feeds Database/Mockup
  var fullUrl = req.protocol + '://' + req.get('host');
  var FeedsMockup = [
  ];
  for(let i=0; i<= 1000; i++){
    FeedsMockup.push(
      { Id: i+1, Name: "feeds 1", IconUrl: fullUrl+"/images/feeds/feed1.png",FullImage: fullUrl+"/images/feeds/FullSize.png" }
    );
  }
  //Update Object
  FeedsMockup.forEach((data, index) => {
    output.data.push(
      data
    );
  });
  //Update Debug
  output.debug.push({FeedsCount: FeedsMockup.length});
  return res.status(200).json(output);
});

router.get('/register', async function(req, res, next) {
  var personal = await knex.select().from('personal').where({});
  return res.status(200).json(personal);
})

router.post('/register', async function(req, res, next) {
  var output = {code:0,message:"",type:"",data:[],debug:null};
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var CurrentDatetime = date+' '+time;
  //Default
  output.code = 200;
  output.message = "Response OK!";
  output.type = "OK";
  output.data = [];
  output.debug = [];

  //#post body
  const username  = req.body.username;
  const password  = req.body.password;
  // const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const passport = req.body.passport;
  const idcard = req.body.idcard;
  const gender = req.body.gender;
  const email = req.body.email;
  const email2 = req.body. null;
  const saltKey = req.body.saltKey;
  const phone = req.body.phone;
  const phone2 = null;
  const phone3 = null;
  const imageCard13 = null;
  const whatApp = req.body.whatApp;
  const line1 = req.body.line1;
  const line2 = null;
  const line3 = null;
  const typeMember = req.body.typeMember;
  const typeDealer = req.body.typeDealer;
  const profileDocument = null;
  const imageProfile = null;
  const imageProfileIcon = null;
  const fromOnline = null;
  const fromOnlineKey = null;
  const otp = null;
  const otpUpdate = null;
  const regDate = null;
  const confirmDate = null;
  const confirmBy = null;
  const lastUpdate = null;
  const expDate = null;
  const statusPersonal = null;

  // if( 
  //      (email    == undefined || email == null    || email == '')    ||
  //      (tel      == undefined || tel == null      || tel == '')      ||
  //      (fullname == undefined || fullname == null || fullname == '') ||
  //      (username == undefined || username == null || username == '') ||
  //      (password == undefined || password == null || password == '') 
  //   ){
  //     output.code = 200;
  //     output.message = "Invalid Form input!";
  //     output.type = "ERR";
  //     output.data = [];
  //     output.debug = req.body;
  //     return res.status(200).json(output);
  // }

  //#valid post variable

  const newPersonal = {
    "id": null,
    "firstName": firstName,
    "lastName": lastName,
    "passport": passport,
    "idcard": idcard,
    "gender": null,
    "email": email,
    "email2": null,
    "saltKey": null,
    "phone":  phone,
    "phone2": null,
    "phone3": null,
    "imageCard13": null,
    "whatApp": whatApp,
    "line1": line1,
    "line2": null,
    "line3": null,
    "typeMember": null,
    "typeDealer": null,
    "profileDocument": null,
    "imageProfile": "",
    "imageProfileIcon": null,
    "fromOnline": null,
    "fromOnlineKey": null,
    "otp": null,
    "otpUpdate": null,
    "regDate": null,
    "confirmDate": null,
    "confirmBy": null,
    "lastUpdate": null,
    "expDate": null,
    "statusPersonal": null
  }

  // personal,accounts
  
  let personal = await knex('personal').returning('id').insert(newPersonal)
  .catch((error)=>{
    if(error.code == 'ER_DUP_ENTRY'){
      console.log("Error Insert Personal => ", error);
      output.code = 200;
      output.message = "Personal Dupplicate!";
      output.type = "ERR";
      output.data = [error];
      output.debug = req.body;
      res.status(200).json(output);
      return 
    }
  });

  console.log("personal => ", personal);
  if(personal == undefined){
      console.log("Error Insert Personal => ", personal);
      output.code = 200;
      output.message = "Personal Error!";
      output.type = "ERR";
      output.data = [];
      output.debug = req.body;
      res.status(200).json(output);
      return 
  }

  if(personal[0] == undefined){
    console.log("Error");
    output.code = 200;
    output.message = "Personal not Found!";
    output.type = "ERR";
    output.data = [];
    output.debug = [req.body];
    res.status(200).json(output);
    return;
  }
  let pid = personal[0];
  let accountObject = {
    personId: pid,
    uname: username, 
    pword: password
  };
  let dataAccounts = await knex('accounts').returning('personId').insert(accountObject)
  .catch((error)=>{
      console.log("Error Insert Account => ", error);
      output.code = 200;
      output.message = "Account Dupplicate!";
      output.type = "ERR";
      output.data = [];
      output.debug = [req.body, error];
      res.status(200).json(output);
      return;
  });
  // console.log("accounts => ", dataAccounts);
    output.code = 200;
    output.message = "Response OK!";
    output.type = "OK";
    output.data = [{AccountID: pid}];// ID=result.insertId
    output.debug = [req.body];
    console.log('Data Account Inserted');
  return res.status(200).json(output);
});


router.post('/login', async function(req, res, next) {
  var output = {code:0,message:"",type:"",data:[],debug:null};
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var CurrentDatetime = date+' '+time;
  //Default
  output.code = 200;
  output.message = "Response OK!";
  output.type = "OK";
  output.data = [];
  output.debug = [];

  //post body
  const username  = req.body.username;
  const password  = req.body.password;

  //Find User Database
  console.log("Access [Login] API with Knex:: ", req.body);
  var getAccounts = await knex.select('personId','uname')
  .from('accounts')
  .where({uname: username,pword: password});
  console.log("awaite:personal => ", getAccounts);

  var fullUrl = req.protocol + '://' + req.get('host')+'/images/';//get URL

  if(getAccounts.length > 0){
    if(getAccounts.length === 1){
      let getAccount0 = getAccounts[0];//Current Account

      const payload = {
        iss: 'givy.com/th',
        name: 'Appllication Mobile',
        aud: 'everyone',
        sub: req.body.username,
        iat: new Date().getTime(),
        uuid: uuidv4(),
        exp: new Date().getTime()  + (10 * 60 * 1000) /** with 1Hour */,
        desp: ''
      };
      //get personal data
      var personal = await knex.select().from('personal').where({id: getAccount0.personId});
      let account = {
        "AccountId": getAccount0.personId,
        "AccountName": getAccount0.uname,
        "ProfileImg": fullUrl+'account.png',
        // "FollowBy": getAccount0.FollowBy,
        "JWT": jwt.encode(payload, SECRET),
        "Header": "UoqAuthorization",
        "personal": (personal.length == 1 ? personal[0] : [])
      };
      output.data.push(account);
    }else{
      output.message = "not Math Account," + output.message;
      console.log("not Math Account:", getAccounts);
    }
  }else{
    let account = [];
    output.data.push(account);
    output.message = "Not Found Account," + output.message;
    console.log("Find Account: ", getAccounts.length);
  }

  //Update Object
  output.debug.push({ID: req.body});
  // console.log("Access/Login=>", output.data[0].AccountId)
  return res.status(200).json(output);
});

/**
 Stateless vs Stateful 
 - Stateful หมายถึง “การเก็บสถานะ”
 - [X]Stateless หมายถึง “การไม่เก็บสถานะ” 
 MOdulr Install:: $ npm install body-parser jwt-simple passport passport-jwt --save
*/

const middleware = (req, res, next) => {
  /* ตรวจสอบว่า authorization คือ Boy หรือไม่*/
     if(req.headers.authorization === "Boy")
        next(); //อนุญาตให้ไปฟังก์ชันถัดไป
     else
        res.send("ไม่อนุญาต")
}; 

router.get("/checkBranch", middleware, (req, res) => { //เพิ่ม middleware ขั้นกลาง
  res.send("ยอดเงินคงเหลือ 50");
});


const loginMiddleware = (req, res, next) => {
  if(req.body.username === "admin" && 
     req.body.password === "12345"){
       next();
  }
  else {
    res.send("Wrong username and password");
  }
  //ถ้า username password ไม่ตรงให้ส่งว่า Wrong username and password
}

//Import Module in Line!!!
// router.post("/login", loginMiddleware, (req, res) => {
//   const payload = {
//     sub: req.body.username,
//     iat: new Date().getTime()//มาจากคำว่า issued at time (สร้างเมื่อ)
//  };
//  res.send(jwt.encode(payload, SECRET));
// });
//END. - SecureMethod

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hi Givy CRM Service V1.0.0');
  // res.render('index', { title: 'Express' });
});

router.get('/status', function(req, res, next) {
  res.send('Status.');
  // res.render('index', { title: 'Express' });
});

router.get('/info', function(req, res, next) {
  res.send('Info.');
  // res.render('index', { title: 'Express' });
});

// router.post('/login', function(req, res, next) {
//   var output = {code:0,message:"",type:"",data:[],debug:null};
//   var today = new Date();
//   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   var CurrentDatetime = date+' '+time;
//   //Default
//   output.code = 200;
//   output.message = "Response OK!";
//   output.type = "OK";
//   output.data = [];
//   output.debug = [req.body];

//   //post params
//   const username  = req.body.username;
//   const password = req.body.password;
//   //Update Object
  
//   const result = authens.filter((authen) => {
//     return (authen.username === username && authen.password === password);
//   });

//   let user = result[0];

//   console.log(user);
//   if(result[0] != undefined){
//     output.type = "OK";
//     output.data = [{id:user.id,permit: user.feature }];
//   }else{
//     //login fail
//     output.type = "ERR";
//     output.data = [{id: 0,permit: [] }];
//   }
//   return res.status(200).json(output);
// });

router.get('/UserInfoAll', function(req, res, next) {
  var output = {code:0,message:"",type:"",data:[],debug:null};
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var CurrentDatetime = date+' '+time;
  //Default
  output.code = 200;
  output.message = "Response OK!";
  output.type = "OK";
  output.data = [];
  output.debug = [];

  //Find User Database
  const getAccounts = AllAccounts.filter((account, index) => {
    return true;
  });

  //HOST -> URL
  var fullUrl = req.protocol + '://' + req.get('host')+'/images/';//get URL
  //GET ACCOUNT
  if(getAccounts.length > 0){
    getAccounts.forEach((act, index) => {
      let getAccount0 = act;//Current Account
      let account = {
        "No": index + 1,
        "AccountId": getAccount0.AccountId,
        "AccountName": getAccount0.AccountName,
        "ProfileImg": fullUrl+getAccount0.ProfileImg,
        "FollowBy": getAccount0.FollowBy
      };
      output.data.push(account);
    });
  }else{
    let account = {
      "AccountId": 0,
      "AccountName": "",
      "ProfileImg": fullUrl+"logo.png",
      "FollowBy": []
    };
    output.data.push(account);
    output.message = "Not Found Account," + output.message;
    console.log("Find Account: ", getAccounts.length);
  }

  //Update Object
  // output.debug.push({ID: 0});

  return res.status(200).json(output);
});


router.get('/UserInfo/:id', function(req, res, next) {
  var output = {code:0,message:"",type:"",data:[],debug:null};
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var CurrentDatetime = date+' '+time;
  //Default
  output.code = 200;
  output.message = "Response OK!";
  output.type = "OK";
  output.data = [];
  output.debug = [];

  //post params
  const AccountID  = req.params.id;
  //Find User Database
  const getAccounts = AllAccounts.filter((account, index) => {
    return (account.AccountId == AccountID);
  });

  var fullUrl = req.protocol + '://' + req.get('host')+'/images/';//get URL

  if(getAccounts.length > 0){
    if(getAccounts.length === 1){
      let getAccount0 = getAccounts[0];//Current Account
      let account = {
        "AccountId": getAccount0.AccountId,
        "AccountName": getAccount0.AccountName,
        "ProfileImg": fullUrl+getAccount0.ProfileImg,
        "FollowBy": getAccount0.FollowBy
      };
      output.data.push(account);
    }else{
      output.message = "Found Account," + output.message;
      console.log("Math Account:", getAccounts[0]);
    }
  }else{
    let account = {
      "AccountId": 0,
      "AccountName": "",
      "ProfileImg": fullUrl+"logo.png",
      "FollowBy": []
    };
    output.data.push(account);
    output.message = "Not Found Account," + output.message;
    console.log("Find Account: ", getAccounts.length);
  }

  //Update Object
  output.debug.push({ID: AccountID});

  return res.status(200).json(output);
});


router.get('/Storys', function(req, res, next) {
  var output = {code:0,message:"",type:"",data:[],debug:null};
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var CurrentDatetime = date+' '+time;
  //Default
  output.code = 200;
  output.message = "Response OK!";
  output.type = "OK";
  output.data = [];
  output.debug = [];

  //Find Feeds Database/Mockup
  var fullUrl = req.protocol + '://' + req.get('host');
  var StorysMockup = [
    {Id: 1, Name: "storys 1", IconUrl: fullUrl+"/images/storys/story1.png",FullImage: fullUrl+"/images/storys/FullSize.png", lastPost: '2020-04-2 10:02:55'},
    {Id: 2, Name: "storys 2", IconUrl: fullUrl+"/images/storys/story2.png",FullImage: fullUrl+"/images/storys/FullSize.png", lastPost: '2020-04-10 10:02:55'},
    {Id: 3, Name: "storys 3", IconUrl: fullUrl+"/images/storys/story3.png",FullImage: fullUrl+"/images/storys/FullSize.png", lastPost: '2020-04-11 10:02:55'},
    {Id: 4, Name: "storys 4", IconUrl: fullUrl+"/images/storys/story4.png",FullImage: fullUrl+"/images/storys/FullSize.png", lastPost: '2020-04-15 10:02:55'},
    {Id: 5, Name: "storys 5", IconUrl: fullUrl+"/images/storys/story5.png",FullImage: fullUrl+"/images/storys/FullSize.png", lastPost: '2020-04-20 10:02:55'},
    {Id: 5, Name: "storys 6", IconUrl: fullUrl+"/images/storys/story6.png",FullImage: fullUrl+"/images/storys/FullSize.png", lastPost: '2020-04-22 10:02:55'}
  ];
  //Update Object
  StorysMockup.forEach((data, index) => {
    output.data.push(
      data
    );
  });
  //Update Debug
  output.debug.push({StorysCount: StorysMockup.length});
  return res.status(200).json(output);
});


router.get('/Feeds', function(req, res, next) {
  var output = {code:0,message:"",type:"",data:[],debug:null};
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var CurrentDatetime = date+' '+time;
  //Default
  output.code = 200;
  output.message = "Response OK!";
  output.type = "OK";
  output.data = [];
  output.debug = [req.body];

  //Find Feeds Database/Mockup
  var fullUrl = req.protocol + '://' + req.get('host');
  var FeedsMockup = [
    {Id: 1, Name: "feeds 1", IconUrl: fullUrl+"/images/feeds/feed1.png",FullImage: fullUrl+"/images/feeds/FullSize.png"},
    {Id: 2, Name: "feeds 2", IconUrl: fullUrl+"/images/feeds/feed2.png",FullImage: fullUrl+"/images/feeds/FullSize.png"},
    {Id: 3, Name: "feeds 3", IconUrl: fullUrl+"/images/feeds/feed3.png",FullImage: fullUrl+"/images/feeds/FullSize.png"},
    {Id: 4, Name: "feeds 4", IconUrl: fullUrl+"/images/feeds/feed4.png",FullImage: fullUrl+"/images/feeds/FullSize.png"},
    {Id: 5, Name: "feeds 5", IconUrl: fullUrl+"/images/feeds/feed5.png",FullImage: fullUrl+"/images/feeds/FullSize.png"},
    {Id: 6, Name: "feeds 6", IconUrl: fullUrl+"/images/feeds/feed6.png",FullImage: fullUrl+"/images/feeds/FullSize.png"},
  ];
  //Update Object
  FeedsMockup.forEach((data, index) => {
    output.data.push(
      data
    );
  });
  //Update Debug
  output.debug.push({FeedsCount: FeedsMockup.length});
  return res.status(200).json(output);
});


// router.use('/user', users);
// router.use('/feeds', feeds);

module.exports = router;
