import { Router } from 'express';
import { userRouter } from './user-routes.js';
<<<<<<< HEAD

=======
import favoritesRouter from './favorite-routes.js';
>>>>>>> 7ef4c31bfe3cd6f0254711c74a6bca00e5488d97


const router = Router();

router.use('/users', userRouter);
<<<<<<< HEAD

=======
router.use('/favorites', favoritesRouter);
>>>>>>> 7ef4c31bfe3cd6f0254711c74a6bca00e5488d97

export default router;
