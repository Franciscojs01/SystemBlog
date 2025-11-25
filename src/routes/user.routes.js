import { Router } from 'express';

import UserController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import {
  userFullRules,
  userIdRules,
  userPatchRules,
} from '../validators/user.validators.js';

const router = Router();

// POST /users → Cadastrar usuário (qualquer cargo)
router.post('/', userFullRules, UserController.create);

// GET /users → Listar todos os usuários (apenas manager)
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['manager']),
  UserController.findAll,
);

// GET /users/:id → Listar usuário pelo ID (apenas manager)
router.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager']),
  userIdRules,
  UserController.findById,
);

// PUT /users/:id → Editar completamente o usuário (apenas manager)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager']),
  userFullRules,
  UserController.update,
);

// PATCH /users/:id → Editar parcialmente o usuário (qualquer cargo)
router.patch(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'author', 'viewer']),
  userPatchRules,
  UserController.patch,
);

// DELETE /users/:id → Apagar usuário (apenas manager)
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager']),
  userIdRules,
  UserController.delete,
);

export default router;
