import express from 'express';
import data from './data';
import config from './config';
import dotenv, { parse } from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute';

dotenv.config();
const mongodbUrl=config.MONGODB_URL;
mongoose.connect(mongodbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).catch(error=>console.log(error.reason));


const app=express();
app.use(bodyParser.json());
app.use("/api/users",userRoute);
app.get("/api/product/:id",(req,res) =>{
    const productId=req.params.id;
    const product=data.products.find(x=>x._id===productId)
    console.log("hello1");
    console.log(product);
    if(product)
        res.send(product);
    else
        res.status(404).send({msg:"Product Not Found"});

} )
app.get("/cart/api/product/:id",(req,res) =>{
    const productId=req.params.id;
    const product=data.products.find(x=>x._id===productId)
    console.log("hello2");
    console.log(product);
    if(product)
        
        res.send(product);
    else
        res.status(404).send({msg:"Product Not Found"});

} )
app.get("/api/products",(req,res) =>{
    res.send(data.products);

} )

app.listen(5000,()=>{console.log("server started at http://localhost:5000")});
