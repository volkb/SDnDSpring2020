// Global as we we need the country objects and school objects for profile editing
var countries = [];
var schools = [];
var clubs = [];

/**
 * A class to represent a country
 */
class Country {
    constructor(id, sortname, name, phonecode) {
        this.id = id;
        this.sortname = sortname;
        this.name = name;
        this.phonecode = phonecode;
        this.states = [];
    }
    // Fetches the states for this particular country from the backend
    async getStates() {
        if (this.states.length == 0) {
            let states = await fetch(`/profile/state/${this.id}`);
            states = await states.json();
            if (states.success) {
                for (let state of states.data) {
                    this.states.push(new State(state.id, state.name, state.country_id));
                }
            }
            return this.states;
        } else {
            return this.states;
        }
    }
    // Converts the country to a select option
    toSelectOption() {
        const option = document.createElement("option");
        option.value = this.id;
        option.text = this.name;
        return option;
    }
}

/**
 * A class to represent a state.
 */
class State {
    constructor(id, name, country_id) {
        this.id = id;
        this.name = name;
        this.country_id = country_id;
    }
    toSelectOption() {
        const option = document.createElement("option");
        option.value = this.id;
        option.text = this.name;
        return option;
    }
}

/**
 * A class to represent a club.
 */
class Club {
    constructor(id, label) {
        this.id = id;
        this.label = label;
    }
    toSelectOption() {
        const option = document.createElement("option");
        option.value = this.id;
        option.text = this.label;
        return option;
    }
}

/**
 * A class to represent a school at RPI.
 */
class School {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.majors = [];
    }
    // Fetches the majors for this particular school from the backend
    async getMajors() {
        if (this.majors.length == 0) {
            let majors = await fetch(`/profile/major/${this.id}`);
            majors = await majors.json();
            if (majors.success) {
                for (let major of majors.data) {
                    this.majors.push(new Major(major.id, major.label, major.school_id));
                }
            }
            return this.majors;
        } else {
            return this.majors;
        }
    }
    // Converts the country to a select option
    toSelectOption() {
        const option = document.createElement("option");
        option.value = this.id;
        option.text = this.name;
        return option;
    }
}

/**
 * A class to represent a user's major.
 */
class Major {
    constructor(id, name, school_id) {
        this.id = id;
        this.name = name;
        this.school_id = school_id;
    }
    toSelectOption() {
        const option = document.createElement("option");
        option.value = this.id;
        option.text = this.name;
        return option;
    }
}

// Creates the WYSIWYG editor
tinymce.init({
    selector: "#bio",
    plugins: [
        "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "table emoticons template paste help"
    ],
    toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | " +
        "bullist numlist outdent indent | link image | print preview media fullpage | " +
        "forecolor backcolor emoticons | help",
    menu: {
        favs: {title: "My Favorites", items: "code visualaid | searchreplace | spellchecker | emoticons"}
    },
    menubar: "favs file edit view insert format tools table help",
    oninit: populateFields()
});

/**
 * Get the countries and error check
 *
 * @returns {Promise<[]|*[]>}
 */
async function getCountries() {
    let countries = await fetch("/profile/country");
    countries = await countries.json();
    if (countries.success) {
        countries = countries.data;
    } else {
        countries = [];
    }
    country_objects = [];
    for (let country of countries) {
        country_objects.push(new Country(country.id, country.sortname, country.name, country.phonecode));
    }
    return country_objects;
}

/**
 * Get the Schools and error check.
 *
 * @returns {Promise<[]|*[]>}
 */
async function getSchools() {
    let schools = await fetch("/profile/school");
    schools = await schools.json();
    if (schools.success) {
        schools = schools.data;
    } else {
        schools = [];
    }
    school_objects = [];
    for (let school of schools) {
        school_objects.push(new School(school.id, school.label));
    }
    return school_objects;
}

/**
 * Get the club and error check.
 *
 * @returns {Promise<[]|*[]>}
 */
