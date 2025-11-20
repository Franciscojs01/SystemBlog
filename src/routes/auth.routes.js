import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userRepository from '../repositories/user.repository.js';

const router = Router();

const JWT_SECRET = 'sua-chave-super-secreta-e-longa-12345';

router.post('/login', async ({ email, password }, res) => {
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

    // 2. Comparar a senha fornecida com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Se a senha for inválida, retorne erro
    if (!isPasswordValid) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    // 3. Se as credenciais são válidas, gerar o token
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
