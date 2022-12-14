const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const cors = require('cors');
const userRouters = require('./routers/users');
const userCardsRouters = require('./routers/card');
const NotFoundError = require('./errors/NotFoundError');
const { REGEX } = require('./constants/constants');

const app = express();
const { PORT = 3000 } = process.env;
const { createUser, login } = require('./controllers/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

const options = {
  origin: [
    'https://andreizhura.nomoredomains.club',
    'https://api.andreizhura.nomoredomains.club',
    'http://andreizhura.nomoredomains.club',
    'http://api.andreizhura.nomoredomains.club',
    'https://localhost:3000',
    'http://localhost:3000',
    'https://localhost:3001',
    'http://localhost:3001',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use(cors(options));
// роуты, не требующие авторизации,
// например, регистрация и логин

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGEX),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// авторизация
app.use(auth);
// роуты, которым авторизация нужна
// card
app.use('/', userRouters);
app.use('/', userCardsRouters);

app.use(errorLogger);

app.use('*', (req, res, next) => { next(new NotFoundError('Запрашиваемый ресурс не найден')); });

app.use(errors());

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
