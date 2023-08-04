const { validationResult } = require("express-validator");
const User =require('../models/user');
const bcrypt =require('bcryptjs');

const gravatar = require('gravatar');

exports.registerUser=async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return  res.status(400).json({errors:errors.array()});
    }
      const {name,email,password}=req.body;
     
      try{
             let user =  await User.findOne({email});
           
             if(user){
                 res.status(404).json({errors:[{msg:'user already exists'}]});
             }

    const avatar= gravatar.url(email,{
      s:'200',
      r:'pg',
      d:'mm'
    })


           user=new User({
            name,
            email, 
            avatar,
            password
           });

        const salt =await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save(); 

        res.send('user registered');
      }catch(err){
          console.error(err.message);
          res.status(500).send('server error');
      }

}

