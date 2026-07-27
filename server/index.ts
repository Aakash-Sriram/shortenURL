import express from 'express';
import generateSlug from '@/lib/url';
import { Request , Response } from 'express';
const app = express();
const PORT = 5173;
app.listen(PORT,()=>{
    console.log("Server running at localhost:"+PORT)
})
app.post('/api/shorten',(req:Request,res:Response)=>{
    generateSlug(req.body.longUrl);
})