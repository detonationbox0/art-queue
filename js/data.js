/**
 * Get the data required for this application
 * 
 * @returns {Object} data Contains the data for the application
 * @returns {Array} data.requests Array of Requests
 * @returns {Array} data.artists Array of Artists
 */

import {getLists} from "./lists.js";

export function loadData() {

    // Load in lists from file
    var listData = getLists();


    //Artists Data Set -------------------------------------------------------------------------



        // Construct Artists list
        var artists = [];

        // Loop artists in lists.js and create an object for them
        // Add that object to artists array
        
        for ( var i = 0 ; i < listData.artists.length; i ++ ) {
            // console.log()
            if (listData.artists[i].firstname != null) {

                var thisArtist = listData.artists[i];
                var artUid = '_' + Math.random().toString(36).substr(2, 9); // Make artist id
                var artTier = listData.tiers[Math.floor(Math.random() * listData.tiers.length)];
                
                // Random number between 1 and 72
                // for the Number of Pending Requests

                // Creating 1000s of actual requests made the page crash.
                // If we need to actually load some, we can do it on the fly
                // not all at once
                var numPending = Math.floor(Math.random() *72) + 1;
                var numHours =  Math.floor(Math.random() * 100 ) + 1;

                var artist = {
                    "uid":artUid,
                    "firstname":thisArtist.firstname,
                    "lastname":thisArtist.lastname,
                    "tier":artTier,
                    "industries":{
                        "regular":true,
                        "auto":Boolean(Math.round(Math.random())), // Randomly true or false
                        "dental":Boolean(Math.round(Math.random())), // Randomly true or false
                    },
                    "queue":{
                        "numRequests":0,
                        "timeload":0,
                    },
                    "requests":[], // We made a bucket for these
                    "pending":{
                        "count":numPending,
                        "hrs":numHours
                    }
                }


                artists.push(artist)
            }
            
        }




    //Requests Data Set --------------------------------------------------------------------------
    //#region


        // Changeable info about Requests
        var numOfRequests = 100;

        // Bucket for requests. Tabulator accepts an array of objects
        var requests = [];

        // Create numOfRequests requests using random data from list imported from lists.js (getLists();)
        for (var i = 0; i < numOfRequests; i++) {

            // Create a request for a random artist
            var rndArtist = listData.artists[Math.floor(Math.random() * listData.artists.length)].firstname;

            // ****************
            // CREATE THE REQUEST
            // ****************
            var genRequest = createRequest(rndArtist);

            // If artist is null, add to requests table, otherwise add to artists table
            if (genRequest.artist == null) {
                requests.push(genRequest);
            } else {
                
                for (var n = 0; n < artists.length; n++) {
                    if (artists[n].firstname == genRequest.artist) {
                        // Assign artist uid to request, might come in handy later
                        genRequest.artistId = artUid;
                        // Add this timeload to the artist's current timeload
                        var newTimeload = Math.round((genRequest.time + artists[n].queue.timeload) * 10) / 10; // Rounds to 0.0 format
                        artists[n].queue.timeload = newTimeload;
                        artists[n].queue.numRequests++; // Increment the number of requests this artist has since we are adding one
                        // Add request to the artist
                        artists[n].requests.push(genRequest);

                        // We should sort this artists requests by date (alphebet?) and group letter.
                        // https://www.c-sharpcorner.com/UploadFile/fc34aa/sort-json-object-array-based-on-a-key-attribute-in-javascrip/  

                        artists[n].requests.sort(GetSortOrder("shrtBackDate"));
                        artists[n].requests.sort(GetSortOrder("group"));

                    }
                }
                
            }

            

        }
            
    //#endregion

    //Assign priority to the requests of each artist --------------------------------------------------------------------------
    //#region

    artists.forEach(obj => {
        for (var i = 0; i < obj.requests.length; i++) {
            obj.requests[i].priority = i;
        }
    })


    /**
     * Return All Data Sets -------------------------------------------------------------------------- |
     */
    // Debug
    console.log("Artist's table: ");
    console.log(artists);
    console.log("Requests table: ")
    console.log(requests);

    // Remove blank artists from artists list

    return {
        "requests":requests,
        "artists":artists
    }

};

/**
 * Creates a completely randomized request for a specific artist
 * @param {String} artist An artist for whom this request will be made
 * @returns The randomized request specific to the given artist
 */
