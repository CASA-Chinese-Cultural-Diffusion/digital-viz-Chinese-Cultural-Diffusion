

//GENERAL FUNCTIONALITY: SCROLL BACK TO TOP
//from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
topBtn = document.getElementById("scroll-top");

window.onscroll = function() {scrollFunction()};


// When the user clicks on the button, scroll to the top of the document
//function topFunction() {
  //document.body.scrollTop = 0; // For Safari
  //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
//}


//GENERAL FUNCTIONALITY: POPUP WINDOWS
function showOverlay(overlay) {
  document.getElementById(overlay).style.display = "block";
}

function hideOverlay(overlay) {
  document.getElementById(overlay).style.display = "none";
}

// INCOME AND CRIME SCATTERPLOT

d3.csv("data/processed/Crime_LQ_income_2018.csv", function(data) {

    //empty arrays/variables for scatter points and regression line
    var chartdata = [];
    var regdata = [];
    var r;

    //draw chart using chartdata
    const chart = Highcharts.chart('scatter-container', {

    chart: {
        type: 'scatter',
        plotBorderWidth: 1,
        zoomType: 'xy',
        animation: true,
        backgroundColor: '#31525B',
        style: {
          fontFamily: "'Lato', sans-serif"
        }
    },

    title: {
      text:''
    },

    legend: {
        enabled: false
    },

    xAxis: {
        gridLineWidth: 1,
        title: {
            text: 'Mean annual income in 2018 (GBP)',
            style: {
              color: '#fff'
            }
        },
        labels: {
            format: '{value}',
            style: {
              color: '#fff'
            }
        },
        gridLineWidth: 0.2
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
            text: 'Location quotient',
            style: {
              color: '#fff'
            }
        },
        labels: {
          style: {
              color: '#fff'
            }
          },
        maxPadding: 0.2,
        plotLines: [{
            color: '#fff',
            dashStyle: 'dot',
            width: 2,
            value: 1,
            label: {
                align: 'right',
                style: {
                    fontStyle: 'italic',
                    color: '#fff'
                },
                text: 'Citywide share of crime in category',
                x: -10
            },
            zIndex: 3
        }],
        gridLineWidth: 0.2
    },

    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
            '<tr><th>2018 mean annual income:</th><td>{point.x}</td></tr>' +
            '<tr><th>Concentration of crime type relative<br>to citywide concentration:</th><td>{point.y:.2f}</td></tr>',
        footerFormat: '</table>'
        //followPointer: true
    },

    plotOptions: {
      line: {
        lineWidth: 5
      }
    },

    series: [{
        data: chartdata,
        color: 'rgba(255,161,1,0.35)',
        stickyTracking: false
    },
    {
      type: 'line',
      data: regdata,
      color: 'rgba(255,161,1,1)',
      r: r,
      tooltip: {
        useHTML: true,
        pointFormat: '<b>Correlation coefficient:</b> ' + this.r
      }
    }]

  });

