import { Post } from '../models/Post.js';

class PostRepository {
  async create(postData) {
    const newPost = await Post.create(postData);

    return newPost;
  }

  async findAll() {
    const posts = await Post.find();

    return posts;
  }

  async findById(id) {
    const post = await Post.findById(id);

    return post;
  }

  async update(id, postData) {
    const updatedPost = await Post.findByIdAndUpdate(id, postData, {
      new: true,
      runValidators: true,
    });

    return updatedPost;
  }

  async delete(id) {
    const result = await Post.findByIdAndDelete(id);

    return result;
  }
}

export default new PostRepository();
