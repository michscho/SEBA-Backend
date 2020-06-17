const mongoose = require("mongoose");
const Subscription = require("../models/subscription");

exports.subscriptions_get_all = (req, res, next) => {
    Comment.find()
        .select("_id type price startDate expirationDate owner")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                items: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        creationDate: doc.creationDate,
                        content: doc.content,
                        creator: doc.creator,
                        belonging: doc.belonging,
                        request: {
                            type: "GET",
                            url: "http://localhost:9000/comments/" + doc._id
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

exports.create_comment = (req, res, next) => {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        creationDate: req.body.creationDate,
        content: req.body.content,
        creator: req.body.creator,
        belonging: req.body.belonging,
    });
    comment
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created comment successfully",
                createdContentItem: {
                    _id: new result.id,
                    name: result.name,
                    creationDate: result.creationDate,
                    content: result.content,
                    creator: result.creator,
                    belonging: result.belonging,
                    request: {
                        type: "GET",
                        url: "http://localhost:9000/comments/" + result._id
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

exports.comments_get_comment = (req, res, next) => {
    const id = req.params.commentId;
    Comment.findById(id)
        .select("_id name  creationDate content creator belonging")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    comment: doc,
                    request: {
                        type: "GET",
                        url: "http://localhost:9000/comments"
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

exports.comments_update_comment = (req, res, next) => {
    const id = req.params.commentId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Comment.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Comment updated",
                request: {
                    type: "GET",
                    url: "http://localhost:9000/comments/" + id
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

exports.comments_delete = (req, res, next) => {
    const id = req.params.commentId;
    Comment.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Comment deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:9000/comments",
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
