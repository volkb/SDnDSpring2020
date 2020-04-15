import { DBManager } from "../server";

interface SchoolDB {
    id: number;
    label?: string;
    description?: string;
}
export class School implements SchoolDB {
    id: number;
    label?: string;
    description?: string;
    // From the Database construct a school object
    constructor(school_obj: SchoolDB) {
        Object.assign(this, school_obj);
        this.id = school_obj.id;
    }
    // Returns a school in the database. School has id of -1 if none was found
    static async find(school_id: number): Promise<School> {
        const response = await DBManager.executeQuery("SELECT * FROM school WHERE id = ?", [school_id.toString()]);
        if (response.success) {
            if (response.data.length == 1) {
                return new School(response.data[0]);
            } else {
                return new School({id: -1}); 
            }
        } else {
            return new School({id: -1});
        }
    }
    static async create(school_name: string, school_desc: string): Promise<{success: boolean; error: string}> {
        const returned = {success: true, error: ""};
        const response = await DBManager.executeQuery("INSERT INTO school(label, description) VALUES (?, ?)", [school_name, school_desc]);
        returned.success = response.success;
        response.success ? returned.error = "" : returned.error = "Failed to create new school!";
        return returned;
    }
    // TODO: Centralize Interfaces (GenericAPIResponse would be good here)
    async delete(): Promise<{success: boolean; error: string}> {
        const returned = {success: true, error: ""};
        const response = await DBManager.executeQuery("DELETE FROM school WHERE id = ?", [this.id.toString()]);
        returned.success = response.success;
        response.success ? returned.error = "" : returned.error = "Failed to delete!";
        return returned;
    }

    async update(school_name: string, school_desc: string): Promise<{success: boolean; error: string}> {
        const returned = {success: true, error: ""};
        const response = await DBManager.executeQuery("UPDATE school SET label=?,description=? WHERE id = ?", 
                        [school_name, school_desc, this.id.toString()]);
        // If it succeeds we want to update the current object
        if (response.success) {
            this.label = school_name;
            this.description = school_desc;
        } else {
            returned.success = false;
            returned.error = "Unable to update school!";
        }
        return returned;
    }
}