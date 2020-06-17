const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const TopicsController = require('../controllers/topic');

// Handle incoming GET requests to /orders
router.get("/", TopicsController.topics_get_all);

router.post("/", TopicsController.create_topic);

router.get("/:topicId", TopicsController.topics_get_topic);

router.patch("/:topicId", TopicsController.topics_update_topic);

router.delete("/:topicId", TopicsController.topics_delete);

module.exports = router;
