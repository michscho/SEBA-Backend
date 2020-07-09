const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const CommentController = require('../controllers/comment');

router.post("/", checkAuth, CommentController.create_comment);

router.get("/:contentId", checkAuth, CommentController.comments_get_comment);

router.delete("/:commentId", checkAuth, CommentController.comments_delete);

module.exports = router;
