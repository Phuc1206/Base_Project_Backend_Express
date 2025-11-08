import UserController from '@/controllers/UserController';
import userRouter from '@/routers/Resources/userRouter';
import express from 'express';
const resourcesRouter = express.Router();

resourcesRouter.get('/test', UserController.checkTest);

resourcesRouter.use('/users', userRouter);

export default resourcesRouter;
