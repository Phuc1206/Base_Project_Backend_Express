import mongoose from 'mongoose';

interface IRequireToken {
    userId: string;
    level: string;
    username: string;
    type: string;
    role: string;
    ownerId: mongoose.Types.ObjectId | string;
}

interface IToken extends IRequireToken {
    [props: string]: any;
}

export interface IRefreshToken extends Pick<IToken, 'userId'> {}

export default IToken;

