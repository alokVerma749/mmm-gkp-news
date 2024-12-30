const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  primary_tag: {
    type: String,
    enum: [
      "department",
      "events",
      "placements",
      "college_life",
      "hostel",
      "library",
      "alumni",
      "scholarships",
      "admissions",
    ],
    required: true,
  },
  secondary_tags: {
    type: [String],
    enum: ["CSE", "IT", "ITCA", "MBA", "MCA"],
    default: [],
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);

module.exports = Article;
