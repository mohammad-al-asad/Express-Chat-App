const { hash } = require("bcrypt");
const model = require("../model/people");
const fs = require("fs");
const path = require("path");
const createError = require("http-errors")

async function getUser(req, res, next) {
  try {
    const users = await model.find();
    res.render("user", {
      users: users,
    });
  } catch {}
}

async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new model({
      avatar: req.files[0].filename,
      ...req.body,
      password: hashedPassword,
    });
  } else {
    newUser = new model({
      ...req.body,
      password: hashedPassword,
    });
  }

  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch {
    res.status(500).json({
      errors: {
        common: "unknown error occured!",
      },
    });
  }
}

async function removeUser(req, res, next) {
  try {
    if (req.loggedInUser.role === "admin") {
      const user = await model.findByIdAndDelete({
        _id: req.params.id,
      });
      
      if (user.avatar) {
        fs.unlink(
          path.join(`${__dirname}/../public/uploads/avatars/${user.avatar}`),
          (err) => {
            if (err) {
              console.log(err.message);
            }
          }
        );
      }
      
      res.status(200).json({
        message: "User was deleted succesfully",
      });
    }else{
      throw createError("Only Admin can delete user!");
    }
  } catch(err) {
    res.status(403).json({
      errors: {
        common: {
          msg: err.message
        }
      }
    })
  }
}

module.exports = {
  getUser,
  addUser,
  removeUser,
};
