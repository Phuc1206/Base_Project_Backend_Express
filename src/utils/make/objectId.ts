import mongoose from "mongoose";

const objectId = (value: string) => {
    if (typeof value !== "string") {
        throw new Error("Parameter v of makeObjectId must be string ObjectId");
    }

    return new mongoose.Types.ObjectId(value);
};

export default objectId;