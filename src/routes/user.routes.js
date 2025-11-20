import { Router } from 'express';

import UserController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';

const router = Router();

router.post('/', UserController.create);

router.get('/', adminMiddleware, authMiddleware, UserController.findAll);

router.get('/:id', adminMiddleware, authMiddleware, UserController.findById);

router.put('/:id', adminMiddleware, authMiddleware, UserController.update);

router.patch('/:id', adminMiddleware, authMiddleware, UserController.update);

router.delete('/:id', adminMiddleware, authMiddleware, UserController.delete);

export default router;
