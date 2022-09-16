// Конфиги
export const apiConfig = {
    cardsUrl: 'http://localhost:3000/cards',
    userUrl: 'http://localhost:3000/users/me',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
};

// Autorization
export const BASE_URL = "http://localhost:3000";
