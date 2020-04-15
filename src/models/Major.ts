import { DBManager } from "../server";

interface MajorDB {
    id: number;
    school_id: number;
    name?: string;
}
export class Major implements MajorDB {
    id: number;
    school_id: number;
    name?: string;
    // From the Database construct a major object
    constructor(major_obj: MajorDB) {
        Object.assign(this, major_obj);
        this.id = major_obj.id;
        this.school_id = major_obj.school_id;
    }
    // Returns a major in the database. Major has id of -1 if none was found
    static async find(major_id: number): Promise<Major> {
        const response = await DBManager.executeQuery("SELECT * FROM major WHERE id = ?", [major_id.toString()]);
        if (response.success) {
            if (response.data.length == 1) {
                return new Major(response.data[0]);
            } else {
                return new Major({id: -1, school_id: -1}); 
            }
        } else {
            return new Major({id: -1, school_id: -1});
        }
    }
    static async create(school_id: number, major_name: string): Promise<{success: boolean; error: string}> {
        const returned = {success: true, error: ""};
        const response = await DBManager.executeQuery("INSERT INTO major(school_id, label) VALUES (?, ?)", [school_id.toString(), major_name]);
        returned.success = response.success;
        response.success ? returned.error = "" : returned.error = "Failed to create new major!";
        return returned;
    }
    // TODO: Centralize Interfaces (GenericAPIResponse would be good here)
    async delete(): Promise<{success: boolean; error: string}> {
        const returned = {success: true, error: ""};
        const response = await DBManager.executeQuery("DELETE FROM major WHERE id = ?", [this.id.toString()]);
        returned.success = response.success;
        response.success ? returned.error = "" : returned.error = "Failed to delete!";
        return returned;
    }

    async update(school_id: number, major_name: string): Promise<{success: boolean; error: string}> {
        const returned = {success: true, error: ""};
        const response = await DBManager.executeQuery("UPDATE major SET school_id=?,label=? WHERE id = ?", 
                        [school_id.toString(), major_name, this.id.toString()]);
        // If it succeeds we want to update the current object
        if (response.success) {
            this.school_id = school_id;
            this.name = major_name;
        } else {
            returned.success = false;
            returned.error = "Unable to update major!";
        }
        return returned;
    }
}