function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: error.statusCode
      ? error.message
      : 'Ocorreu um erro interno no servidor.',
  });
}

export default errorHandler;
