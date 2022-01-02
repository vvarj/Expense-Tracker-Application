const express = require("express");
const router = express.Router();
const User = require("../database/db");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res
    .status(200)
    .render("reg.hbs", {
      regErr: req.session.registerror,
      regSuc: req.session.registerd,
    });
  req.session.registerror = false;
  req.session.registerd = false;
});

router.post("/", async (req, res) => {
  try {
    let { username, password } = req.body;

    let user = await User.findOne({ username });
    if (!user) {
      const hashedPsw = await bcrypt.hash(password, 12);

      const registerUser = new User({
        username: req.body.username,
        password: hashedPsw,
      });
      await registerUser.save();
      req.session.registerd = true;
      res.redirect("/register");
    } else {
      req.session.registerror = true;
      res.redirect("/register");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
