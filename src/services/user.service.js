import UserRepository from '../repositories/user.repository.js';
import UserResponseDTO from '../dtos/user.dto.js';

class UserService {
  static async create(userData) {
    const newUser = await UserRepository.create(userData);
    return new UserResponseDTO(newUser);
  }

  static async getAllUsers() {
    return await UserRepository.findAll();
  }

  static async getById(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return new UserResponseDTO(user);
  }

  static async updateUserInfo(id, userData) {
    const updatedUser = await UserRepository.update(id, userData);
    if (!updatedUser) {
      throw new Error('Usuário não encontrado para atualização.');
    }

    return new UserResponseDTO(updatedUser);
  }

  static async delete(id) {
    const deletedUser = await UserRepository.delete(id);
    if (!deletedUser) {
      throw new Error('Usuário não encontrado para exclusão.');
    }

    return deletedUser;
  }
}

export default UserService;
