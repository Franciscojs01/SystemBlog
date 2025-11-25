import UserService from '../services/user.service.js';

class UserController {
  static async create({ body }, res) {
    try {
      const newUser = await UserService.create(body);

      return res
        .status(201)
        .json({ message: 'Usuário criado com sucesso!', newUser });
    } catch (error) {
      if (error.message.includes('Este e-mail já está em uso.')) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({
        message: 'Falha interna do servidor ao criar o usuário.',
        error: error.message,
      });
    }
  }

  static async findAll(req, res) {
    try {
      const users = await UserService.getAllUsers();

      return res.status(200).json(users);
      // return res.status(200).render('users', { users });
    } catch (error) {
      return res.status(500).json({
        message: 'Falha interna do servidor',
        error: error.message,
      });
    }
  }

  static async findById({ params }, res) {
    try {
      const user = await UserService.getById(params.id);

      return res.status(200).json(user);
    } catch (error) {
      if (error.message.includes('Usuário não encontrado')) {
        return res.status(400).json({ message: error.message });
      }

      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'ID de usuário inváll' });
      }

      return res.status(500).json({
        message: 'Falha interna do servidor',
        error: error.message,
      });
    }
  }

  static async update({ body, params }, res) {
    try {
      const updatedUser = await UserService.updateUser(params.id, body);

      return res.status(200).json(updatedUser);
    } catch (error) {
      if (error.message.includes('Usuário não encontrado')) {
        return res.status(404).json({ message: error.message });
      }

      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'ID de usuário inválido.' });
      }

      if (
        error.name === 'ValidationError' ||
        error.message.includes('está em uso')
      ) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({
        message: 'Falha interna do servidor ao atualizar o usuário.',
        error: error.message,
      });
    }
  }

  static async patch({ body, params }, res) {
    try {
      if (Object.keys(body).length === 0) {
        return res
          .status(400)
          .json({ message: 'Nenhum dado fornecido para atualização parcial.' });
      }

      const updatedUser = await UserService.patch(id, updateData);

      return res.status(200).json(updatedUser);
    } catch (error) {
      if (error.message.includes('Usuário não encontrado')) {
        return res.status(404).json({ message: error.message });
      }

      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'ID de usuário inválido.' });
      }

      if (
        error.name === 'ValidationError' ||
        (error.code && error.code === 11000)
      ) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({
        message:
          'Falha interna do servidor ao atualizar parcialmente o usuário.',
        error: error.message,
      });
    }
  }

  static async delete({ params }, res) {
    try {
      const deletedUser = await UserService.delete(params.id);

      return res.status(200).json({
        message: 'Usuário deletado com sucesso.',
        deletedUser: deletedUser,
      });
    } catch (error) {
      if (error.message.includes('Usuário não encontrado')) {
        return res.status(404).json({ message: error.message });
      }

      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'ID de usuário inválido.' });
      }

      return res.status(500).json({
        message: 'Falha interna do servidor ao deletar o usuário.',
        error: error.message,
      });
    }
  }
}

export default UserController;
