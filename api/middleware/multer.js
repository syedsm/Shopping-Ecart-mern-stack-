const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend-shoppingcart/public/productimages');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

let upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 4 } // 4MB
});

module.exports = upload;
