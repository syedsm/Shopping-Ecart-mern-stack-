const router = require('express').Router()
const regco = require('../controllers/regcontroller')
const productco = require('../controllers/productcontroller')
const authenticateToken = require('../middleware/jwtAuth')
const multerupload = require("../middleware/multer")



router.get('/helo', (req, res) => {
    res.send("API RUNNING")
});

//Auth route
router.post('/reg', regco.reg)
router.post('/logincheck', regco.logincheck)
router.post('/forgotpassword', regco.forgotpassword)
router.post('/resetpassword', regco.resetpassword)


//user Route
router.get('/categoryfilter/:category',productco.categoryfilter)
router.post("/buycheck",productco.buycheck)

//Admin Route
router.post('/productadd', authenticateToken, multerupload.single('img'), productco.productadd);
router.get('/allproduct', authenticateToken, productco.allproducts)
router.get('/singleproduct/:id', authenticateToken, productco.singleupdate)
router.put('/productupdate/:id', authenticateToken, multerupload.single('img'), productco.productupdate)
router.delete('/delete/:id', authenticateToken, productco.delete)
router.get('/userupdate/:id', authenticateToken, regco.userupdate)
router.get('/usersfetch/:id', authenticateToken, regco.userfetch)
router.put('/statusupdate/:id', authenticateToken, regco.update)
router.get('/singleuserfetch/:loginname', authenticateToken, regco.singleuserfetch)
router.put('/userprofileupdate/:id', multerupload.single('profileimage'), regco.updateUser)
router.delete('/userdelete/:id', authenticateToken, regco.userdelete)
router.get('/instockproducts', productco.instockproducts)
router.post('/cartproducts', productco.cartproducts)
router.get('/singleproductfetch/:id', productco.singleproductfetch)
// router.post('/cart/:loginname',productco.cartvalue)

module.exports = router
