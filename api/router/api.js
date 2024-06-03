const router = require('express').Router()
const regco = require('../controllers/regcontroller')
const productco = require('../controllers/productcontroller')
const multer = require('multer')
const authenticateToken = require('../middleware/jwtAuth')

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

router.get('/helo', (req, res) => {
    res.send("API RUNNING")
});

//Auth route
router.post('/reg', regco.reg)
router.post('/logincheck', regco.logincheck)
router.post('/forgotpassword', regco.forgotpassword)
router.post('/resetpassword', regco.resetpassword)

//Admin Route
router.post('/productadd', authenticateToken, upload.single('img'), productco.productadd)
router.get('/allproduct', authenticateToken, productco.allproducts)
router.get('/singleproduct/:id', authenticateToken, productco.singleupdate)
router.put('/productupdate/:id', authenticateToken, upload.single('img'), productco.productupdate)
router.delete('/delete/:id', authenticateToken, productco.delete)
router.get('/userupdate/:id', authenticateToken, regco.userupdate)
router.get('/usersfetch/:id', authenticateToken, regco.userfetch)
router.put('/statusupdate/:id', authenticateToken, regco.update)
router.get('/singleuserfetch/:loginname', authenticateToken, regco.singleuserfetch)
router.put('/userprofileupdate/:id', upload.single('profileimage'), regco.updateUser)
router.delete('/userdelete/:id', authenticateToken, regco.userdelete)
router.get('/instockproducts', productco.instockproducts)
router.post('/cartproducts', productco.cartproducts)
router.get('/singleproductfetch/:id', productco.singleproductfetch)
// router.post('/cart/:loginname',productco.cartvalue)

module.exports = router
