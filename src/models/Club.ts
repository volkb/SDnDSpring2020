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
}