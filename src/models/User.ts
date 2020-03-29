import {DBManager} from "../server";

// Type to describe what a response from a User API would look like
interface UserAPIResponse {
    success: boolean;
    data: User | undefined;
    error: string;
}

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
    // Given an access code finds the user in the database
    static async find(accessToken: string): Promise<UserAPIResponse> {
        const response: UserAPIResponse = {success: true, data: undefined, error: ""};
        const result = await DBManager.executeQuery("SELECT * from users where oauth_token = ?", [accessToken]);
        if (result.success) {
            if (result.data.length != 0) {
                const user_obj = result.data[0];
                response.success = true;
                response.data = new User(accessToken, user_obj.first_name, user_obj.last_name, user_obj.email, user_obj.id);
            } else {
                response.success = false;
                response.error = "No user found!";
            }
        } else {
            response.success = false;
            response.error = "Database request for find user failed!";
        }
        return response;
    }
    // Creates a user and inserts them into the database based on the given information
    static async create(accessToken: string, first_name: string, last_name: string, email: string): Promise<UserAPIResponse> {
        const response: UserAPIResponse = {success: true, data: undefined, error: ""};
        const result = await DBManager.executeQuery("INSERT INTO users(oauth_token, email, first_name, last_name) VALUES (? , ?, ?, ?);", [accessToken, email, first_name, last_name]);
        if (result.success) {
            response.success = true;
            response.data =  new User(accessToken, first_name, last_name, email);
        } else {
            console.error("User creation issue!");
            response.success = false;
            response.error = "Unable to create user!";
        }
        return response;
    }
    // If unable to find user attemps to create one
    static async findOrCreate(accessToken: string, first_name?: string, last_name?: string, email?: string): Promise<UserAPIResponse> {
        let response = await User.find(accessToken);
        if (!response.success) {
            if (first_name && last_name && email) {
                response = await User.create(accessToken, first_name, last_name, email);
            } else {
                response.error = "Unable to find or create user due to lack of user info!";
            }
        }
        return response;
    }
    async updateUserProfile(): Promise<UserAPIResponse> {
        const response = {success: true, data: undefined, error: ""};
        return response;
    }
}