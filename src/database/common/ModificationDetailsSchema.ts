import mongoose from 'mongoose';
import { IModificationDetails } from '../../core/types/db-types';

interface IModificationDetailsSchema extends IModificationDetails {}

export interface IModificationDetailsDocument extends IModificationDetailsSchema {}

export interface IModificationDetailsModel extends mongoose.Model<IModificationDetailsDocument> {}

const ModificationDetailsSchema = new mongoose.Schema<IModificationDetailsDocument, IModificationDetailsModel>({
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    modifiedAt: {
        type: Date,
        require: true,
    },
    description: {
        type: String,
        default: '',
    },
});

export default ModificationDetailsSchema;