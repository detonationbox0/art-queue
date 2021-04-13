
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


    /** ############################################################################################ ↓
     *  BUILD UNASSIGNED REQUESTS TABLE  ↓                                                           ↓
        ############################################################################################ ↓ */

        myTables.requestsTable.setData(myData.requests);

    /** ############################################################################################ ↓
     *  BUILD WORKLOADS TABLE  ↓                                                                     ↓
        ############################################################################################ ↓ */

        // We need a list of all assigned requests. This means
        // Combining all of the requests from the artist table into
        // a single array, then throwing that at the tables.js
        var workloads = [];
        for (var i = 0; i < myData.artists.length; i++) {
            myData.artists[i]["requests"].forEach((item) => {
                workloads.push(item);
            });

            // Populate the workloads artist selection
            $("#workloads-select-artist-vsb").append(`
                <option value="${myData.artists[i].firstname}">${myData.artists[i].firstname}</option>
            `)
        }

        console.log("Workload table:");
        console.log(workloads);

        myTables.workloadTable.setData(workloads);

    /** ############################################################################################ ↓
     *  BUILD ARTISTS TABLE  ↓                                                                       ↓
        ############################################################################################ ↓ */

        myTables.artistTable.setData(myData.artists); // Remember, .setData is a method!
        myTables.artistTable.setSort("queue.numRequests", "asc");

    /** ############################################################################################ ↓
     *  TOP AREA TAB CLICKS  ↓                                                                       ↓
        ############################################################################################ ↓ */

        $(".tab").on("click", function() {

            // Switch the table

            var showTable = $(this).val();
            if (showTable == "workloads") {

                // Show the Workloads table (then redraw and sort otherwise it's broken)
                $("#workloads").removeClass("hidden");
                $("#unassigned-requests").addClass("hidden");

                //Update tab buttons
                $(this).addClass("active-tab");
                $("button[value='unassigned-requests']").removeClass("active-tab");

                myTables.workloadTable.setSort("artist", "asc"); // Broken Table Fix
                myTables.workloadTable.redraw(true);

            } else {

                // Show unassigned requests table
                $("#workloads").addClass("hidden");
                $("#unassigned-requests").removeClass("hidden");

                // Update tab buttons
                $(this).addClass("active-tab");
                $("button[value='workloads']").removeClass("active-tab");
            }

            myTables.workloadTable.redraw();
        })

    /** ############################################################################################ ↓
     *  WORKLOAD TABLE CONTROLS  ↓                                                                   ↓
        ############################################################################################ ↓ */

        // An artist filter is chosen
        $("#workloads-select-artist").on("change", function() {
            // Filter the table.
            if ($(this).val() == "all") {
                myTables.workloadTable.clearFilter();
            } else {
                myTables.workloadTable.setFilter("artist", "=", $(this).val());
            }
            
            // alert($(this).val());
        });

        // vanillaSelectBox
        let mySelect = new vanillaSelectBox("#workloads-select-artist-vsb",{
            maxWidth: 200,
            maxHeight: 400,
            minWidth: -1,
            placeHolder:"-- All Artists ---"
        });

        $("#workloads-select-artist-vsb").on("change", function() {
            if ($(this).val().length == 0) {
                myTables.workloadTable.clearFilter();
            } else {
                console.log($(this).val().join(" "))
                myTables.workloadTable.setFilter("artist", "in", $(this).val());;
            }
        });



        // If the user clicks on an artist in the Artist table, filter the workloads table!
        console.log(myTables.artistTable);

    /** ############################################################################################ ↓
     *  POPULATE CONTROLS  ↓                                                                         ↓
        ############################################################################################ ↓ */

        

    /** ############################################################################################ ↓
     *  REQUEST DETAIL PAGE  ↓                                                                       ↓
        ############################################################################################ ↓ */

        /**
         * When the user chooses another artist on the Request Detail page
         * Update the table with that artist's current requests
         */
        $(document.body).on("change", "#req-artist-sel", function() {
            var artist = this.value;
            modTables.reqArtistTable(myData.artists, artist);
        })


        /**
         * When the user chooses clicks Assign Artist on the Request Detail page,
         * Override the priority, and reload tables
         */
        $(document.body).on("click", "#assign-artist", function() {
            alert("I will assign this artist to this request. I will then reload each of the tables with this updated status");
        });


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

