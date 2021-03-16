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
            
            var thisArtist = listData.artists[i];
            var artUid = '_' + Math.random().toString(36).substr(2, 9); // Make artist id
            var artTier = listData.tiers[Math.floor(Math.random() * listData.tiers.length)];

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
            }
            artists.push(artist)
        }

        /*
        var artists = [
            {
                "firstname":"Ian", 
                "secondname":"Reed", 
                "industries":{  
                    "regular":true, 
                    "Auto":true, 
                    "dental":true 
                },
                "queue":{  
                    "numrequests":1, 
                    "timeload":1.3 
                },
                "requests":[ 
                
                ]
            }
        ]
        */



    //Requests Data Set --------------------------------------------------------------------------
    //#region


        // Changeable info about Requests
        var numOfRequests = 100;

        // Bucket for requests. Tabulator accepts an array of objects
        var requests = [];

        // Create numOfRequests requests using random data from list imported from lists.js (getLists();)
        for (var i = 0; i < numOfRequests; i++) {

            // Random info for request
            var uid = '_' + Math.random().toString(36).substr(2, 9);
            var rndArtist = listData.artists[Math.floor(Math.random() * listData.artists.length)].firstname;
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

            /* Random date between today and 10 days ago */
            var today = new Date();
            var tenDaysAgo = new Date();
            var tenDaysAhead = new Date();
            tenDaysAgo.setDate(today.getDate() - 10);
            tenDaysAhead.setDate(today.getDate() + 10);

            var backDate = randomDate(today, tenDaysAgo, 9, 17, "short");
            var fwdDate = randomDate(today, tenDaysAhead, 9, 17, "short");
            


            // Request object to be pushed
            var genRequest = {
                "uid":uid,
                "sel":false, 
                "artist":rndArtist, 
                "store":{ 
                    "code": storeCode, 
                    "name":rndClient, 
                    "contractid":contractID, 
                    "line":1, 
                    "group":"E", 
                    "product": rndProduct
                },
                "industry":rndIndustry, 
                "tier":rndTier, 
                "kind":rndKind, 
                "content":rndCntAttr,
                "design":rndDesAttr,
                "time":rndTime, 
                "task":{ 
                    "title":rndTask, 
                    "cr":Boolean(Math.round(Math.random())), // Randomly true or false
                    "datetime":backDate 
                },
                "received":{ 
                    "as":rndAs, 
                    "datetime":backDate 
                },
                "due":fwdDate, 
        
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
                "cp":false, 
                "ap":false,
                "p":false
            };

            // If artist is null, add to requests table, otherwise add to artists table
            if (genRequest.artist == null) {
                requests.push(genRequest);
            } else {
                
                for (var n = 0; n < artists.length; n++) {
                    if (artists[n].firstname == genRequest.artist) {
                        // Assign artist uid to request
                        genRequest.artistId = artUid; // Might come in handy later
                        // Add this timeload to the artist's current timeload
                        var newTimeload = Math.round((genRequest.time + artists[n].queue.timeload) * 10) / 10;
                        artists[n].queue.timeload = newTimeload;
                        artists[n].queue.numRequests++;
                        // Add request to the artist
                        artists[n].requests.push(genRequest);
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

    return {
        "requests":requests,
        "artists":artists
    }

};


/**
 * Generate a date and time between to dates
 * @param {Date} start Start date object
 * @param {Date} end End date object
 * @param {Number} startHour 0 - 23
 * @param {Number} endHour 0 - 23
 * @param {String} size Short or long?
 * @returns date
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

    if (size == "short") {
        // Format as Tue 3-2-21 9:48AM


        var dayName = weekday[date.getDay()].slice(0,3);
        // var day = [date.getMonth(), date.getDay(), String(date.getFullYear()).slice(2,4)].join("/");
        var time = date.toLocaleString('en-US');
        var rtnValue = dayName + " " + time;

    }
    return rtnValue;
  }