export default class authService {
    static USER_KEY = 'user';

    static setUser(user) {
        localStorage.setItem(this.USER_KEY, user);
    }

    static getUser() {
        return localStorage.getItem(this.USER_KEY);
    }

    static removeUser() {
        localStorage.removeItem(this.USER_KEY);
    }

    static isLoggedIn() {
        return !!this.getUser();
    }
}