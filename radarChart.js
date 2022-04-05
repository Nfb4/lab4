/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////

function RadarChart(id, input, season, club) {
	console.log(season)
	console.log(club)
	d3.select(id).select('svg').remove();
  const margin = { top: 30, right: 30, bottom: 70, left: 100 };
  const width = 800 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;
  
  let features = ["Spend", "Income", "Net", "Wins", "Draws", "Loses", "Goals For", "Goals Against", "Points" ];
  let data = [{}];
  for (let i = 0; i < features.length; i++) {
	  data[0][features[i]] = input[i] 
  }
  let max = 0
  for (let i = 0; i < features.length; i++) {
	  if(data[0][features[i]]>max){
		  max = data[0][features[i]]
	  }
}
	max = Math.ceil(max / 10) * 10

  let svg = d3.select(id).attr("id","the_SVG_ID").append("svg").attr("width", width).attr("height", height);
  d3.select(id).select('svg').select('text').remove();

	svg.append("text")
	.classed("text", true)
	.attr("transform", "translate(" + height / 2 + ", 12)")
	.attr("text-anchor", "middle")
	.text(
	  "Radar chart for " + club + " during " + season 
	);

  let radialScale = d3.scaleLinear().domain([0, max]).range([0, 250]);
  let ticks = [max*.2, max*.4, max*.6, max*.8, max];
  ticks.forEach((t) =>
    svg
      .append("circle")
      .attr("cx", 300)
      .attr("cy", 300)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("r", radialScale(t))
  );
  ticks.forEach((t) =>
    svg
      .append("text")
      .attr("x", 305)
      .attr("y", 300 - radialScale(t))
      .text(t.toString())
  );
  function angleToCoordinate(angle, value) {
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return { x: 300 + x, y: 300 - y };
  }
  for (var i = 0; i < features.length; i++) {
    let ft_name = features[i];
    let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
    let line_coordinate = angleToCoordinate(angle, max);
    let label_coordinate = angleToCoordinate(angle, max+5);

    //draw axis line
    svg
      .append("line")
      .attr("x1", 300)
      .attr("y1", 300)
      .attr("x2", line_coordinate.x)
      .attr("y2", line_coordinate.y)
      .attr("stroke", "black");

    //draw axis label
    svg
      .append("text")
      .attr("x", label_coordinate.x)
      .attr("y", label_coordinate.y)
      .text(ft_name);
  }
  let line = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);
  let colors = ["navy"];
  function getPathCoordinates(data_point) {
    let coordinates = [];
    for (var i = 0; i < features.length; i++) {
      let ft_name = features[i];
      let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
      coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
  }
  for (var i = 0; i < data.length; i++) {
    let d = data[i];
    let color = colors[i];
    let coordinates = getPathCoordinates(d);

    //draw the path element
    svg
      .append("path")
      .datum(coordinates)
      .attr("d", line)
      .attr("stroke-width", 3)
      .attr("stroke", color)
      .attr("fill", color)
      .attr("stroke-opacity", 1)
      .attr("opacity", 0.5);
  }
} //RadarChart
