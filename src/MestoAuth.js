import { BASE_URL } from "./utils/utils";

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password })
    })
        .then(
            res =>
                res.ok
                    ?
                    res.json()
                    :
                    Promise.reject(`Произошла ошибка при попытке зарегистрировать аккаунт - ${res.status}`)
        )
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    })
        .then(
            res =>
                res.ok
                    ?
                    res.json()
                    :
                    Promise.reject(`Произошла ошибка при попытке авторизации - ${res.status}`)
        ).then((data) => {
            const { token } = data;

            if (token){
                localStorage.setItem('jwt', token);
                return token;
            }
        })
};

export const tokenControl = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        credentials: 'include',
    })
        .then(res =>
            res.ok
                ?
                res.json()
                :
                Promise.reject(`Произошла ошибка при попытке получить токен пользователя - ${res.status}`)
        )};
