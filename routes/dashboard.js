const express = require('express');
const router = express.Router();
const Userrecord=require('../database/userRecord');
const userHelper=require('../helpers/userhelpers');

const isAuth=(req,res,next)=>{
  if(req.session.isLoggedIn){
      next();
  }
  else{
    req.session.destroy(err=>{
      console.log(err);
      
    })
      res.send('logged out');
  }
}

router.post('/add',async(req, res) =>{
   try{
    let name =req.body.loggeduser;
    let purposeuser=req.body.purposeuser;
    let addmoney=req.body.addmoney;
    let incexp=req.body.incexp;


    userHelper.addUserData(req.session.user,purposeuser,addmoney,incexp);
    res.send('added');
    //res.render('dashboard',{userName:req.session.user,duserRecord,Incomesum,Expensesum,totalBal});
   }
   catch(err){
      res.send('probs in adding data');
   }
   
  })


    router.get('/',async(req,res)=>{
      
      const [duserRecord,Incomesum,Expensesum,totalBal] =await userHelper.showUsersPortfolio(req.session.user);
      res.render('dashboard',{userName:req.session.user,duserRecord,Incomesum,Expensesum,totalBal});
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
