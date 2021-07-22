import mongoose from "mongoose";

const randomColor = () => {
  let hex = Math.floor(Math.random() * 0xFFFFFF);
  return "#" + hex.toString(16);
}

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  image: { type: String, default: '' },
  avatarColor: { type: String, default: randomColor()},
  phoneNumber: { type: String, default: ''},
  description: { type: String, default: ''},
  follower: { type: [String], default: []},
  followed: { type: [String], default: []},
  allowEmails: { type: String, default: '' },
});

const User = mongoose.model("User", userSchema);

export default User;