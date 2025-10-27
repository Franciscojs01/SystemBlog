import UserRepository from '../repositories/user.repository.js';
import UserResponseDTO from "../dtos/user.dto.js";

class UserService {
  static async create(createUserDto) {

    const newUserFromDb = await UserRepository.create(createUserDto);

    return new UserResponseDTO(newUserFromDb);
  }
}

export default UserService;
