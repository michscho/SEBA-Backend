const axios = require("axios");
const mongoose = require("mongoose");
const Comment = require("../models/comment");
const User = require("../models/user");
const Course = require("../models/course");


exports.create_comment = async (req, res, next) => {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        text: req.body.text,
        creator: req.userData.userId,
        contentId: req.body.contentId,
    });
    await comment.save();
    try {
        const course = await Course.findById(req.body.contentId);
        const user = await User.findById(course.creatorId);

        // Token needs to be refreshed every 24 hours due to security reasons
        const authToken = "ya29.a0AfH6SMBl2hldoPwILPaByP871QH9kAeU7HFRiVg6N5l8JpUF_NzEVPw7YLRxYTO-NesnLKS34OSIukrjYjaGqAnUBNW8Klm8kz9ESU975PDFB2hH7frVX-kJxQtoU9kUl1ama0HZOMl43N_Ci7ezVZGGUmk9w0O1iiY"

        const URL= "https://fcm.googleapis.com/v1/projects/know-more-1/messages:send";
        const data = {
            "message": {
                "token" : user.notificationToken,
                "notification": {
                    "title": "New comment on your course " + course.name,
                    "body": comment.text
                },
                "webpush": {
                    "headers": {
                        "Urgency": "high"
                    },
                    "notification": {
                        "body":
                            comment.text,
                            "requireInteraction": "true",
                            "badge": "/badge-icon.png"
                    }
                }
            }
        }

        const result = axios({
            method: "post",
            url: URL,
            headers: { Authorization: "Bearer " + authToken },
            data: data
        });

        console.log(result);

        res.status(201).json({
            message: "Created comment & notification successfully"
        });
    }
    catch {
        res.status(201).json({
            message: "Created comment successfully"
        });
    }


};

exports.comments_get_comment = async (req, res, next) => {
    try {
        const comments = await Comment.find({contentId: req.params.contentId});
        for (let i = 0; i < comments.length; i++) {
            const user = await User.findById(comments[i].creator)
            if (user) {
                if(req.userData.userId === comments[i].creator) {
                    comments[i].contentId = "true";
                }
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
