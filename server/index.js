require('dotenv').config();
const app = require('./server.js');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'

app.listen(PORT, () => {
    console.log(`listening at http://${HOST}:${PORT}`)
});