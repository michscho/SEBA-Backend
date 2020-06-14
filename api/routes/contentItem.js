const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ContentItemController = require('../controllers/contentItem');

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

router.get("/", ContentItemController.contentItems_get_all);

router.post("/", ContentItemController.contentItems_create_contentItem);

router.get("/:contentItemId", ContentItemController.contentItems_get_contentItem);

router.patch("/:contentItemId", ContentItemController.contentItems_update_contentItem);

router.delete("/:contentItemId", ContentItemController.contentItems_delete);

module.exports = router;
