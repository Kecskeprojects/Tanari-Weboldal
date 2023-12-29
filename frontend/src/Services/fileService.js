export default class fileService{
    static async GetAll(location) {
        const route = `${process.env.REACT_APP_BACKEND_URL}/File/GetAllForNavbar/`;
        if(location){
            route += `?location=${location}`
        }
        return fetch(route,
            {
                method: "GET",
            });
    }

    static async GetById(id) {
        const route = `${process.env.REACT_APP_BACKEND_URL}/File/GetById/${id}`;
        return fetch(route,
            {
                method: "GET",
            });
    }

    static async Create(formData, token) {
        const route = `${process.env.REACT_APP_BACKEND_URL}/File/Create/`;
        return fetch(route,
            {
                body: formData,
                method: "POST",
                headers: new Headers({ 'content-type': 'multipart/form-data', Authorization: `Bearer ${token}` }),
            });
    }

    static async Delete(id, token) {
        const route = `${process.env.REACT_APP_BACKEND_URL}/File/Delete/${id}`;
        return fetch(route,
            {
                method: "DELETE",
                headers: new Headers({ Authorization: `Bearer ${token}` }),
            });
    }
}