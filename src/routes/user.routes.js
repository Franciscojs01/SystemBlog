import { Router } from 'express';

import UserController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';
import {
  userFullRules,
  userIdRules,
  userPatchRules,
} from '../validators/user.validators.js';

const router = Router();

// POST /users → Cadastrar usuário (qualquer cargo)
router.post('/', userFullRules, UserController.create);

// GET /users → Listar todos os usuários (apenas manager)
router.get('/', adminMiddleware, authMiddleware, UserController.findAll);

// GET /users/:id → Listar usuário pelo ID (apenas manager)
router.get(
  '/:id',
  userIdRules,
  adminMiddleware,
  authMiddleware,
  UserController.findById,
);

// PUT /users/:id → Editar completamente o usuário (apenas manager)
router.put(
  '/:id',
  userFullRules,
  adminMiddleware,
  authMiddleware,
  UserController.update,
);

// PATCH /users/:id → Editar parcialmente o usuário (qualquer cargo)
router.patch(
  '/:id',
  userPatchRules,
  adminMiddleware,
  authMiddleware,
  UserController.update,
);

// DELETE /users/:id → Apagar o usuário (apenas manager)
router.delete(
  '/:id',
  userIdRules,
  adminMiddleware,
  authMiddleware,
  UserController.delete,
);

export default router;
