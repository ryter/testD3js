!function() {
    var width = 200,
        height = 200,
        radius = Math.min(width, height) / 2;

    var dColor,
        dPercent,
        dName;

    var stokeColor = "#ffffff",
        stokeWidth = 2,
        stokeLinecap = "round",
        opacityDefault = 0;
    var color = d3.scale.ordinal()
            .range(function(d) {
                return d.color;
            });

    var arc = d3.svg.arc()
    //.startAngle(0)
            .innerRadius(0)
            .outerRadius(radius - 10)
            .innerRadius(radius - 40);

    var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {
                return d.percent;
            });

    var svg = d3.select(".pie-1").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var listItem = d3.select(".pie-1").append("ul").attr("class", "list");

    d3.csv("data.csv", function(error, data) {
        data.forEach(function(d) {
            dColor = d.color;
            dPercent = +d.percent;
            dName = d.name;

            listItem.append("li")
                .append("span")
                .attr("class", "color")
                .attr("style", "background-color:" + dColor + ";");
            listItem.append("span")
                .attr("class", "class");
            return dColor, dPercent, dName;
        });

        var g = svg.selectAll(".arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) {
                return d.data.color;
            })
            .style("fill-opacity", function(d) {
                return opacityDefault;
            })
            .style("stroke", function(d) {
                return stokeColor;
            })
            .style("stroke-width", function(d){
                return stokeWidth;
            })
            .style("stroke-linecap", function(d) {
                return stokeLinecap;
            })
            .style("stroke-opacity", function(d) {
                return opacityDefault;
            })
            .transition().delay(function(d, i) {
                return i * 0;
            }).duration(600)
            .attrTween('d', function(d) {
                
                var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                var item = this;

                return function(t) {
                    item.style.fillOpacity = t;
                    item.style.strokeOpacity = t;
                    d.endAngle = i(t);
                    return arc(d);
                };
            });
        

        function arcTween(a) {
            console.log(this);
            var i = d3.interpolate(this._current, a);
            this._current = i(0);

            return function(t) {
                return arc(i(t));
            };
        };
    });
}();


