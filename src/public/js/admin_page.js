var global_users = {};
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

    populateUserSelect();

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

/**
 * Populates the admin select dropdown
 *
 * @param id The id of the selected user
 */
function userSelect(id)
{
    let user = global_users[id];
    if(user.isadmin === 1)
    {
        $("#admin").prop("checked", true);
    }
    else
    {
        $("#non_admin").prop("checked", true);
    }
}

/**
 * Get the countries and error check
 *
 * @returns {Promise<[]|*[]>}
 */
async function populateUserSelect() {
    let users = await fetch("/profile/users");
    users = await users.json();
    if (users.success) {
        users = users.data;
    } else {
        users = [];
    }

    let html = "<option value=''>Choose...</option>";
    for(let x = 0; x < users.length; x++)
    {
        html += "<option value='" + users[x].id + "'>" + users[x].first_name + " " + users[x].last_name + "</option>";
        global_users[users[x].id] = users[x];
    }

    $("#edit_admin_user").html(html);
    return users;
}


