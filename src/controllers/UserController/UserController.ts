import logger from '@/core/logger';
import { IRequest, IResponse } from '@/core/types/http-types';
import User from '@/database/User';
import toUploadObj from '@/helper/toUploadObj';

export const checkTest: any = (req: IRequest, res: IResponse) => {
    res.status(200).send('Test successful');
};

export const createSlug: string = '/create';
export const create: any = async (req: IRequest, res: IResponse) => {
    try {
        const {
            username,
            name,
            fullName,
            taxCode,
            phoneNumber,
            type,
            typeNote,
            country,
            province,
            district,
            ward,
            street,
            addressLine,
            line,
            latitude,
            longitude,
        } = req.body;
        const files = req.files as Express.Multer.File[];
        const contractsData = files.map(toUploadObj);
        const address = {
            country,
            province,
            district,
            ward,
            street,
            addressLine,
            line,
            latitude,
            longitude,
        };
        const permission = {
            type,
            typeNote,
            level: 'ENTERPRISE',
            role: 'MASTER',
        };
        const newDocument = {
            username,
            name,
            fullName,
            taxCode,
            address,
            phoneNumber,
            permission,
            contracts: contractsData,
        };
        const user = await User.create(newDocument);
        res.status(200).json({ data: user, message: 'Tạo người dùng thành công' });
    } catch (error) {
        logger('ERROR', error);
        res.status(500).send(String(error).split('\n').at(0));
        return res.end();
    }
};
