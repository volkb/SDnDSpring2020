import {DBManager} from "../server";
import { Club } from "./Club";

// Type to describe what a response from a User API would look like
interface UserAPIResponse {
    success: boolean;
    data: User[] | User | undefined;
    error: string;
}

type ProfileUpdate  = {
    first_name: string;
    last_name: string;
    email: string;
    country: string;
    state: string;
    zip: string;
    bio: string;
    school: string;
    picture: string;
    major: string;
    minor: string;
    grad_date: string;
    clubs: string[];
    club_start: string[];
    club_end: string[];
}

export interface UserDB {
    id: number;
    oauth_token: string;
    email: string;
    first_name: string;
    last_name: string;
    grad_date?: string;
    industry?: string;
    picture?: string;
    bio?: string;
    isadmin?: number;
    major_id?: number;
    minor?: string;
    country_id?: number;
    state_id?: number;
}

// The class representing our generic user. Will need alumni and student subclasses
export class User implements UserDB{
    id: number;
    oauth_token: string;
    email: string;
    first_name: string;
    last_name: string;
    grad_date?: string;
    industry?: string;
    picture?: string;
    bio?: string;
    isadmin?: number;
    major_id?: number;
    minor?: string;
    country_id?: number;
    state_id?: number;
    clubs: Club[];
    
    constructor(creation_object: UserDB) {
        Object.assign(this, creation_object);
        this.id = creation_object.id;
        this.oauth_token = creation_object.oauth_token;
        this.email = creation_object.email;
        this.first_name = creation_object.first_name;
        this.last_name = creation_object.last_name;
        this.clubs = [];
    }
    // Given an access code finds the user in the database
    static async find(accessToken: string): Promise<UserAPIResponse> {
        const response: UserAPIResponse = {success: true, data: undefined, error: ""};
        const result = await DBManager.executeQuery("SELECT * from user where oauth_token = ?", [accessToken]);
        if (result.success) {
            if (result.data.length != 0) {
                const user_obj = result.data[0];
                response.success = true;
                response.data = new User(user_obj);
                response.data.clubs = await response.data.getClubs();
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
        const result = await DBManager.executeQuery("INSERT INTO user(oauth_token, email, first_name, last_name) VALUES (? , ?, ?, ?);", [accessToken, email, first_name, last_name]);
        if (result.success) {
            response.success = true;
            response.data =  await (await User.find(accessToken)).data;
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
    async updateUserProfile(updated_info: ProfileUpdate): Promise<UserAPIResponse> {
        const response = {success: true, data: undefined, error: ""};
        let result = await DBManager.executeQuery("UPDATE user SET first_name = ?, last_name = ?, email = ?,\
                        bio = ?, grad_date = ?, major_id = ?, minor = ?, country_id = ?, state_id = ?, school_id = ?, picture = ? WHERE oauth_token = ?",
                        [updated_info.first_name, updated_info.last_name, updated_info.email, updated_info.bio,
                        updated_info.grad_date, updated_info.major, updated_info.minor, updated_info.country,
                        updated_info.state, updated_info.school, updated_info.picture, this.oauth_token]);
        await DBManager.executeQuery("DELETE FROM club_roster WHERE user_id=?", [this.id.toString()]);
        for(let i = 0; i < updated_info.clubs.length; i++) {
            if (updated_info.clubs[i] === "") {
                continue;
            }
            result = await DBManager.executeQuery("INSERT INTO club_roster VALUES(?, ?);", 
                         [updated_info.clubs[i], this.id.toString()]);
            if (!result.success) {
                response.success = false;
                break;
            }
        }
        if (!result.success) {
            response.success = false;
            response.error = "Unable to update user profile!";
        }
        return response;
    }
    // Searches all users either for alumni or students 
    async searchAllUsers(alumni = false): Promise<UserAPIResponse> {
        const response: UserAPIResponse = {success: true, data: undefined, error: ""};
        let query = "SELECT user.*, major.label as major_label, country.name as country_label, state.name as state_label, school.label as school_label \
            FROM user \
            JOIN major ON major_id = major.id  \
            JOIN country ON country_id = country.id \
            JOIN state ON state_id = state.id \
            JOIN school ON user.school_id = school.id \
            WHERE grad_date";
        // They're an alumni if their graduation date is in the past
        if (alumni) {
            query = query + " < NOW();"; 
        } else {
            query = query + " > NOW();";
        }
        const result = await DBManager.executeQuery(query, []);
        if (result.success) {
            response.data = [];
            // Goes through all the users returned in the search and created User objects from the database
            for (const user of result.data) {
                // No point including yourself in a search
                if (user.oauth_token !== this.oauth_token) {
                    response.data.push(new User(user));
                }
            }
        } else {
            console.error("Error in searchAllUsers!");
            response.success = false;
            response.error = "DB failed during search all users";
        }
        return response;
    }
    // Gets all the clubs which a user has (this is called privately in User.find so that all users retrieved have their clubs)
    private async getClubs(): Promise<Club[]> {
        const result = await DBManager.executeQuery("SELECT clubs.* FROM club_roster\
                             JOIN clubs on club_id = clubs.id WHERE user_id = ?", [this.id.toString()]);
        if (result.success) {
            const clubs: Club[] = [];
            for (const club of result.data) {
                clubs.push(new Club(club));
            }
            return clubs;
        } else {
            return [];
        }
    }
}