/**
 * Returns a collection of lists, allows for randomized projects on each load
 * 
 * @returns {Object} lists Contains lists of data that can be used to create requests randomly
 * @returns {Object} lists.artists A list of the artists
 * @returns {Object} lists.clients A list of random clients
 * @returns {Object} lists.industries A list of industries
 * @returns {Object} products.industries A list of products available in .NET
 * @returns {Object} products.accs A list of account specialists available in .NET
 */


export function getLists() {
    var artists = [
                {
                    "firstname":"Ian",
                    "lastname":"Reed"
                },{
                    "firstname":"Berto",
                    "lastname":"Burgos-Colón"
                },{
                    "firstname":"Lisa",
                    "lastname":"Sweitzer"
                },{
                    "firstname":"Peter",
                    "lastname":"Aston"
                },{
                    "firstname":"Matt",
                    "lastname":"Calvert"
                },{
                    "firstname":"Breanna",
                    "lastname":"Bossler"
                },{
                    "firstname":"Kristen",
                    "lastname":"DeMelfy"
                },{
                    "firstname":"Rita",
                    "lastname":"Gagliardi"
                },{
                    "firstname":"Alaina",
                    "lastname":"Weidner"
                },{
                    "firstname":"Christian",
                    "lastname":"Betancourt"
                },{
                    "firstname":"Jeff",
                    "lastname":"Glass"
                },{
                    "firstname":"Luke",
                    "lastname":"Coleman"
                },{
                    "firstname":"Joshua",
                    "lastname":"Keller"
                },{
                    "firstname":"Luis",
                    "lastname":"Aguilar"
                },{
                    "firstname":"Emily",
                    "lastname":"Bentz"
                },{
                    "firstname":null,
                    "lastname":null
                },
            ];

    var clients = [ "Annie's Pizza - Portland Ave",
                    "Pudgie's Pizza - Birmingham",
                    "Pizza City - Woodbury Heights",
                    "Straw Hat Pizza - Half Moon Bay",
                    "Trattoria Uno - Branchburg",
                    "Sahara Pizza - Napavine",
                    "Vince's New York Pizza - Smithsburg",
                    "Maria's Pizza and Pasta - Conshohocken",
                    "Bruno's Pizzeria - Willard",
                    "Fox's Pizza Den - Kingsport",
                    "Mario & Franks II - Fieldsboro",
                    "Pizzarella - Carrollton",
                    "Mama Mia Pizza - Brisbane",
                    "Northwest Pizza Co - Hayden",
                    "Cafe Milnos - Pocomoke City",
                    "Mamma's Pizza - Biglerville"
                ];

    var industries = [  "Auto",
                        "Regular",
                        "Dental"
                    ];

    var tiers = [   "Gray",
                    "Orange",
                    "Blue"
    ];

    var kinds = [   "Brand New Build",
                    "Changes to Existing Natives"
                ];

    var attr = ["Light",
                "Moderate",
                "Heavy"
    ]

    var tasks = [   "Make Changes",
                    "Create Logo",
                    "Update Pricing"
            ]

    var products = [    "100# Gloss Postcard",
                        "2 sided box topper",
                        "2 Sided Flyer",
                        "80LBFLYER",
                        "Artwork Only",
                        "BirthdayPC",
                        "Box Topper April",
                        "Box Topper August",
                        "Box Topper December",
                        "Box Topper February",
                        "Box Topper January",
                        "Box Topper July",
                        "Box Topper June",
                        "Box Topper March",
                        "Box Topper May",
                        "Box Topper November",
                        "Box Topper October",
                        "Box Topper September",
                        "Brochure 10.5x17",
                        "Brochure Small",
                        "BrochureXL",
                        "BusinessCard",
                        "ColossalPC",
                        "COUPON BOOK",
                        "Custom Insert",
                        "Custom100",
                        "CUSTOM80",
                        "CustomEnv",
                        "CustomSilk",
                        "DOOR HANGER 100LB",
                        "EDDM Folded Magnet",
                        "EDDM Mag",
                        "EDDM MENU",
                        "EDDM POSTCARD",
                        "EDDM Scratch Off",
                        "EDDM XL MENU",
                        "EDDMBroch",
                        "EDDMBrochXL",
                        "EDDMColossal",
                        "EDDMJumboPC",
                        "EDDMJumboSO",
                        "EDDMPeelAGift",
                        "EDDMPizzaPeelCard",
                        "Env #10 8.5x11 S1",
                        "Env #10 8.5x11 S2",
                        "Env #10 8.5x11 V1",
                        "Env #10 8.5x11 V2",
                        "Env #10 8.5x14 S1",
                        "Env #10 8.5x14 S2",
                        "Env #10 8.5x14 V1",
                        "Env #10 8.5x14 V2",
                        "Folded Magnet",
                        "Jumbo Scratch",
                        "JUMBOPC",
                        "Long Postcard",
                        "MAGNET",
                        "MENU",
                        "Menu- Flat",
                        "Menu Small",
                        "MENU XXL",
                        "MenuXL",
                        "MenuXL-Flat",
                        "MPBTAC",
                        "MPBTNO",
                        "MPCC",
                        "MPCMS",
                        "MPCVDLAM",
                        "MPEGC",
                        "MPEXTWC2436AC",
                        "MPEXTWC2436NO",
                        "MPEXTWC3040AC",
                        "MPEXTWC3040NO",
                        "MPINTWC2436AC",
                        "MPINTWC2436NO",
                        "MPINTWC3040AC",
                        "MPINTWC3040NO",
                        "MPIS",
                        "MPND",
                        "MPNutGuide",
                        "MPPICMENU",
                        "MPPO2254",
                        "MPPO2436",
                        "MPPS",
                        "MPSCFS",
                        "NEW MOVERS PLASTIC",
                        "NEW MOVERS POSTCARD",
                        "Peel A Gift",
                        "PizzaPeelCard",
                        "Plastic PC Lg - S",
                        "Plastic PC Med - S",
                        "Plastic PC Sm - S",
                        "POSTCARD",
                        "PosterHangBar",
                        "SCRATCHOFF",
                        "WC2030",
                        "WC2430",
                        "WC2436",
                        "WC3040",
                        "WCCust",
                        "WCPoster2Side2430",
                        "WCPoster2Side2436"
                    ];

    var accs = [
                "AlexisM",
                "AmberS",
                "BrittanyF",
                "CarlSch",
                "ChrisV",
                "EricS",
                "JanelleS",
                "LizK",
                "LucasT",
                "MandyW",
                "MariaK",
                "MattD",
                "NikieC",
                "RachelJ",
                "SarahB",
                "SaraP",
                "SethS",
                "TarrynG",
                "TheresaC"
            ];

    return {
        "artists":artists, // List of artists
        "clients":clients, // List of clients
        "industries":industries, // List of industries
        "tiers":tiers, // List of tiers
        "kinds":kinds, // List of kinds
        "products":products, // List of products in .NET
        "as":accs, // List of account specialists
        "attr":attr, // List of attributes
        "tasks":tasks // List of attributes
    }
};