import { check, param } from 'express-validator';
import { validationErrorHandler } from './user.validators.js';

export const commentFullRules = [
  check('text')
    .notEmpty()
    .withMessage('O texto do comentário é obrigatório.')
    .isString()
    .withMessage('O texto deve ser no formato de texto.'),

  validationErrorHandler,
];

export const commentEmailRules = [
  param('id')
    .isMongoId()
    .withMessage('O ID do usuário não tem formato válido.'),

  validationErrorHandler,
];

export const commentIdRules = [
  param('id')
    .isMongoId()
    .withMessage('O ID do comentário não tem formato válido.'),

  validationErrorHandler,
];
