const mongoose = require("mongoose");
const Content_Item = require("../models/contentItem");

exports.contentItems_get_all = (req, res, next) => {
    Content_Item.find()
        .select("_id title description source")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                items: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        description: doc.description,
                        source: doc.source,
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

exports.contentItems_create_contentItems_from_course = (item) => {
    const contentItem = new Content_Item({
        _id: new mongoose.Types.ObjectId(),
        title: item.title,
        source: item.source,
        description: item.description,
    });
    contentItem
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created contentItem successfully",
                createdContentItem: {
                    _id: result._id,
                    title: result.title,
                    source: result.source,
                    description: result.description,
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

exports.contentItems_create_contentItem = (req, res, next) => {
    const contentItem = new Content_Item({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        source: req.body.source,
        description: req.body.description,
    });
    contentItem
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created contentItem successfully",
                createdContentItem: {
                    _id: result._id,
                    title: result.title,
                    source: result.source,
                    description: result.description,
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

exports.contentItems_get_contentItem = (req, res, next) => {
    const id = req.params.contentItemId;
    Content_Item.findById(id)
        .select("_id title description source")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    contentItem: doc
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

exports.contentItems_update_contentItem = (req, res, next) => {
    const id = req.params.contentItemId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Content_Item.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Content Item updated"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.contentItems_delete = (req, res, next) => {
    const id = req.params.contentItemId;
    Content_Item.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "ContentItem deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
