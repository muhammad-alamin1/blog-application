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
        if (file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg') {
            callback(null, true);
        } else {
            callback(new Error(`Only support jpeg, jpg, png`));
        }
    }
});

module.exports = upload;