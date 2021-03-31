// import * as modApp from "./app.js"
import * as domConstructor from "./dom-constructor.js"

// var artistTable = undefined;

/**
 * Create the tables required for this application in DOM
 * 
 * @returns {Object} tables Contains the data for the application
 * @returns {Object} tables.requestsTable The Tabulator table object for the Unassigned Requests
 * @returns {Object} tables.artistTable The Tabulator table object for the Artists
 */

export function constructTables(which) {

    /**
     * Create Unassigned Requests Table
     */

    var requestsTable = new Tabulator("#unassigned-requests-table", {
        layout:"fitDataStretch",
        maxHeight:"100%",
        // responsiveLayout:"collapse",
        columns:[
            {title:"", field:"", vertAlign:"middle", formatter:function(cell, formatterParams, onRendered){
                    // http://tabulator.info/docs/4.9/format#format-custom
                    // Create Check Box Inputs
                    var uid = cell.getRow().getData().uid;
                    return `<input type="checkbox" class="chk" uid='` + uid + `'>`; //return the contents of the cell;
                }, cellClick:function(e, cell) {
                    // http://tabulator.info/docs/4.0/callbacks#cell
                    // Highlight Row if Checked
                    var uid = cell.getRow().getData().uid;
                    var rowElem = cell.getRow().getElement();
                    var rowClass = $(rowElem).attr("class");

                    var isChecked = $(".chk[uid='" + uid + "'").prop("checked");

                    if (isChecked) {
                        // Highlight the row
                        rowElem.style.backgroundColor = "rgb(101, 255, 255)"
                    } else {
                        // Unhighlight the row
                        // Retain the every-other-row background colors
                        if (rowClass.includes("even")) {
                            console.log("Even cell")
                            rowElem.style.backgroundColor = "#EFEFEF"
                        } else {
                            cell.getRow().getElement().style.backgroundColor = "#FFF"
                        }
                    }

                }
            },
            {title:"Company", vertAlign:"middle", field:"store.name", formatter:function(cell, formatterParams, onRendered){
                    // http://tabulator.info/docs/4.9/format#format-custom
                    var uid = cell.getRow().getData().uid;
                    return `<span class='link req' uid='` + uid + `'>` + cell.getValue() + `</span>`; //return the contents of the cell;
                }
            },
            {title:"Grp", field:"group", vertAlign:"middle"},
            {title:"Code", field:"store.code", vertAlign:"middle"},
            {title:"Industry", field:"industry", vertAlign:"middle"},
            {title:"Tier", field:"tier", vertAlign:"middle"},
            {title:"Project Kind", field:"kind", vertAlign:"middle"},
            {title:"Content Attributes", field:"content", vertAlign:"middle", width:82},
            {title:"Design Attributes", field:"content", vertAlign:"middle", width:82},
            {title:"Product", field:"store.product", vertAlign:"middle", formatter:function(cell, formatterParams, onRendered) {
                var uid = cell.getRow().getData().uid;
                return `<span class='link prod' uid='` + uid + `'>` +  cell.getValue() + `</span>`
            }},
            {title:"Scheduled Task", field:"task", vertAlign:"middle", formatter:function(cell, formatterParams, onRendered) {
                // If it's a system task, use system icon
                cell.getElement().style.padding = "0px";
                return `<div class='task-area'>
                            <div class='task-icon'>
                                <img class='icon-img' src="./img/icon-system.svg" />
                            </div>
                            <div class='task-info'>
                                <p class='link task-assign'>ArtMgr: Assign Artwork</p>
                                <p class='task-date'>` + cell.getValue().datetime + `</p>
                            </div>
                            <div class='task-cr'>
                                ` + (cell.getValue().cr ? `<img class='icon-img' src="./img/icon-artist.svg" />` : ``) + `
                            </div>
                        </div>
                `
            }, cellClick:function(e, cell){
                //e - the click event object
                //cell - cell component
                // console.log(cell.getData());
                var dom = domConstructor.makeDom(cell.getData(), "View Request");
                showMessage(dom);
                // console.log(cell.getData());
                // reqArtistTable(cell.getData(), "Ian") // Default artist
            }},
            {title:"Received", field:"received.as", vertAlign:"middle"},
            {title:"Est Client / AS Due Date", field:"due", vertAlign:"middle"},
            {title:"Design Time", field:"time", width:61, vertAlign:"middle", formatter:function(cell, formatterParams, onRendered) {
                // For the rndTime, which is a random number between 0 and 1, we should convert to HH:MM
                var timeDec = cell.getValue();
                //https://stackoverflow.com/questions/35460303/how-to-convert-decimal-hour-value-to-hhmmss
                var decimalTimeString = String(timeDec);
                var n = new Date(0,0);
                n.setMinutes(+decimalTimeString * 60);
                var result = n.toTimeString().slice(0, 5);

                return result;

            }},
            {title:"History", field:"history", vertAlign:"middle", formatter:function(cell, formatterParams, onRendered) {
                // Show book if true
                if (cell.getValue()) {
                    return `
                        <div class="history-book">
                            <img class='icon-img' src="./img/books.gif" />
                        </div>
                    `
                }
            }},
        ],
    });

    
    /**
     * Create Artists Table
     */
    var artistTable = new Tabulator("#artist-availability-table", {
        layout:"fitDataStretch",
        maxHeight:"100%",

        // responsiveLayout:"collapse",
        columns:[
            {title:"Artist", field:"firstname", vertAlign:"middle"},
            {title:"Industry", field:"industries", vertAlign:"middle", formatter(cell, formatterParams, onRendered) {
                var ind = cell.getValue("industries");
                var indString = [];
                if (ind.regular) {
                    indString.push("Reg");
                }
                if (ind.auto) {
                    indString.push("Aut");
                }
                if (ind.regular) {
                    indString.push("Den");
                }
                return indString.join(", ")
            }},
            {title:"Tier", field:"tier", vertAlign:"middle"},
            {title:"Active Queue", field:"queue.numRequests", vertAlign:"middle", formatter(cell, formatterParams, onRendered) {
                var getReq = cell.getData().requests;
                var timeload = cell.getData().queue.timeload;
                
                if (getReq.length > 0) { // There's an empty one...

                    var lastReq = getReq[getReq.length - 1];

                    // We need to add 1 hr to due date
                    // The active queue should display the time at which
                    // they are available.
                    var qdate = lastReq.due; // We need due date for queue

                    var numReq = getReq.length;

                    var artist = cell.getData().firstname

                    var activeQueue = `
                        <div class="active-queue">
                            <div class="active-queue-date">
                                ` +  qdate + `
                            </div>
                            <div class="active-queue-stat">
                                <div class="active-queue-num">
                                    ` + numReq + ` Projects
                                </div>
                                <div class="active-queue-timeload">
                                    ` + timeload + ` Hrs
                                </div>
                            </div>
                        </div>
                    `
                    return activeQueue;
                }
                
            }},
            {title:"Priority 1", field:"", vertAlign:"middle", formatter(cell, formatterParams, onRendered) {
                var returnElem = priorityFormatter(1, cell);    // This chunk was the same for each of the prioritys
                                                                // Except I needed the index of this request
                                                                // to indicate which priority this is and 
                                                                // if it's valid, otherwise N/A

                                                                // So broke to function priorityFormatter below.

                                                                // Feeding it this cell too to get props if valid.
                return returnElem;
            }},
            {title:"Priority 2", field:"", vertAlign:"middle", formatter(cell, formatterParams, onRendered) {
                var returnElem = priorityFormatter(2, cell);
                return returnElem;
            }},
            {title:"Priority 3", field:"", vertAlign:"middle", formatter(cell, formatterParams, onRendered) {
                var returnElem = priorityFormatter(3, cell);
                return returnElem;
            }},
            {title:"Priority 4", field:"", vertAlign:"middle", formatter(cell, formatterParams, onRendered) {
                var returnElem = priorityFormatter(4, cell);
                return returnElem;
            }},
            {title:"Priority 5", field:"", vertAlign:"middle", formatter(cell, formatterParams, onRendered) {
                var returnElem = priorityFormatter(5, cell);
                return returnElem;
            }},
            {title:"Priority 6", field:"", vertAlign:"middle", formatter(cell, formatterParams, onRendered) {
                var returnElem = priorityFormatter(6, cell);
                return returnElem;
            }},
            {title:"Priority 7", field:"", vertAlign:"middle", formatter(cell, formatterParams, onRendered) {
                var returnElem = priorityFormatter(7, cell);
                return returnElem;
            }},
            {title:"Priority 8", field:"", vertAlign:"middle", formatter(cell, formatterParams, onRendered) {
                var returnElem = priorityFormatter(8, cell);
                return returnElem;
            }},
            {title:"Priority 9", field:"", vertAlign:"middle", formatter(cell, formatterParams, onRendered) {
                var returnElem = priorityFormatter(9, cell);
                return returnElem;
            }},
            {title:"Priority 10", field:"", vertAlign:"middle", formatter(cell, formatterParams, onRendered) {
                var returnElem = priorityFormatter(10, cell);
                return returnElem;
            }},
            {title:"Pending @ Client", field:"", vertAlign:"right", formatter(cell, formatterParams, onRendered) {
                
                return `
                    <div class="pending">
                        <div class="pending-count proj">` + cell.getData().pending.count + ` Projects</div>
                        <div class="pending-count">` + cell.getData().pending.hrs + ` Hours</div>
                    </div>
                `
            }},
            {title:"Total", field:"", vertAlign:"right", formatter(cell, formatterParams, onRendered) {
                var totalReq = cell.getData().pending.count + cell.getData().requests.length;
                var totalHrs = cell.getData().queue.timeload + cell.getData().pending.hrs
                
                return `<div class="total-load">
                            <div class="total-count proj">` + totalReq + ` Projects</div>
                            <div class="total-count">` + totalHrs + ` Hours</div>
                        </div>`


               
                
            }},
            
            
            // {title:"Code", field:"store.code"},
            // {title:"Industry", field:"industry"},
            // {title:"Tier", field:"tier"},
            // {title:"Project Kind", field:"kind"},
            // {title:"Content Attributes", field:"content"},
            // {title:"Design Attributes", field:"content"},
            // {title:"Product", field:"store.product"},
            // {title:"Scheduled Task", field:"task.title"},
            // {title:"Received", field:"received.as"},
            // {title:"Est Client / AS Due Date", field:"due"},
            // {title:"Design Time", field:"time"},
            // {title:"History", field:"history"},
        ],
    });

    return {
            "requestsTable":requestsTable,
            "artistTable":artistTable
    };

}


