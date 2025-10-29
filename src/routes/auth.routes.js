import { Router } from 'express';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository.js';

const router = Router();

const JWT_SECRET = 'sua-chave-super-secreta-e-longa-12345';

router.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({ mensagem: 'Login e senha são obrigatórios.' });
  }

  try {
    const user = await userRepository.findByLogin(login);

    if (!user) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    if (user.senha !== senha) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const payload = {
      userId: user.id,
      login: user.login,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token: token });

  } catch (error) {
    console.error("Erro interno do servidor ao tentar autenticar: ", error);

    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }

});

export default router;
