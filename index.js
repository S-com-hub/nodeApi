const express=require('express');
const app=express();
const connectDb=require('./config/db');

//calling function for connnect mongodb database
connectDb();
app.use(express.json({extended:false}));

const PORT=process.env.PORT||5000;
app.use('/usersRegLog',require('./routes/api/users'));


app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`);
})