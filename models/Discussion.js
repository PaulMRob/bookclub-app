const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
  discussion: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  postID: {
    type: Schema.Types.ObjectId,
    ref: "Bookpost",
    required: true,
  },
});

module.exports = mongoose.model("Discussion", discussionSchema);
