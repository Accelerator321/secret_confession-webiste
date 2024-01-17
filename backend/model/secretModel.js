const mongoose = require("mongoose");
const secretSchema = new mongoose.Schema({
  
  message: {
    type: String,
    validate: {
      validator: function (v) {
        return v.length !=0;
      },
      message: (props) => `${props.value} must not be empty`,
    },
    required: true,
  }
},
{
  timestamps:true
}
);



const secret = mongoose.model("secret", secretSchema);
module.exports = secret;
