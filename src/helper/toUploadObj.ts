const toUploadObj = (f: Express.Multer.File) => ({
    fieldname: f.fieldname,
    originalname: f.originalname,
    filename: f.filename,
    destination: f.destination,
    path: f.path,
    mimetype: f.mimetype,
    size: f.size,
    uploadedAt: new Date(),
});

export default toUploadObj;
