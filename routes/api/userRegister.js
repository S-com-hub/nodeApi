const express =require('express');
const router =express.Router();
const { check } = require('express-validator');
const {registerUser} =require('../../controller/userRegister');

router.post('/',
[ 
 check('name','name is required').not().isEmpty(),
 check('email','please enter valid email ').isEmail(),
 check('password','please enter at least 6 len passwd').isLength({min:6})
],
registerUser
)
module.exports=router;