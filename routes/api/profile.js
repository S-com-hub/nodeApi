const express =require('express');
const router =express.Router();

// const profileUs =require('../../controller/profile');
const auth =require('../../middleware/auth')
const User =require('../../models/user');

router.get('/',auth,async(req,res)=>{
   

        try{
        
        const user = await User.findById(req.user.id);
        res.json(user);
        
        }
        catch(err){
            console.error(err.message);
            res.status(500).send('server error');
        }
        
        }
)




module.exports=router;