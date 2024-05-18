const router = require('express').Router()
const regco = require('../controllers/regcontroller')
const productco = require('../controllers/productcontroller')
const multer = require('multer')


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../shoppingcart/public/productimages')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

let upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 4 }
})

//Auth route
router.post('/reg', regco.reg)
router.post('/logincheck', regco.logincheck)
router.post('/forgotpassword',regco.forgotpassword)
router.post('/resetpassword',regco.resetpassword)

//Admin Route
router.post('/productadd', upload.single('img'), productco.productadd)
router.get('/allproduct', productco.allproducts)
router.get('/singleproduct/:id', productco.singleupdate)
router.put('/productupdate/:id', upload.single('img'), productco.productupdate)
router.delete('/delete/:id', productco.delete)
router.get('/userupdate/:id', regco.userupdate)
router.get('/instockproducts', productco.instockproducts)
router.post('/cartproducts', productco.cartproducts)
router.get('/usersfetch/:id', regco.userfetch)
router.put('/statusupdate/:id', regco.update)
router.get('/singleproductfetch/:id',productco.singleproductfetch)
// router.post('/cart/:loginname',productco.cartvalue)

module.exports = router