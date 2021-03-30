
/**
 * Depending on the type and purpose of a message box, constructs the DOM items inserted into the message box
 * @param {Object} tableData Data used to create the content of the alert
 * @param {String} domType Determines what the content and purpose of the alert will be
 * @returns The DOM elements to insert into the alert (String)
 */

export function makeDom(tableData, domType) {

    switch(domType) {
        case "View Request": // ----------------------------------------------

            console.log(tableData)
            var dom = `<h1>Hello!</h1>`
    }


    return dom;
}