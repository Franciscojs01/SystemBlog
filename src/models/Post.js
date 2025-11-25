import mongoose from 'mongoose';

const definition = {
  title: String,
  content: String,
  thumbnail: String,
  tags: [String],
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
  },
  authorName: {
    type: String,
    required: true,
    immutable: true,
  },
};

const postSchema = new mongoose.Schema(definition, { timestamps: true });

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
