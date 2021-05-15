class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _request(endPoint, method, body) {
    return fetch(
      `${this._baseUrl}/${endPoint}`,
      {
        method,
        credentials: "include",
        headers: this._headers,
        body:JSON.stringify(body)
      }
    ).then(res => res.json())
  }

  register(newData) {
    return this._request('signup', 'POST', newData)
  }

  authorize(data) {
    return this._request('signin', 'POST', data)
  }

  signOut() {
    return this._request('signout', 'POST')
  }

  getUserData() {
    return this._request('users/me')
  }

  updateUserData(newData) {
    return this._request('users/me', 'PATCH', newData)
  }

  getUserMovies() {
    return this._request('movies')
  }

  addMovie(newCard) {
    return this._request('movies', 'POST', newCard)
  }

  deleteMovie(movieId) {
    return this._request(`movies/${movieId}`, 'DELETE')
  }
}

export const api = new Api(
  {
    baseUrl: 'http://localhost:5000',
    // baseUrl: 'https://api.media-store.nomoredomains.club',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  }
)
