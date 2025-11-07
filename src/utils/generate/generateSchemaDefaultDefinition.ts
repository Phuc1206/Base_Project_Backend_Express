import mongoose from 'mongoose';
import ModificationDetailsSchema from '@/database/common/ModificationDetailsSchema';

const generateSchemaDefaultDefinition = () => {
    return {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            immutable: true,
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            immutable: true,
        },
        isDelete: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
        },
        modificationDetails: [
            {
                type: ModificationDetailsSchema,
                default: [],
            },
        ],
    };
};

export default generateSchemaDefaultDefinition;
