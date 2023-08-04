const express=require('express');
const nodeApi=express();
const connectDb=require('./config/db');

//calling function for connnect mongodb database
connectDb();
nodeApi.use(express.json({extended:false}));

const PORT=process.env.PORT||5000;

nodeApi.use('/userReg',require('./routes/api/userRegister'));
nodeApi.use('/userLog',require('./routes/api/userLogin'));
nodeApi.use('/userPro',require('./routes/api/profile'));


nodeApi.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`);
})