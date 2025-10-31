import { check } from 'express-validator';
import { validationErrorHandler } from './userValidator.js';

export const validatePostCreate = [
  check('author')
    .notEmpty()
    .withMessage('O nome é obrigatório.')
    .isMongoId()
    .withMessage('O ID do autor é inválido.'),

  check('title').notEmpty().withMessage('O título é obrigatório.'),

  check('content').notEmpty().withMessage('O conteúdo é obrigatório.'),

  check('thumbnail')
    .notEmpty()
    .withMessage('O content é obrigatório.')
    .isBase64()
    .withMessage('A thumbnail deve está no formato Base64.'),

  validationErrorHandler,
];
