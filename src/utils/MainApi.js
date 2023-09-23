import { optionsMainApi } from './constants.js';
class mainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._urlSignup = options.urlSignup;
    this._urlSignin = options.urlSignin;
    this._urlSignout = options.urlSignout;
    this._urlUserMe = options.urlUserMe;
    this._urlMovies = options.urlMovies;
  }
  // Проверка ответа сервера и преобразование json
  _getResponseData(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
  // Регистрация
  async signup(data) {
    const response = await fetch(`${this._baseUrl}${this._urlSignup}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name
      })
    });
    return this._getResponseData(response);
  }
  // Вход
  async signin(data) {
    const response = await fetch(`${this._baseUrl}${this._urlSignin}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    });
    return this._getResponseData(response);
  }
  // Выход
  async signout() {
    const response = await fetch(`${this._baseUrl}${this._urlSignout}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    return this._getResponseData(response);
  }
  // Проверка валидности токена, получение name, email
  async getUserMe() {
    const response = await fetch(`${this._baseUrl}${this._urlUserMe}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    return this._getResponseData(response);
  }
  // Редактирование профиля пользователя
  async patchUserMe(data) {
    const response = await fetch(`${this._baseUrl}${this._urlUserMe}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    });
    return this._getResponseData(response);
  }
  // Получить сохраненные фильмов
  async getSavedMovies() {
    const response = await fetch(`${this._baseUrl}${this._urlMovies}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return this._getResponseData(response);
  }
  // Сохранить фильм
  async postMovie(data) {
    const response = await fetch(`${this._baseUrl}${this._urlMovies}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    });
    return this._getResponseData(response);
  }
  //Удалить сохраненный фильм
  async deleteMovie(savedMovieId) {
    const response = await fetch(`${this._baseUrl}${this._urlMovies}/${savedMovieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return this._getResponseData(response);
  }
}
export const api = new mainApi(optionsMainApi);
