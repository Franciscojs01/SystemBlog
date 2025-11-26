import CommentService from '../services/comment.service.js';

class CommentController {
  static async create({ body, user, params }, res) {
    try {
      const commentData = {
        ...body,
        name: user.name,
        userId: user.id,
        postId: params.id,
      };

      const newComment = await CommentService.create(commentData);

      return res.status(201).json({
        message: 'Comentário criado com sucesso!',
        newComment,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Falha interna do servidor ao criar comentário.',
        error: error.message,
      });
    }
  }

  static async findAll(req, res) {
    try {
      const comments = await CommentService.getAllComments();

      return res.status(200).json({ comments });
    } catch (error) {
      return res.status(500).json({
        message: 'Falha interna do servidor',
        error: error.message,
      });
    }
  }

  static async findByPostId({ params }, res) {
    try {
      const comments = await CommentService.getByPostId(params.id);

      return res.status(200).json({ comments }); // agora retorna um array
    } catch (error) {
      if (error.name === 'CastError' || error.message.includes('CastError')) {
        return res.status(400).json({ message: 'ID de post inválido.' });
      }

      if (error.message && error.message.includes('Comentário não encontrado')) {
        return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({
        message: 'Falha interna do servidor!',
        error: error.message,
      });
    }
  }

  static async delete({ params }, res) {
    try {
      const deletedComment = await CommentService.delete(params.id);

      return res.status(200).json({
        message: 'Comentário deletado com sucesso.',
        deletedComment: deletedComment,
      });
    } catch (error) {
      if (params.id === 'CastError') {
        return res.status(400).json({ message: 'ID de comentário inválido.' });
      }

      return res.status(500).json({
        message: 'Falha interna do servidor',
        error: error.message,
      });
    }
  }
}

export default CommentController;
