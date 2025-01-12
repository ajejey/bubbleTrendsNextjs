const mongoose = require('mongoose')
const crypto = require('crypto')

const LikeSchema = new mongoose.Schema({
  postSlug: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
    unique: true  // Ensure unique user identifier
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  indexes: [
    { fields: { postSlug: 1, userId: 1 }, unique: true }
  ]
})

// Prevent duplicate likes from the same user
LikeSchema.index({ postSlug: 1, userId: 1 }, { unique: true })

module.exports = mongoose.models.Like || mongoose.model('Like', LikeSchema)
