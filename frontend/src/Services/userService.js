import localStorageHelper from "../Helpers/localStorageHelper";

export default class UserService {
    static async Login(username) {
        const route = `${process.env.REACT_APP_BACKEND_URL}/User/Login`;
        return fetch(route,
            {
                body: JSON.stringify({ username: username }),
                method: "POST",
                headers: new Headers({ 'content-type': 'application/json'/*, Authorization: `Bearer ${token}`*/ }),
            })
            .then((res) => {
                if (res.status === 401) {
                    localStorageHelper.removeUser();
                }
                return res;
            });
    }
}