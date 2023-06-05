const express = require("express")
const bookpostRouter = express.Router()
const Bookpost = require("../models/Bookpost")

//Get All Posts
bookpostRouter.get("/", async (req, res, next) => {
  try {
    const allPosts = await Bookpost.find({ post: req.body.booktitle });
    return res.status(200).send(allPosts);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

//Get posts by user
bookpostRouter.get("/user", async (req, res, next) => {
  try {
    const userPosts = await Bookpost.find({ user: req.auth._id });
    return res.status(200).send(userPosts);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

//Add new Post
bookpostRouter.post("/", async (req, res, next) => {
  try {
    req.body.user = req.auth._id;
    const newPost = await Bookpost(req.body);
    const savedPost = await newPost.save();
    return res.status(201).send(savedPost);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

//Delete Post
bookpostRouter.delete("/:postId", async (req, res, next) => {
  try {
    const deletedPost = await Bookpost.findOneAndDelete({
      _id: req.params.postId,
      // user: req.auth._id,
    });
    return res
      .status(200)
      .send(`Successfully deleted your discussion thread: ${deletedPost.booktitle}`);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

//Update Post
bookpostRouter.put("/:postId", async (req, res, next) => {
  try {
    const updatedPost = await Bookpost.findOneAndUpdate(
      { _id: req.params.postId, user: req.auth._id }, //find this one to upddate
      { ...req.body, user: req.auth._id }, //update object with this data
      { new: true } //send back updated version
    );
    return res.status(201).send(updatedPost);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

// Update UP-vote
bookpostRouter.put("/:id/upvote", async (req, res, next) => {
  const id = req.params.postId;
  console.log(id);
  try {
    const result = await Bookpost.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: { upvotes: req.auth._id },
        $pull: { downvotes: req.auth._id },
      },
      { new: true }
    );
    return res.status(201).send(result);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

// Update DOWN-vote
bookpostRouter.put("/:id/downvote", async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const result = await Bookpost.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: { downvotes: req.auth._id },
        $pull: { upvotes: req.auth._id },
      },
      { new: true }
    );
    return res.status(201).send(result);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

module.exports = bookpostRouter