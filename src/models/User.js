import mongoose from 'mongoose';

/**
 * name: String;
 * email: String;
 * password: String (hash);
 * role: ‘author' | 'viewer’;
 */

const definition = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['author', 'viewer'], default: 'viewer' },
};

const userSchema = new mongoose.Schema(definition, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
