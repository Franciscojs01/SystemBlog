import mongoose from 'mongoose';

/**
 * author: ObjectId;
 * title: String;
 * content: String;
 * thumbnail: String (URL);
 * tags: String[];
 */

const definition = {
  title: { type: String, required: true },
  content: { type: String, required: true },
  thumbnail: { type: String, required: true },
  tags: { type: [String], required: true },
};

const postSchema = new mongoose.Schema(definition, { timestamps: true });

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
