const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ContentItemController = require('../controllers/contentItem');


router.get("/", checkAuth, ContentItemController.contentItems_get_all);

router.post("/", checkAuth, ContentItemController.contentItems_create_contentItem);

router.get("/:contentItemId", checkAuth, ContentItemController.contentItems_get_contentItem);

router.patch("/:contentItemId", checkAuth, ContentItemController.contentItems_update_contentItem);

router.delete("/:contentItemId", checkAuth, ContentItemController.contentItems_delete);

module.exports = router;
