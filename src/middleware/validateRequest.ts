import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'


const validateRequest = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    // case invalid
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return res.end();
    }

    // case valid
    next();
};

export default validateRequest;