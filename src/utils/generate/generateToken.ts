import jwt from 'jsonwebtoken';
import ENV from '../../core/ENV';
import IToken, { IRefreshToken } from '../../core/types/IToken';

export enum EGenerateTokenKey {
    accessToken = 'accessToken',
    refreshToken = 'refreshToken',
}

export const generateTokenKeys = Object.keys(EGenerateTokenKey) as EGenerateTokenKey[];

const generateToken = (payload: IToken): Record<EGenerateTokenKey, string> => {
    const refreshTokenPayload: IRefreshToken = {
        userId: payload.userId,
    };

    const accessToken = jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(refreshTokenPayload, ENV.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

    return {
        accessToken,
        refreshToken,
    };
};

export default generateToken;

