import { check, param } from 'express-validator';
import { validationErrorHandler } from './user.validators.js';

export const commentFullRules = [
  check('content')
    .notEmpty()
    .withMessage('O conteúdo é obrigatório.')
    .isString()
    .withMessage('O conteúdo deve ser no formato de texto.'),

  validationErrorHandler,
]

export const commentIdRules = [
  param('id').isUUID().withMessage('O ID do comentário não tem formato válido.'),

  validationErrorHandler,
];
