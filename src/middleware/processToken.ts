import { NextFunction } from 'express';
import logger from '../core/logger';
import { IRequest, IResponseAuth } from '../core/types/http-types';
import generate from '@/utils/generate';

const processToken: any = (req: IRequest, res: IResponseAuth, next: NextFunction) => {
    const addMiddleware = (methodName: string) => {
        const oldMethod = (res as any)[methodName];

        function setHeaderToken(this: any, ...params: any) {
            // check if res was sent

            if (res.headersSent) {
                logger('WARNING', 'Response was sent before process');
                oldMethod.apply(this, params);
                return;
            }

            // check if token undefined or null
            if (!res.token) {
                oldMethod.apply(this, params);
                return;
            }

            const tokenEntries = Object.entries(res.token);

            // check change
            if (tokenEntries.length === 0) {
                oldMethod.apply(this, params);
                return;
            }

            // generate token
            const token = generate.token({
                ...(req.token || {}),
                ...res.token,
            });

            // make header token
            const strTokens: string[] = Object.entries(token).map((item) => {
                return item.join('=');
            });

            // set header
            res.setHeader('Set-Token', strTokens.join(';'));

            // callback
            oldMethod.apply(this, params);
        }

        (res as any)[methodName] = setHeaderToken;
    };

    res.token = {};
    res.removeToken = (v: boolean = true) => {
        if (v) {
            res.setHeader('Remove-Token', 'all');
        } else {
            res.removeHeader('Remove-Token');
        }
    };

    addMiddleware('send');
    addMiddleware('json');
    next();
};

export default processToken;
