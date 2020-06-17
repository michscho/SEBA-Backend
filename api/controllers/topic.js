const mongoose = require("mongoose");
const Topic = require("../models/topic");

exports.topics_get_all = (req, res, next) => {
    Topic.find()
        .select("_id name description courses")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                items: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        description: doc.description,
                        courses: doc.courses,
                        request: {
                            type: "GET",
                            url: "http://localhost:9000/topics/" + doc._id
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

exports.create_topic = (req, res, next) => {
    const topic = new Topic({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        courses: req.body.courses,
    });
    topic
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created topic successfully",
                createdComment: {
                    _id: new result.id,
                    name: result.name,
                    description: result.description,
                    courses: result.courses,
                    request: {
                        type: "GET",
                        url: "http://localhost:9000/topics/" + result._id
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

exports.topics_get_topic = (req, res, next) => {
    const id = req.params.topicId;
    Topic.findById(id)
        .select("_id name description courses")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    comment: doc,
                    request: {
                        type: "GET",
                        url: "http://localhost:9000/topics"
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

exports.topics_update_topic = (req, res, next) => {
    const id = req.params.topicId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Topic.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Topic updated",
                request: {
                    type: "GET",
                    url: "http://localhost:9000/topics/" + id
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

exports.topics_delete = (req, res, next) => {
    const id = req.params.topicId;
    Topic.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Topic deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:9000/topics",
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
