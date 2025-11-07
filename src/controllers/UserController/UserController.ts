import { IRequest, IResponse } from '@/core/types/http-types';

export const checkTest: any = (req: IRequest, res: IResponse) => {
    res.status(200).send('Test successful');
};
