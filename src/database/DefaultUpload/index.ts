import mongoose from "mongoose";

/* config */
import make from "@/utils/make";

export interface IDefaultUploadSchema {
    fieldname: string, /* tên loại tệp lưu trữ */
    originalname: string, /* tên tệp gốc */
    filename: string, /* tên tệp */
    destination: string /* Vị trí lưu trữ */
    encoding: string, /* loại mã hoá tệp */
    path: string, /* đường dẫn */
    mimetype: string, /* kiểu tệp */
    size: number, /* kích thước tệp */
}

const DefaultUploadSchema = new mongoose.Schema<IDefaultUploadSchema>(
    {
        fieldname: {
            type: String,
                minlength: 1,
                required: true,
        },
        originalname: {
            type: String,
                minlength: 1,
                required: true,
        },
        filename: {
            type: String,
                minlength: 1,
                required: true,
        },
        destination: {
            type: String,
                required: true,
        },
        encoding: {
            type: String,
                minlength: 1,
                required: true,
        },
        path: {
            type: String,
                minlength: 1,
                required: true,
        },
        mimetype: {
            type: String,
                minlength: 1,
                required: true,
        },
        size: {
            type: Number,
                required: true,
        },
    }, {
        _id: false,
    }
)

export default make.schema(DefaultUploadSchema);