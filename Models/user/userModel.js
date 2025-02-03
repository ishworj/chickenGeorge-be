import userModel from "./userSchema.js";

export const createUser = (newUserobj) => {
  return userModel(newUserobj).save();
};

export const getUserByEmail = (email) => {
  return userModel.findOne({ email });
};
