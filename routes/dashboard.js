const express = require('express');
const router = express.Router();
const Userrecord=require('../database/userRecord');


router.post('/', async(req, res) =>{
     
    let userRecord=new Userrecord({
        name:req.body.loggeduser,
        purposeuser:req.body.purposeuser,
        addmoney:req.body.addmoney,
        incexp:req.body.incexp
        })
   
        try{
          let loggeduser=req.body.loggeduser;
           await userRecord.save();
           const duserRecord = await Userrecord.find({name:loggeduser})
           console.log(duserRecord);
           res.send('data added');
           
        }
     
    catch(err){
      res.send('Error')
    }

    
    })

    
module.exports=router;
