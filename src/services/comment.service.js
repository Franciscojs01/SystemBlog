import CommentRepository from '../repositories/comment.repository.js';
import CommentResponseDTO from '../dtos/comment.dto.js';

class CommentService {
  static async create(commentData) {
    const newComment = await CommentRepository.create(commentData);

    return new CommentResponseDTO(newComment);
  }

  static async getAllComments() {
    return await CommentRepository.findAll();
  }

  static async getByUserId(userId) {
    const comment = await CommentRepository.findByUserId(userId);

    if (!comment) {
      throw new Error('Comentário não encontrado.');
    }

    return new CommentResponseDTO(comment);
  }

  static async getByPostId(postId) {
    const comment = await CommentRepository.findByPostId(postId);

    if (!comment) {
      throw new Error('Comentário não encontrado.');
    }

    return new CommentResponseDTO(comment);
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