async function getClubs() {
    let clubs = await fetch("/profile/club");
    clubs = await clubs.json();
    if (clubs.success) {
        clubs = clubs.data;
    } else {
        clubs = [];
    }
    club_objects = [];
    for (let club of clubs) {
        club_objects.push(new Club(club.id, club.club_name));
    }
    return club_objects;
}

document.getElementById("profile_picture").onchange = function () {
    var reader = new FileReader();

    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        let file_type = document.getElementById("profile_picture").files[0].type;
        if(file_type === "image/png" || file_type === "image/jpeg" || file_type === "image/jpg")
        {
            document.getElementById("profile_image").src = e.target.result;
        }
        else
        {
            // TODO: Set up the file to not upload if this error state is reached
            $("#picture_err_message").html("The file you selected is not one of the following acceptable file types:<br><br>- jpeg<br>- jpg<br>- png");
            $("#picture_err_message").css("display","block");
        }
    };

    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
};

/**
 * Populates the user's profile fields with their current information.
 *
 * @returns {Promise<void>}
 */
async function populateFields() {
    check_for_errors();
    let user_data = await fetch("/profile");
    user_data = await user_data.json();
    user_data = user_data.data;
    console.log(user_data);
    countries = await getCountries();
    populateSelect("country", countries);
    schools = await getSchools();
    populateSelect("school", schools);

    // Instantiates the multiple select plugin for the club input
    clubs = await getClubs();
    let club_ids = [];
    for(let x = 0; x < user_data.clubs.length; x++)
    {
        club_ids.push(user_data.clubs[x].id);
    }
    populateSelect("clubs", clubs);

    let $select = $('#clubs').selectize({
        plugins: ['remove_button'],
        maxItems: null
    });
    let selectize = $select[0].selectize;
    selectize.setValue(club_ids);

    document.getElementById("first_name").value = user_data.first_name;
    document.getElementById("last_name").value = user_data.last_name;
    document.getElementById("email").value = user_data.email;
    document.getElementById('bio').innerText = user_data.bio;
    tinymce.get("bio").setContent(user_data.bio);
    document.getElementById("minor").value = user_data.minor;
    document.getElementById("country").value = user_data.country_id;
    document.getElementById("school").value = user_data.school_id;
    await countrySelectionChange();
    await schoolSelectionChange();
    document.getElementById("state").value = user_data.state_id;
    document.getElementById("major").value = user_data.major_id;
    document.getElementById("profile_image").src = "/profile_pictures/" + user_data.picture;
    document.getElementById("grad_date").value = moment(user_data.grad_date).add(1,'days').format('YYYY-MM-DD');
}

/**
 * If there was an error uploading your profile picture displays the message on the front end.
 */
function check_for_errors()
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const error_message = urlParams.get('err');

    if(error_message !== null)
    {
        document.getElementById("picture_err_message").style.display = 'block';
    }
    else
    {
        document.getElementById("picture_err_message").style.display = 'none';
    }

    document.getElementById("picture_err_message").innerText = error_message;
}

/**
 * Listener function that gets lazy loads all of the states for a given country.
 *
 * @returns {Promise<void>}
 */
async function countrySelectionChange() {
    const select = document.getElementById("country");
    if (select.value !== "") {
        const states = await countries[select.value-1].getStates();
        populateSelect("state", states);
    }
}

/**
 * Listener function that lazy loads all of the majors for a selected school at RPI.
 *
 * @returns {Promise<void>}
 */
async function schoolSelectionChange() {
    const select = document.getElementById("school");
    if (select.value !== "") {
        const majors = await schools[select.value-1].getMajors();
        populateSelect("major", majors);
    }
}

/**
 * A helper function that populates a select field.
 *
 * @param select_id The id of the select element to populate
 * @param objects The objects to populate in the select
 */
function populateSelect(select_id, objects) {
    const select = document.getElementById(select_id);
    select.innerHTML = "";
    const choose = document.createElement("option");
    choose.value = "";
    choose.text = "Choose...";
    select.add(choose);
    objects.forEach(object => {
        select.add(object.toSelectOption());
    });
}