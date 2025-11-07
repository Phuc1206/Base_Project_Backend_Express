import morgan from 'morgan';
import ENV from '../core/ENV';
import bodyParser from 'body-parser';
import { Application, Request, Response } from 'express';
import authenticateToken from '../middleware/authenticateToken';
import accessControlAllow from '../middleware/accessControlAllow';
import authRouter from '@/routers/authRouter';
import resourcesRouter from '@/routers/Resources';
import cookieParser from 'cookie-parser';

function router(app: Application) {
    if (ENV.IS_DEV) {
        app.use(morgan('combined'));
    }
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(accessControlAllow);
    app.use('/auth', authRouter);
    app.use('/resources', authenticateToken, resourcesRouter);
    app.get('/', (req: Request, res: Response) => {
        res.status(200).send(ENV.VERSION);
    });
}

export default router;

