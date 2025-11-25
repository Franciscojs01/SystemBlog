import mongoose from 'mongoose';

/**
 * userId: ObjectId;
 * content: String;
 * postId: ObjectId;
 */

const definition = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
  },
  content: { type: String, required: true },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    immutable: true,
  },
};

const commentSchema =
  new mongoose.Schema(definition, {timestamps: true});

export const Comment =
  mongoose.models.Comment || mongoose.model('Comment', commentSchema);
