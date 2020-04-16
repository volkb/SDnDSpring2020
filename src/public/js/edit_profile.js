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
    await countrySelectionChange('country', 'state');
    await schoolSelectionChange('school', 'major');
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
