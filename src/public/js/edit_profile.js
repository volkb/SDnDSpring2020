tinymce.init({
    selector: '#bio',
    plugins: [
        'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        'table emoticons template paste help'
    ],
    toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist outdent indent | link image | print preview media fullpage | ' +
        'forecolor backcolor emoticons | help',
    menu: {
        favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | spellchecker | emoticons'}
    },
    menubar: 'favs file edit view insert format tools table help'
});

// Populates your profile with your current information
fetch('/get_my_profile')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        document.getElementById('first_name').setAttribute('value', data.first_name);
        document.getElementById('last_name').setAttribute('value', data.last_name);
        document.getElementById('email').setAttribute('value', data.email);
        document.getElementById('bio').setAttribute('text', data.bio);
    });