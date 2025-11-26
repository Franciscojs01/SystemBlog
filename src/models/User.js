import mongoose from 'mongoose';

const definition = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: [String],
    enum: ['manager', 'author', 'viewer'],
    default: ['viewer'],
    required: true,
  },
};

const userSchema = new mongoose.Schema(definition, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
