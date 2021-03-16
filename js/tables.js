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
            {title:"Grp", field:"store.group", vertAlign:"middle"},
            {title:"Code", field:"store.code", vertAlign:"middle"},
            {title:"Industry", field:"industry", vertAlign:"middle"},
            {title:"Tier", field:"tier", vertAlign:"middle"},
            {title:"Project Kind", field:"kind", vertAlign:"middle"},
            {title:"Content Attributes", field:"content", vertAlign:"middle"},
            {title:"Design Attributes", field:"content", vertAlign:"middle"},
            {title:"Product", field:"store.product", vertAlign:"middle", formatter:function(cell, formatterParams, onRendered) {
                var uid = cell.getRow().getData().uid;
                return `<span class='link prod' uid='` + uid + `'>` +  cell.getValue() + `</span>`
            }},
            {title:"Scheduled Task", field:"task", vertAlign:"middle", formatter:function(cell, formatterParams, onRendered) {
                // If it's a system task, use system icon
                cell.getElement().style.padding = "0px";
                return `<div class='task-area'>
                            <div class='task-icon'>
                                <img class='icon-img' src="../img/icon-system.svg" />
                            </div>
                            <div class='task-info'>
                                <p class='link task-assign'>ArtMgr: Assign Artwork</p>
                                <p class='task-date'>` + cell.getValue().datetime + `</p>
                            </div>
                            <div class='task-cr'>
                                ` + (cell.getValue().cr ? `<img class='icon-img' src="../img/icon-artist.svg" />` : ``) + `
                            </div>
                        </div>
                `
            }},
            {title:"Received", field:"received.as"},
            {title:"Est Client / AS Due Date", field:"due"},
            {title:"Design Time", field:"time"},
            {title:"History", field:"history"},
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
                    var qdate = lastReq["received"].datetime;

                    var numReq = getReq.length;

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
                var cellData = cell.getData();
                var req = cellData.requests[0];
                
                /* !!! You left off here mang !!! */
                // Trying to get the group letter from req

                console.log(req)
                
                
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