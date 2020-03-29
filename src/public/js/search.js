// Define some test data
var cheeseData = [
    {id:1, type:"Brie", rind:"mould", age:"4 weeks", color:"white", image:"brie.jpg"},
    {id:2, type:"Cheddar", rind:"none", age:"1 year", color:"yellow", image:"cheddar.jpg"},
    {id:3, type:"Gouda", rind:"wax", age:"6 months", color:"cream", image:"gouda.jpg"},
    {id:4, type:"Swiss", rind:"none", age:"9 months", color:"yellow", image:"swiss.jpg"},
];

//define Tabulator
var table = new Tabulator("#search_table", {
    height:"311px",
    layout:"fitColumns",
    resizableColumns:false,
    columns:[
        {title:"Cheese", field:"type", sorter:"string"},
    ],
    rowFormatter:function(row){
        let element = row.getElement();
        let width = element.offsetWidth;
        let data = row.getData();
        let rowTable;

        //clear current row data
        while(element.firstChild) element.removeChild(element.firstChild);

        //define a table layout structure and set width of row
        rowTable = document.createElement("table");
        rowTable.style.width = (width - 18) + "px";
        let rowTabletr = document.createElement("tr");

        //add image on left of row
        let cellContents = "<td><img src='/images/logo.png'></td>";

        //add row data on right hand side
        cellContents += "<td><div><strong>Name:</strong> Fake Name</div><div><strong>Industry:</strong> Computer Science" +
            "</div><div><strong>Grad Year:</strong> 2020</div><div><strong>Country:</strong> 1</div></td>";

        rowTabletr.innerHTML = cellContents;
        rowTable.appendChild(rowTabletr);

        //append newly formatted contents to the row
        element.append(rowTable);
    },
});

table.addData(cheeseData);