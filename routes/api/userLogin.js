const express =require('express');
const router =express.Router();
const { check } = require('express-validator');
const {loginUser} =require('../../controller/userLogin');



router.post('/',
[ 

 check('email','please enter valid email ').isEmail(),
 check('password','please enter at least 6 len passwd').exists()
],
loginUser
)
module.exports=router;