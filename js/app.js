

console.log("Hello there!");



var table = new Tabulator("#unassigned-requests-table", {
    layout:"fitDataFill",
    height:"311px",
    columns:[
        {title:"Grp", field:"store.group"},
        {title:"Company", field:"store.name"},
        {title:"Industry", field:"industry"},
        {title:"Tier", field:"tier"},
        {title:"Project Kind", field:"kind"},
    ],
});



fetch("./js/requests.json")
    .then(response => {
    return response.json();
    })
    .then( function(data) {
        table.addData(data);
    }
);