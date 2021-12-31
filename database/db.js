const mongoose =require('mongoose');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/expenseTracker');
}
var db =mongoose.connection;
db.on('error',console.log.bind(console,'connection error'));
db.once('open',function(){
    console.log('Database connected');
})

const userSchema = new mongoose.Schema({
    username: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    expense: {type:String},
    income: {type:String}
})
//model-CollEction name -singular
let User = new mongoose.model("User",userSchema);

module.exports=User;