function roleMiddleware(roles = []) {
  return ({ user }, res, next) => {
    if (!user) {
      return res.status(404).json({ message: 'Usuário não informado.' });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: 'Acesso negado. Usuário não possui permissões suficientes.',
      });
    }

    next();
  };
}

export default roleMiddleware;
