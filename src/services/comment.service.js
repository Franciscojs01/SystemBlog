import CommentRepository from '../repositories/comment.repository.js';
import CommentResponseDTO from '../dtos/comment.dto.js';
import { Comment } from '../models/Comment.js';

class CommentService {
  static async create(createCommentDto) {
    const newCommentDb = await CommentRepository.create(createCommentDto);
    return new CommentResponseDTO(newCommentDb);
  }

  static async findByUser(userId) {
    const comments = await CommentRepository.findByUserId( userId );

    if (!comments) {
      throw new Error('Nenhum comentário encontrado para este usuário');
    }

    return comments.map(comment => new CommentResponseDTO(comment));
  }


  static async getAllComments() {
    return await CommentRepository.findAll();
  }

  static async delete(id) {
    const deletedComment = await CommentRepository.delete(id);
    if (!deletedComment) {
      throw new Error('Comentário não encontrado para exclusão');
    }

    return deletedComment;
  }
}

export default CommentService;