/**
 * 
 * @param {Array} artistsTable A table of artists, should be the same data as the Artist Availability table
 * @param {String} artist The artist who's requests we will load
 */
export function reqArtistTable(artistsTable, artist) {
    
    // artist = "Ian" // DEBUG

    // Get the requested artist's requests
    for (var i = 0; i < artistsTable.length; i++) {
        if (artistsTable[i].firstname == artist) {
            var artistsRequests = artistsTable[i].requests;
        }
    }

    //Build artist's request table
    var artistRequestsTable = new Tabulator("#req-artist-table", {
        // maxHeight:"100%",
        data:artistsRequests,
        columns:[
            {title:"Pri #", field:"priority", vertAlign:"middle"},
            {title:"Artist", field:"artist", vertAlign:"middle"},
            {title:"Industry", field:"industry", vertAlign:"middle"},
            {title:"Tier", field:"tier", vertAlign:"middle"},
            {title:"Grp", field:"group", vertAlign:"middle"},
            {title:"Code", field:"store.code", vertAlign:"middle"},
            {title:"Company", field:"store.name", vertAlign:"middle"},
            {title:"Project Kind", field:"kind", vertAlign:"middle"},
            {title:"Content Attributes", field:"content", vertAlign:"middle"},
            {title:"Design Attributes", field:"design", vertAlign:"middle"},
            {title:"Product", field:"store.product", vertAlign:"middle"},
            {title:"Scheduled Task", field:"task", vertAlign:"middle", formatter:function(cell, formatterParams, onRendered) {
                cell.getElement().style.padding = "0px";
                return `<div class='task-area'>
                            <div class='task-icon'>
                                <img class='icon-img' src="./img/icon-system.svg" />
                            </div>
                            <div class='task-info'>
                                <p class='link task-assign'>ArtMgr: Assign Artwork</p>
                                <p class='task-date'>` + cell.getValue().datetime + `</p>
                            </div>
                            <div class='task-cr'>
                                ` + (cell.getValue().cr ? `<img class='icon-img' src="./img/icon-artist.svg" />` : ``) + `
                            </div>
                        </div>
                `
            }},
            {title:"Last Action", field:"", vertAlign:"middle", formatter:function(cell, formatterParams, onRendered) {
                return "Coming Soon..."
            }},
            {title:"Live Due Date", field:"", vertAlign:"middle", formatter:function(cell, formatterParams, onRendered) {
                return "Coming Soon..."
            }},
            {title:"Est Client / AS Due Date", field:"", vertAlign:"middle", formatter:function(cell, formatterParams, onRendered) {
                return "Coming Soon..."
            }},
        ]
        
    });
    

}
    


/**
 * Create the DOM elements that go into the artist table
 * @param {Number} index The Priority Number, subtract one from this, get the request index
 * @param {*} cell The cell object of the current column
 * @returns Returns request data for this request
 */
function priorityFormatter (index, cell) {
    var cellData = cell.getData();
    var req = cellData.requests[index - 1];

    // (!! Actually! Remember to not do it here, and decrement from here on!)
    // Remember to increment for each formatter

    try {
        var grp = req.group;
        var shrtDate = req.shrtBackDate;
        var rtnElem = `
        <div class="prt-date">
            <div class="prt-date-fm">` + shrtDate + `
            <div class="prt-grp">Grp ` + grp + `
            </div>
        `;
    } catch (e) {
        // req is undefined
        var grp = undefined;

        var rtnElem = `
            <div class="prt-date">
                <div class='prt-na'>N/A</div>
            </div>
        `;
    }

    return rtnElem;
}


/**
 * Displays an empty message box, the contents are a string of HTML elements
 * @param {String} dom The DOM elements to display within the Message box
 */
function showMessage(dom) {
    $("#alert").css("display", "flex");
    $(".content-container").append(dom);
}