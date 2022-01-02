const Userrecord = require("../database/userRecord");


module.exports = {
  showUsersPortfolio: async (userName) => {
    try {
      let duserRecord = await Userrecord.find({name:userName});

     
      //console.log(duserRecord);

      Incomedatas = [] = duserRecord.filter((n) => n.incexp === "Income");
      Expensedatas = [] = duserRecord.filter((n) => n.incexp === "Expense");
      IncomeArray = [0, 0];
      ExpenseArray = [0, 0];

      Incomedatas.forEach((i) => {
        IncomeArray.push(i.addmoney);
       
        //console.log(Incomesum);
      });
      
      Incomesum = IncomeArray.reduce((a, b) => a + b, 0);
      
      Expensedatas.forEach((i) => {
        ExpenseArray.push(i.addmoney);
      });

      Expensesum =ExpenseArray.reduce((a, b) => a + b, 0);
      
      const totalBal = Incomesum - Expensesum;
      return [duserRecord, Incomesum, Expensesum, totalBal];
    } 
    
    catch (err) {
      return [
        (duserRecord = null),
        (Incomesum = 0),
        (Expensesum = 0),
        (totalBal = 0),
      ];
    }
  } ,

  addUserData: async (name, purposeuser, addmoney, incexp) => {
    let userRecord = new Userrecord({
      name: name,
      purposeuser: purposeuser,
      addmoney: addmoney,
      incexp: incexp,
    });

    try {
      await userRecord.save();
     
    
    } catch (err) {
      return err;
    }
  }

};
