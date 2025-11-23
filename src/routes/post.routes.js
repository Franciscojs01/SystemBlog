import { Router } from 'express';
import PostController from '../controllers/post.controller.js';
import {
  postFullRules,
  postIdRules,
  postPatchRules,
} from '../validators/post.validators.js';

const router = Router();

// POST /posts → Cadastrar post (manager ou author)
router.post('/', postFullRules, PostController.create);

// GET /posts → Listar todos os posts (qualquer cargo)
router.get('/', PostController.findAll);

// GET /posts/:id → Listar post pelo ID (qualquer cargo)
router.get('/:id', postIdRules, PostController.findById);

// PUT /posts/:id → Editar completamente o post (manager ou author)
router.put('/:id', postFullRules, PostController.update);

// PATCH /posts/:id → Editar parcialmente o post (manager ou author)
router.patch('/:id', postPatchRules, PostController.update);

// DELETE /posts/:id → Apagar o post (manager ou author)
router.delete('/:id', postIdRules, PostController.delete);

export default router;
