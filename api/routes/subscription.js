const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SubscriptionsController = require('../controllers/subscription');

// Handle incoming GET requests to /orders
router.get("/", SubscriptionsController.subscriptions_get_all);

router.post("/", SubscriptionsController.create_subscription);

router.get("/:subscriptionId", SubscriptionsController.subscriptions_get_subscription);

router.patch("/:subscriptionId", SubscriptionsController.subscriptions_update_subscription);

router.delete("/:subscriptionId", SubscriptionsController.subscriptions_delete);

module.exports = router;
