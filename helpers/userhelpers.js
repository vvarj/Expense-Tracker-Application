const session = require('express-session');
const Userrecord=require('../database/userRecord');
const express = require('express');
const router = express.Router();

module.exports={

    showUsersPortfolio: async (userName)=>{
        try{
            const duserRecord = await Userrecord.find({name:userName});

           

        let Incomedatas=[]=duserRecord.filter(n=>n.incexp==='Income');
        let Expensedatas=[]=duserRecord.filter(n=>n.incexp==='Expense');
        let IncomeArray=[0,0];
        let ExpenseArray=[0,0];


        Incomedatas.forEach(i => {
          IncomeArray.push(i.addmoney);
          Incomesum=IncomeArray.reduce((a,b)=>a+b,0);
          console.log(Incomesum);
      })

      Expensedatas.forEach(i => {
        ExpenseArray.push(i.addmoney);
        Expensesum=ExpenseArray.reduce((a,b)=>a+b,0);
        console.log(Expensesum);
    })
       
        let totalBal=Incomesum-Expensesum;
      return [duserRecord,Incomesum,Expensesum,totalBal];
    

         
        
        }

        catch(err){
            return [duserRecord=null,Incomesum=0,Expensesum=0,totalBal=0];
        }
        
    
    
    
    },

    
    addUserData:async (name,purposeuser,addmoney,incexp)=>{

        let userRecord=new Userrecord({
            name:name,
            purposeuser:purposeuser,
            addmoney:addmoney,
            incexp:incexp
            })
            
            try{
               await userRecord.save();
              showUsersPortfolio(userName);
            }
         
        catch(err){
            return [duserRecord=null,Incomesum=0,Expensesum=0,totalBal=0];
        }
    
        
    }



}