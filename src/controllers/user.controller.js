import UserService from '../services/user.service.js';

class UserController {
  static async create(req, res) {
    try {
      const createUserDto = req.body;

      const newUser = await UserService.create(createUserDto);

      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Erro ao criar usuário: ', error.message);

      if (error.message.includes('Email ou nome de usuário já está em uso')) {
        return res.status(400).json({
          message: error.message,
        });
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
    } catch (error) {
      console.error('Erro ao buscar usuários: ', error.message);
      return res.status(500).json({
        message: 'Falha interna do servidor',
        error: error.message,
      });
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.getById(id);

      return res.status(200).json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário: ', error.message);

      if (error.message.includes('Usuário não encontrado')) {
        return res.status(400).json({ message: error.message });
      }

      if (error.name == 'CastError') {
        return res.status(400).json({ message: 'ID de usuário inváll' });
      }

      return res.status(500).json({
        message: 'Falha interna do servidor',
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedUser = await UserService.updateUser(id, updateData);

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);

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

  static async patch(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          message: 'Nenhum dado fornecido para atualização parcial.',
        });
      }

      const updatedUser = await UserService.updateUser(id, updateData);

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Erro ao aplicar patch no usuário:', error.message);

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

  static async delete(req, res) {
    try {
      const { id } = req.params;

      const deletedUser = await UserService.delete(id);

      return res.status(200).json({
        message: 'Usuário deletado com sucesso.',
        deletedUser: deletedUser,
      });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error.message);

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
