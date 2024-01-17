const bcrypt = require("bcryptjs");
require("dotenv").config();
const salt = process.env.salt;
// const salt = bcrypt.genSaltSync(15);
// console.log(salt)
const hash = (password) => {
  let res = bcrypt.hash(password, process.env.salt);
  return res;
};

const compare = async (pass, hash1) => {
  res = await bcrypt.compare(pass, hash1);
  return res;
};
module.exports = { hash, compare };
