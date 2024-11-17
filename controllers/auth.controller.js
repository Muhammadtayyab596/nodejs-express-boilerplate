const catchAsync = require("../middleware/catchAsyncErrors");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../middleware/error");

const signInToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const cookiesOptions = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

const sendToken = (user, statusCode, res) => {
  const token = signInToken(user._id);
  res.cookie("jwt", token, cookiesOptions);

  res.status(statusCode).json({
    success: true,
    data: { user },
    token,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  sendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});
