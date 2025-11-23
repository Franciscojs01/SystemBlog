import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository.js';

const router = Router();

const JWT_SECRET = 'sua-chave-super-secreta-e-longa-12345';

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ mensagem: 'Email e senha são obrigatórios.' });
  }

  try {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token: token });
  } catch (error) {
    console.error('Erro interno do servidor ao tentar autenticar: ', error);

    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});

export default router;
