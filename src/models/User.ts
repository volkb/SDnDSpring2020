import {DBManager} from "../server";
// The class representing our generic user. Will need alumni and student subclasses
export class User{
    oauth_token: string;
    first_name: string | undefined;
    last_name: string | undefined;
    email: string;
    id: number | undefined;
    constructor(oauth_token: string, first_name: string | undefined, last_name: string | undefined, email: string, id?: number) {
        this.oauth_token = oauth_token;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.id = id;
    }
    static async find(accessToken: string): Promise<User | false> {
        const result = await DBManager.executeQuery("SELECT * from users where oauth_token = ?", [accessToken]);
        if (result.success) {
            if (result.data.length != 0) {
                const user_obj = result.data[0];
                return new User(accessToken, user_obj.first_name, user_obj.last_name, user_obj.email, user_obj.id);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    static async create(accessToken: string, first_name: string, last_name: string, email: string): Promise<User> {
        const result = await DBManager.executeQuery("INSERT INTO users(oauth_token, email, first_name, last_name) VALUES (? , ?, ?, ?);", [accessToken, email, first_name, last_name]);
        if (result.success) {
            return new User(accessToken, first_name, last_name, email);
        } else {
            console.error("User creation issue!");
            return new User(accessToken, "", "", "",);
        }
    }
    static async findOrCreate(accessToken: string, first_name?: string, last_name?: string, email?: string): Promise<User> {
        let user = await User.find(accessToken);
        if (user === false) {
            if (first_name && last_name && email) {
                user = await User.create(accessToken, first_name, last_name, email);
            } else {
                user = new User(accessToken, "UNKNOWN", "UNKNOWN", "UNKNOWN");
            }
        }
        return user;
    }
}