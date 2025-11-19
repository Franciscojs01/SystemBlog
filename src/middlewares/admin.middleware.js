const adminMiddleware = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({
      mensagem: 'Acesso negado. Requer privilégios de administrador.',
    });
  }

  next();
};

export default adminMiddleware;
