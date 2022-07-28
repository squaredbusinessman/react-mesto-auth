import { BASE_URL } from "./utils/utils";

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(res => res.json())
        .catch(err => console.log(`Произошла ошибка при попытке зарегистрировать аккаунт - ${err}`))
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .then(jwt => jwt)
        .catch(err => console.log(`Произошла ошибка при попытке авторизации - ${err}`))
};

export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        }
    })
        .then(res => res.json())
        .catch(err => console.log(`Произошла ошибка при попытке получить токен пользователя - ${err}`))
};
