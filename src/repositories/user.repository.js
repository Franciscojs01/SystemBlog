import {User} from '../models/User.js';

class UserRepository {
  async create(userData)  {
    const newUser = await User.create(userData);

    return newUser;
  }
}

export default UserRepository;
