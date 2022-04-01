// CSV of spend data, all seasons in one csv
let spend =
"https://raw.githubusercontent.com/Nfb4/Nfb4.github.io/main/lab4/csvs/spend.csv";

// multiple csvs of stats for each individual season
let csvArr = [
"https://raw.githubusercontent.com/Nfb4/Nfb4.github.io/main/lab4/csvs/seasons/prem10-11.csv",
"https://raw.githubusercontent.com/Nfb4/Nfb4.github.io/main/lab4/csvs/seasons/prem11-12.csv",
"https://raw.githubusercontent.com/Nfb4/Nfb4.github.io/main/lab4/csvs/seasons/prem12-13.csv",
"https://raw.githubusercontent.com/Nfb4/Nfb4.github.io/main/lab4/csvs/seasons/prem13-14.csv",
"https://raw.githubusercontent.com/Nfb4/Nfb4.github.io/main/lab4/csvs/seasons/prem14-15.csv",
"https://raw.githubusercontent.com/Nfb4/Nfb4.github.io/main/lab4/csvs/seasons/prem15-16.csv",
"https://raw.githubusercontent.com/Nfb4/Nfb4.github.io/main/lab4/csvs/seasons/prem16-17.csv",
"https://raw.githubusercontent.com/Nfb4/Nfb4.github.io/main/lab4/csvs/seasons/prem17-18.csv",
"https://raw.githubusercontent.com/Nfb4/Nfb4.github.io/main/lab4/csvs/seasons/prem18-19.csv",
"https://raw.githubusercontent.com/Nfb4/Nfb4.github.io/main/lab4/csvs/seasons/prem19-20.csv",
"https://raw.githubusercontent.com/Nfb4/Nfb4.github.io/main/lab4/csvs/seasons/prem20-21.csv",
];

// Dictionary to store totals data for each club
let cumulative = {};

// Dictionary of dictionaries for each club in each season
let seasons = {
"20-21": {},
"19-20": {},
"18-19": {},
"17-18": {},
"16-17": {},
"15-16": {},
"14-15": {},
"13-14": {},
"12-13": {},
"11-12": {},
"10-11": {},
};

const processCsvEntry = async function(csvLine) {
    // do stuff for that single csv
    entryDict = {}

    entryDict['yr'] = csvLine['yr']
    entryDict['team'] = csvLine['team']
    entryDict['spend'] = csvLine['spend']
    entryDict['inc'] = csvLine['inc']
    entryDict['net'] = csvLine['net']

    console.log(entryDict)
    //return the data from the file
    return entryDict
}



const dummyFunc = async function(csvPath) { 
    const csvData = await d3.csv(csvPath)

    console.log(csvData)
    for (i=0;i<csvData.length;i++){
        clubDict = await processCsvEntry(csvData[i])

    }


}

dummyFunc();



// // Process the individual seasons
async function processData(csvArr) {
// Loop through each
for (let i = 0; i < csvArr.length; i++) {
    // Load the csv link as a csv object
    d3.csv(csvArr[i]).then(function (data) {
    // Set key equal to the part of the csv string that is the current season so it can be used as a key for the dictionary
    for (let j = 0; j < data.length; j++) {
        let key = csvArr[i].slice(81, 86);
        // Check if the current season contains an entry for the club at this index of the csv file, if it does add the necessary info
        
        seasons[key][data[j]["Squad"]] = [
        seasons[key][data[j]["Squad"]][0],
        seasons[key][data[j]["Squad"]][1],
        seasons[key][data[j]["Squad"]][2],
        data[j]["Rk"],
        data[j]["W"],
        data[j]["D"],
        data[j]["L"],
        data[j]["GF"],
        data[j]["GA"],
        data[j]["Pts"],
        ];
    }
    });
}
};

