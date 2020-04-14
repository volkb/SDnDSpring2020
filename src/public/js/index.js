async function is_logged_in() {
    // TODO: Use this function to display the nav bar or hide it
    let user_data = await fetch("/profile");
    user_data = await user_data.json();
    console.log(user_data);
}

is_logged_in();
