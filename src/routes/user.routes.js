import { Router } from 'express';

import UserController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = Router();

router.post('/', UserController.create);

router.get('/', authMiddleware, roleMiddleware(['manager']), UserController.findAll);

router.get('/:id', authMiddleware, roleMiddleware(['manager']), UserController.findById);

router.put('/:id', authMiddleware, roleMiddleware(['manager']), UserController.update);

router.patch('/:id', authMiddleware, roleMiddleware(['manager', 'author', 'viewer']), UserController.patch);

router.delete('/:id', authMiddleware, roleMiddleware(['manager']), UserController.delete);

export default router;
