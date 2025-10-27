import UserRepository from '../repositories/user.repository.js';
import UserResponseDTO from "../dtos/user.dto.js";
import userRepository from "../repositories/user.repository.js";

class UserService {
  static async create(createUserDto) {

    const newUserFromDb = await UserRepository.create(createUserDto);

    return new UserResponseDTO(newUserFromDb);
  }

  static async getAllUsers() {
    return await userRepository.findAll();
  }

  static async getById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return new UserResponseDTO(user);
  }

  static async updateUserInfo(userId, updateData) {
    const updateUser = await userRepository.update(userId, updateData);

    if (!updateUser) {
      throw new Error('Usuário não encontrado');
    }

    return new UserResponseDTO(updateUser);
  }

  static async delete(id) {
    const deletedUser = await userRepository.delete(id);
    if (!deletedUser) {
      throw new Error('Usuário não encontrado para exclusão');
    }

    return deletedUser;
  }


}

export default UserService;
