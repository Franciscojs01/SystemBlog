import { check, validationResult } from 'express-validator';

export function validationErrorHandler(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Erro de validação. Verifique os dados fornecidos.',
      errors: errors.array().map(error => ({ mensagem: error.msg })),
    });
  }

  next();
}

export const validateUserCreate = [
  check('name').notEmpty().withMessage('O nome é obrigatório.'),

  check('email')
    .notEmpty()
    .withMessage('O e-mail é obrigatório.')
    .isEmail()
    .withMessage('Formato de e-mail inválido.'),

  check('password').notEmpty().withMessage('A senha é obrigatória.'),

  check('role')
    .isIn(['author', 'viewer'])
    .withMessage("O cargo deve ser 'author' ou 'viewer'."),

  validationErrorHandler,
];

export const validateUserLogin = [
  check('email')
    .notEmpty()
    .withMessage('O e-mail é obrigatório.')
    .isEmail()
    .withMessage('Formato de e-mail inválido.'),

  check('password').notEmpty().withMessage('A senha é obrigatória.'),

  validationErrorHandler,
];
