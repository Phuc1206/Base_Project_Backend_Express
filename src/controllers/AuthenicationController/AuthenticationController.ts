import ENV from '@/core/ENV';
import logger from '@/core/logger';
import { IRequest, IResponse } from '@/core/types/http-types';
import IToken, { IRefreshToken } from '@/core/types/IToken';
import User from '@/database/User';
import generate from '@/utils/generate';
import hashPassword from '@/utils/hashPassword';
import phoneNumber from '@/utils/validateRouter/phoneNumber';
import webToken from '@/utils/webToken';

export const signInSlug: string = '/sign-in';
export const signIn: any = async (req: IRequest, res: IResponse) => {
    try {
        const { username, password } = req.body;
        const clientType = req.header('X-Client-Type');
        let userToSign: any = null;
        let tokenPayload: IToken;
        if (username === ENV.ADMIN_USER_NAME && password === ENV.ADMIN_PASSWORD) {
            userToSign = {
                _id: ENV.ADMIN_ID,
                email: ENV.ADMIN_EMAIL,
                name: ENV.ADMIN_NAME,
                username: ENV.ADMIN_USER_NAME,
                phoneNumber: ENV.ADMIN_PHONE_NUMBER,
                fullName: ENV.ADMIN_FULL_NAME,
                taxCode: null,
                address: null,
                background: null,
                avatar: null,
                permission: {
                    type: '',
                    typeNote: '',
                    level: 'ADMIN',
                    role: '',
                },
            };
            tokenPayload = {
                userId: ENV.ADMIN_ID,
                level: 'ADMIN',
                role: '',
                type: '',
                username: ENV.ADMIN_USER_NAME,
                ownerId: '',
            };
        } else {
            const user = await User.findOne({ username, password: hashPassword(password) }).lean();
            if (!user) {
                return res.status(401).json({ error: 'Thông tin đăng nhập không chính xác' });
            }
            userToSign = user;

            tokenPayload = {
                userId: user._id.toString(),
                level: user.permission.level,
                role: user.permission.role,
                type: user.permission.type,
                ownerId: user.ownerId,
                username: user.username,
            };
        }
        const tokens = generate.token(tokenPayload);

        if (clientType === 'MOBILE') {
            res.status(200).json({
                data: {
                    user: userToSign,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                },
                message: 'Đăng nhập thành công',
            });
        } else {
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // true nếu là HTTPS
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
            });
            res.status(200).json({
                data: {
                    user: userToSign,
                    accessToken: tokens.accessToken,
                },
                message: 'Đăng nhập thành công',
            });
        }
    } catch (error) {
        logger('ERROR', error);
        res.status(500).send(String(error).split('\n').at(0));
        return res.end();
    }
};

export const refreshTokenSlug: string = '/refresh_token';
export const refreshToken: any = async (req: IRequest, res: IResponse) => {
    try {
        const tokenFromCookie = req.cookies?.refreshToken;
        const tokenFromBody = req.body?.refreshToken;

        const currentRefreshToken = tokenFromCookie || tokenFromBody;
        if (!currentRefreshToken) {
            return res.status(401).json({ error: 'Không tìm thấy refresh token' });
        }
        let userPayload: any;
        try {
            userPayload = await webToken.verify(currentRefreshToken, ENV.REFRESH_TOKEN_SECRET);
            console.log(userPayload);
        } catch (err) {
            logger('WARNING', 'Refresh token không hợp lệ hoặc đã hết hạn', err);
            return res.status(403).json({ message: 'Refresh token không hợp lệ, vui lòng đăng nhập lại' });
        }
        const newAccessTokenPayload: IToken = {
            userId: userPayload.userId?.toString(),
            level: userPayload.level,
            role: userPayload.role,
            type: userPayload.type,
            ownerId: userPayload.ownerId,
            username: userPayload.username,
        };
        const newAccessToken = generate.token(newAccessTokenPayload).accessToken;
        res.status(200).json({
            accessToken: newAccessToken,
        });
    } catch (error) {
        logger('ERROR', error);
        res.status(500).send(String(error).split('\n').at(0));
        return res.end();
    }
};
