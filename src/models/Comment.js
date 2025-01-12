const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  postSlug: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 500
  },
  author: {
    name: {
      type: String,
      default: 'Anonymous',
      maxlength: 50
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: 'Please enter a valid email'
      }
    },
    temporaryToken: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '365d'
  }
}, {
  timestamps: true
})

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)
