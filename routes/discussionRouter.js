const express = require("express");
const discussionRouter = express.Router();
const Discussion = require("../models/Discussion");
const Bookpost = require("../models/Bookpost");
const User = require("../models/User");

//get all discussion for a post
discussionRouter.get("/:postId", async (req, res, next) => {
  try {
    const allPostDiscussions = await Discussion.find({
      postID: req.params.postId,
    });
    return res.status(200).send(allPostDiscussions);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

//get discussion by user
discussionRouter.get("/user", async (req, res, next) => {
  try {
    const userDiscussions = await Discussion.find({ discussion: req.auth._id });
    return res.status(200).send(userDiscussions);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

//add a discussion
discussionRouter.post("/:postId", async (req, res, next) => {
  try {
    const discussion = {
      discussion: req.body.discussion,
      username: req.auth.username,
      postID: req.params.postId,
    };
    console.log("req.auth:", req.auth);
    console.log("add a discussion:", discussion);
    const newDiscussion = new Discussion(discussion);
    const savedDiscussion = await newDiscussion.save();
    return res.status(201).send(savedDiscussion);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

discussionRouter.delete("/:discussionId", async (req, res, next) => {
  try {
    const deletedDiscussion = await Discussion.findOneAndDelete({
      _id: req.params.discussionId,
    });
    if (!deletedDiscussion) {
      res.status(404).send("Deleted discussion not found!");
    }
    res.status(200).send("Successfully deleted your discussion");
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

module.exports = discussionRouter;
