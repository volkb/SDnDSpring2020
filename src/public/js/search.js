let query = '';
const filter_list = [
    "first_name",
    "last_name",
    "major_label",
    "country_label",
    "state_label",
    "school_label"
];

let columns = [
    {title:"ID", field:"id", visible:false},
    {title:"School ID", field:"school_id", visible:false},
    {title:"First Name", field:"first_name", visible:false},
    {title:"Last Name", field:"last_name", visible:false},
    {title:"Email", field:"email", visible:false},
    {title:"Bio", field:"bio", visible:false},
    {title:"Major ID", field:"major_id", visible:false},
    {title:"Country ID", field:"country_id", visible:false},
    {title:"Graduation Date", field:"grad_date", visible:false},
    {title:"Major", field:"major_label", visible:false},
    {title:"Country", field:"country_label", visible:false},
    {title:"State", field:"state_label", visible:false},
    {title:"School", field:"school_label", visible:false},
];

// Creates the user search table
const table = new Tabulator("#search_table", {
    height:"550px",
    layout:"fitColumns",
    ajaxURL: "/search/users",
    ajaxConfig:"GET", //ajax HTTP request type
    ajaxContentType:"json", // send parameters to the server as a JSON encoded string
    ajaxResponse:function(url, params, response){
        //url - the URL of the request
        //params - the parameters passed with the request
        //response - the JSON object returned in the body of the response.

        if(response.success)
        {
            document.getElementById("search_err_message").style.display = "none";
        }
        else
        {
            document.getElementById("search_err_message").innerText = response.error;
            document.getElementById("search_err_message").style.display = "block";
        }

        console.log(response);
        return response.data; //return the tableData property of a response json object
    },
    resizableColumns:false,
    columns: columns,
    rowFormatter:format_row,
    rowClick:show_profile,
});


/**
 * Shows the user's profile in a modal.
 *
 * @param e
 * @param row
 */
function show_profile(e, row){
    //e - the click event object
    //row - row component
    let data = row.getData();
    $('#user_modal').modal('show');
    $('#user_modal_title').text(data.first_name + " " + data.last_name + "'s Profile");
    $('#user_email').text(data.email);
    $('#user_location').text(data.state_label + ", " + data.country_label);
    $('#user_bio').html(data.bio);
    $('#user_grad_date').text(moment(data.grad_date).format("MM/DD/YYYY"));
    $('#user_profile_image').prop("src", "/profile_pictures/" + data.picture);
}

/**
 * Styles the row in the table.
 *
 * @param row The row object that is being styled
 */
function format_row(row){
    const element = row.getElement();
    const width = element.offsetParent.offsetParent.offsetParent.offsetWidth;
    const data = row.getData();
    let rowTable;

    //clear current row data
    while(element.firstChild) element.removeChild(element.firstChild);

    //define a table layout structure and set width of row
    rowTable = document.createElement("table");
    rowTable.style.width = (width - 3) + "px";
    const rowTabletr = document.createElement("tr");

    //add image on left of row
    let cellContents = "<td><img style='max-height: 200px;' src='/profile_pictures/" + data.picture + "'></td>";

    //add row data on right hand side
    cellContents += "<td><div><strong>Name:</strong> " + data.first_name + " " + data.last_name +
        "</div><div><strong>Major:</strong> " + data.major_label +
        "</div><div><strong>Grad Year:</strong> " + moment(data.grad_date).format("YYYY") +
        "</div><div><strong>Country:</strong> " + data.country_label + "</div></td>";

    rowTabletr.innerHTML = cellContents;
    rowTable.appendChild(rowTabletr);

    //append newly formatted contents to the row
    element.append(rowTable);
}

/**
 * Searches the user table.
 */
function search_table(query_string) {
    query = query_string;
    update_filters();
}

/**
 * Selects a user type to search from.
 */
function select_user_type(user_type) {
    // TODO: Make this work to reset the table
    if(user_type === 'alumni')
    {
        table.setData("/search/users?alumni=1");
    }
    else
    {
        table.setData("/search/users?alumni=0");
    }
}

/**
 * Sets the filter in the database.
 */
function update_filters() {
    table.clearFilter();
    let updated_filters = [];
    for(let x = 0; x < filter_list.length; x++)
    {
        if($("#" + filter_list[x]).prop("checked"))
        {
            updated_filters.push({
                field: filter_list[x],
                type: 'like',
                value: query
            });
        }
    }

    table.setFilter([updated_filters]);
}