import { NextFunction } from "express";
import { IRequest, IResponse } from "../../core/types/http-types";

const validateBody = <T>(cb: (body: T) => Promise<boolean> | boolean) => {
    return (req: IRequest, res: IResponse, next: NextFunction) => {
        try {
        } catch (e) {
            res.status(400).send(e);
            return res.end();
        }
    };
};

export default validateBody;