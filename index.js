const express = require('express');
const app = express();
const bodyParser =require('body-parser');
const path= require('path');
const port =3000;
const hbs = require('hbs');
var session = require('express-session');
const MongoDBsession = require('connect-mongodb-session')(session);
//const bcrypt=require('bcryptjs');

//const User = require("./database/db")

//for express to load static files
app.use('/static', express.static('static'));

//mongdbsession
const store =new MongoDBsession({
    uri:'mongodb://localhost:27017/expenseTracker',
    collection:'mySessions'
})


//for session and cookies handling middlewARE
app.use(session({
    secret:'key that will sign cookie',
    resave:false,
    saveUninitialized:false,
    store:store

}))

app.use((req,res,next)=>{
    req.session.isLoggedIn=false;
    next();
})


///body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//for view engine config
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));



//adding routers
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const dashboardRouter = require('./routes/dashboard');
//const ConnectMongoDBSession = require('connect-mongodb-session');
//const { collection } = require('./database/userRecord');



//app.use('/login',loginRouter);

app.use('/',loginRouter);
app.use('/register',registerRouter);
//app.use('/add',dashboardRouter);
app.use('/dashboard',dashboardRouter);




app.listen(port,()=>{
    console.log('server running....')
})
