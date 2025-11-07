import IToken from "./IToken"
import { Request, Response } from "express"

// Request
export interface IRequestAuth extends Request {
    token: Required<IToken>;
}

export interface IRequest extends Request {
    token: Readonly<IToken>;
}

// Response
export interface IResponse extends Response {
    token: Partial<IToken>;
    removeToken: () => void;
}

export interface IResponseAuth extends IResponse {}