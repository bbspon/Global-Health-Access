const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      roleTags: user.roleTags,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, createdFrom } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      createdFrom,
    });
    res.status(201).json({
      message: "User created",
      token: generateToken(newUser),
      user: {
        name: newUser.name,
        email: newUser.email,
        roleTags: newUser.roleTags,
        createdFrom: newUser.createdFrom,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
const { email, password, name } = req.body;
let user = await User.findOne({ email }); // BBSlive lookup
if (!user) {
  user = await User.create({
    email,
    name,
    password,
    createdFrom: "healthcare",
  });
}
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: "1d",
});
res.json({
  message: "Login success",
  token,
  user: { _id: user._id, email: user.email, name: user.name },
});
};

