/**
 * Gets a clubs information and populates it on the edit club form.
 *
 * @param club_id The id of the selected club
 */
async function select_club(club_id) {
    // TODO: Need a route for this
    let club = await fetch("/get_club");
    $("#edit_club_label").val(club.label);
    $("#edit_club_desc").val(club.description);
}

/**
 * Gets a majors information and populates it on the edit major form.
 *
 * @param major_id The id of the selected major
 */
async function select_major(major_id) {
    // TODO: Need a route for this
    let major = await fetch("/get_major");
    $("#edit_major_label").val(major.label);
    $("#edit_major_select_school").val(major.school_id);
}

/**
 * Gets a schools information and populates it on the edit school form.
 *
 * @param school_id The id of the selected school
 */
async function select_school(school_id) {
    // TODO: Need a route for this
    let school = await fetch("/get_school");
    $("#edit_school_label").val(school.label);
    $("#edit_school_desc").val(school.description);
}
