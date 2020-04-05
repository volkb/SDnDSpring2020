interface ClubDB {
    id: number;
    club_name?: string;
    description?: string;
    start?: string;
    end?: string;
}

export class Club implements ClubDB {
    id: number;
    club_name?: string;
    description?: string;
    start?: string;
    end?: string;
    // From the Database construct a club object
    constructor(clubobj: ClubDB) {
        Object.assign(this, clubobj);
        this.id = clubobj.id;
    }
}