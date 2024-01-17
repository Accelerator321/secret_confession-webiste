const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: true,
  },
  password: { type: String, required: true },
  count: {
    type: Number,
    default: 0,
    validate: {
      validator: function (val) {
        return val <= 1;
      },
      message: (props) => `${props.value} can not excced one`,
    }
  },
  
});

const user = mongoose.model("user", userSchema);
module.exports = user;
