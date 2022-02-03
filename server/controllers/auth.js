import User from "../models/user";
import jwt from "jsonwebtoken";

// const User = require('../models/user')
// const jwt = require("jsonwebtoken")
// export const showMessage = (req, res) => {
//   res
//     .status(200)
//     .send(
//       `the message you have been written on the baradress : ${req.params.message}`
//     );
// };

export const register = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, password } = req.body;

    //validation
    if (!name) return res.status(400).send("Name is required !!!!");
    if (!password || password.length < 6)
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long !!!!");

    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email has already been taken");

    //register
    const user = new User(req.body);
    await user.save();
    console.log("USER CREATED!", user);
    return res.json({ ok: true }); // we can put user but user info will be shown in the front
  } catch (err) {
    console.log("CREATE USER FAILED", err);
    return res.status(400).send("Error! Please try again!!!");
  }
};

export const login = async (req, res) => {
  //console.log(req.body)

  const { email, password } = req.body;
  try {
    // check if this user with that email exist
    let user = await User.findOne({ email }).exec();
    //console.log( 'USER EXIST', user)
    if (!user) res.status(400).send("User with that email not found !!! ");
    //compare password
    user.comparePassword(password, (err, match) => {
      console.log("COMPARE PASSWORD IN LOGGIN ERROR", err);
      if (!match || err) return res.status(400).send("wrong password");
      //GENERATE A TOKEN AND SEND AS RESPONSE TO CLIENT
      let token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({
        token,
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripe_session,
        },
      });
    });
  } catch (err) {
    console.log("LOGIN ERROR", err);
    res.status(400).send("Signin failed !!!");
  }
};
