const User = require("../../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Login = async (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  console.log("email: ",email);
  console.log("password: ",password);

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "User Doesn't Exist!" });





    console.log("Input Password:", `|${password}|`); // The pipes show hidden spaces
console.log("Stored Hash:", user.password);

// Hardcoded test (Replace 'AI6+(+B1' with your actual plain text password)
const manualCheck = await bcrypt.compare('AI6+(+B1', user.password);
console.log("Manual Hardcoded Check:", manualCheck);

const isMatch = await bcrypt.compare(password, user.password);
console.log("isMatch Result:", isMatch);





    // const isMatch = await bcrypt.compare(password, user.password);
    console.log("user.role: ", user.role);
    console.log("isMatch: ", isMatch);
    if (!isMatch || user.role !== "management_admin")
      return res.status(400).json({ msg: 'Credentials Not Matched!' });

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    user.token = token;
    await user.save();
    
    return res.json({ token });
  } catch (error) {
    console.log("student.login.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

module.exports = Login;