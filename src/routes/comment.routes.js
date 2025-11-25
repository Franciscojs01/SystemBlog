import { Router } from 'express';

import CommentController from '../controllers/comment.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = new Router();

router.post('/', authMiddleware, roleMiddleware(['manager', 'author']), CommentController.create);

router.get('/', authMiddleware, roleMiddleware(['manager', 'author', 'viewer']), CommentController.findAll)

router.get('/:id', authMiddleware, roleMiddleware(['manager', 'author', 'viewer']), CommentController.findByUser);

router.delete('/:id', authMiddleware, roleMiddleware(['manager', 'author']), CommentController.delete);

export default router;
