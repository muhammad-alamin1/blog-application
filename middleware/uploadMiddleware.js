const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/uploads')
    },
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, callback) => {
        const types = /jpeg|jpg|png|gif/;
        const extName = types.test(path.extname(file.originalname).toLowerCase());
        const mimeType = types.test(file.mimeType);

        if (extName && mimeType) {
            callback(null, true);
        } else {
            callback(new Error(`Only support jpeg, jpg, png, gif`));
        }
    }
});

module.exports = upload;