import {Comment} from '../models/Comment.js';

class CommentRepository {
  async create(commentData) {
    return Comment.create(commentData);
  }

  async findByUserId(userId) {
    return await Comment.find({userId: userId});
  }

  async findAll() {
    return await Comment.find();
  }

  async delete(id) {
    return await Comment.findByIdAndDelete(id);
  }
}

export default new CommentRepository();
