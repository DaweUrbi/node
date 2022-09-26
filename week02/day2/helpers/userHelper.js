const bcrypt = require("bcrypt");

const hashPassword = async (password, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  // const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

module.exports = { hashPassword };
