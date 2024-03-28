import bcrypt from "bcryptjs";

const users = [
  {
    name: "Rahul Dutta",
    email: "rdtech2002@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Tanushree Patra",
    email: "tanushree222patra@gamil.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Rahul Dutta",
    email: "rahul222dutta@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Rahul Dutta",
    email: "dev.rahul.dutta.02@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
