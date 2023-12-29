export default class navService{
    static async GetAllForNavbar() {
        const route = `${process.env.REACT_APP_BACKEND_URL}/Nav/GetAllForNavbar/`;
        return fetch(route,
            {
                method: "GET",
            });
    }

    static async GetAll() {
        const route = `${process.env.REACT_APP_BACKEND_URL}/Nav/GetAll/`;
        return fetch(route,
            {
                method: "GET",
            });
    }

    static async Create(formData, token) {
        const route = `${process.env.REACT_APP_BACKEND_URL}/Nav/Create/`;
        return fetch(route,
            {
                body: formData,
                method: "POST",
                headers: new Headers({ 'content-type': 'multipart/form-data', Authorization: `Bearer ${token}` }),
            });
    }

    static async Delete(id, token) {
        const route = `${process.env.REACT_APP_BACKEND_URL}/Nav/Delete/${id}`;
        return fetch(route,
            {
                method: "DELETE",
                headers: new Headers({ Authorization: `Bearer ${token}` }),
            });
    }
}