function regression(category, income) {
    //income is an array corresponding to income column, 
    //category is an array corresponding to column of given crime category
      let r, sy, sx, b, a, meanX, meanY;
      r = jStat.corrcoeff(income, category);
      sy = jStat.stdev(category);
      sx = jStat.stdev(income);
      meanY = jStat(category).mean();
      meanX = jStat(income).mean();
      b = r * (sy / sx);
      a = meanY - meanX * b;
      //Set up a line
      let x1, x2, y1, y2;
      x1 = jStat.min(income);
      x2 = jStat.max(income);
      y1 = a + b * x1;
      y2 = a + b * x2;
      return {
        line: [
          [x1, y1],
          [x2, y2]
        ],
        r
      };
    }

  //set chart data to a certain category
  function setCrime(category) {

    //reinitialise empty array for chart points
    chartdata = [];

    //initialise empty arrays for holding regression data
    regdata = [];
    catArray = [];
    incArray = [];
    
    console.log(category);

    for(var i = 0; i < data.length; i++) {
      //location quotient for crime category
      var cat = parseFloat(data[i][category]);
      //annual income in 2018
      var inc = parseFloat(data[i]['Total_yearly_income_2018']);

      chartdata.push([inc, cat]);
      catArray.push(cat);
      incArray.push(inc);
    }

    //UPDATE POINTS
    //console.log(chartdata);
    chart.series[0].setData(chartdata);

    console.log(chart.yAxis[0].options.plotLines[0].label);


    //UPDATE REGRESSION LINE
    var regObj = regression(catArray, incArray);
    //console.log(regObj); 
    regdata = regObj['line']; //array of two points on line
    r = regObj['r']; //correlation coefficient of line

    //add line to chart
    chart.series[1].setData(regdata);  

    //view correlation coefficient when you hover over the line
    chart.series[1].update({
      tooltip: {
        pointFormat: '<b>Correlation coefficient</b>: ' + r.toFixed(2)
      }
    });

    //UPDATE PLOT LINE TEXT
    chart.yAxis[0].options.plotLines[0].label.text = 'Citywide share of crimes classified under ' + category;
    chart.yAxis[0].update();
  }

  //set initial view to violent crime
  setCrime('Violence Against the Person');

  //set the crime category with a button
  const buttons = document.getElementsByClassName("scatter-btn");

  Array.from(buttons).forEach(button =>
  button.addEventListener("click", crimeListener));

  function crimeListener(event) { 
    //change which element has the active class
    var current = document.getElementsByClassName("active"); 
    current[0].className = current[0].className.replace(" active", "");
    const button = event.target;
    button.className += " active";

    //call setCrime function using button value
    setCrime(button.value);
  }

});

// INCOME CHOROPLETH

var oldYear = '2008'
var year = null
        //    创建地图对象
mapboxgl.accessToken = 'pk.eyJ1IjoiaGhoMzU2ODciLCJhIjoiY2ttOTB2b3F5MTFjbTJwbXpycGtjano5ZCJ9.CISH6kMmfKVIl5x80_2sDQ';

var incMap = new mapboxgl.Map({
  container: 'income-change-map', // container id
  style: 'mapbox://styles/hhh35687/ckp81xvsm1iaq18n4qurs6smq', // replace this with your style URL
  center: [-0.1, 51.49], // starting position [lng, lat]
  zoom: 9.7, // starting zoom
});

incMap.on('load', function() {

//how to only show outlines of Waltham Forest and Bromley
  incMap.addSource('boroughs', {
    type: 'vector',
    url: 'mapbox://caranvr.97m3px18'
  });

  incMap.addLayer({                  
    id: 'walt-brom-outline',
    type: 'line',
    source: 'boroughs',
    'source-layer': 'boroughs_wgs84-b7y9u2',
    'layout': {
      'visibility': 'visible'
    },
    paint: {
      'line-color': '#31525B',
      'line-width': 2
    },
    filter: ["any", ['==','NAME','Waltham Forest'], ['==', 'NAME', 'Bromley']]
  });

})

   // 滑块点击事件
