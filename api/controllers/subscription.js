const mongoose = require("mongoose");
const Subscription = require("../models/subscription");

exports.subscriptions_get_all = (req, res, next) => {
    Subscription.find()
        .select("_id type price startDate expirationDate owner")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                items: docs.map(doc => {
                    return {
                        _id: doc._id,
                        type: doc.type,
                        price: doc.price,
                        startDate: doc.startDate,
                        expirationDate: doc.expirationDate,
                        owner: doc.owner,
                        request: {
                            type: "GET",
                            url: "http://localhost:9000/subscriptions/" + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.create_subscription = (req, res, next) => {
    const subscription = new Subscription({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        price: req.body.price,
        startDate: req.body.startDate,
        expirationDate: req.body.expirationDate,
        owner: req.body.owner,
    });
    subscription
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created subscription successfully",
                createdSubscription: {
                    _id: new result.id,
                    type: result.type,
                    price: result.price,
                    startDate: result.startDate,
                    expirationDate: result.expirationDate,
                    owner: result.owner,
                    request: {
                        type: "GET",
                        url: "http://localhost:9000/subscriptions/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.subscriptions_get_subscription = (req, res, next) => {
    const id = req.params.subscriptionId;
    Subscription.findById(id)
        .select("_id type price startDate expirationDate owner")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    subscriptions: doc,
                    request: {
                        type: "GET",
                        url: "http://localhost:9000/subscriptions"
                    }
                });
            } else {
                res
                    .status(404)
                    .json({message: "No valid entry found for provided ID"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.subscriptions_update_subscription = (req, res, next) => {
    const id = req.params.subscriptionId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Subscription.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "SubscriptionId updated",
                request: {
                    type: "GET",
                    url: "http://localhost:9000/subscriptions/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.subscriptions_delete = (req, res, next) => {
    const id = req.params.subscriptionId;
    Subscription.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Subscription deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:9000/subscriptions",
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