// // Process the spend csv file
// async function iniData(spendCSV) {
// // Load in the csv
// d3.csv(spendCSV).then(function (data) {
//     // Loop through each item
//     for (let i = 0; i < data.length; i++) {
//     // If the spend is in the thousands, multiple by .001 so it is inline with the other values in millions
//     if (data[i].spend.slice(data[i].spend.length - 3) == "Th.") {
//         spend =
//         parseInt(data[i].spend.slice(1, data[i].spend.length - 3)) *
//         0.001;
//     }
//     // If there is no value set spend to 0
//     else if (data[i].spend == "") {
//         spend = 0;
//     } else {
//         // Parse as int and remove '£' and 'M'
//         spend = parseInt(
//         data[i].spend.slice(1, data[i].spend.length - 1)
//         );
//     }
//     // If the spend is in the thousands, multiple by .001 so it is inline with the other values in millions
//     if (data[i].inc.slice(data[i].inc.length - 3) == "Th.") {
//         inc =
//         parseInt(data[i].inc.slice(1, data[i].inc.length - 3)) * 0.001;
//     }
//     // If there is no value set inc to 0
//     else if (data[i].inc == "") {
//         inc = 0;
//     }
//     // Parse as int and remove '£' and 'M'
//     else {
//         inc = parseInt(data[i].inc.slice(1, data[i].inc.length - 1));
//     }
//     // If the spend is in the thousands, multiple by .001 so it is inline with the other values in millions
//     if (data[i].net.slice(data[i].net.length - 3) == "Th.") {
//         net =
//         parseInt(data[i].net.slice(1, data[i].net.length - 3)) * 0.001;
//     }
//     // If there is no value set net to 0
//     else if (data[i].net == "") {
//         net = 0;
//     } else {
//         // Parse as int and remove '£' and 'M'
//         net = parseInt(data[i].net.slice(1, data[i].net.length - 1));
//     }
//     // Add the newly parsed values to the dictionary with the club name as kjey
//     seasons[data[i].yr][data[i].team] = [spend, inc, net];

//     // For cumulative, if defined then values should be increased by the newly parsed values instead of set to
//     if (cumulative[data[i].team] != undefined) {
//         cumulative[data[i].team] = [
//         cumulative[data[i].team][0] + spend,
//         cumulative[data[i].team][1] + inc,
//         cumulative[data[i].team][0] +
//             spend -
//             (cumulative[data[i].team][1] + inc),
//         ];
//     } else {
//         // If it is undefined simply set the values
//         cumulative[data[i].team] = [spend, inc, net];
//     }
//     }
// });
// }

// async function call() {
// try {
//     await iniData(spend);
//     await processData(csvArr);
    
//     console.log(seasons);
//     await update(seasons['20-21'])

// } catch (err) {
//     console.log(err);
// }
// }

// // processData(csvArr, spend)
// call();

// // set the dimensions and margins of the graph
// const margin = { top: 30, right: 30, bottom: 70, left: 60 };
// const width = 460 - margin.left - margin.right;
// const height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3
// .select("body")
// .append("div")
// .append("svg")
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom)
// .append("g")
// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // Function used to initilise the x and y axes on start
// function iniAxis(x, y) {
// // add a bottom x axis to the graph, class it as 'xBot'
// svg
//     .append("g")
//     .classed("xBot", true)
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

// // add a top x axis to the graph, class it as 'xTop'
// svg
//     .append("g")
//     .classed("xTop", true)
//     .attr("transform", "translate(0,0")
//     .call(d3.axisTop(x));

// // Add a right Y axis class it as 'yRight'
// svg
//     .append("g")
//     .classed("yRight", true)
//     .attr("transform", "translate(" + width + ",0)")
//     .call(d3.axisRight(y));

// // Add a right Y axis class it as 'yLeft'
// svg
//     .append("g")
//     .classed("yLeft", true)
//     .attr("class", "myYaxis")
//     .call(d3.axisLeft(y));
// }

// // A function that create / update the plot for a given variable
// // also updates the axes as the size of the dataset changes
// async function update(data) {
// // Defining x scale so values are proportionate

// console.log((data))
// var max = d3.max(data, function(d) {
//     console.log
//     return d[1];

// })
// console.log(max)

// // colour = red
// // var x = d3
// //   .scaleBand()
// //   .range([0, width])
// //   .domain(
// //     data.map(function (d) {
// //       return d.group;
// //     })
// //   )
// //   .padding(0.2);

// // // Define the y scale so that the values are proportionate
// // var y = d3.scaleLinear().domain([0, d3.max(data[2])]).range([height, 0]);

// // // Intilise the axes
// // iniAxis(x, y);

// }