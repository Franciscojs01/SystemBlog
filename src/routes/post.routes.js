import { Router } from 'express';
import PostController from '../controllers/post.controller.js';

const router = Router();

router.post('/', PostController.create);

router.get('/', PostController.findAll);

router.get('/:id', PostController.findById);

router.put('/:id', PostController.update);

router.patch('/:id', PostController.update);

router.delete('/:id', PostController.delete);

export default router;
