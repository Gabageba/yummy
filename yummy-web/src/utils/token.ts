export const YUMMY_TOKEN = 'yummy-token';

export const setToken = (token: string) => localStorage.setItem(YUMMY_TOKEN, token);

export const getToken = () => localStorage.getItem(YUMMY_TOKEN);

export const removeToken = () => localStorage.removeItem(YUMMY_TOKEN);
