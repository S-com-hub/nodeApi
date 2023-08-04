const { validationResult } = require("express-validator");
const User =require('../models/user');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const config=require('config');

exports.loginUser=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return  res.status(400).json({errors:errors.array()});
    }

    const {email,password}=req.body;
    try{
        let user =  await User.findOne({email});
          if(!user){
           return  res.status(400).json({errors:[{msg:'invalid credentials'}]});
        }
       
        const isMatch= await bcrypt.compare(password,user.password);
        
       if(!isMatch){
        return  res.status(400).json({errors:[{msg:'password din not match'}]});
         
          
            
       }

  const payload={
    user:{
        id: user.id,
        name :user.name
    }
  }

  jwt.sign(payload,
   config.get('jwtSecret'),
  {
   expiresIn:36000
  },(err,token)=>{
        if(err) throw err;
        res.json({token});
  })
   
   // res.send('user registered');
 }catch(err){
     console.error(err.message);
     res.status(500).send('server error');
 }


}