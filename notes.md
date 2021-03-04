# Notes for Art Queue Mock Up

## The Request Data

After looking at the documentation Jordan provided me, it seems to me the difference between a request which has not been picked up, and one that has would be whether or not an artist has been assigned to it. However, there's no reason why a request which hasn't been picked up yet could not contain the same properties which one that has would have. They could just remain `unassigned` or `null` until they are needed. Each request should be it's own object, and the artist should be a property along with all other potential properties.

When a request is first submitted, the artist property should be `unassigned` or `null`.

Tabulator accepts `JSON` arrays containing objects. So, to start off, I need to create an object with all of the properties that a request would contain. Conditional on various values assigned to the properties, things in this mock-up will happen. Below I am building an example object which I will incorporate into the code.

> Keep in mind, I can customize the title of the columns, so some of these are reworded for convenience. For example "due" can be titled "Est Client / AS Due Date" in the actual table.


```js
var request = {
    "uid":0, // Increments? Or randomly generated?
    "sel":false, // Is this request selected? {Bool} 
    "artist":"Ian", // Assigned artist for this request. Initially unassigned or null {String}
    //"priority":1, // Maybe handled in Artist Data
    "store":{ // Info from .NET
        "code": "25613", // {String}
        "name":"Robert's Auto Service - San Diego", // {String}
        "contractid":63960, // {Number}
        "line":1, // {Number}
        "group":"E", // {String}
        "product": "Postcard", // or Menu or Scratch Off, etc {String}
    },
    "industry":"auto", // Can be "auto", "dentistry", or "regular" {String}
    "tier":"gray", // Can be "orange", "blue" {String}
    "kind":"Changes to Existing Natives", // or New Build from Different Product Natives, etc.
    "content":"Moderate", // or Light, or Heavy, etc
    "design":"Moderate", // or Light, or Heavy, etc
    "task":{
        "title":"Make Changes",
        "cr":true, // or false
        "datetime":"Mon 3-1-21 9:48AM"
    },
    "received":{
        "as":"Janelle S",
        "datetime":"Mon 3-1-21 9:48AM"
    },
    "due":"Tue 3-2-21 9:48AM",
    "time":"0:30",
    "history":true, // or false
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
    "pending":false
}
```

## The Artist Data

I believe that I will also need information about the artists. I will also need to store some properties for each artist.

```js
var artist = {
    "uid":0, // Increments? Or randomly generated?
    "firstname":"Ian", // Could be helpful to break this appart
    "secondname":"Reed",
    "industries":{
        "regular":true,
        "auto":true,
        "dental":true
    }
    "queue":{
        "numprojects":1,
        "timeload":1.3 
    }
    "requests":[], // Priorities should be added as they are added to this array.


}
```


<!--
| Key | Value |
| --- | --- |
| `uid` | A unique identifier, reliably identifies this request among potentially many others |
| `sel` | Is this item selected by the user? Boolean<br>`This will allow an Artist Leader to select the line item and apply an action found using buttons or dropdowns in the surrounding area outside the graph.`  |
| `artist` | The artist which is assigned to this request. This should initially be `unassigned` or `null`. <br>`Displays the first name of an artist from the art department.` |
| `group` | The group which a request is residing in.<br>`This column displays the Group that the line item is currently residing in.` |
| `store` | Contains all of the information from .NET about this customer |
| `store`.`code` | The .NET Store Code for this customer<br>`This column displays the name of the company associated with the line item.` |
| `industry` | The industry for which this request has been made.<br>`Artists are currently either marked "Regular", "Auto", or "Dental". Essentially, if the industry is not Automotive or Dental, it is Regular.` |
| `tier` | The urgency level of this request.<br>`Artists are currently either marked "Gray", "Orange" or "Blue". Gray artists can only work on Gray Projects. Orange can work on Gray & Orange. Blue can do all.` |
| `kind` | The type of request this is. <br>`There are 7 "kinds" of projects. Most are Brand New Builds, or Changes to Existing Natives.` |
| `content` | Attributes which describe the content of this request. <br>`If the line item's "Project Kind" is "Changes to Existing Natives", this Content Attributes Column may contain data based on the type of change. Design Attributes - If the line item's "Project Kind" is "Changes to Existing Natives", this Design Attributes Column may contain data based on the type of change.` |
| `design` | Attributes which describe the design of this request. <br>`If the line item's "Project Kind" is "Changes to Existing Natives", this Design Attributes Column may contain data based on the type of change.` |
| `product` | The product for which this request was made. <br>`This column displays the product associated with the line item.` |
| `task` | The current task item of this request <br>`This column displays current status. When clicked, more information about the brief appears (pg 10).` |
| `task`.`cr` | Is this request under creative review? Boolean.<br>`The red artist icon notes creative review.` |
| `task`.`datetime` | The date and time which this task was created |
| `recieved` | Shows the Account Specialist, and the time which this request was submitted<br>`Depicts default sort. This column displays the Account Specialist's name that submitted the Art Queue Brief, and the date-time in which they submitted it.`<br> |
| `recieved`.`as` | The account specialist who submitted the request
| `recieved`.`datetime` | The time at which the account specialist submitted the request |
| `due` | The date at which the task is expected to be completed and submitted to the AS.<br>`This column depicts the due date for the client to receive an artwork proof, as determined by the admin table found on page 22.` |
| `time` | The amount of time this task will take.<br>`This column depicts the amount of time it should take an artist to complete artwork for the brief, as determined by the admin table on page 23.` |
| `history` | Does this request contain a history? If true, make History button available<br>`This column displays a clickable book icon that allows an artist leader to view the historical artwork of the customer. (pg 12)` |
-->


**Questions**

* Why is the Recieved heading "received" if it depicts the creator of the request?
* Where should the Creative Review property reside? Would the task be under Creative Review, the Artist be under creative review, or the entire request be under Creative Review?




