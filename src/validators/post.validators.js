import { check, param } from 'express-validator';
import { validationErrorHandler } from './user.validators.js';

export const postFullRules = [
  check('author')
    .notEmpty()
    .withMessage('O nome é obrigatório.')
    .isMongoId()
    .withMessage('O ID do autor não tem formato válido.'),

  check('title')
    .notEmpty()
    .withMessage('O título é obrigatório.')
    .isString()
    .withMessage('O título deve ser no formato de texto.'),

  check('content')
    .notEmpty()
    .withMessage('O conteúdo é obrigatório.')
    .isString()
    .withMessage('O conteúdo deve ser no formato de texto.'),

  check('thumbnail')
    .notEmpty()
    .withMessage('O endereço da thumnail é obrigatório.')
    .isBase64()
    .withMessage('A thumbnail deve está no formato Base64.'),

  check('tags')
    .notEmpty()
    .withMessage('As tags são obrigatórias.')
    .isArray({ max: 3, min: 1 })
    .withMessage('O post deve ter pelo menos uma tag e no máximo três.'),

  check('tags.*')
    .isString()
    .withMessage('As tags devem ser no formato de texto.'),

  validationErrorHandler,
];

export const postPatchRules = [
  check('author')
    .optional()
    .isMongoId()
    .withMessage('O ID do autor não tem formato válido.'),

  check('title')
    .optional()
    .isString()
    .withMessage('O título deve ser no formato de texto.'),

  check('content')
    .optional()
    .isString()
    .withMessage('O conteúdo deve ser no formato de texto.'),

  check('thumbnail')
    .optional()
    .isBase64()
    .withMessage('A thumbnail deve está no formato Base64.'),

  check('tags')
    .optional()
    .isArray({ max: 3, min: 1 })
    .withMessage('O post deve ter pelo menos uma tag e no máximo três.'),

  validationErrorHandler,
];

export const postIdRules = [
  param('id').isUUID().withMessage('O ID do post não tem formato válido.'),

  validationErrorHandler,
];
