/**
 * Get the data required for this application
 * 
 * @returns {Object} data Contains the data for the application
 * @returns {Array} data.requests Array of Requests
 * @returns {Array} data.artists Array of Artists
 */

import {getLists} from "./lists.js";

export function loadData() {

    //Requests Data Set --------------------------------------------------------------------------
    //#region
        // Load in lists from file
        var listData = getLists();

        // Changeable info about Requests
        var numOfRequests = 20;

        // Bucket for Tabulator
        var requests = [];

        // Create (x) number of requests using random data from list file
        for (var i = 0; i < numOfRequests; i++) {

            // Random info
            var uid = '_' + Math.random().toString(36).substr(2, 9);
            var rndArtist = listData.artists[Math.floor(Math.random() * listData.artists.length)];
            var storeCode = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000); // Random 5 digit number
            var rndClient = listData.clients[Math.floor(Math.random() * listData.clients.length)];
            var contractID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
            var rndProduct = listData.products[Math.floor(Math.random() * listData.products.length)];
            var rndIndustry = listData.industries[Math.floor(Math.random() * listData.industries.length)];
            var rndTier = listData.tiers[Math.floor(Math.random() * listData.tiers.length)];
            var rndKind = listData.kinds[Math.floor(Math.random() * listData.kinds.length)];
            console.log(storeCode);


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
                "content":"Moderate",
                "design":"Moderate",
                "time":0.5, 
                "task":{ 
                    "title":"Make Changes", 
                    "cr":true, 
                    "datetime":"Mon 3-1-21 9:48AM" 
                },
                "received":{ 
                    "as":"Janelle S", 
                    "datetime":"Mon 3-1-21 9:48AM" 
                },
                "due":"Tue 3-2-21 9:48AM", 
        
                "history":true, 
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

            requests.push(genRequest);
        }
            
    //#endregion

    //Artists Data Set --------------------------------------------------------------------------
    //#region
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

        //Make UIDs
        artists.forEach(function(artist) {
            var uid = '_' + Math.random().toString(36).substr(2, 9);
            artist.uid = uid;
        });
    //#endregion

    /**
     * Return All Data Sets -------------------------------------------------------------------------- |
     */

    return {
        "requests":requests,
        "artists":artists
    }

};