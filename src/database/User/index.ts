import mongoose from 'mongoose';
import UserSchema, { IUserDocument, IUserModel, TUserDocument } from './UserSchema';

/* config */
import make from '../../utils/make';
import logger from '../../core/logger';
import hashPassword from '../../utils/hashPassword';

/* others */

// // check if userName is existing
UserSchema.statics.isExistedUsername = async (username: string): Promise<boolean> => {
    const document = await User.findOne({
        username: username,
    });

    if (!document) return false;

    return true;
};

// login
UserSchema.statics.login = async (formData: any): Promise<TUserDocument | null> => {
    return User.findOne({
        isDelete: false,
        email: formData.userName,
        password: hashPassword(formData.password),
    });
};

UserSchema.statics.isExists = async (_id: mongoose.Types.ObjectId): Promise<boolean> => {
    const user = await User.findById(_id);
    return Boolean(user);
};

// methods
UserSchema.methods.toResponse = function (this: TUserDocument) {
    return {
        signIn: () => {
            return {
                _id: this._id.toString(),
                name: this.name || '',
                email: this.email || '',
                phoneNumber: this.phoneNumber || '',
                permission: this.permission,
                address: this.address,
                ownerId: this.ownerId.toString(),
                createByUser: this.createdBy.toString(),
                taxCode: this.taxCode || '',
            };
        },
        defaultObject: () => {
            return {
                _id: this._id.toString(),
                name: this.name || '',
                taxCode: this.taxCode || '',
                email: this.email || '',
                phoneNumber: this.phoneNumber || '',
                address: this.address,
                createdAt: this.createdAt.toJSON(),
            };
        },
    };
};

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default User;

