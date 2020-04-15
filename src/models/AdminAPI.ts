import { User, UserDB } from "./UserAPI";
import { Club } from "./Club";
import { School } from "./School";

interface GenericAPIResponse {
    success: boolean;
    error: string;
}

export class Admin extends User {
    constructor(creation_object: UserDB) {
        super(creation_object);
    }
    // utilizes the admin user to delete a specific club
    async deleteClub(club_id: number): Promise<GenericAPIResponse>{
        const club_found = await Club.find(club_id);
        if (club_found.id === -1) {
            return {success: false, error:""};
        }
        return (await club_found.delete());
    }
    // utilizes the admin user to update a specific club
    async updateClub(club_id: number, club_label: string, club_desc: string): Promise<GenericAPIResponse>{
        const club_found = await Club.find(club_id);
        if (club_found.id === -1) {
            return {success: false, error:""};
        }
        return (await club_found.update(club_label, club_desc));
    }
    // utilizes the admin user to create a club
    async createClub(club_label: string, club_desc: string): Promise<GenericAPIResponse> {
        // Should we check if the club already exists or was the admin smart enough to?
        return (await Club.create(club_label, club_desc));
    }

    // utilizes the admin user to delete a specific school
    async deleteSchool(school_id: number): Promise<GenericAPIResponse>{
        const school_found = await School.find(school_id);
        if (school_found.id === -1) {
            return {success: false, error:""};
        }
        return (await school_found.delete());
    }
    // utilizes the admin user to update a specific school
    async updateSchool(school_id: number, school_label: string, school_desc: string): Promise<GenericAPIResponse>{
        const school_found = await School.find(school_id);
        if (school_found.id === -1) {
            return {success: false, error:""};
        }
        return (await school_found.update(school_label, school_desc));
    }
    // utilizes the admin user to create a school
    async createSchool(school_label: string, school_desc: string): Promise<GenericAPIResponse> {
        // Should we check if the school already exists or was the admin smart enough to?
        return (await School.create(school_label, school_desc));
    }
}