export default class UserData{
    constructor(user){
        if(user){
            this.expiresOn = new Date(user.expiresOn);
            this.token = user.accessToken;
            this.id = user.id;
            return;
        }
        this.expiresOn = new Date();
        this.token = null;
        this.id = null;
    }

    isLoggedIn(){
        return this.token && this.expiresOn && this.expiresOn > new Date();
    }

    isEmpty(){
        return !this.token;
    }
}