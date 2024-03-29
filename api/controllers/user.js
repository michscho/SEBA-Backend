const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Course = require("../models/course");

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                prename: req.body.prename,
                surname:  req.body.surname,
                achievment:  req.body.achievment || undefined,
                courses:  req.body.courses,
                topics:  req.body.topics || undefined,
                phone: "Unknown",
                gender: "Male",
                premiumUser: false,
                privateprofile: false,
                mailnewsletter: true,
                mailcommunityupdate: true,
                smsnewsletter: true,
                smscommunityupdate: false,
                completedItems: "",
                notificationToken: "N/A"
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Invalid Username or Password"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid Username or Password"
          });
        }
        if (result) {
            const filter = {_id: user[0]._id};
            const update = {
                notificationToken: req.body.notificationToken,
            };
            User.findOneAndUpdate(filter, update)
                .then(result => {
                })
                .catch(error => {
                        console.log("User couldn't be updated")
                    }
                );
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "7d"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "No information recieved"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.userData.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_get = async (req, res, next) => {
  const id = req.userData.userId;
  User.findById(id)
      .select("_id email password prename surname achievment courses topics phone gender premiumUser privateprofile smailnewsletter mailcommunityupdate smsnewsletter smscommunityupdate completedItems")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            user: doc
          });
        } else {
          res
              .status(404)
              .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
};

exports.user_updatePassword = (req, res, next) => {
    const filter = {_id: req.userData.userId};
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const update = {
                password: hash,
            };
            User.findOneAndUpdate(filter, update)
                .then(result => {
                    res.status(201).json({
                        message: "User updated"
                    });
                })
            .catch(
                error => {
                    console.log("User couldn't be updated");
                }
            );
        }
    });
};

exports.user_updateUserCourses = (req, res, next) => {
    const filter = {_id: req.userData.userId};
    const update = {
        courses: req.body.courses,
    };
    User.findOneAndUpdate(filter, update)
        .then(result => {
            res.status(201).json({
                message: "User updated"
            });
        })
        .catch(error => {
            console.log("User couldn't be updated")
            }
        );
};


exports.user_enableNotifications = (req, res, next) => {
    const filter = {_id: req.userData.userId};
    const update = {
        notificationToken: req.body.notificationToken,
    };
    User.findOneAndUpdate(filter, update)
        .then(result => {
            res.status(201).json({
                message: "User updated"
            });
        })
        .catch(error => {
                console.log("User couldn't be updated")
            }
        );
};


exports.user_enrolledCourses = async (req, res, next) => {
    try {
        const user = await User.find({_id: req.userData.userId});
        const courses = user[0].courses;
        const enrolledCourses = [];
        for (let i = 0; i < courses.length; i++) {
            const course = await Course.findById(courses[i]);
            enrolledCourses.push(course);
        }
        res.status(200).json({
            courses: enrolledCourses
        });
    } catch {
        res.status(404).json({message: "Something went wrong"});
    }
};

exports.user_update = async (req, res, next) => {
    const filter = {_id: req.userData.userId};
    const update = {
        prename: req.body.firstname ,
        surname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        privateprofile: req.body.privacy,
        mailcommunityupdate: req.body.commail,
        smscommunityupdate: req.body.comsms,
        mailnewsletter: req.body.newsmail,
        smsnewsletter: req.body.newssms,
        completedItems: req.body.completedItemsm,
    };
    try {
        const doc = await User.findOneAndUpdate(filter, update);
        res.status(201).json({
            message: "User updated"
        });
    } catch (error) {
        console.log("Error");
    }
};



exports.user_get_leaderboard = async (req, res, next) => {
    try {
        const dbUsers = await User.find({privateprofile: false});
        const leaderboard = []
        for (let i = 0; i < dbUsers.length; i++) {
            leaderboard.push({
                firstname: dbUsers[i].prename,
                lastname: dbUsers[i].surname,
                premium: dbUsers[i].premiumUser ,
                enrolledCourses: dbUsers[i].courses.length
            });
        }
        leaderboard.sort( (a, b) => {
            return a.enrolledCourses > b.enrolledCourses ? -1 : 1
        });
        res.status(200).json({
            leaderboard: leaderboard
        });
    }
    catch {
        res.status(404).json({message: "Invalid Request"});
    }
};