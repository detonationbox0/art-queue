
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
    myTables.artistTable.setData(myData.artists); // Remember, .setData is a method!
    
    //
    // DEBUG ARTRIST REQUESTS TABLE
    //
    // modTables.reqArtistTable(myData.artists, "Ian");

    myTables.artistTable.setSort("queue.numRequests", "asc");

    /**
     * When the user chooses another artist on the Request Detail page
     * Update the table with that artist's current requests
     */
    $(document.body).on("change", "#req-artist-sel", function() {
        var artist = this.value;
        modTables.reqArtistTable(myData.artists, artist);
    })
    


});



/**
 * The Background of a shown message is clicked
 * Hide the message.
 */
$("#alert").on("click", function() {
    $(".content-container").empty();
    // Resume background scrolling
    // https://stackoverflow.com/questions/19701289/disable-scrolling-while-popup-active/19701506
    $("body").removeClass("my-body-noscroll-class");
    $(this).css("display", "none");
});

$(".content-container").on("click", function(e) {
    e.stopPropagation();
});

