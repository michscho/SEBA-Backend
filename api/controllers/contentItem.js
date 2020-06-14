const mongoose = require("mongoose");
const Content_Item = require("../models/contentItem");

exports.contentItems_get_all = (req, res, next) => {
  Content_Item.find()
    .select("_id name source author isFree price")
      .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        items: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            source: doc.source,
            author: doc.author,
            isFree: doc.isFree,
            price: doc.price || undefined,
            request: {
              type: "GET",
              url: "http://localhost:9000/products/" + doc._id
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

exports.contentItems_create_contentItem = (req, res, next) => {
  const contentItem = new Content_Item({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    source: req.body.source,
    author: req.body.author,
    isFree: req.body.isFree,
    price: req.body.price,
  });
  contentItem
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created contentItem successfully",
        createdContentItem: {
          _id: result._id,
          name: result.name,
          source: result.source,
          author: result.author,
          isFree: result.isFree,
          price: result.price,
          request: {
            type: "GET",
            url: "http://localhost:9000/contentItems/" + result._id
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

exports.contentItems_get_contentItem = (req, res, next) => {
  const id = req.params.contentItemId;
  Content_Item.findById(id)
    .select("_id name source author isFree price")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          contentItem: doc,
          request: {
            type: "GET",
            url: "http://localhost:9000/contentItems"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.contentItems_update_contentItem = (req, res, next) => {
  const id = req.params.contentItemId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Content_Item.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Content Item updated",
        request: {
          type: "GET",
          url: "http://localhost:9000/contentItems/" + id
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

exports.contentItems_delete = (req, res, next) => {
  const id = req.params.contentItemId;
  Content_Item.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "ContentItem deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/contentitems",
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
