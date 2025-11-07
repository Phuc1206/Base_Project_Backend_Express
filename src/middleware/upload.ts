import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'D:/file/certificate');
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = randomUUID();
        callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,     // 10MB
        files: 10
    },
})

export default upload;