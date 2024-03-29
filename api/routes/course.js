const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const CourseController = require('../controllers/course');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", CourseController.courses_get_all);

router.post("/", checkAuth, CourseController.create_course);

router.get("/:courseId", CourseController.courses_get_course);

router.get("/contentItems/:courseId", CourseController.courses_get_content_items)

router.patch("/:courseId", CourseController.courses_update_course);

router.delete("/:courseId", CourseController.courses_delete);

module.exports = router;
