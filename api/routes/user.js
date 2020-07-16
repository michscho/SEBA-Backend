const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post("/", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/", checkAuth, UserController.user_delete);

router.get("/", checkAuth, UserController.user_get);

router.post("/update", checkAuth, UserController.user_update);

router.post("/updatePassword", checkAuth, UserController.user_updatePassword);

router.post("/updateUserCourses", checkAuth, UserController.user_updateUserCourses);

router.post("/enableNotifications", checkAuth, UserController.user_enableNotifications);

router.get("/enrolledCourses", checkAuth, UserController.user_enrolledCourses);

module.exports = router;
