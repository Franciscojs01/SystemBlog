import { Router } from 'express';

import CommentController from '../controllers/comment.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import {
  commentFullRules,
  commentIdRules
} from '../validators/comment.validators.js';

const router = new Router();

router.post('/:id',
  authMiddleware,
  roleMiddleware(['manager', 'author']),
  commentFullRules,
  CommentController.create
);

router.get('/',
  authMiddleware,
  roleMiddleware(['manager', 'author', 'viewer']),
  commentIdRules,
  CommentController.findAll
);

router.get('/me',
  authMiddleware,
  roleMiddleware(['manager', 'author', 'viewer']),
  CommentController.findMyComments
);

router.delete('/:id',
  authMiddleware,
  roleMiddleware(['manager', 'author']),
  commentIdRules,
  CommentController.delete
);

export default router;
