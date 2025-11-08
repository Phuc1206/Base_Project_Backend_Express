import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';

function ensureDir(dir: string) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        let dir = 'src/uploads/files';
        if (file.fieldname === 'avatar') {
            dir = 'src/uploads/avatars';
        } else if (file.fieldname === 'background') {
            dir = 'src/uploads/backgrounds';
        } else if (file.fieldname === 'contract') {
            dir = 'src/uploads/contract';
        } else if (file.fieldname === 'logo') {
            dir = 'src/uploads/logos';
        }
        ensureDir(dir);
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = randomUUID();
        callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
        files: 10,
    },
});

export default upload;