function change() {
    if (year)
      oldYear = year
    year = document.getElementById('slider').value;
    incMap.setLayoutProperty(oldYear, 'visibility', 'none');
    incMap.setLayoutProperty(year, 'visibility', 'visible');
    document.getElementById('year').innerHTML = year;
  }  

    var popMap = new mapboxgl.Map({
    container: 'pop-map', // container id
    style: 'mapbox://styles/keroroscar/ckou6k4iy419318mpwparhxdl', // map background layer location
    center: [0, 51.5], // starting position [lng, lat]
    zoom: 8, // starting zoom
    pitch: 50 // tilt of the viewpoint in degrees
    });


    popMap.on('load', function() {
      // Set global light properties which influence 3D layer shadows
      popMap.setLight({color: "#fff", intensity: 0.15, position: [1.15, 210, 30]});
      // Add standard navigation control
      popMap.addControl(new mapboxgl.NavigationControl());

    // Load the 3D population hexagon layer as a fill-extrusion type
      popMap.addLayer({
        id: 'EngWal_Hex_Res',
        type: 'fill-extrusion',
        source: {
          type: 'vector',
          url: 'mapbox://keroroscar.021y5h40' // Your Mapbox tileset Map ID
        },
        'source-layer': 'EngWal_Hex_ResEmp_20012011b-9mhp7y', // name of tileset
        paint: {
            'fill-extrusion-color': {
                property: 'ResChange',
                type: 'exponential',
                stops: [
                    [-3000, "#8c510a"],
                    [-2000, "#bf812d"],
                    [-1000, "#dfc27d"],
                    [-500, "#f6e8c3"],
                    [0, "#f5f5f5"],
                    [500, "#c7eae5"],
                    [2000, "#80cdc1"],
                    [5000, "#35978f"],
                    [8000, "#01665e"]]
            },
            'fill-extrusion-height': ['/', ['number', ['get', 'ResChange'], 2], 2],
            'fill-extrusion-opacity': 0.7,  //Opacity set to zero
            'fill-extrusion-opacity-transition': {
                 duration: 1000,
                 delay: 0
             }
            }
      });

    // Load the second 3D population hexagon layer. This layer has its opacity set to zero.
      popMap.addLayer({
        id: 'EngWal_Hex_Emp',
        type: 'fill-extrusion',
        source: {
          type: 'vector',
          url: 'mapbox://keroroscar.021y5h40' // Your Mapbox tileset Map ID
        },
        'source-layer': 'EngWal_Hex_ResEmp_20012011b-9mhp7y', // name of tileset
        paint: {
            'fill-extrusion-color': {
                property: 'EmpChange',
                type: 'exponential',
                stops: [
                    [-12000, "#4d4d4d"],
                    [-6000, "#878787"],
                    [-4000, "#bababa"],
                    [-1000, "#e0e0e0"],
                    [0, "#f5f5f5"],
                    [1000, "#fddbc7"],
                    [5000, "#f4a582"],
                    [8000, "#d6604d"],
                    [30000, "#b2182b"]]
            },
            'fill-extrusion-height': ['/', ['number', ['get', 'EmpChange'], 2], 2],
            'fill-extrusion-opacity': 0.7,  //Opacity set to zero
            'fill-extrusion-opacity-transition': {
                 duration: 1000,
                 delay: 0
             }
            }
      });

        
//add to map.on('load') function
    popMap.addSource('boroughs', {
      type: 'vector',
      url: 'mapbox://caranvr.97m3px18'
    });

    popMap.addLayer({                  
      id: 'walt-brom-outline',
      type: 'line',
      source: 'boroughs',
      'source-layer': 'boroughs_wgs84-b7y9u2',
      'layout': {
        'visibility': 'visible'
      },
      paint: {
        'line-color': '#900C3F',
        'line-width': 10
      },
      filter: ["any", ['==','NAME','Waltham Forest'], ['==', 'NAME', 'Bromley'], ['==', 'NAME', 'Tower Hamlets']]
    });


// Add the label layer
  popMap.addLayer({
    'id': 'labels',
    'type': 'symbol',
        source: {
          type: 'vector',
          url: 'mapbox://keroroscar.021y5h40' // Your Mapbox tileset Map ID
        },
    'source-layer': 'LabelCities2-6qmjf4', // name of tilesets
    'layout': {
      'text-field': '{Name2}',
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-size': 14
    },
    'paint': {
      'text-color': 'rgba(0,0,0,0.8)',
      'text-halo-color': '#fff',
      'text-halo-width': 1
    }
  });
        

//Event listener for layer switch
document.getElementById("layer1").addEventListener("click", function(){
popMap.setPaintProperty('EngWal_Hex_Emp','fill-extrusion-opacity',0);
popMap.setPaintProperty('EngWal_Hex_Res','fill-extrusion-opacity',0.95);
});

document.getElementById("layer2").addEventListener("click", function(){
popMap.setPaintProperty('EngWal_Hex_Emp','fill-extrusion-opacity',0.95);
popMap.setPaintProperty('EngWal_Hex_Res','fill-extrusion-opacity',0);
});


//Event listener for the zoom to buttons created using a for loop and switch case statement to set lat and long


});

