const express = require('express');
const router = express.Router();
const Userrecord=require('../database/userRecord');
const loginRouter = require('../routes/login');

router.post('/', async(req, res) =>{
     
    let userRecord=new Userrecord({
        name:req.body.loggeduser,
        purposeuser:req.body.purposeuser,
        addmoney:req.body.addmoney,
        incexp:req.body.incexp
        })
   
        try{
           await userRecord.save();
           res.send('data added');
        }
     
    catch(err){
      res.send('Error')
    }

    
    })

    
module.exports=router;
