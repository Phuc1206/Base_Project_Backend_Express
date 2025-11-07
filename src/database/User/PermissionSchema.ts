import mongoose from 'mongoose';
import validate from '@/utils/validate';

export interface IPermissionSchema {
    type: string; // loại mô hình
    typeNote: string; // ghi chú loại mô hình
    level: string; // cấp tài khoản
    role: string; // vai trò
}

const PermissionSchema = new mongoose.Schema<IPermissionSchema>(
    {
        type: {
            type: String,
            required: true,
        },
        typeNote: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
    },
    { _id: false },
);

export default PermissionSchema;

