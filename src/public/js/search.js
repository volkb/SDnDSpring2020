// Define some test data
const cheeseData = [
    {id:1, type:"Brie", rind:"mould", age:"4 weeks", color:"white", image:"brie.jpg"},
    {id:2, type:"Cheddar", rind:"none", age:"1 year", color:"yellow", image:"cheddar.jpg"},
    {id:3, type:"Gouda", rind:"wax", age:"6 months", color:"cream", image:"gouda.jpg"},
    {id:4, type:"Swiss", rind:"none", age:"9 months", color:"yellow", image:"swiss.jpg"},
];

const alumniTestData = [
    {id: 1, first_name: "Escher", last_name: "Campanella", grad_date: 2021, industry: "Computer Science", email: "campae@rpi.edu", picture: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/53435153_2278030889101425_1097496257322024960_n.jpg?_nc_cat=103&_nc_sid=85a577&_nc_oc=AQnbtAoUfHlPxFHAvzHc-6s1U513-GI7jDoVZg0mXCC_FWD9A9NSk71-VMAIBdWjK8Q&_nc_ht=scontent-lga3-1.xx&oh=fcbe4d99951474b1dc2a3dd73189dbf3&oe=5EA759D3", country_id: 231, state_id: 3927},
    {id: 2, first_name: "Ben", last_name: "Volk", grad_date: 3000, industry: "Computer Science", email: "ben@ben.ben", picture: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/p960x960/73080791_2526422740726382_8740518533399576576_o.jpg?_nc_cat=109&_nc_sid=85a577&_nc_oc=AQkbCbD39kXmjXYUPBZrm_6BH95tu6_16cCaQUd75j3ZuftPikQJJ72C7Z0ahbcRVCE&_nc_ht=scontent-lga3-1.xx&_nc_tp=6&oh=be65f43cee63510dc7964824b0b9f5e3&oe=5EA76013", country_id: 231, state_id: 3953},
    {id: 3, first_name: "Leo", last_name: "Campanella", grad_date: 2030, industry: "cat", email: "cats@meow.com", picture: "/images/rpi_logo.jpg", country_id: 1, state_id: 3927}
];

//define Tabulator
const table = new Tabulator("#search_table", {
    ajaxURL:"", //ajax URL
    ajaxConfig:"POST", //ajax HTTP request type
    height:"500px",
    layout:"fitColumns",
    resizableColumns:false,
    columns:[
        {title:"Alumni", field:"type", sorter:"string"}
    ],
    rowFormatter:function(row){
        const element = row.getElement();
        const width = element.offsetWidth;
        //const height = element.offsetHeight;
        const data = row.getData();
        let rowTable;

        //clear current row data
        while(element.firstChild) element.removeChild(element.firstChild);

        //define a table layout structure and set width of row
        rowTable = document.createElement("table");
        rowTable.style.width = (width - 18) + "px";
        const rowTabletr = document.createElement("tr");

        //add image on left of row
        let cellContents = "<td width ='10%'><img src='" + data.picture + "' class='img-fluid' alt='Responsive image'></td>";

        //add row data on right hand side
        cellContents += "<td width='15%'><h4>" + data.first_name + " " + data.last_name + "</h4></td>";
        cellContents += "<td width='15%'><div><strong>" + data.industry + "</strong></div></td>";
        cellContents += "<td width='15%'><div>Class of " + data.grad_date + "</div></td>";
        cellContents += "<td width='15%'><div>" + data.state_id + ", "+ data.country_id + "</div></td>";

        cellContents += "<td width='15%'><div><a href='mailto:" + data.email + "'>" + data.email + "</a></div></td>"

        rowTabletr.innerHTML = cellContents;
        rowTable.appendChild(rowTabletr);

        //append newly formatted contents to the row
        element.append(rowTable);
    },
});

table.addData(alumniTestData);