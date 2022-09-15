const bcrypt = require("bcrypt");

const user = {
  username: "admin",
  password: "password",
};

const users = [
  {
    username: "admin",
    password: "$2b$12$V7NG0tOiemLbFvuU3t1JOeCgyH8TYP5I2XU5.CdrtWx3YLT3T29pm",
  },
];

// 10 is the minimum, 12 is recommended => 2^12 = 4096
const saltRounds = 12;

// Hashing the password
const hashPassword = async (password, saltRounds) => {
  console.time("hashing");
  const salt = await bcrypt.genSalt(saltRounds);
  console.log("salt", salt);
  const hash = await bcrypt.hash(password, salt);
  console.timeEnd("hashing");
  console.log("hash", hash);
  //   const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

hashPassword(user.password, saltRounds);

// Compare the password and return true or false
bcrypt.compare("test", users[0].password).then((result) => {
  console.log("result", result);
});