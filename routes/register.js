const express = require('express');

const router = express.Router();

const User = require("../database/db");


router.get('/', (req, res) =>{
  res.status(200).render('register.hbs');
  })
  

  router.post('/',async(req,res)=>{
            try{
           
                const registerUser = new User({
                  username:req.body.username,
                  password:req.body.password
                  
                })
                registerUser.save();
                res.status(200).send("saved");


            }catch(error){
                res.status(400).send(error);

      }
  })


module.exports=router;