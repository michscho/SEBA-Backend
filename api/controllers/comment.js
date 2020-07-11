const mongoose = require("mongoose");
const Comment = require("../models/comment");
const User = require("../models/user");

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
                result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.comments_get_comment = async (req, res, next) => {
    try {
        const comments = await Comment.find({contentId: req.params.contentId});
        for (let i = 0; i < comments.length; i++) {
            const user = await User.findById(comments[i].creator)
            if (user) {
                comments[i].creator = user.prename + " " + user.surname;
            }
            else {
                comments[i].creator = "Deleted User";
            }
        }
        res.status(200).json({
            comment: comments
        });
    }
    catch {
        res.status(404).json({message: "Invalid comment"});
    }
};

exports.comments_delete = (req, res, next) => {
    Comment.find({_id: req.params.commentId})
        .then(doc => {
            if (doc && doc.length > 0) {
                console.log(doc);
                if (req.userData.userId === doc[0].creator) {
                    const id = req.params.commentId;
                    Comment.remove({_id: id})
                        .exec()
                        .then(result => {
                            res.status(200).json({
                                message: "Comment deleted",
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                }

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
