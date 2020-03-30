// Global as we we need the country objects and school objects for profile editing
var countries = [];
var schools = [];

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
    menubar: "favs file edit view insert format tools table help"
});

// Get the countries and error check
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


// Get the Schools and error check
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

async function populateFields() {
    let user_data = await fetch("/profile");
    user_data = await user_data.json();
    user_data = user_data.data;
    console.log(user_data);
    countries = await getCountries();
    populateSelect("country", countries);
    schools = await getSchools();
    populateSelect("school", schools);

    document.getElementById("first_name").value = user_data.first_name;
    document.getElementById("last_name").value = user_data.last_name;
    document.getElementById("email").value = user_data.email;
    document.getElementById("bio").innerText = user_data.bio;
    document.getElementById("minor").value = user_data.minor;
    document.getElementById("country").value = user_data.country_id;
    document.getElementById("school").value = user_data.school_id;
    await countrySelectionChange();
    await schoolSelectionChange();
    document.getElementById("state").value = user_data.state_id;
    document.getElementById("major").value = user_data.major_id;

}

async function countrySelectionChange() {
    const select = document.getElementById("country");
    if (select.value !== "") {
        const states = await countries[select.value-1].getStates();
        populateSelect("state", states);
    }
}

async function schoolSelectionChange() {
    const select = document.getElementById("school");
    if (select.value !== "") {
        const majors = await schools[select.value-1].getMajors();
        populateSelect("major", majors);
    }
}

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

populateFields();