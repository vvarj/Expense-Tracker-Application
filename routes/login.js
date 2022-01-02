const express = require('express');
const router = express.Router();
const User = require("../database/db");
const bcrypt=require('bcryptjs');
var session = require('express-session');

router.get('/', (req, res) => {

  res.status(200).render('login.hbs',{"logErr":req.session.loginerror});
  req.session.loginerror=false;
})

router.post('/login', async(req, res) => {
  try {

    const userName = req.body.username;
    const password = req.body.password;
    //console.log(`${userName} and ${password}`)
    let duserName = await User.findOne({username:userName});
    //dusterName is the database object
    //const duserRecord = await Userrecord.find({name:userName});
    //console.log(duserRecord);
    if (duserName!=null) {
        const isMatch=await bcrypt.compare(password,duserName.password);
      if(isMatch){

        req.session.isLoggedIn=true;
        req.session.user=userName;

        await console.log(req.session.isLoggedIn);
        res.render('home.hbs');
      }
      else {
        req.session.loginerror=true;
        res.redirect('/');
      }
    }

    else {
      req.session.loginerror=true;
      res.redirect('/');
    }

  }
  catch (error) {
    res.status(400).send('Login ERROR');
  }
})

//login check

router.post('/logout', (req, res) => {
  req.session.isLoggedIn=false;
  req.session.destroy(err=>{
    console.log(err);
    
  })
  res.redirect('/');
 })

module.exports =router;