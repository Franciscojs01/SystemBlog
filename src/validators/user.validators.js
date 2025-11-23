import { check, validationResult } from 'express-validator';

export function validationErrorHandler(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Erro de validação. Verifique os dados fornecidos.',
      errors: errors.array().map(e => ({ mensagem: e.msg })),
    });
  }

  next();
}

export const userFullRules = [
  check('name')
    .notEmpty()
    .withMessage('O nome é obrigatório.')
    .isString()
    .withMessage('O nome deve ser no formato de texto.'),

  check('email')
    .notEmpty()
    .withMessage('O e-mail é obrigatório.')
    .isEmail()
    .withMessage('Formato de e-mail inválido.'),

  check('password')
    .notEmpty()
    .withMessage('A senha é obrigatória.')
    .isString()
    .withMessage('A senha deve ser no formato de texto.'),

  check('role')
    .isArray({ min: 1 })
    .withMessage('O usuário deve ter pelo menos um cargo.'),

  check('role.*')
    .isString()
    .withMessage('O cargo deve ser no formato de texto.')
    .isIn(['manager', 'author', 'viewer'])
    .withMessage('O cargo deve ser "manager", "author" ou "viewer".'),

  validationErrorHandler,
];

export const userPatchRules = [
  check('name')
    .optional()
    .isString()
    .withMessage('O nome deve ser no formato de texto.'),

  check('email')
    .optional()
    .isEmail()
    .withMessage('Formato de e-mail inválido.'),

  check('password')
    .optional()
    .isString()
    .withMessage('A senha deve ser no formato de texto.'),

  check('role')
    .optional()
    .isArray({ min: 1 })
    .withMessage('O usuário deve ter pelo menos um cargo.'),

  check('role.*')
    .isString()
    .withMessage('O cargo deve ser no formato de texto.')
    .isIn(['manager', 'author', 'viewer'])
    .withMessage('O cargo deve ser "manager", "author" ou "viewer".'),

  validationErrorHandler,
];

export const userLoginRules = [
  check('email')
    .notEmpty()
    .withMessage('O e-mail é obrigatório.')
    .isEmail()
    .withMessage('Formato de e-mail inválido.'),

  check('password')
    .notEmpty()
    .withMessage('A senha é obrigatória.')
    .isString()
    .withMessage('A senha deve ser no formato de texto.'),

  validationErrorHandler,
];

export const userIdRules = [
  param('id').isUUID().withMessage('O ID do usuário não tem formato válido.'),

  validationErrorHandler,
];
