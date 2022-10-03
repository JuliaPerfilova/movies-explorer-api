require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { DB_ADDRESS_DEFAULT } = require('./utils/constants');
const errorHandler = require('./middlewares/errorHandler');
const { rateLimiter } = require('./middlewares/rateLimiter');

const { PORT = 3000, DB_ADDRESS = DB_ADDRESS_DEFAULT } = process.env;

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
})
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Успешное Подключение к базе данных');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`Ошибка: ${err}`);
  });

app.use(rateLimiter);
app.use(helmet());

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
