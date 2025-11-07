import { NextFunction } from 'express';
import ENV from '../core/ENV';
import logger from '../core/logger';
import { IRequestAuth, IResponse } from '../core/types/http-types';
import webToken from '@/utils/webToken';

const authenticateToken: any = async (req: IRequestAuth, res: IResponse, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Không tìm thấy token' });
    }

    try {
        const payload: any = await webToken.verify(token, ENV.ACCESS_TOKEN_SECRET);

        delete payload.iat;
        delete payload.exp;
        req.token = Object.freeze(payload);

        next();
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            logger('INFO', `Access token expired: ${req.path}`);
            return res.status(401).json({ error: 'Access token hết hạn' });
        }

        logger('WARNING', `Invalid access token: ${err.message}`);
        return res.status(403).json({ error: 'Token không hợp lệ' });
    }
};

export default authenticateToken;

