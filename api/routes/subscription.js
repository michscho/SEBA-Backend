const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SubscriptionsController = require('../controllers/subscription');

// Handle incoming GET requests to /orders
// router.get("/", SubscriptionsController.subscriptions_get_all);
//
// router.post("/", SubscriptionsController.orders_create_order);
//
// router.get("/:orderId", SubscriptionsController.orders_get_order);
//
// router.delete("/:orderId", SubscriptionsController.orders_delete_order);

module.exports = router;
