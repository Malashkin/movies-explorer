class MoviesApi {
  constructor({ baseUrl, contentType }) {
    this._baseUrl = baseUrl;
    this._contentType = contentType;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getAllMovies() {
    return fetch(this._baseUrl).then(this._checkResponse);
  }
}

const movieApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  contentType: "application/json",
});

export default movieApi;
