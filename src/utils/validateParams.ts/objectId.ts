import { param } from "express-validator";
import mongoose from "mongoose";

export const objectId = (p: string) => {
    return param(p).custom((v: any) => {
        if (typeof v !== "string") {
            throw new Error(`"${p}" must be string`);
        }

        if (!mongoose.Types.ObjectId.isValid(v)) {
            throw new Error(`"${p}" must be ObjectId`);
        }

        return true;
    });
};
export const codeValidate = (p: string) => {
    return param(p).custom((v: any) => {
        if (typeof v !== "string") {
            throw new Error("type of code must be string");
        }
        if(!v || v.length < 0 ){
          throw new Error("Mã quy trình là bắt buộc");
        }

        return true;
    });
};