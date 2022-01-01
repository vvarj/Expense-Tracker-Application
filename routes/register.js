const express = require('express');
const router = express.Router();
const User = require("../database/db");
const bcrypt=require('bcryptjs');


router.get('/', (req, res) =>{
  res.status(200).render('register.hbs');
  })
  

  router.post('/',async(req,res)=>{
            try{
                let {username,password}=req.body;

                let user= await User.findOne({username});
                if(!user){ 
                  const hashedPsw=await bcrypt.hash(password,12);

                  const registerUser = new User({
                  username:req.body.username,
                  password:hashedPsw
})
               await registerUser.save();
              res.status(200).send("saved");

}else{
  res.send('User Already exist');
}
               
                


            }catch(error){
                res.status(400).send(error);

      }
  })


module.exports=router;