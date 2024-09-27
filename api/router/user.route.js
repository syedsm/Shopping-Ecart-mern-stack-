const router = require('express').Router()
const productco = require('../controllers/productcontroller')
const authenticateToken = require('../middleware/jwtAuth')
const multerupload = require("../middleware/multer")
const regco = require('../controllers/regcontroller')


//user Route
router.get('/categoryfilter/:category', productco.categoryfilter)
router.post("/buycheck", productco.buycheck)
router.post('/cartproducts', productco.cartproducts)
router.get('/instockproducts', productco.instockproducts)
router.get('/singleproductfetch/:id', productco.singleproductfetch)

//user profile route

router.get('/singleuserfetch/:loginname', authenticateToken, regco.singleuserfetch)
router.put('/userprofileupdate/:id', multerupload.single('profileimage'), regco.updateUser)
router.delete('/userdelete/:id', authenticateToken, regco.userdelete)
// router.post('/cart/:loginname',productco.cartvalue)

module.exports = router