//LQ MAP
var lq_year = '2008';
    var var_name = 'BURLC2008';
    var show = 'visible';
    var crime = 'Total';
    var circle_opacity = 0.8;

    var map = new mapboxgl.Map({
      container: 'lq-map', // container id
      style: 'mapbox://styles/zcqsapi/ckp709xbg01la17p84cwgv4p3',
      center: [-0.106, 51.502], // starting position [lng, lat]
      zoom: 9.58 // starting zoom
    });

    map.on('load', function() {



      map.addSource('crimes', {
        'type': 'geojson',
        'data': 'https://raw.githubusercontent.com/ali-pie/gis-project/main/DigVis/crimes.geojson'
      });

      map.addSource('lq', {
        'type': 'vector',
        'url': 'mapbox://zcqsapi.avgvs00f'
      });

      map.addSource('boroughs', {
      type: 'vector',
      url: 'mapbox://caranvr.97m3px18'
    });

    map.addLayer({                  
      id: 'walt-brom-outline',
      type: 'line',
      source: 'boroughs',
      'source-layer': 'boroughs_wgs84-b7y9u2',
      'layout': {
        'visibility': 'visible'
      },
      paint: {
        'line-color': '#900C3F',
        'line-width': 3
      },
      filter: ['==','NAME', '']
    });

      map.addLayer({
        'id': var_name,
        'source': 'lq',
        'source-layer': 'zip-7lumhc',
        'type': 'fill',
        'paint': {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', var_name],
            0,
            '#008000',
            1,
            '#FFFF00',
            2,
            '#FF0000'
            ],
          'fill-opacity': 0.40
        }
        },
        'waterway-label'
        );

      map.addLayer({
                      id: 'crimes-events',
                      type: 'circle',
                      source: 'crimes',
                      paint: {
                        'circle-radius': {
                            property: lq_year,
                            type: 'exponential',
                            stops: [
                              [{ zoom: 9, value: 1 }, 5],
                              [{ zoom: 9, value: 3500 }, 10],
                              [{ zoom: 9, value: 10000 }, 15],
                              [{ zoom: 9, value: 15000 }, 30],
                              [{ zoom: 22, value: 0 }, 20],
                              [{ zoom: 22, value: 3500 }, 40],
                              [{ zoom: 22, value: 10000 }, 60],
                              [{ zoom: 22, value: 15000 }, 80],
                                ]
                        },
                        'circle-color': {
                             property: 'Major Category',
                             type: 'categorical',
                             stops: [
                               ['Total', 'rgb(51,0,102)'],
                               ['Burglary', 'rgb(76,0,153)'],
                               ['Criminal Damage', 'rgb(102,0,204)'],
                               ['Drugs', 'rgb(127,0,255)'],
                               ['Robbery', 'rgb(153,51,255)'],
                               ['Theft and Handling', 'rgb(178,102,255)'],
                               ['Violence Against the Person', 'rgb(204,153,255)'],
                               ['Other Notifiable Offences', 'rgb(229,204,255)']
                             ]
                           },
                        'circle-opacity': circle_opacity
                      }
                    });
      filterDay = ['match', ['string', ['get', 'Major Category']], crime, true, false];
      map.setFilter('crimes-events', ['all', filterDay])

      if (crime == 'Total') {
        map.setLayoutProperty(
          var_name,
          'visibility',
          'none')
      };

      map.on('mousemove', function(e) {
          var states = map.queryRenderedFeatures(e.point, {
            layers: [var_name]
          });

          if (states.length > 0) {
            document.getElementById('pd').innerHTML = ' <h3><strong>  ' +states[0].properties.MSOA11NM + '</strong><br/>'
             + '<h3><strong>' + states[0].properties[var_name] + '</strong> Lower Quantient</em></p>';
          } else {
            document.getElementById('pd').innerHTML = '<p><h3><strong>Hover over an area!</strong></p>';
          }
        });

      document.getElementById('lq-slider').addEventListener('input', function(e) {
        lq_year = parseInt(e.target.value);
        var temp = var_name;

        var_name = String(var_name).substring(0,5);
        var_name = var_name.concat(lq_year);
        //update the map
          map.addLayer({
            'id': var_name,
            'source': 'lq',
            'source-layer': 'zip-7lumhc',
            'type': 'fill',
            // only include features for which the "isState"
            // property is "true"
            //'filter': ['==', 'isState', true],
            'paint': {
              'fill-color': [
                'interpolate',
                ['linear'],
                ['get', var_name],
                0,
                '#008000',
                1,
                '#FFFF00',
                2,
                '#FF0000'
                ],
              'fill-opacity': 0.40
            }
            },
            'waterway-label'
            );

          map.removeLayer('crimes-events');
          map.addLayer({
                          id: 'crimes-events',
                          type: 'circle',
                          source: 'crimes',
                          paint: {
                            'circle-radius': {
                                property: String(lq_year),
                                type: 'exponential',
                                stops: [
                                    [{ zoom: 9, value: 1 }, 5],
                                    [{ zoom: 9, value: 3500 }, 10],
                                    [{ zoom: 9, value: 10000 }, 15],
                                    [{ zoom: 9, value: 15000 }, 30],
                                    [{ zoom: 22, value: 0 }, 20],
                                    [{ zoom: 22, value: 3500 }, 40],
                                    [{ zoom: 22, value: 10000 }, 60],
                                    [{ zoom: 22, value: 15000 }, 80],
                                    ]
                            },
                            'circle-color': {
                                 property: 'Major Category',
                                 type: 'categorical',
                                 stops: [
                                   ['Total', 'rgb(51,0,102)'],
                                   ['Burglary', 'rgb(76,0,153)'],
                                   ['Criminal Damage', 'rgb(102,0,204)'],
                                   ['Drugs', 'rgb(127,0,255)'],
                                   ['Robbery', 'rgb(153,51,255)'],
                                   ['Theft and Handling', 'rgb(178,102,255)'],
                                   ['Violence Against the Person', 'rgb(204,153,255)'],
                                   ['Other Notifiable Offences', 'rgb(229,204,255)']
                                 ]
                               },
                            'circle-opacity': circle_opacity
                          },
                          layout: {
                            visibility : show
                          }
                        });
          map.removeLayer(temp);
          filterDay = ['match', ['string', ['get', 'Major Category']], crime, true, false];
          map.setFilter('crimes-events', ['all', filterDay]);
        document.getElementById('active-year').innerText = lq_year;
        if (crime == 'Total') {
          map.setLayoutProperty(
            var_name,
            'visibility',
            'none')
        };
      });

      document.getElementById('filters').addEventListener('change', function(e) {
        crime = e.target.value;

        var temp = var_name

        filterDay = ['match', ['string', ['get', 'Major Category']], crime, true, false];
        var long = filterDay[2]
        var short = long.substring(0,3).toUpperCase()
        var_name = short.concat('LC').concat(String(lq_year))
        map.addLayer({
          'id': var_name,
          'source': 'lq',
          'source-layer': 'zip-7lumhc',
          'type': 'fill',
          // only include features for which the "isState"
          // property is "true"
          //'filter': ['==', 'isState', true],
          'paint': {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', var_name],
              0,
              '#008000',
              1,
              '#FFFF00',
              2,
              '#FF0000'
              ],
            'fill-opacity': 0.40
          }
          },
          'waterway-label'
          );
        map.setFilter('crimes-events', ['all', filterDay]);
        map.removeLayer(temp);
        if (crime == 'Total') {
          map.setLayoutProperty(
            var_name,
            'visibility',
            'none')
        };

});

      document.getElementById('listing-group').addEventListener('change', function (e) {
          var handler = e.target.id;
          if (e.target.checked) {
              show = 'visible'
              map.setLayoutProperty(
                'crimes-events',
                'visibility',
                'visible')
          } else {
              show = 'none'
              map.setLayoutProperty(
                'crimes-events',
                'visibility',
                'none')
          }
          });

      //fly to buttons
      var flyBtns = document.getElementsByClassName('lq-map-btn');
      var counter;
      for (counter = 0; counter < flyBtns.length; counter++) {
        flyBtns[counter].addEventListener('click', function(e) {

          var lqLat,lqLong;

          //outline selected boroughs
          map.setFilter('walt-brom-outline', ['==', 'NAME', e.target.value]);

          switch(e.target.value) {
            case "Waltham Forest": lqLong=-0.0333; lqLat=51.598; break;
            case "Bromley": lqLong=0.0701; lqLat=51.3680; break;
          }

        map.flyTo({
          center: [lqLong,lqLat],
          zoom: 11,
          speed: 0.3,
          });
      });
    }

  });
