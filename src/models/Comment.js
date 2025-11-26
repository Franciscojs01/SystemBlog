import mongoose from 'mongoose';

const definition = {
  name: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    immutable: true,
  },
  text: String,
};

const commentSchema = new mongoose.Schema(definition, {
  timestamps: { createdAt: true, updatedAt: false },
});

export const Comment =
  mongoose.models.Comment || mongoose.model('Comment', commentSchema);
