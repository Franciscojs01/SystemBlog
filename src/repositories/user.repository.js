import { User } from '../models/User.js';

class UserRepository {
  async create(userData) {
    return User.create(userData);
  }

  async findByLogin(login) {
    return await User.findOne({ login });
  }

  async findAll() {
    return await User.find();
  }

  async findById(id) {
    return await User.findById(id);
  }

  async update(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserRepository();
