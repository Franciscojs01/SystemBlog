import CommentRepository from '../repositories/comment.repository.js';
import CommentResponseDTO from '../dtos/comment.dto.js';
import UserResponseDTO from '../dtos/user.dto.js';

class CommentService {
  static async create(createCommentDto) {
    const newCommentDb = await CommentRepository.create(createCommentDto);
    return new CommentResponseDTO(newCommentDb);
  }

  static async findByUser(userId) {
    const comment = await CommentRepository.findByUserId(userId);
    if (!comment) {
      throw new Error('Comentário não existe');
    }

    return new UserResponseDTO(comment);
  }

  static async findAll() {
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
