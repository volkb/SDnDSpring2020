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
    columns:[
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
    ],
    rowFormatter:format_row,
    rowClick:function(e, row){
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
    },
});

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
        "</div><div><strong>Country:</strong> 1</div></td>";

    rowTabletr.innerHTML = cellContents;
    rowTable.appendChild(rowTabletr);

    //append newly formatted contents to the row
    element.append(rowTable);
}


/**
 * Searches the user table.
 */
function search_table(query) {
    //TODO: Use tabulator filters here in combination with the side bar options to search the table
    console.log(query);
}

/**
 * Selects a user type to search from.
 */
function select_user_type(user_type) {
    //TODO: Make this set the data with the alumni or student search query
    console.log(user_type);
}