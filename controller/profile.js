const User =require('../models/user');




exports.profileUs=async(req,res)=>{

    try{
    
    const user = await User.findById(req.user.id);
    res.json(user);
    
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
    
    }