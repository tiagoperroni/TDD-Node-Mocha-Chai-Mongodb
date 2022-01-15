const express = require('express');
const connectMongo = require('./src/config/db.config.js');
const routes = require('./src/routes/filme.rotas.js');
routes
let env = process.env;

const app = express();
app.use(express.json());
app.use(routes);

connectMongo();

app.get('/api/status', (req, res) => {
    return res.json({ version: 1.0, status: 'UP' });
});


let PORT = env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server iniciado na porta ${PORT}`);
});

module.exports = app;