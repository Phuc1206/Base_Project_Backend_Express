import mongoose from 'mongoose';

/* config */
import ENV from '../../core/ENV';
import make from '../../utils/make';
import validate from '../../utils/validate';
import generate from '../../utils/generate';
import hashPassword from '../../utils/hashPassword';

/* others */
import TDocument from '../../core/types/TDocument';
import PermissionSchema, { IPermissionSchema } from './PermissionSchema';
import { IBaseDocument } from '../../core/types/db-types';
import AddressSchema, { IAddressSchema } from './AddressSchema';
import DefaultUploadSchema, { IDefaultUploadSchema } from '@/database/DefaultUpload';

export interface IUserSchema {
    username: string;
    password: string;
    name: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    taxCode: string;
    logo: IDefaultUploadSchema | undefined;
    avatar: IDefaultUploadSchema | undefined;
    background: IDefaultUploadSchema | undefined;
    permission: IPermissionSchema;
    address: IAddressSchema;
    contracts: IDefaultUploadSchema[] | [];
    status: boolean;
}

// Include virtual properties and methods
export interface IUserDocument extends IUserSchema, IBaseDocument {
    // toResponse: () => {
    //     signIn: () => LoginResponse.ISignIn;
    //     defaultObject: () => UserResponse.IItem;
    // };
}
export type TUserDocument = TDocument<IUserDocument>;

// Include static method
export interface IUserModel extends mongoose.Model<IUserDocument> {
    // isExists: (_id: mongoose.Types.ObjectId) => Promise<boolean>;
    // userNameExisted: (v: string) => Promise<boolean>;
    // login: (formData: LoginFormData.ISignIn) => Promise<TUserDocument | null>;
}

const UserSchema = new mongoose.Schema<IUserDocument, IUserModel>(
    {
        avatar: {
            type: DefaultUploadSchema,
            default: null,
        },
        username: {
            type: String,
            minlength: 1,
            required: true,
        },
        name: {
            type: String,
            minlength: 1,
            required: true,
        },
        fullName: {
            type: String,
            minlength: 1,
            required: true,
        },
        password: {
            type: String,
            minlength: 8,
            require: true,
            default: hashPassword(ENV.DEFAULT_PASSWORD),
        },

        email: {
            type: String,
            default: undefined,
        },
        taxCode: {
            type: String,
            required: true,
            default: '',
        },
        phoneNumber: {
            type: String,
            validate: {
                validator: (v: string) => {
                    return validate.phoneNumber(v);
                },
                message: () => {
                    return 'Invalid phoneNumber';
                },
            },
        },
        permission: {
            type: PermissionSchema,
            required: true,
        },
        address: {
            type: AddressSchema,
        },
        contracts: {
            type: [DefaultUploadSchema],
            default: [],
        },
        logo: {
            type: DefaultUploadSchema,
            default: null,
        },
        background: {
            type: DefaultUploadSchema,
            default: null,
        },
        status: {
            type: Boolean,
            default: true,
        },
        ...generate.schemaDefaultDefinition(),
    },
    {
        timestamps: true,
    },
);

export default make.schema(UserSchema);
