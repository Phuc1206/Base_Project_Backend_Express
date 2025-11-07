import mongoose from 'mongoose';
import { IModificationDetails } from '../../core/types/db-types';
import ModificationDetailsSchema from '@/database/common/ModificationDetailsSchema';

const schema = <T>(_schema: T): T => {
    const schema = _schema as unknown as {
        methods: {
            addModificationDetail: (v: Omit<IModificationDetails, 'modifiedAt'>) => void;
        };
    };

    schema.methods.addModificationDetail = function (
        this: { modificationDetails: IModificationDetails[] },
        v: Omit<IModificationDetails, 'modifiedAt'>,
    ) {
        if (!Array.isArray(this.modificationDetails)) {
            this.modificationDetails = [
                {
                    modifiedBy: v.modifiedBy,
                    modifiedAt: new Date(),
                    description: v.description,
                },
            ];
            return;
        }

        this.modificationDetails = [
            ...this.modificationDetails,
            {
                modifiedBy: v.modifiedBy,
                modifiedAt: new Date(),
                description: v.description,
            },
        ];
        return;
    };

    return _schema as T;
};

export default schema;
