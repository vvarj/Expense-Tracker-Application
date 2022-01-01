const express = require('express');
const router = express.Router();
const Userrecord=require('../database/userRecord');
const userHelper=require('../helpers/userhelpers');

const isAuth=(req,res,next)=>{
  if(req.session.isLoggedIn){
      next()
  }
  else{
    
      res.send('logged out');
  }
}

router.post('/', isAuth,async(req, res) =>{
   
    let name =req.body.loggeduser;
    let purposeuser=req.body.purposeuser;
    let addmoney=req.body.addmoney;
    let incexp=req.body.incexp;


    const [duserRecord,Incomesum,Expensesum,totalBal] =await userHelper.addUserData(name,purposeuser,addmoney,incexp);
    res.render('dashboard',{userName,duserRecord,Incomesum,Expensesum,totalBal});
   
  })


    router.get('/',isAuth,async(req,res)=>{
      res.send('you logged in')
    })

    router.get('/delete/:id',async(req,res)=>{
      let delID=req.params.id;
      Userrecord.findByIdAndRemove(delID,(err,doc)=>{
        if(!err){
          res.send('deleted');
        }
        else{
          console.log('Error in employee delete:',err);
        }

      })
      
    })
 

module.exports=router;
