import mongoose from "mongoose"

const validateObjectId = (v: any) => {
    return mongoose.Types.ObjectId.isValid(String(v));
};

export default validateObjectId;