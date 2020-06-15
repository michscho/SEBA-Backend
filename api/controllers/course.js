const mongoose = require("mongoose");
const Course = require("../models/course");

exports.courses_get_all = (req, res, next) => {
    Course.find()
        .select("_id name creator difficulty description keywords, courseItems, isFree price")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                items: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        creator: doc.creator,
                        difficulty: doc.difficulty,
                        description: doc.description,
                        keywords: doc.keywords,
                        courseItems: doc.courseItems,
                        isFree: doc.isFree,
                        price: doc.price || undefined,
                        request: {
                            type: "GET",
                            url: "http://localhost:9000/courses/" + doc._id
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

exports.create_course = (req, res, next) => {
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        creator: req.body.creator,
        difficulty: req.body.difficulty,
        description: req.body.description,
        keywords: req.body.keywords,
        courseItems: req.body.courseItems,
        isFree: req.body.isFree,
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
                    creator: result.creator,
                    difficulty: result.difficulty,
                    description: result.description,
                    keywords: result.keywords,
                    courseItems: result.courseItems,
                    isFree: result.isFree,
                    price: result.price || undefined,
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
//
// exports.contentItems_get_contentItem = (req, res, next) => {
//   const id = req.params.contentItemId;
//   Content_Item.findById(id)
//     .select("_id name source author isFree price")
//     .exec()
//     .then(doc => {
//       console.log("From database", doc);
//       if (doc) {
//         res.status(200).json({
//           contentItem: doc,
//           request: {
//             type: "GET",
//             url: "http://localhost:9000/contentItems"
//           }
//         });
//       } else {
//         res
//           .status(404)
//           .json({ message: "No valid entry found for provided ID" });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// };
//
// exports.contentItems_update_contentItem = (req, res, next) => {
//   const id = req.params.contentItemId;
//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }
//   Content_Item.update({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "Content Item updated",
//         request: {
//           type: "GET",
//           url: "http://localhost:9000/contentItems/" + id
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// };
//
// exports.contentItems_delete = (req, res, next) => {
//   const id = req.params.contentItemId;
//   Content_Item.remove({ _id: id })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "ContentItem deleted",
//         request: {
//           type: "POST",
//           url: "http://localhost:3000/contentitems",
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// };
