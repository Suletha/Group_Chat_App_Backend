const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.postUsers = async (req, res, next) => {
    const name = req.body.name;
    const phoneno = req.body.phoneno;
    const email = req.body.email;
    const password = req.body.password;
    console.log(name, email, password);
    const t = await sequelize.transaction();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create(
        {
          name: name,
          phoneno: phoneno,
          email: email,
          password: hashedPassword,
          totalExpense: 0,
          ispremium: false,
        },
        { transaction: t }
      );
      await t.commit();
      res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      await t.rollback();
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }
  };