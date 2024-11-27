import { Router } from 'express';
import { userRouter } from './user-routes.js';
import favoritesRouter from './favorite-routes.js';


const router = Router();

router.use('/users', userRouter);
router.use('/favorites', favoritesRouter);

export default router;
