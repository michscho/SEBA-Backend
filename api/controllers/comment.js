const mongoose = require("mongoose");
const Comment = require("../models/comment");

exports.create_comment = (req, res, next) => {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        text: req.body.text,
        creator: req.userData.userId,
        contentId: req.body.contentId,
    });
    comment
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created comment successfully",
                createdComment: {
                    _id: new result.id,
                    title: result.title,
                    text: result.text,
                    creator: result.creator,
                    contentId: result.contentId
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
    Comment.find({contentid: req.params.contentId})
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    comment: doc
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

exports.comments_delete = (req, res, next) => {
    const id = req.params.commentId;
    Comment.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Comment deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
