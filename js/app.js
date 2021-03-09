
/**
 * On Document Ready
 * Create Tables, read JSON, and populate tables
 */
 import * as modTables from "./tables.js"
 import * as modData from "./data.js"
 



$(function() {

    console.log("Document Ready...");

    // Create the tables
    var myTables = modTables.constructTables();

    // Load the data
    var myData = modData.loadData();


    // Populate the tables
    myTables.requestsTable.setData(myData.requests);
    myTables.artistTable.setData(myData.requests);


});


