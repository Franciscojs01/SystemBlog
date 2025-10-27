import { Router } from 'express';

import UserController from '../controllers/user.controller.js';

const router = Router();

router.post('/', UserController.create);

router.get('/', UserController.findAll);

router.get('/:id', UserController.findById);

router.put('/:id', UserController.update);

router.patch('/:id', UserController.update);

router.delete('/:id', UserController.delete);

export default router;

