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

    let local_majors = await getAllMajors();
    populateSelect("delete_select_major", local_majors);
    populateSelect("edit_select_major", local_majors);

})().catch(err => {
    console.error(err);
});

/**
 * Populates the edit club fields.
 * 
 * @param club_id The id of the selected club
 */
function clubSelect(club_id)
{
    let club = clubs[club_id - 1];
    document.getElementById('edit_club_label').value = club.label;
    document.getElementById('edit_club_desc').value = club.description;
}

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

/**
 * Populates the edit major fields.
 *
 * @param major_id The id of the selected major
 */
function majorSelect(major_id)
{
    let major = global_majors[major_id];
    document.getElementById('edit_major_label').value = major.name;
    document.getElementById('edit_major_select_school').value = major.school_id;
}
