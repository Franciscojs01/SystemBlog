import jwt from 'jsonwebtoken';

const JWT_SECRET = 'sua-chave-super-secreta-e-longa-12345';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensagem: "Acesso negado. Token não fornecido.",
      details: "O cabeçalho Authorization está faltando."
    });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      mensagem: "Formato de token inválido.",
      details: "O formato esperado é 'Bearer <token>'."
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ mensagem: "Token expirado. Faça login novamente." });
    }

    return res.status(401).json({ mensagem: "Token inválido ou corrompido." });
  }
};

export default authMiddleware;
