import UserRepository from '../repositories/user.repository.js';
import UserResponseDTO from '../dtos/user.dto.js';
import bcrypt from 'bcryptjs'; // ⬅️ IMPORTAR BCryptjs

class UserService {
  static async create(createUserDto) {
    // 1. Definir a role padrão se não for fornecida e criptografar a senha
    const defaultRole = 'viewer';
    const password = createUserDto.password;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      createUserDto.password = await bcrypt.hash(password, salt); // ⬅️ HASH DA SENHA
    }

    if (!createUserDto.role) {
      createUserDto.role = defaultRole;
    }

    const newUserFromDb = await UserRepository.create(createUserDto);

    return new UserResponseDTO(newUserFromDb);
  }

  static async getAllUsers() {
    return await UserRepository.findAll();
  }

  static async getById(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return new UserResponseDTO(user);
  }

  static async updateUser(userId, updateData) {
    // 2. Criptografar a senha se ela estiver sendo atualizada
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt); // ⬅️ HASH DA NOVA SENHA
    }

    const updatedUser = await UserRepository.update(userId, updateData);

    if (!updatedUser) {
      throw new Error('Usuário não encontrado');
    }

    return new UserResponseDTO(updatedUser);
  }

  static async delete(id) {
    const deletedUser = await UserRepository.delete(id);
    if (!deletedUser) {
      throw new Error('Usuário não encontrado para exclusão');
    }

    return deletedUser;
  }
}

export default UserService;
