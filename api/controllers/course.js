const mongoose = require("mongoose");
const Course = require("../models/course");
const ContentItem = require('../contentItem');


exports.courses_get_all = (req, res, next) => {
    Course.find()
        .select("_id name creatorId difficulty description contentItems rating price")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                items: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        creatorId: doc.creator,
                        difficulty: doc.difficulty,
                        description: doc.description,
                        contentItems: doc.contentItems,
                        rating: doc.rating,
                        price: doc.price || undefined,
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

exports.create_course = (req, res, next) => {

    for(let i = 0; i < req.body.contentItems.length; i++){
        ContentItem.contentItems_create_contentItems_from_course();
    }

    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        creatorId: req.userData.userId,
        difficulty: req.body.difficulty,
        description: req.body.description,
        contentItems: req.body.contentItems,
        rating: req.body.rating,
        price: req.body.price,
    });
    course
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created course successfully",
                createdContentItem: {
                    _id: result._id,
                    name: result.name,
                    creatorId: result.creatorId,
                    difficulty: result.difficulty,
                    description: result.description,
                    contentItems: result.contentItems,
                    price: result.price || undefined,
                    rating: result.rating,
                    request: {
                        type: "GET",
                        url: "http://localhost:9000/courses/" + result._id
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

exports.courses_get_course = (req, res, next) => {
    const id = req.params.courseId;
    Course.findById(id)
        .select("_id name creatorId difficulty description contentItems rating price")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    contentItem: doc,
                    request: {
                        type: "GET",
                        url: "http://localhost:9000/courses"
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

exports.courses_get_content_items = (req, res, next) => {
    const id = req.params.courseId;
    Course.findById(id)
        .select("courseItems")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    courseId: id,
                    contentItems: doc.courseItems,
                    request: {
                        type: "GET",
                        url: "http://localhost:9000/courses/contentItems"
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

exports.courses_update_course = (req, res, next) => {
    const id = req.params.courseId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Course.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Course updated",
                request: {
                    type: "GET",
                    url: "http://localhost:9000/courses/" + id
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

exports.courses_delete = (req, res, next) => {
    const id = req.params.courseId;
    Course.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Course deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:9000/courses",
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
