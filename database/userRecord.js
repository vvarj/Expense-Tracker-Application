const mongoose=require('mongoose');

const userecordSchema=new mongoose.Schema({
    name:{type:String},
    totalExpense:{
        type:Number
    },
    totalIncome:{
        type:Number
    },
    
    addmoney: [Number],
    purposeuser:[String] , incexp:[Boolean]

})


module.exports=mongoose.model('Userrecord',userecordSchema);