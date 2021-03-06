//define var data
var data = undefined;

// define margin
var margin = {top: 20, right: 20, bottom: 30, left: 40};

//Create a legend
function legend(element, keys, z) {
    var legendRectSize = 15;
    var svg = d3.select('#'+element).append('svg')
        .attr('width', 400)
        .attr('height', 30);

    //Create the legend
    var legend = svg.selectAll('.legend')
        .data(keys)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
            var horz = i * 110 + 10;
            var vert = 0;
            return 'translate(' + horz + ',' + vert + ')';
        });

    //Draw the square of the legend
    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', function (d) {
            return z(d)
        })
        .style('stroke', function (d) {
            return z(d)
        });

    //Add the text to the legend
    legend.append('text')
        .attr('x', legendRectSize + 5)
        .attr('y', 15)
        .text(function (d) {
            return d;
        });
}

//create a treemap
function treemap(element, property1, property2) {

    //clean html in id treemap and id legend
    $("#treemap_" + element).html("");
    $("#legend_" + element).html("");
    //create a group for svg with margin
    var svg = d3.select("#treemap_" + element).append("svg").attr("width", 1200).attr("height", 600);
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    if (data === undefined) {
        return;
    }

    //define var color
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    //Create an array with data we need for tree map
    var nested_data = d3.nest()
        .key(function (d) {
            return d[property1];
        })
        .key(function (d) {
            return d[property2];
        })
        .rollup(function (d) {
            return d.length;
        })
        .entries(data);

    console.log("TREEMAP DATA");
    console.log(nested_data);

    keys = nested_data.map(function (d) {
        return d.key;
    });

    //Define the domain of colors
    color.domain(keys);
    //Create a Legend for this treemap
    legend("legend_" + element, keys, color);

    var treemap = d3.treemap()
        .size([width, height])
        .padding(1)
        .round(true);

    var root = d3.hierarchy({values: nested_data}, function (d) {
        return d.values;
    })
        .sum(function (d) {
            return d.value;
        })
        .sort(function (a, b) {
            return b.value - a.value;
        });

    treemap(root);

    //Draw the group nodes
    var nodes = g.selectAll(".tm")
        .data(root.leaves())
        .enter().append("g")
        .attr('transform', function (d) {
            return 'translate(' + [d.x0, d.y0] + ')'
        })
        .attr("class", "tm");

    //Draw rectangles
    nodes.append("rect")
        .attr("width", function (d) {
            return d.x1 - d.x0;
        })
        .attr("height", function (d) {
            return d.y1 - d.y0;
        })
        .attr("fill", function (d) {
            return color(d.parent.data.key);
        });

    //Add the text to areas
    nodes.append("text")
        .attr("class", "tm_text")
        .attr('dx', 4)
        .attr('dy', 14)
        .text(function (d) {
            return d.data.key + " " + d.data.value;
        });

}

//Crate a barchart
function bar_chart(element, property) {
    //Clean html in id element
    $("#" + element).html("");
    //create a group for svg with margin
    var svg = d3.select("#" + element).append("svg").attr("width", 500).attr("height", 500);
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var colors = ["#956633", "#58A4B0", "#0C7C59", "#2B3C3A", "#D64933"];

    //Create an array with the only three data we need
    var nested_data = d3.nest()
        //Regroup data by property
        .key(function (d) {
            return d[property];
        })
        //Calculate number of property and the time it takes
        .rollup(function (d) {
            return {
                size: d.length, total_time: d3.sum(d, function (d) {
                    return d.time;
                })
            };
        })
        .entries(data);

    //Sort nested data by alphabetical order
    nested_data = nested_data.sort(function (a, b) {
        return d3.ascending(a.key, b.key)
    });


    console.log("BARCHART DATA");
    console.log(nested_data);

    //Create var x !It's different if property is is time or not!
    if (property === "time") {
        var x = d3.scaleLinear()
            .rangeRound([0, width]);
    }
    else {
        x = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);
    }

    //Create var y
    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    //Create var z
    var z = d3.scaleOrdinal(colors);

    //Define the domain of x axe !It's different if property is is time or not!
    if (property === "time") {
        x.domain([0, d3.max(nested_data.map(function (d) {
            return +d.key;
        })) + 1]);
    } else {
        x.domain(nested_data.map(function (d) {
            return d.key;
        }));
    }

    //Define the domain of y axe
    y.domain([0, d3.max(nested_data, function (d) {
        return d.value.size;
    })]);

    //Define the domain of colors
    z.domain(nested_data.map(function (d) {
        return d.key;
    }));

    //draw the barchart
    g.selectAll(".bar")
        .data(nested_data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.key)
        })
        .attr("y", function (d) {
            return y(d.value.size)
        })
        .attr("height", function (d) {
            return height - y(d.value.size);
        })
        .attr("width", function (d) {
            if (property === "time") {
                return (x(1)-x(0))*0.9;
            } else {
                return x.bandwidth();
            }
        })
        .style("fill", function (d) {
            return z(d.key)
        })
        .on("mouseover", function(d){
            d3.select(this)
                .transition().duration(100)
                .attr("fill", "black")
                .attr("y", y(d.value.size) - 20)
        })
        .on("mouseout", function(d){
            d3.select(this)
                .transition().duration(100)
                .attr("y", y(d.value.size))
        });

    //create a group for x axe
    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    //crate a group for y axe
    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
}

//When DOM is ready do this
$(function () {
    console.log("READY");

    //Load the googlesheet data
    var URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQfeT9lPtJ5ia2XsopWVdvl98Oy7Bu6xL9SVQBEh32OXC8Qk4MKYxr2TcGSSTkAs7kAMfjF83IEGhQ-";
    URL += "/pub?single=true&output=csv";


    //Create csv with googlesheet data
    d3.csv(URL, function (d) {
        data = d;
        tot_times_all = 0;
        tot_times_joe = 0;
        tot_times_doing = 0;
        data.forEach(function (d) {
            d.time = +d.time;
            tot_times_all += d.time;
            if (d.who == "Joe"){
                tot_times_joe += d.time;
            }
            if (d.status == "DOING"){
                tot_times_doing += d.time;
            }
        });

        //Get sum Joe's work time


        //create a barchart in id bcs
        bar_chart("bcs", "status");
        //Crate a barchart in id bcw by person
        bar_chart("bcw", "who");
        bar_chart("bct", "time");
        bar_chart("bcp", "priority");
        //Create a treemap in id treemap_status + legend in legend_status
        treemap("status", "status", "who");
        treemap("who", "who", "priority");


        console.log("TOTAL TIMES");
        console.log(tot_times_all);

        console.log("TOTAL TIMES JOE");
        console.log(tot_times_joe);

        console.log("TOTAL TIMES DOING");
        console.log(tot_times_doing);

        //Display stats to the div's id "stats"
        document.getElementById('total_time').innerHTML = "TOTAL TIME ALL TASK : " + tot_times_all;
        document.getElementById('total_joe').innerHTML = "TOTAL TIME TASK JOE : " + tot_times_joe;
        document.getElementById('total_doing').innerHTML = "TOTAL TIME TASK DOING : " + tot_times_doing;
    });
});