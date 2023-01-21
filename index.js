const cors = require("cors");
const connection = require("./Config/db");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("./Models/User.model");
const EmiRouter = require("./Routes/emi.route");
const authorization = require("./middlewares/authorization");

require("dotenv").config();



const app = express();
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.send("Welocme Home");
});



app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const isUser = await UserModel.findOne({ email });
 


  if (isUser) {
    res.send({ msg: "Users already " });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      if (err) {
        res.send({ msg: "Something  wrong  " });
      }
      const new_user = new UserModel({ username, email, password: hash });
      try {
        await new_user.save();
        res.send({ msg: "Signup Success" });
      } catch (error) {
        res.send({ msg: "Something  wrong" });
      }
    });
  }
});




app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash_pass = user.password;
  const user_id = user._id;
  bcrypt.compare(password, hash_pass, function (err, result) {
    if (err) {
      res.send({ msg: "Something  wrong" });
    }
    if (result) {
      const token = jwt.sign({ user_id }, "AJAY1234");
      res.send({ msg: "login complete", token });
    } else {
      res.send({ msg: "login Not Complete ,try again" });
    }
  });
});


//post
app.post("/profile", authorization, async (req, res) => {
  let _id = req.body.user_id;
  let user = await UserModel.find(_id);
  res.send(user);
});



app.use(authorization);
app.use("/user", EmiRouter);







app.listen(process.env.PORT, async (req, res) => {
  try {
    await connection;
    console.log(" on port http://localhost:8080");
  } catch (error) {
    console.log("connection  failed");
    console.log(error);
  }
  console.log(`listening on port ${process.env.PORT}`);
});
