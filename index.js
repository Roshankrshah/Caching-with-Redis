const express = require('express');
const axios = require('axios');
const redis = require('redis');
const responseTime = require('response-time');

const app = express();
app.use(responseTime());

app.get('/rockets',async(req,res,next)=>{
    try{
        const response = await axios.get('https://api.spacexdata.com/v3/rockets');
        res.send(response.data);
    }catch(error){
        res.send(error.message);
    }
})

const PORT = 2121;

app.listen(PORT,()=>{
    console.log(`Server listening at http://localhost:${PORT}`)
})