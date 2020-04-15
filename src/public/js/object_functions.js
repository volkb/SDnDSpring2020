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
    constructor(id, label, description) {
        this.id = id;
        this.label = label;
        this.description = description;
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
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
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
        school_objects.push(new School(school.id, school.label, school.description));
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
        club_objects.push(new Club(club.id, club.club_name, club.description));
    }
    return club_objects;
}

/**
 * Get all majors and error check.
 *
 * @returns {Promise<[]|*[]>}
 */
async function getAllMajors() {
    let majors = await fetch("/profile/major");
    majors = await majors.json();
    if (majors.success) {
        majors = majors.data;
    } else {
        majors = [];
    }
    major_objects = [];
    for (let major of majors) {
        major_objects.push(new Major(major.id, major.label, major.school_id));
    }
    return major_objects;
}

/**
 * Listener function that gets lazy loads all of the states for a given country.
 *
 * @returns {Promise<void>}
 */
async function countrySelectionChange(country_id, state_id) {
    const select = document.getElementById(country_id);
    if (select.value !== "") {
        const states = await countries[select.value-1].getStates();
        populateSelect(state_id, states);
    }
}

/**
 * Listener function that lazy loads all of the majors for a selected school at RPI.
 *
 * @returns {Promise<void>}
 */
async function schoolSelectionChange(school_id, major_id) {
    const select = document.getElementById(school_id);
    if (select.value !== "") {
        const majors = await schools[select.value-1].getMajors();
        populateSelect(major_id, majors);
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