//#region
export function createRequest (artist) {
    var listData = getLists();
    // Random info for request
    var uid = '_' + Math.random().toString(36).substr(2, 9);

    var storeCode = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000); // Random 5 digit number
    var rndClient = listData.clients[Math.floor(Math.random() * listData.clients.length)];
    var contractID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
    var rndProduct = listData.products[Math.floor(Math.random() * listData.products.length)];
    var rndIndustry = listData.industries[Math.floor(Math.random() * listData.industries.length)];
    var rndTier = listData.tiers[Math.floor(Math.random() * listData.tiers.length)];
    var rndKind = listData.kinds[Math.floor(Math.random() * listData.kinds.length)];
    var rndCntAttr = listData.attr[Math.floor(Math.random() * listData.attr.length)];
    var rndDesAttr = listData.attr[Math.floor(Math.random() * listData.attr.length)]; // Why is this the same as rndCntAttr?
    var rndTime = Math.round(Math.random() * 10) / 10;
    var rndTask = listData.tasks[Math.floor(Math.random() * listData.tasks.length)];
    var rndAs = listData.as[Math.floor(Math.random() * listData.as.length)];
    var rndGrp = ["E", "F", "G"][Math.floor(Math.random() * 3)];
    var rndCp = listData.status[Math.floor(Math.random() * listData.status.length)];
    var rndAp = listData.status[Math.floor(Math.random() * listData.status.length)];
    var rndP = listData.status[Math.floor(Math.random() * listData.status.length)];
    /* Random date between today and 10 days ago */
    var today = new Date();
    var daysAgo = new Date();
    daysAgo.setDate(today.getDate() - 5);
    var dates = randomDate(today, daysAgo, 9, 17, "short");
    
    // Add 1 hr for due date
    var hrAhead = dates[2];
    hrAhead.setHours(hrAhead.getHours()+1)
    var dueDate = dates[0].split(", ")[0] + ", " + (hrAhead.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));


    // Request object to be pushed
    var genRequest = {
        "uid":uid,
        "sel":false, 
        "artist":artist, 
        "store":{ 
            "code": storeCode, 
            "name":rndClient, 
            "contractid":contractID, 
            "line":1, 
            "product": rndProduct
        },
        "group":rndGrp,
        "shrtBackDate":dates[1], // Date / Time for priority column in Artists table
        "industry":rndIndustry, 
        "tier":rndTier, 
        "kind":rndKind, 
        "content":rndCntAttr,
        "design":rndDesAttr,
        "time":rndTime, 
        "task":{ 
            "title":rndTask, 
            "cr":Boolean(Math.round(Math.random())), // Randomly true or false
            "datetime":dates[0] 
        },
        "received":{ 
            "as":rndAs, 
            "datetime":dates[0] 
        },
        "due":dueDate, // task.datetime + 1hr

        "history":true, // Per Jordan: Almost all customers will have a history 
        "actions":[ 
            {
                "name":"Changes in Progress", 
                "datetime":"Mon 3-1-21 10:02AM" 
            },
            {
                "name":"Changes in Progress", 
                "datetime":"Fri 2-26-21 9:02AM" 
            }
        ],
        "cp":rndCp, 
        "ap":rndAp,
        "p":rndP
    };

    return genRequest
  }
//#endregion

/**
 * Generate a date and time between to dates
 * @param {Date} start Start date object
 * @param {Date} end End date object
 * @param {Number} startHour 0 - 23
 * @param {Number} endHour 0 - 23
 * @param {String} size Short or long?
 * @returns date as string
 * @returns date as shorter string
 * @returns date object
 */
// https://stackoverflow.com/questions/31378526/generate-random-date-between-two-dates-and-times-in-javascript
function randomDate(start, end, startHour, endHour, size) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";



    var dayName = weekday[date.getDay()].slice(0,3);
    // var day = [date.getMonth(), date.getDay(), String(date.getFullYear()).slice(2,4)].join("/");
    var time = date.toLocaleString('en-US');
    var rtnValue = [(dayName + " " + time),(date.getMonth() + 1 + "/" + date.getDate() + " " + date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")), date];

    return rtnValue;
    
  }

/**
 * Comparer Function for JSON Array
 * https://www.c-sharpcorner.com/UploadFile/fc34aa/sort-json-object-array-based-on-a-key-attribute-in-javascrip/
 * @param {String} prop Name of property to sort by
 * @returns Sorted array
 */
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }
}