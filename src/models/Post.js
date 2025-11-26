import mongoose from 'mongoose';

const definition = {
  title: { type: String, required: true },
  content: { type: String, required: true },
  thumbnail: { type: String, required: true },
  tags: { type: [String], required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
  },
  authorName: {
    type: String,
    ref: 'User',
    required: true,
    immutable: true,
  },
};

const postSchema = new mongoose.Schema(definition, { timestamps: true });

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
