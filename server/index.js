require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'

app.listen(PORT, () => {
    console.log(`listening at http://${HOST}:${PORT}`)
});