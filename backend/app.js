const express = require('express');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { limiter } = require('./utils/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routers = require('./routes/index');
const CentralErrorHandler = require('./errors/CentralErrorHandler');
const { PORT, MONGO_URL } = require('./utils/dev-config');

const app = express();

require('dotenv').config();

const CORS_CONFIG = {
  credentials: true,
  origin: ['https://localhost:3000', 'http://localhost:3000'],
  method: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(CORS_CONFIG));

app.use(helmet());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);

app.use(routers);

app.use(errorLogger);
app.use(errors());
app.use(CentralErrorHandler);

async function main() {
  await mongoose.connect(MONGO_URL, {});
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listener on port ${PORT}`);
  });
}

main();
