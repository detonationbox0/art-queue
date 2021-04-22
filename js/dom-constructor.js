
/**
 * Depending on the type and purpose of a message box, constructs the DOM items inserted into the message box
 * @param {Object} tableData Data used to create the content of the alert
 * @param {String} domType Determines what the content and purpose of the alert will be
 * @returns The DOM elements to insert into the alert (String)
 */

export function makeDom(tableData, domType) {

    switch(domType) {
        case "View Request": // ----------------------------------------------

            // console.log(tableData.artist)

            //Convert tableData.time (decimal) to hrs & seconds
            var n = new Date(0,0);
            n.setSeconds(+tableData.time * 60 * 60);
            var nSplit = n.toTimeString().slice(0, 8).split(":");
            var timeString = Number(nSplit[0]) + " Hours " + Number(nSplit[1]) + " Minutes"

            

            var dom = `
            <span class='reqid'>${tableData.uid}</span>
            <div class="req-area" id="req-info">
                <div class="req-title">
                    <h3>Customer & Project Information</h3>
                    <button id="req-break-up">Break Up Assignment</button>
                </div>
                <div class="req-body">
                <div id="req-info-left">
                    <div class="input-area">
                        <label for="Company" class="input-label">Company</label>
                        <input type="text" name="Company" value="${tableData.store.name}" >
                    </div>
                    <div class="input-area">
                        <label for="Product" class="input-label">Product</label>
                        <input type="text" name="Product" value="${tableData.store.product}" >
                    </div>
                    <div class="input-area">
                        <label for="Project Kind" class="input-label">Project Kind</label>
                        <input type="text" name="Project Kind" value="${tableData.kind}">
                    </div>
                </div>
                <div id="req-info-right">
                    <div class="input-area">
                        <label for="Store Code" class="input-label">Store Code</label>
                        <input type="text" name="Store Code" value="${tableData.store.code}" >
                    </div>
                    <div class="input-area">
                        <label for="Contract ID" class="input-label">Contract ID</label>
                        <input type="text" name="Contract ID" value="${tableData.store.contractid}" >
                    </div>
                    <div class="input-area">
                        <label for="Line" class="input-label">Line#</label>
                        <input type="text" name="Line" value="${tableData.store.line}" >
                    </div>
                    <div class="input-area">
                        <label for="Group" class="input-label">Group</label>
                        <input type="text" name="Group" value="${tableData.group}" >
                    </div>
                    <div class="input-area">
                        <label for="Industry" class="input-label">Industry</label>
                        <input type="text" name="Industry" value="${tableData.industry}" >
                    </div>
                    <div class="input-area">
                        <label for="Tier" class="input-label">Tier</label>
                        <input type="text" name="Tier" value="${tableData.tier}" >
                    </div>
                    <div class="input-area">
                        <label for="Content" class="input-label">Content</label>
                        <input type="text" name="Content" value="${tableData.content == null ? "" : tableData.content}">
                    </div>
                    <div class="input-area">
                        <label for="Design" class="input-label">Design</label>
                        <input type="text" name="Design" value="${tableData.design == null ? "" : tableData.design}" >
                    </div>
                    <div class="input-area">
                        <label for="Creative Review" class="input-label">Creative Review</label>
                        <input type="text" name="Creative Review" value="${tableData.task.cr ? "Yes" : "No"}">
                    </div>
                </div>
                </div>
            </div>
            <hr />
            <!-- INSTRUCTIONS -->
            <div class="req-area" id="req-instructions">
                <div class="req-title">
                <h3>Instructions</h3>
                </div>
                <div class="req-body">
                    <div class="area-labels">
                        <div class="req-instructions-col" id="req-instructions-col1">
                            <button id="req-history">View History<img class="btn-book" src="./img/books.gif"  width="15" ></button>
                        </div>
                        <div class="req-instructions-col" id="req-instructions-col2">
                            <button id="req-brief-instructions">View Brief Instructions</button>
                        </div>
                        <div class="req-instructions-col" id="req-instructions-col3">
                            <button id="req-brief-attachments">View Brief Attachments</button>
                        </div>
                        <div class="req-instructions-col" id="req-instructions-col4">
                            <button id="req-referenced-template">View Referenced Template</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <!-- INSTRUCTIONS -->
            <div class="req-area" id="req-time">
                <div class="req-title">
                    <h3>Time Constraints</h3>
                </div>
                <div class="req-body req-col">
                    <div id="req-time-top">
                        <div class="input-area">
                            <label for="Brief Submitted" class="input-label">Brief Submitted</label>
                            <input type="text" name="Brief Submitted" value="${tableData.received.datetime}">
                        </div>
                        <div class="input-area">
                            <label for="Design Due Date" class="input-label">Design Due Date</label>
                            <input type="text" name="Design Due Date" value="${tableData.due}">
                        </div>
                        <div class="input-area">
                            <label for="Design Time" class="input-label">Design Time</label>
                            <input type="text" name="Design Time" time="${tableData.time}" value="${timeString}">
                        </div>
                    </div>
                    <div id="req-time-bottom">
                        <button id="req-time-reset">Reset Override</button>
                        <div class="input-area">
                            <label for="Design Time Override" class="input-label">Design Time Override</label>
                            <input type="text" name="Design Time Override" value="0 Hours 0 Minutes">
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <!-- ARTIST ASSIGNMENT -->
            <div class="req-area" id="req-assignments">
                <div class="req-title">
                    <h3>Artist Assignments</h3>
                </div>
                <div class="req-body req-col" >
                    <div id="req-assignments-top">
                        
                        <div class="input-area">
                            <label for="Assign To" class="input-label">Assign To</label>
                            <select id="req-artist-sel" name="Assign To">
                                <option value="Ian" ${tableData.artist == "Ian" ? "selected" : ""}>Ian</option>
                                <option value="Berto" ${tableData.artist == "Berto" ? "selected" : ""}>Berto</option>
                                <option value="Lisa" ${tableData.artist == "Lisa" ? "selected" : ""}>Lisa</option>
                                <option value="Peter" ${tableData.artist == "Peter" ? "selected" : ""}>Peter</option>
                                <option value="Matt" ${tableData.artist == "Matt" ? "selected" : ""}>Matt</option>
                                <option value="Breanna" ${tableData.artist == "Breanna" ? "selected" : ""}>Breanna</option>
                                <option value="Kristen" ${tableData.artist == "Kristen" ? "selected" : ""}>Kristen</option>
                                <option value="Rita" ${tableData.artist == "Rita" ? "selected" : ""}>Rita</option>
                                <option value="Alaina" ${tableData.artist == "Alaina" ? "selected" : ""}>Alaina</option>
                                <option value="Christian" ${tableData.artist == "Christian" ? "selected" : ""}>Christian</option>
                                <option value="Jeff" ${tableData.artist == "Jeff" ? "selected" : ""}>Jeff</option>
                                <option value="Luke" ${tableData.artist == "Luke" ? "selected" : ""}>Luke</option>
                                <option value="Joshua" ${tableData.artist == "Joshua" ? "selected" : ""}>Joshua</option>
                                <option value="Luis" ${tableData.artist == "Luis" ? "selected" : ""}>Luis</option>
                                <option value="Emily" ${tableData.artist == "Emily" ? "selected" : ""}>Emily</option>
                                <option value="Null" ${String(tableData.artist) == "null" ? "selected" : ""}>Unassigned</option>
                            </select>
                        </div>

                        <div class="input-area">
                            <label for="Priority Override" class="input-label">Priority Override</label>
                            <select name="Priority Override">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>

                        <button class="btn-assign-artist">Assign Artist</button>
                    </div>
                    <div id="req-assignments-bottom">
                        <div id="req-artist-table">
                        </div>
                    </div>
                </div>
                <button id="close-alert">Close</button>
            </div>
            `

    }
    // console.log(dom);
    return dom
}