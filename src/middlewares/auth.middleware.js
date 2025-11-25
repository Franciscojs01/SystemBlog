import jwt from 'jsonwebtoken';

async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ mensagem: 'Acesso negado. Token não fornecido.' });
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ mensagem: 'Formato de token inválido.' });
  }

  const [_, token] = parts;

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    console.log(req.user);

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ mensagem: 'Token expirado. Faça o login novamente.' });
    }

    return res.status(401).json({ mensagem: 'Token inválido ou corrompido.' });
  }
}

export default authMiddleware;
