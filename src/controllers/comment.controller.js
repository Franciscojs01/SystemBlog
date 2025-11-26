import CommentService from '../services/comment.service.js';

class CommentController {
  static async create({body, user, params}, res) {
    try {
      const createCommentDto = {
        ...body,
        userId: user.id,
        postId: params.id,
      };

      const newComment = await CommentService.create(createCommentDto);

      return res.status(201).json({message: "Comentário criado com sucesso!", newComment});
    } catch (error) {
      console.error('Erro ao criar comentário: ', error.message);

      return res.status(500).json({
        message: 'Falha interna do servidor ao criar comentário.',
        error: error.message,
      });
    }
  }

  static async findMyComments(req, res) {
    try {
      const userId = req.user.id;

      const comments = await CommentService.findByUser(userId);

      return res.status(200).json({ comments });
    } catch (error) {
      console.error('Erro ao buscar comentários do usuário:', error.message);

      return res.status(500).json({
        message: 'Falha interna ao buscar comentários do usuário.',
        error: error.message
      });
    }
  }

  static async findAll(req, res) {
    try {
      const comments = await CommentService.getAllComments();
      return res.status(200).json('comments', {comments});
    } catch (error) {
      console.error('Erro ao buscar comentários: ', error.message);
      return res.status(500).json({
        message: 'Falha interna do servidor',
        error: error.message,
      })
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      const deletedComment = await CommentService.delete(id);

      return res.status(200).json({
        message: 'Comentário deletado com sucesso.',
        deletedComment: deletedComment,
      });
    } catch (error) {
      console.error('Error ao deletar comentário:', error.message);

      if (error.userId === 'CastError') {
        return res.status(400).json({ message: 'ID de comentário inválido.'});
      }

      return res.status(500).json({
        message: 'Falha interna do servidor',
        error: error.message,
      });
    }
  }
}

export default CommentController;
