import AuthenticationController from '@/controllers/AuthenicationController';
import express from 'express';

const authRouter = express.Router();

authRouter.post(AuthenticationController.signInSlug, AuthenticationController.signIn);

authRouter.post(AuthenticationController.refreshTokenSlug, AuthenticationController.refreshToken);

export default authRouter;
