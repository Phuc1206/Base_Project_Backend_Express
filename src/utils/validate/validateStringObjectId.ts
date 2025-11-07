import mongoose from "mongoose";

const validateStringObjectId = (v: any) => {
    if (typeof v !== "string") return false;

    return mongoose.Types.ObjectId.isValid(v);
};

export default validateStringObjectId;