const mongoose=require('mongoose');

const userecordSchema=new mongoose.Schema({
    name:String,
    addmoney:Number,
    purposeuser:String, 
    incexp:String

})


module.exports=mongoose.model('Userrecord',userecordSchema);