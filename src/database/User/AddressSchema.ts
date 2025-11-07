import mongoose from 'mongoose';
import make from '@/utils/make';

export interface IAddressSchema {
    country: string; // quốc gia
    province: string; // tỉnh
    ward: string; // phường
    street: string; // đường
    line: string; // số nhà, địa chỉ
    addressLine: string; // địa chỉ nhập tay
    latitude: number; // vĩ độ
    longitude: number; // kinh độ
}

const AddressSchema = new mongoose.Schema<IAddressSchema>(
    {
        country: { type: String },
        province: { type: String },
        ward: { type: String },
        street: { type: String },
        line: { type: String },
        addressLine: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
    },
    { _id: false },
);

export default make.schema(AddressSchema);

