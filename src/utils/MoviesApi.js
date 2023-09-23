class moviesApi {
  constructor() {
    this._baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';
  }
  // Проверка ответа сервера и преобразование json
  _getResponseData(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
  // Получить  фильмов
  async getAllMovies() {
    const response = await fetch(`${this._baseUrl}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return this._getResponseData(response);
  }
}
export const apiMovies = new moviesApi();
