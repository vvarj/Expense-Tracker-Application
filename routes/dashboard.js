const express = require("express");
const router = express.Router();
const Userrecord = require("../database/userRecord");
const userHelper = require("../helpers/userhelpers");

const isAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    req.session.destroy((err) => {});
    console.log("logged out");
    res.send("logged out");
  }
};

router.post("/add", isAuth, async (req, res) => {
  try {
    //let name =req.body.loggeduser;
    let purposeuser = req.body.purposeuser;
    let addmoney = req.body.addmoney;
    let incexp = req.body.incexp;

    await userHelper.addUserData(
      req.session.user,
      purposeuser,
      addmoney,
      incexp
    );
    let [duserRecord, Incomesum, Expensesum, totalBal] =
      await userHelper.showUsersPortfolio(req.session.user);
    res.render("dashboard", {
      userName: req.session.user,
      duserRecord,
      Incomesum,
      Expensesum,
      totalBal,
    });
    //res.render('dashboard',{userName:req.session.user,duserRecord,Incomesum,Expensesum,totalBal});
    // res.send('added');
  } catch (err) {
    res.send("probs in adding data");
  }
});

router.get("/", isAuth, async (req, res) => {
  let [duserRecord, Incomesum, Expensesum, totalBal] =
    await userHelper.showUsersPortfolio(req.session.user);
  res.render("dashboard", {
    userName: req.session.user,
    duserRecord,
    Incomesum,
    Expensesum,
    totalBal,
  });
});

router.post("/del", isAuth, async (req, res) => {
  let delID = req.body.deleteID;
  Userrecord.findByIdAndRemove(delID, async (err, doc) => {
    if (!err) {
      res.redirect("/dashboard");
    } else {
      console.log("Error in employee delete:", err);
    }
  });
});

module.exports = router;
