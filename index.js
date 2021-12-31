const express = require('express');
const app = express();
const bodyParser =require('body-parser');
const path= require('path');
const port =3000;
const hbs = require('hbs');

const User = require("./database/db")

//for express to load static files
app.use('/static', express.static('static'));

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



app.use('/login',loginRouter);
app.use('/',loginRouter);
app.use('/register',registerRouter);
app.use('/dashboard',dashboardRouter);



app.listen(port,()=>{
    console.log('server running....')
})
