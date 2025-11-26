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

  static async findByLoggedUser({ user }, res) {
    try {
      const comment = await CommentService.getByUserId(user.id);

      return res.status(200).json(comment);
    } catch (error) {
      if (error.message.includes('Comentário não encontrado')) {
        return res.status(400).json({ message: error.message });
      }

      if (error.email === 'CastError') {
        return res
          .status(400)
          .json({ message: 'Não há nenhum comentário ligado a este usuário.' });
      }

      return res.status(500).json({
        message: 'Falha interna do servidor!',
        error: error.message,
      });
    }
  }

  static async findByUserId({ params }, res) {
    try {
      const comment = await CommentService.getByUserId(params.id);

      return res.status(200).json(comment);
    } catch (error) {
      if (error.message.includes('Comentário não encontrado')) {
        return res.status(400).json({ message: error.message });
      }

      if (error.email === 'CastError') {
        return res
          .status(400)
          .json({ message: 'Não há nenhum comentário ligado a este e-mail.' });
      }

      return res.status(500).json({
        message: 'Falha interna do servidor!',
        error: error.message,
      });
    }
  }

  static async findByPostId({ params }, res) {
    try {
      const comment = await CommentService.getByPostId(params.id);

      return res.status(200).json(comment);
    } catch (error) {
      if (error.message.includes('Comentário não encontrado')) {
        return res.status(400).json({ message: error.message });
      }

      if (params.id === 'CastError') {
        return res.status(400).json({ message: 'ID de comentário inválido.' });
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
