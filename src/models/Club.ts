import { DBManager } from "../server";

interface ClubDB {
    id: number;
    club_name?: string;
    description?: string;
}
export class Club implements ClubDB {
    id: number;
    club_name?: string;
    description?: string;
    // From the Database construct a club object
    constructor(clubobj: ClubDB) {
        Object.assign(this, clubobj);
        this.id = clubobj.id;
    }
    // Returns a club in the database. Club has id of -1 if none was found
    static async find(club_id: number): Promise<Club> {
        const response = await DBManager.executeQuery("SELECT * FROM clubs WHERE id = ?", [club_id.toString()]);
        if (response.success) {
            if (response.data.length == 1) {
                return new Club(response.data[0]);
            } else {
                return new Club({id: -1}); 
            }
        } else {
            return new Club({id: -1});
        }
    }
    static async create(club_name: string, club_desc: string): Promise<{success: boolean; error: string}> {
        const returned = {success: true, error: ""};
        const response = await DBManager.executeQuery("INSERT INTO clubs(club_name,description) VALUES (?, ?)", [club_name, club_desc]);
        returned.success = response.success;
        response.success ? returned.error = "" : returned.error = "Failed to create new club!";
        return returned;
    }
    // TODO: Centralize Interfaces (GenericAPIResponse would be good here)
    async delete(): Promise<{success: boolean; error: string}> {
        const returned = {success: true, error: ""};
        const response = await DBManager.executeQuery("DELETE FROM clubs WHERE id = ?", [this.id.toString()]);
        returned.success = response.success;
        response.success ? returned.error = "" : returned.error = "Failed to delete!";
        return returned;
    }

    async update(club_name: string, club_desc: string): Promise<{success: boolean; error: string}> {
        const returned = {success: true, error: ""};
        const response = await DBManager.executeQuery("UPDATE clubs SET club_name=?,description=? WHERE id = ?", [club_name, club_desc, this.id.toString()]);
        // If it succeeds we want to update the current object
        if (response.success) {
            this.club_name = club_name;
            this.description = club_desc;
        } else {
            returned.success = false;
            returned.error = "Unable to update club!";
        }
        return returned;
    }
}