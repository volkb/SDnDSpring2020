(async () => {
    schools = await getSchools();
    populateSelect("edit_major_select_school", schools);
    populateSelect("delete_select_school", schools);
    populateSelect("select_school", schools);
    populateSelect("add_major_select_school", schools);

    // Instantiates the multiple select plugin for the club input
    clubs = await getClubs();
    populateSelect("select_delete_club", clubs);
    populateSelect("select_edit_club", clubs);

    majors = await getAllMajors();
    populateSelect("delete_select_major", majors);
    populateSelect("edit_select_major", majors);

})().catch(err => {
    console.error(err);
});

/**
 * Populates the edit club fields.
 * 
 * @param club_id The id of the selected club
 */
function select_club(club_id)
{
    let club = clubs[club_id - 1];
    document.getElementById('edit_club_label').value = club.label;
    document.getElementById('edit_club_desc').value = club.description;
}

//TODO: For some reason the select school function is not visible the the admin page
/**
 * Populates the edit school fields.
 *
 * @param school_id The id of the selected school
 */
function schoolSelect(school_id)
{
    let school = schools[school_id - 1];
    document.getElementById('edit_school_label').value = school.name;
    document.getElementById('edit_school_desc').value = school.description;
}