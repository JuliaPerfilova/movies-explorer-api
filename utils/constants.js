module.exports.DB_ADDRESS_DEFAULT = 'mongodb://localhost:27017/moviesdb';

module.exports.DEV_SECRET = 'dev-secret';

module.exports.urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]*)/;

module.exports.ERROR_CODES = {
  BAD_REQUEST: 400,
  CONFLICT: 409,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports.MESSAGES = {
  BAD_REQUEST: 'Ваш браузер отправил запрос, который этот сервер не смог понять',
  WRONG_URL: 'Введен некорректный URL',
  WRONG_EMAIL: 'Введен некорректный Email',
  WRONG_INPUT_DATA: 'Введены некорректные данные',

  CONFLICT: 'Этот ресурс уже существует в базе данных',
  EMAIL_IN_USE: 'Email уже используется',

  FORBIDDEN: 'Отказано в доступе',

  NOT_FOUND: 'Ресурс с таким id не найден',

  UNAUTHORIZED: 'Требуется авторизация',
  WRONG_USER_DATA: 'Неправильный логин или пароль',

  INTERNAL_SERVER_ERROR: 'Внутренняя ошибка сервера',

  INVALID_TOKEN: 'Невалидный jwt-токен',

  SERVER_CRASH: 'Алло, Галочка, ты щас умрешь (сервер упадет)',

  PAGE_NOT_FOUND: 'Несуществующий адрес страницы',

  MOVIE_REMOVED: 'Фильм удален',
  AUTHORIZATION_SUCCESSFUL: 'Успешная авторизация',
};
