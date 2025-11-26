import { Post } from '../models/Post.js';

class PostRepository {
  async create(postData) {
    return await Post.create(postData);
  }

  async findAll() {
    return await Post.find();
  }

  async findAllByAuthorId(authorId) {
    return await Post.find({ authorId });
  }

  async findById(id) {
    return await Post.findById(id);
  }

  async update(id, postData) {
    return await Post.findByIdAndUpdate(id, postData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await Post.findByIdAndDelete(id);
  }
}

export default new PostRepository();
