const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const sequelize = require("../util/database")

exports.postUsers = async (req, res, next) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    console.log(name, email, password);
    const t = await sequelize.transaction();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create(
        {
          name: name,
          phone: phone,
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


  exports.getUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email,password);
    try{
      const user = await user.findOne({where: {email}});
      if(!user){
        return res.status(404).json({error: "User not found", success: faise})
      }
      const passwordMatched = await bcrypt.compare(password,user.password);
      if(!passwordMatched){
        return res.status(401).json({error:"Icorrect password",sucess: false});

      }else{
        const token = jwt.sign(user.id, secretkey);
        return res.status(200).json({
          message:"User logged in successfully",
          success: true,
          token: token
        })
      }
    }catch(err){
      console.error(err);
      return res.status(500).json({error: "An error occurred"});
    }
  };

  exports.getAllUsers = async (req, res, next) => {
    try{
      const user = await User.findAll();
      res.status(200).json(users);
    }catch(err){
      res.status(500).json({err: "server error"});
    }
  };