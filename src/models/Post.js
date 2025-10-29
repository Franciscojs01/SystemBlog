import mongoose from 'mongoose';

/**
 * title: String;
 * content: String;
 * author: ObjectId;
 * createdAt: Date;
 * updatedAt: Date;
 */

const definition = {
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
};

const postSchema = new mongoose.Schema(definition);

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
