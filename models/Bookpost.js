const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookpostSchema = new Schema({
  booktitle: {
    type: String,
    required: true,
  },
  quotation: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pagenumber: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bookpost", bookpostSchema);
