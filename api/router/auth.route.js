
const router = require('express').Router()
const regco = require('../controllers/regcontroller')

//Auth route
router.post('/reg', regco.reg)
router.post('/logincheck', regco.logincheck)
router.post('/forgotpassword', regco.forgotpassword)
router.post('/resetpassword', regco.resetpassword)


module.exports = router