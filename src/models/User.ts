export class User{
    id: string;
    first_name: string | undefined;
    last_name: string | undefined;
    email: string;
    auth_token: string;
    constructor(id: string, first_name: string | undefined, last_name: string | undefined, email: string, auth_token: string) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.auth_token = auth_token;
    }
}