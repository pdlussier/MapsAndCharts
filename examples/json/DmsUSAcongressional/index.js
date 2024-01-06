var chart = am4core.create("chartdiv", am4maps.MapChart);
chart.geodata = am4geodata_region_usa_congressional_usaCongressionalHigh;

chart.projection = new am4maps.projections.Miller();

var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AK"];

    polygonSeries.useGeodata = true;

var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#74B266");
var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

chart.legend = new am4charts.Legend();

chart.zoomControl = new am4maps.ZoomControl();