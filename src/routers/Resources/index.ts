import UserController from '@/controllers/UserController';
import express from 'express';
const resourcesRouter = express.Router();

resourcesRouter.get('/test', UserController.checkTest);
export default resourcesRouter;
