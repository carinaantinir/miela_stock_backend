
const bcrypt = require("bcryptjs");
const User = require("../models/user.models.js");

const registerUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "user"
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({
    email: email.trim().toLowerCase()
  }).select("+password");

  if (!user) {
    return null;
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    return null;
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role || "user"
  };
};

const getUsers = async () => {
  return User.find()
    .select("-password")
    .lean();
};

const getUserById = async (id) => {
  return User.findById(id)
    .select("-password")
    .lean();
};

const updateUser = async (id, data) => {
  const user = await User.findById(id);

  if (!user) {
    return null;
  }

  if (data.name !== undefined) {
    user.name = data.name;
  }

  if (data.email !== undefined) {
    user.email = data.email;
  }

  if (data.password !== undefined) {
    user.password = await bcrypt.hash(data.password, 10);
  }

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role || "user"
  };
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
