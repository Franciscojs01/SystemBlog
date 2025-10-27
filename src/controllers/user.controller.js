import UserService from "../services/user.service.js";

class UserController {
  // [POST] /users
  static async create(req, res) {
    try {
        const createUserDto = req.body;

        const newUser = await UserService.create(createUserDto);

        return res.status(201).json(newUser);
    } catch (error) {
      console.error('Erro ao criar usuário: ', error.message);

      if (error.message.includes('Email ou nome de usuário já está em uso')) {
        return res.status(400).json({
          message: error.message
        });
      }

      return res.status(500).json({
        message: 'Falha interna do servidor ao criar o usuário.',
        error: error.message
      });
    }
  }
}
