import mongoose from "mongoose"

export interface IModificationDetails {
    modifiedBy: mongoose.Types.ObjectId;
    modifiedAt: Date;
    description: string;
}

export interface IBaseDocument {
    _id: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    ownerId: mongoose.Types.ObjectId;

    isDelete: boolean;
    deletedAt?: Date;

    modificationDetails: IModificationDetails[];
    addModificationDetail: (v: Omit<IModificationDetails, "modifiedAt">) => void; // virtual

    createdAt: Date;
    updatedAt: Date;
}