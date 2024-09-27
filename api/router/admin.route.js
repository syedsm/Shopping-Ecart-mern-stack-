const router = require('express').Router()
const productco = require('../controllers/productcontroller')
const regco = require('../controllers/regcontroller')
const authenticateToken = require('../middleware/jwtAuth')
const multerupload = require("../middleware/multer")

router.post('/productadd', authenticateToken, multerupload.fields([{ name: 'mainImg' }, { name: 'additionalImgs' },]), productco.productadd);
router.get('/allproduct', authenticateToken, productco.allproducts)
router.get('/singleproduct/:id', authenticateToken, productco.singleupdate).put('/productupdate/:id', authenticateToken, multerupload.fields([{ name: 'img' }, { name: 'additionalImgs' }]), productco.productupdate)
router.delete('/delete/:id', authenticateToken, productco.delete)
router.get('/userupdate/:id', authenticateToken, regco.userupdate)
router.get('/usersfetch/:id', authenticateToken, regco.userfetch)
router.put('/statusupdate/:id', authenticateToken, regco.update)


module.exports = router