const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports.hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

module.exports.validatePassword = async(password,hash)=>{
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}
