import { Router } from 'express';

import PostController from '../controllers/post.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import {
  postFullRules,
  postIdRules,
  postPatchRules,
} from '../validators/post.validators.js';

const router = Router();

// POST /posts → Cadastrar post (manager ou author)
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['manager', 'author']),
  postFullRules,
  PostController.create,
);

// GET /posts → Listar todos os posts (qualquer cargo)
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['manager', 'author', 'viewer']),
  PostController.findAll,
);

// GET /posts/:id → Listar post pelo ID (qualquer cargo)
router.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'author', 'viewer']),
  postIdRules,
  PostController.findById,
);

// PUT /posts/:id → Editar completamente o post (manager ou author)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'author']),
  postFullRules,
  PostController.update,
);

// PATCH /posts/:id → Editar parcialmente o post (manager ou author)
router.patch(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'author']),
  postPatchRules,
  PostController.update,
);

// DELETE /posts/:id → Apagar o post (manager ou author)
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'author']),
  postIdRules,
  PostController.delete,
);

export default router;
