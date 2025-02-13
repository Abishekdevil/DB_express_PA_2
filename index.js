const express = require('express');
const { resolve } = require('path');
const mongoose=require('mongoose');
require('dotenv').config();
const app = express();
const port = 3010;
app.use(express.json());
app.use(express.static('static'));
const uri=process.env.uri

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
 const User=require('./schema.js')

mongoose.connect(uri)
.then(()=>console.log('Connected to database'))
.catch((err)=>console.log('Error connecting to database',err))

app.post('/api/users', async(req,res)=>{
  try{
    const {name,email,password}=req.body;

    if(!name||!email||!password){
      return res.status(400).json({message:'all input is required'})
  }
  const newUser=new User({name,email,password})
  await newUser.save();
  res.status(201).json({message:'Successful saved'})
}
catch(error){
       console.log('Error creating user :',error)
       res.status(500).json({message:'Server error'})
}


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
