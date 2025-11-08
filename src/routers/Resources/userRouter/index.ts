import express from 'express';
import UserController from '@/controllers/UserController';
import upload from '@/middleware/upload';
const userRouter = express.Router();

userRouter.post(UserController.createSlug, upload.array('contracts', 10), UserController.create);

export default userRouter;
