const express = require('express');
const axios = require('axios');
const redis = require('redis');
const responseTime = require('response-time');

const app = express();
app.use(responseTime());

app.get('/',(req,res)=>{
    res.send('Starting caching');
})

const PORT = 2121;

app.listen(PORT,()=>{
    console.log(`Server listening at http://localhost:${PORT}`)
})