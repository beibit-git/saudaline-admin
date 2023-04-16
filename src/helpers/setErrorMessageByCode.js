export const setErrorMessageByCode = (code) => {
  switch (code) {
    case 400:
      return 'Недопустимые параметры запроса';
    case 401:
      return 'Не авторизован';
    case 403:
      return 'Недостаточно прав';
    case 404:
      return 'Не найдено';
    case 405:
      return 'Запрещенная операция';
    case 500:
      return 'Ошибка со стороны сервера';
    case 501:
      return 'Операция не поддерживается сервером';
    case 503:
      return 'Сервер недоступен';
    default:
      return `Неизвестная ошибка. Код ошибки: ${code}`;
  }
};
