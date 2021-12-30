const express = require('express');
const router = express.Router();
const User = require("../database/db");


router.get('/', (req, res) =>{
  res.status(200).render('login.hbs');
  })

router.post('/', async(req, res) =>{
    try{

        const userName = req.body.username;
        const password = req.body.password;

        console.log(`${userName} and ${password}`)
      
      const duserName=await User.findOne({username:userName})
      //dusterName is the database object

      if(duserName!=null){
        if(password===duserName.password){
          res.send('LOGIN SUCCESSFUL');
          console.log(duserName);

        }else{
          res.status(400).send('Please Check your password!');
        }
        
      }else{
        res.status(400).send('invalid User ID');
      }
      

    }
    catch(error)
    {
      res.status(400).send('invalid id/password');
    }




    })
  
  //login check


  
  module.exports=router;