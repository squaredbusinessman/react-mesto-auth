import {apiConfig} from "./utils";

class Api {
    constructor(config) {
        this._profileUrl = config.userUrl;
        this._cardsUrl = config.cardsUrl;
    }

    _handleResponse = (response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Произошла ошибка при обработке данных ${response.status}`);
        }
    }

    getCards = () => {
        return fetch(this._cardsUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => this._handleResponse(res));
    }

    addCard = (data) => {
        return fetch(this._cardsUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => this._handleResponse(res))
    }

    deleteCard = (id) => {
        return fetch(`${this._cardsUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => this._handleResponse(res))
    }

    getProfile = () => {
        return fetch(this._profileUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => this._handleResponse(res))
    }

    updateProfile = (data) => {
        return fetch(this._profileUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => this._handleResponse(res))

    }

    updateAvatar = (newAvatarUrl) => {
        return fetch(`${this._profileUrl}/avatar` , {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ avatar: newAvatarUrl })
        })
            .then((res) => this._handleResponse(res))
    }

    changeLikeCardStatus = (id, isLiked) => {
        return fetch(`${this._cardsUrl}/${id}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => this._handleResponse(res));
    }

    getAllData = () => {
        return Promise.all([this.getProfile(this._profileUrl), this.getCards(this._cardsUrl)]);
    }
}

const api = new Api(apiConfig);

export default api;
