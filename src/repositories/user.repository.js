import {User} from '../models/User.js';

class UserRepository {
  async create(userData)  {
    const newUser = await User.create(userData);

    return newUser;
  }

  async findAll() {
    const users = await User.find();
    return users;
  }

  async findById(id) {
    const user = await User.findById(id);
    return user;
  }

  async update(id, updateData) {
    const updateUser = await User.findByIdAndUpdate(
      id,
      updateData,
      {new: true, runValidators: true}
    );

    return updateUser;
  }

  async delete(id) {
    const result = await User.findByIdAndDelete(id);

    return result;
  }
}

export default new UserRepository();
