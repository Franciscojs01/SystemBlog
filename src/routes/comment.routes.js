import { Router } from 'express';

import CommentController from '../controllers/comment.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import {
  commentFullRules,
  commentIdRules,
  commentEmailRules,
} from '../validators/comment.validators.js';

const router = new Router();

router.post(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'author']),
  commentFullRules,
  CommentController.create,
);

// OK
// Listar todos os comentários
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['manager']),
  CommentController.findAll,
);

// Listar comentários do usuário logado
// router.get(
//   '/me',
//   authMiddleware,
//   roleMiddleware(['manager', 'author', 'viewer']),
//   CommentController.findByLoggedUser,
// );

// Listar todos os comentários de um usuário específico a partir do id
// router.get(
//   '/u/:id',
//   authMiddleware,
//   roleMiddleware(['manager']),
//   // commentEmailRules,
//   CommentController.findByUserId,
// );

// Listar comentários de um post específico
router.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'author', 'viewer']),
  commentIdRules,
  CommentController.findByPostId,
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'author']),
  commentIdRules,
  CommentController.delete,
);

export default router;
