import { Comment } from '../models/Comment.js';

class CommentRepository {
  async create(commentData) {
    return Comment.create(commentData);
  }

  async findAll() {
    return await Comment.find();
  }

  async findByPostId(postId) {
    return await Comment.find({ postId });
  }


  async delete(id) {
    return await Comment.findByIdAndDelete(id);
  }
}

export default new CommentRepository();
