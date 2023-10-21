const express = require('express');
const axios = require('axios');
const redis = require('redis');
const responseTime = require('response-time');
const { promisify } = require('util');

const app = express();
app.use(responseTime());

const client = redis.createClient();

/*
(async () => {
    await client.connect();
})();

client.on('connect', () => console.log('Redis Client Connected'));
client.on('error', (err) => console.log('Redis Client Connection Error', err));*/

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

app.get('/rockets', async (req, res, next) => {
    try {
        const reply = await GET_ASYNC('rockets');

        if (reply) {
            console.log('using cached data');
            res.send(JSON.parse(reply));
            return;
        }
        const response = await axios.get('https://api.spacexdata.com/v3/rockets');

        const saveResult = await SET_ASYNC('rockets', JSON.stringify(response.data), 'EX', 5);
        console.log('new data cached', saveResult);

        res.send(response.data);
    } catch (error) {
        res.send(error.message);
    }
})

const PORT = 2121;

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})