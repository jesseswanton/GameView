import { Router } from 'express';
import { userRouter } from './user-routes.js';
//import { registerUser } from '../../controllers/authControllers.js';


// const router = Router();

router.use('/users', userRouter);
//router.post('/auth/register', registerUser);

// export default router;
