require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const accountRoutes = require('./routes/accounts.routes');
const errorMiddleware = require('./middlewares/error.middleware');
const swaggerDocument = require('../swagger/accounts-swagger.json');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/health-check', (_req, res) => res.status(200).send('Connection OK'));
app.use('/api/accounts', accountRoutes);
app.use(errorMiddleware);

app.use('/api-docs', swaggerUI.serve);
app.get('/api-docs', swaggerUI.setup(swaggerDocument));

module.exports = app;
