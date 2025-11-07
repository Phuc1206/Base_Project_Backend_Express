import mongoose from "mongoose";

const stringObjectId = (value: any) => {
    if (value === null) return null;
    return String(value);
};

export default stringObjectId;