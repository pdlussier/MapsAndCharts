
var data = {
  "set1": [{
  "id": "US",
  "name": "United States",
  "value": 100,
  "fill": am4core.color("#df6205")
   }],
  "set2": [{
  "id": "US",
  "name": "United States",
  "value": 100,
  "fill": am4core.color("#df6205")
  },
  {
  "id": "FR",
  "name": "France",
  "value": 50,
  "fill": am4core.color("#d99411")
   }],
  "set3": [{
  "id": "NE",
  "name": "Niger",
  "value": "text",
  "fill": am4core.color("#F05C5C")
  },
  {
  "id": "UA",
  "name": "Ukraine",
  "value": "text",
  "fill": am4core.color("#d90202")
  }],
  }




var chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

chart.projection = new am4maps.projections.Miller();

var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}\n {value}\n Event: {event}\n Details: {details}";
    polygonTemplate.background.fill = am4core.color("#fff");
    polygonTemplate.fill = am4core.color("#7fa174");
    polygonTemplate.stroke = am4core.color("#fff");
    polygonTemplate.strokeWidth = 1;
    
    polygonTemplate.events.on("hit", function(ev) {
        ev.target.series.chart.zoomToMapObject(ev.target);
});


//  hover state
var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#ffce72");

polygonSeries.exclude = ["AQ"];

// Series data
polygonSeries.data = [{
  "id": "US",
  "name": "United States",
  "value": 30
}, {
  "id": "FR",
  "name": "France",
  "value": 60
},
{
  "id": "NE",
  "name": "Niger",
  "value": 90
},
{
  "id": "UA",
  "name": "Ukraine",
  "value": 100
}
];


polygonSeries.heatRules.push({
  "property": "fill",
  "target": polygonSeries.mapPolygons.template,
  "min": am4core.color("#d99411"),
  "max": am4core.color("#d90202")
});

// Bind "fill" property to "fill" key in data
polygonTemplate.propertyFields.fill = "fill";

/*
var lineSeries = chart.series.push(new am4maps.MapLineSeries());
lineSeries.data = [{
  "multiGeoLine": [
    [
      { "latitude": 48.856614, "longitude": 2.352222 },
      { "latitude": 40.712775, "longitude": -74.005973 },
      { "latitude": 49.282729, "longitude": -123.120738 }
    ]
  ]
}];

var imageSeries = chart.series.push(new am4maps.MapImageSeries());

// Create a circle image in image series template so it gets replicated to all new images
var imageSeriesTemplate = imageSeries.mapImages.template;
var circle = imageSeriesTemplate.createChild(am4core.Circle);
circle.radius = 4;
circle.fill = am4core.color("#B27799");
circle.stroke = am4core.color("#FFFFFF");
circle.strokeWidth = 2;
circle.nonScaling = true;
circle.tooltipText = "{title}";

imageSeriesTemplate.propertyFields.latitude = "latitude";
imageSeriesTemplate.propertyFields.longitude = "longitude";

// Add data for the three cities
imageSeries.data = [{
  "latitude": 48.856614,
  "longitude": 2.352222,
  "title": "Paris"
}, {
  "latitude": 40.712775,
  "longitude": -74.005973,
  "title": "New York"
}, {
  "latitude": 49.282729,
  "longitude": -123.120738,
  "title": "Vancouver"
}];
*/
// Add zoom control
chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#6b85b3");
chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;


chart.zoomControl = new am4maps.ZoomControl();

// Add and configure small map
chart.smallMap = new am4maps.SmallMap();
chart.smallMap.series.push(polygonSeries);

chart.legend = new am4charts.Legend();


var slider = chart.chartContainer.createChild(am4core.Slider);
slider.start = 0.5;
slider.margin(0,0,20,0);
slider.valign = "bottom";
slider.align = "center";
slider.width = 500;
slider.events.on("rangechanged", ()=>{
  chart.deltaLongitude = slider.start * 360 - 180;
})