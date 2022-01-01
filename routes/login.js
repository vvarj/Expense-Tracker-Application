const express = require('express');
const router = express.Router();
const User = require("../database/db");
const Userrecord=require('../database/userRecord');
const bcrypt=require('bcryptjs');
const userHelper=require('../helpers/userhelpers');



router.get('/', (req, res) => {
  res.status(200).render('login.hbs');
})


router.post('/dashboard1', async(req, res) => {
  try {

    const userName = req.body.username;
    const password = req.body.password;

    //console.log(`${userName} and ${password}`)

    let duserName = await User.findOne({username:userName});
    //dusterName is the database object
    const duserRecord = await Userrecord.find({name:userName});
    //console.log(duserRecord);

    if (duserName!=null) {
  
        const isMatch=await bcrypt.compare(password,duserName.password);

      if(isMatch){
       
        
        req.session.isLoggedIn =true;
        req.session.user=userName;

          
          const [duserRecord,Incomesum,Expensesum,totalBal] =await userHelper.showUsersPortfolio(userName);

        res.render('dashboard',{userName,duserRecord,Incomesum,Expensesum,totalBal});
      }
      else {
        res.status(400).send('Please Check your password!');
      }
    }

    else {
      res.status(400).send('invalid User ID');
    }

  }
  catch (error) {
    res.status(400).send('Login ERROR');
  }
})

//login check

router.post('/logout', (req, res) => {
  req.session.isLoggedIn =false;
  req.session.destroy(err=>{
    console.log(err);
    
  })
  res.redirect('/');
 })

module.exports =router;