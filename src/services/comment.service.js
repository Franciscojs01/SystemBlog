import CommentRepository from '../repositories/comment.repository.js';
import CommentResponseDTO from '../dtos/comment.dto.js';
import commentDto from '../dtos/comment.dto.js';
import mongoose from 'mongoose';

class CommentService {
  static async create(commentData) {
    const newComment = await CommentRepository.create(commentData);

    return new CommentResponseDTO(newComment);
  }

  static async getAllComments() {
    return await CommentRepository.findAll();
  }

  static async getByPostId(postId) {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      const err = new Error('ID de post inválido');
      err.name = 'CastError';
      throw err;
    }

    const comment = await CommentRepository.findByPostId(postId);

    if (!comment) {
      throw new Error('Comentário não encontrado.');
    }

    return comment.map(c => new commentDto(c));
  }

  static async delete(id) {
    const deletedComment = await CommentRepository.delete(id);

    if (!deletedComment) {
      throw new Error('Comentário não encontrado para exclusão.');
    }

    return deletedComment;
  }
}

export default CommentService;
