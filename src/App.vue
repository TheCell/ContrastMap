<template>
	<div id="app">
		<h1 v-if="debugTrue">{{ msg }}</h1>
		<button v-on:click="increment" :disabled="buttonDisabled" v-if="debugTrue">Mein Button</button>
		<div v-if="debugTrue">{{buttonCounter}}</div>
    
    <!-- signImage="//images.contentful.com/ssruiqlv9y3c/U7gODS2A004gmsKogm2mS/668591e3cf123b2bab922144cb891c7e/InfoboxBackground.png" -->
    <markerwindow v-if="debugTrue" buttonText="Button test"
    signImage="//images.contentful.com/ssruiqlv9y3c/U7gODS2A004gmsKogm2mS/668591e3cf123b2bab922144cb891c7e/InfoboxBackground.png"
    markerBackground="//images.contentful.com/ssruiqlv9y3c/U7gODS2A004gmsKogm2mS/668591e3cf123b2bab922144cb891c7e/InfoboxBackground.png"
    titel="marker titel"
    infoAlt="test info alt"
    infoNeu="test info neu"></markerwindow>
		
		<nav id="mainNavigation">
      <!--
			<a href="javascript:void(0)" id="toEndScreenBtn">Endscreen Einblenden</a>
			<a href="">Mehr zum Projekt</a>
			<a href="">Digitales Weben</a>
			<a href="/home">home test</a>
			<a href="/markerwindow">markerwindow test</a>
      -->
		</nav>

    <div id="lineLegendBgBlur">
    </div>

    <div id="lineLegend">
      <h3 class="streetLineColor">Strassen</h3>
      <h3 class="buildingLineColor">Gebäude</h3>
      <h3 class="companyLineColor">Unternehmen</h3>
    </div>

    <introwindow></introwindow>

    <outrowindow></outrowindow>

		<my-comp v-if="debugTrue" character="wild"></my-comp>

		<ul v-if="debugTrue">
			<li v-for="item in items">
				{{item.ort + ' ' + item.kanton}}
			</li>
		</ul>

		<div id="map">
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import SnazzyInfoWindow from "snazzy-info-window";

export default {
  name: "app",
  mapStyleJson: "",

  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      buttonDisabled: false,
      items: [
        { ort: "Emmenbrücke", kanton: "LU" },
        { ort: "Oberems", kanton: "VS" },
        { ort: "Rotkreuz", kanton: "ZG" }
      ],
      debugTrue: false,
      buttonCounter: 0
    };
  },
  methods: {
    increment: function(event) {
      this.buttonCounter++;
    }
  },
  mounted: function() {
    const element = document.getElementById("map");
    /*
    const options = {
      zoom: 19,
      center: new google.maps.LatLng(47.07056757581144, 8.27907532453537),
      heading: 90,
      styles: this.mapStyleJson,
      scrollwheel: false,
      disableDefaultUI: true,
      draggableCursor: "crosshair"
    };
    */
    const options = {
      zoom: 19,
      center: new google.maps.LatLng(47.07056757581144, 8.27907532453537),
      heading: 90,
      styles: this.mapStyleJson,
      scrollwheel: false,
      disableDefaultUI: true,
      draggableCursor: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAMCAYAAAADFL+5AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3AAAANwBohRA4wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGCSURBVDiNvZQ/SytBFMXP7G52k8zM7sPGJhBWEPwCgmAp2NpYpRCLV9qIf/Hb+IlS7ZK4JEWadCHZYv5md1/zCEk0EsV4YKozDL87955L0jR9nU6nVwDgui4opWCMgTEGQgh2LQ9A0mw237TWh0VRkDzPkec5HMdZgXEcZycAixKTJPE9z/urtb4RQhyVZbnwCCGo1+vgnINzDs/ztnp8MplgNBohjmNEUfQ5wLKyLAuttQ/W2o6UMl6GAYAgCMAYQxiG8H1/I8BwOMR4PEa73Uar1doeYFndbvdPEAR31tqOEOKgqqoV3/d9cM5BKUWj0VjxyrLEbDZDFEUbW/ilKUuSZI8QcmuMuRZCvCupVquBUro42wzxt8c8TdN2VVUvxpgLpdT++s9sm6gfyVmv14uLonjeBEMIAaV00SrXdX8WYFmDweBQKXWvtb5USu2t++uJ2umm6ff7x/P5/EVKeWaM4R/d2f2q+68sy06UUo/GmDOtdfjrAGsw51LKJ2PM6T/my6goOGMl0gAAAABJRU5ErkJggg=='), auto"
    };
    // get and display all markers
    const cms_markers = [];
    let buildingLinePoints = [];
    let companyLinePoints = [];
    let conceptRed = "#f22b29";
    let conceptDarkGray = "#565656";
    let conceptGray = "#cacfd6";
    let conceptBlack = "#000000";
    let conceptWhite = "#ffffff";
    let threadDelay = 20000;
    /*
    let conceptStreetColor = "#355199";
    let conceptBuildingColor = "#150aac";
    let conceptCompanyColor = "#005d69";
    */
    let conceptStreetColor = "#f22b29";
    let conceptBuildingColor = "#f22b29";
    let conceptCompanyColor = "#f22b29";

    const markerBackground =
      "//images.contentful.com/ssruiqlv9y3c/U7gODS2A004gmsKogm2mS/668591e3cf123b2bab922144cb891c7e/InfoboxBackground.png";
    const signBackground =
      "//images.contentful.com/ssruiqlv9y3c/5iAPEKxUWIqWG0WiYgUgcw/337cba04110c36db523952e76b1ed78c/placeholderSign.png";

    window.mapThreadPoints = [];
    window.polyLines = [];
    window.infoWindows = [];

    let createInfoWindow = function(windowContent)
    {
      /*
      let tempInfoWindow = new google.maps.InfoWindow(
      {
        content: "<div class='infoWindowContent'>" + windowContent + "</div>"
      });

      window.infoWindows.push(tempInfoWindow);
      */

      /*
      let content = `<div id="info-window${item.sys
                .id}"><markerwindow button-text="${buttonText}" sign-image="${signImage}" marker-background="${this
                .markerBackground}" titel="${titel}" info-alt="${infoAlt}" info-neu="${infoNeu}"></markerwindow></div>`;
      */

      /*
      let tempInfoWindow = new SnazzyInfoWindow(
      {
        marker: marker,
        content: content,
        callbacks: {
          open: function(event) {
            console.log(this);
            new Vue().$mount(`#info-window${item.sys.id}`);
          }
        }
      });
      */
      
      let content = '<div class="linenamesWindow">' + windowContent + '</div>';
      let tempInfoWindow = new SnazzyInfoWindow(
      {
        map: window.map,
        content: content
      });
      
      window.infoWindows.push(tempInfoWindow);
      
      return window.infoWindows[window.infoWindows.length - 1];
    };

    let mouseOverFunction = function(event)
    {
      let polyline = this;

      let pointCoordinate = new google.maps.LatLng(
        event.latLng.lat(),
        event.latLng.lng()
      );

      //let infoWin = createInfoWindow(pointCoordinate, "Fadenstrasse");

      //infoWin.open(window.map);
      //console.log(event);
      //console.log(polyline.infoWin);

      /*
      polyline.infoWin.setPosition(
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      });
      
      polyline.infoWin.open(window.map);
      */

      polyline.infoWin.setPosition(event.latLng);
      polyline.infoWin.open();

      setTimeout(function()
      {
        polyline.setOptions({ strokeWeight: polyline.strokeWeight + 1 });
      }, 50);

      setTimeout(function()
      {
        polyline.setOptions({ strokeWeight: polyline.strokeWeight + 1 });
      }, 100);

      setTimeout(function()
      {
        polyline.setOptions({ strokeWeight: polyline.strokeWeight + 1 });
      }, 150);

      setTimeout(function()
      {
        polyline.setOptions({ strokeWeight: polyline.strokeWeight + 1 });
      }, 200);
    };

    let mouseOutFunction = function(event)
    {
      let polyline = this;
      checkLinesCleared();

      setTimeout(function()
      {
        polyline.setOptions(
        {
          strokeWeight: polyline.strokeWeight - 1,
          strokeOpacity: 0.8
        });
        //polyline.setOptions({strokeWeight: polyline.strokeWeight -1});
      }, 50);

      setTimeout(function()
      {
        polyline.setOptions(
        {
          strokeWeight: polyline.strokeWeight - 1,
          strokeOpacity: 0.6
        });
        //polyline.setOptions({strokeWeight: polyline.strokeWeight -1});
      }, 100);

      setTimeout(function()
      {
        polyline.setOptions(
        {
          strokeWeight: polyline.strokeWeight - 1,
          strokeOpacity: 0.4
        });
        //polyline.setOptions({strokeWeight: polyline.strokeWeight -1});
      }, 150);

      setTimeout(function()
      {
        polyline.setOptions(
        {
          strokeWeight: polyline.strokeWeight - 1,
          strokeOpacity: 0.2
        });
        //polyline.setOptions({strokeWeight: polyline.strokeWeight -1});
        polyline.setVisible(false);
        //window.infoWindow.close(window.map);
        // because else there are windows staying open
        /*
        window.infoWindows.forEach(function(ele)
        {
          ele.close(window.map);
        });
        */
        polyline.infoWin.close(window.map);
      }, 200);
    };

    let checkLinesCleared = function()
    {
      let amountUncleared = 0;

      window.polyLines.forEach( function (ele)
      {
        if (ele.visible)
        {
          amountUncleared++;
        }
      });

      if (amountUncleared < 3)
      {
        startEndscreen();
      }
    }

    let startEndscreen = function()
    {
      $(".outroWindow").show();
      $(".outroWindow")
      .animate({top: '0'}, 800, function()
      {
          //callback
      });

      clearInterval(window.mouseMoveTimer);
    }

    if (document.getElementById("toEndScreenBtn"))
    {
      document.getElementById("toEndScreenBtn").addEventListener("click", startEndscreen);
    }

    // set map style
    contentfulClient
      .getEntries(
      {
        content_type: "mapstyle"
      })
      .then(entry =>
      {
        if (entry.items.length > -1)
        {
          this.mapStyleJson = entry.items[entry.items.length - 1];
          this.mapStyleJson = this.mapStyleJson.fields;

          options.styles = this.mapStyleJson["mapstyle"];
          //options.draggableCursor = " url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAZCAYAAACB6CjhAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABuAAAAbgBl1XCjwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAK0SURBVFiF5Za9b9NAGIff8/kjie/SKEsWJCQqJFDFiIW6QQckBrowIQamMsAAAokPVRUjfwB/V9vl0jRVp6pLlrZSZN977tlMto5CqpzzQROeKTnlzq8f5339IwAAvV7v89nZ2Y88z6GAEAJhGALnHBhj4DgOLCOk2+2+vbi4+Gne/FUcx4FGowFhGAJjDFzXnWOJs8XVWj/xPE8qpWqjfpRlGQyHQxgOhzAYDEoRjDGglM6z3qlDig9CiE2t9QdEXE/T1BtrMyFQq9WAcw7NZnMhZZCrC3meu/1+fwsRt6SUDy4vL8dqflMG53wubZKmKQwGA3AcBzqdTqU59YcAEyGETwh5n6bpmziO71w3J65Sr9dnKkNrDfv7+yClBACAVqsFa2tr1udcK8BECNEmhGwj4kspZcdGRhAEwBiDZrMJvu9bF/k3zs/PQQjx21oUReB5Y3VvydgCTI6Pj+9KKXeklM8RsWmz1/d94JzDysqKdbEmSZLA7u5u+Z1SClEUWbdBJQEmBwcH61rr7SRJNtI0tXq8hYyq/4zT01M4OTkBSimsrq5Cu922PmNiASZCiM0sy77EcRxpra0exaQyqjJVAQXGm+RdHMf3siyzuk4hg3MOQRDMosSSmQgw2dvbawVB8FEp9TqO41u2+33fLyN5vV6fen0zF2DS7XZv53n+DRFfSCmtG9bzPGCMTVXGXAWYHB4ePlRKfUXEp0qphu3+acn4ZwJMqsRwk0lk3AgBJr1e75VS6pNNDDdxXRcYYxCGIYRhCIRcf4s3TkDBJDG8gFJaDtBRMm6sAJNJYnjBKBkLIcCk3+/fR8TvSqlniMiqnEEpLWfGwgkwKWK4lHJDKVUpPi60AJMihidJEtkMz6URUGAbw5dOgMk4MXypBZiMiuH/jQCTo6OjR4i4kyTJ41+bLV38HqtpVAAAAABJRU5ErkJggg=='), auto";
          //options.draggableCursor = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAABACAYAAACHm15kAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAC6AAAAugBEs4z6AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAPBSURBVGiBzZjPbutEFId/Z86ZSZOoL5A0qcJT3JcBxF+JFVe6Yol4B3ZsWMAbUFZs74oViCWVElXdFImiC6LYyYxnWLRj+bZNm9hjO9+yqexP4/M759hYLpd/X1xcfBNCMDhQ6Pz8PIQQoJSyIvJjCOHDxWLxpm+xKqVk+QciLyKvjTHvTqfTyx7dSh5Ilj8QBa31z8z83mw2O+/BrURt+yGEQJvN5kWe57+vVqtfr66uXnQpVmXrST74RyKIyNIY83I6nZ514Fay9STvE0KAtfadm5ubH5bL5dXl5eUnbYpV2fkkH0NE/hGRr2ez2VdE5BO7ldBqtXLWWm5yEWbOjDHfnpycvCKidSq5CF1fX//rnBuv12vked7oYkopJyJnzPzxbDb7K5HjrSSAMXBbd1mWIc9z1C2BO1nPzK8Hg8H7k8nkIqlkJISA9XqNLMvgff1SI6IgIr8ZYz6YTqe/JJWsylprkWUZnHO1ZQFAa71k5s/m8/lPSSWrWGuR5zk2m00tyYiI/MHMX5yenn6fXDLinEOWZbDWNqrb2L7m8/mXySUjRVEgdoQUsk/12tqSkVQhY+ZcRL7z3n++WCze6oWNJauym80GWZahKIra1yEip7U+M8Z8OplM/kwqWSVFyGKvZeaPWpGMxJA1lZWETg8QERwfH6MoCuR5XmvshhBUq5IRZsZ4PMZwOCw7wj4h60QyopTCcDjE0dHRXiHrVDJCRBgMBhgMBqXsU2O3F8kqxhgYY57sCL1LRrTW0FrDe1+uixFxzingNomHgFIK4/EYo9EIWZZhvV4HEREP3M5i7z2YGUrt/H7WGkSE0WiE0Wj0X2nDzNBalztkk9GWmgfPmJnBzAghlKLMjd7TGrP1uRJR+eittY038yY8mxYiKsvAOYcQArTWXbiV7Bzpu88sAFCWARF1ErJad4h1C6CTkDU6BqUUtNYgolZlk3RwpRSUUq11hKQFVe0IzjlYa5Nct5VZWA1Z7AgiAiKqdb3WB3aKjtDZkG7SETpffWLIvPew1r5VGtvobT+rdoQ4cpn50brtfYncJWS9S1a5LxvbmSqKov8N9x4iUl1qlCilwqHsjfe58/GKiEIbUyIlZU2mnhIpeTQ4fe2N23jyzl3vjdvYqQXVmRIp2etO+0yJlNQ6jq5D1viZbZsSKUlWWFHWe5/8FSJ59cdTTBmy1iKaMmSt95H7HxVi3e4j2+mqFmt035D1sk9WT3aXkPW69Eax5z4qHMTC+9xnxoN6fah+ZowhE5HDkozEkwUA55z6H6lLTmkrYUJfAAAAAElFTkSuQmCC'), auto";
          
          //options.draggableCursor = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAUCAYAAABWMrcvAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA6QAAAOkBVJIUSwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEkSURBVDiNjZAxcoMwEEX/ihXyGWDM6ZzeR8g1co6kzgXSpWXMDGUKUmWwQLPaNBHBNmD/TtK+/fofTdP8tG37oqo5HhTVda2qCmNMYOa3LMsO+/3+exM6nU5RRChdGGOitfbdWnsoiqJdhLquC+M4svceIYT/ByJl5s8sy56qqvq4gQAwAIgI+r5HCAGqOg1Za5s8z49lWb7eQEkiAu89hmG4gJn5i5mfF6EkVcUwDDifz4gxpm8vD89yYbfbwTmHcRzhvYeIgFUVf5Vvws45OOcQQhAmIhARYowgomloTdZandYbY6bhGONFAde6yZScUxFLzutBZsPXzptQAlNJCeb5hq0C5t8288O9ApKmIh4pIGkx09xZRNadtjJc577b3tKCXxQcpMx0wAFAAAAAAElFTkSuQmCC'), auto";
          //options.draggableCursor = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAMCAYAAAADFL+5AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3AAAANwBohRA4wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGCSURBVDiNvZQ/SytBFMXP7G52k8zM7sPGJhBWEPwCgmAp2NpYpRCLV9qIf/Hb+IlS7ZK4JEWadCHZYv5md1/zCEk0EsV4YKozDL87955L0jR9nU6nVwDgui4opWCMgTEGQgh2LQ9A0mw237TWh0VRkDzPkec5HMdZgXEcZycAixKTJPE9z/urtb4RQhyVZbnwCCGo1+vgnINzDs/ztnp8MplgNBohjmNEUfQ5wLKyLAuttQ/W2o6UMl6GAYAgCMAYQxiG8H1/I8BwOMR4PEa73Uar1doeYFndbvdPEAR31tqOEOKgqqoV3/d9cM5BKUWj0VjxyrLEbDZDFEUbW/ilKUuSZI8QcmuMuRZCvCupVquBUro42wzxt8c8TdN2VVUvxpgLpdT++s9sm6gfyVmv14uLonjeBEMIAaV00SrXdX8WYFmDweBQKXWvtb5USu2t++uJ2umm6ff7x/P5/EVKeWaM4R/d2f2q+68sy06UUo/GmDOtdfjrAGsw51LKJ2PM6T/my6goOGMl0gAAAABJRU5ErkJggg=='), auto";
          
          this.map = new google.maps.Map(element, options);
          window.map = this.map;

          window.tempPoints = [];

          google.maps.event.addListener(window.map, "rightclick", function(event)
          {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            window.tempPoints.push({ lat: lat, lng: lng });
            console.log(JSON.stringify(window.tempPoints));
          });
        }
        else
        {
          console.warn("Keine Mapstyles im CMS");
          this.map = new google.maps.Map(element, options);
        }
      })
      .then(something =>
      {
        contentfulClient
          .getEntries(
          {
            content_type: "streetLines"
          })
          .then(entry =>
          {
            entry.items.forEach(function(item)
            {
              window.mapThreadPoints = item.fields.streetEndCoordinatePairs;
              let point1 = {};
              let point2 = {};
              let nameCounter = 0;

              window.mapThreadPoints.forEach(function(point, index)
              {
                if (index % 2 == 0)
                {
                  point1 = new google.maps.LatLng(point);
                }
                else
                {
                  point2 = new google.maps.LatLng(point);

                  /*
                  let poly = new google.maps.Polyline(
                  {
                    path: [point1, point2],
                    strokeColor: conceptStreetColor,
                    strokeOpacity: 1.0,
                    strokeWeight: 4
                  });
                  */
                  // add points to start and end of lines
                  let iconsequ = [];
                  let testObj = {
                    "path": "M -2,0 C -1.947018,-2.2209709 1.9520943,-2.1262691 2,0.00422057 2.0378955,1.3546185 1.5682108,2.0631345 1.4372396e-8,2.0560929 -1.7155482,2.0446854 -1.9145886,1.0142836 -2,0.06735507 Z",
                    "fillColor": "#ff0024",
                    "fillOpacity": 0.8,
                    "strokeColor": "#ff0024",
                    "strokeWeight": 1,
                    "scale": 1
                  };

                  iconsequ.push(
                  {
                    icon: testObj,
                    offset: "0%",
                    repeat: "0"
                  });
                  
                  iconsequ.push(
                  {
                    icon: testObj,
                    offset: "100%",
                    repeat: "0"
                  });

                  // create polyline between points, add start and end point
                  let poly = new google.maps.Polyline(
                  {
                    path: [point1, point2],
                    strokeColor: conceptBuildingColor,
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    icons: iconsequ
                  });

                  // check contentful for streetnames, else set default name
                  poly.infoWin = item.fields.streetNames[nameCounter] ? createInfoWindow(item.fields.streetNames[nameCounter]) : createInfoWindow("-");
                  nameCounter++;

                  window.polyLines.push(poly);
                  google.maps.event.addListener(
                    poly,
                    "mouseover",
                    mouseOverFunction
                  );
                  google.maps.event.addListener(
                    poly,
                    "mouseout",
                    mouseOutFunction
                  );
                  setTimeout(function ()
                  {
                    poly.setMap(window.map);
                  }, Math.random() * 10000);
                  //poly.setMap(window.map);
                }
              });
            });
          });

        contentfulClient
          .getEntries(
          {
            content_type: "kmlLayers"
          })
          .then(entries =>
          {
            //console.log("allkmlEntries", entries);

            entries.items.forEach((item, index) =>
            {
              let kmlurl = "";

              kmlurl = item.fields.kmlUrlAsJson
                ? item.fields.kmlUrlAsJson.url
                : kmlurl;
              kmlurl = decodeURIComponent(kmlurl);
              //console.log(kmlurl);
              //console.log("kmlentries:", item);
              //console.log("kmlentries:", item.fields.kmlUrlAsJson.url);
              let ctaLayer = new google.maps.KmlLayer(
              {
                url: kmlurl,
                map: this.map
              });
              let ctaLayerTest = new google.maps.KmlLayer(
              {
                url: "https://dev.thecell.eu/contrastmapdata/test.kml",
                map: this.map
              });

              console.log("layer added", ctaLayer);
            });
          });

        contentfulClient
          .getEntries(
          {
            content_type: "mapImageOverlays"
          })
          .then(entries =>
          {
            entries.items.forEach((item, index) =>
            {
              let overlayImage = item.fields.overlayImage
                ? item.fields.overlayImage.fields.file.url
                : "";
              console.log(item.fields.overlayImage);
              let TopRightPos = item.fields.topRightPoint;
              let BottomLeftPos = item.fields.bottomLeftPoint;

              //console.log(TopRightPos);

              let imageBounds = {
                north: TopRightPos.lat,
                south: BottomLeftPos.lat,
                east: TopRightPos.lon,
                west: BottomLeftPos.lon
              };

              let historicalOverlay = new google.maps.GroundOverlay(
                overlayImage,
                imageBounds
              );
              historicalOverlay.setMap(this.map);
            });
          });

        contentfulClient
          .getEntries(
          {
            content_type: "mapmarkerlook"
          })
          .then(entries =>
          {
            entries.items.forEach((item, index) =>
            {
              this.markerBackground = item.fields.markerBackground
                ? item.fields.markerBackground.fields.file.url
                : this.markerBackground;
              this.signBackground = item.fields.signBackground
                ? item.fields.signBackground.fields.file.url
                : this.signBackground;
              //console.log("got: ", item.fields.markerBackground.fields.file.url);
              //console.log("wrote into obj: " , this.markerBackground);
            });
          });

        contentfulClient
          .getEntries(
          {
            content_type: "mapdata"
          })
          .then(entries =>
          {
            //console.log("entries: ",entries);
            // fuer jeden Eintrag einen Marker und ein Infowindow erstellen
            entries.items.forEach((item, index) =>
            {
              // wenn kein Icon definiert ist, den Default verwenden
              //console.log("item: ",item);
              let icon = item.fields.markerImage
                ? item.fields.markerImage.fields.file
                : "";
              //console.log("icon: ",icon);

              /*
                if (icon != "")
                {
                  //console.log("icon: ",icon);

                  if (icon.url.charAt(0) == "/")
                  {
                    icon.url = icon.url.substring(2, icon.length);
                  }
                  icon.url = "https://" + icon.url;
                  
                  // console.log("icon: ",icon.url);
                  //icon.size = new google.maps.Size(20, 32)
                }
                */

              //create marker
              //console.log("lat: " + item.fields.markerPosition.lat + " lang: " + item.fields.markerPosition.lon);
              let marker = new google.maps.Marker(
              {
                position: {
                  lat: item.fields.markerPosition.lat,
                  lng: item.fields.markerPosition.lon
                },
                icon: icon,
                map: this.map
              });

              let signImage = item.fields.signImage
                ? item.fields.signImage.fields.file.url
                : this.signBackground;
              let infoNeu = item.fields.infoNeu ? item.fields.infoNeu : "";
              let infoAlt = item.fields.infoAlt ? item.fields.infoAlt : "";
              let titel = item.fields.titel ? item.fields.titel : "";
              let buttonText = item.fields.buttonText
                ? item.fields.buttonText
                : "";

              // '<div class="switchButton" v-on:click="switchText">' +
              let contentOld =
                '<div class="markerWrapper">' +
                '<div class="switchButton" onclick="switchText(this);">' +
                buttonText +
                "</div>" +
                '<div class="signWrapper" style="background-image: url(' +
                signImage +
                ')">' +
                "</div>" +
                '<div class="contentOuterWrap" style="background-image: url(' +
                this.markerBackground +
                ');">' +
                '<div class="mittelDivInnerWrap">' +
                '<h1 class="titleWrap">' +
                titel +
                "</h1>" +
                '<div class="textWrap">' +
                '<span class="textOld">' +
                infoAlt +
                "</span>" +
                '<span class="textNew">' +
                infoNeu +
                "</span>" +
                "</div>";
              "</div>" + "</div>" + "</div>";

              let content = `<div id="info-window${item.sys
                .id}"><markerwindow button-text="${buttonText}" sign-image="${signImage}" marker-background="${this
                .markerBackground}" titel="${titel}" info-alt="${infoAlt}" info-neu="${infoNeu}"></markerwindow></div>`;

              // '<div class="signWrapper" style="background-image: url(' + item.fields.markerImage.file.url + ');">' +
              /*
              if (item.fields.signImage)
              {
                console.log("signImage:",item.fields.signImage.fields.file.url);
              }
              */

              /*
              // todo
              let snazzyContent = `<div id="info-window${item.sys.id}"><info-window title="Mein Titel" 
                      content="Mein Content" image="${item.fields.portrait.fields
                        .file.url}" >
                      </info-window></div>`;

                let snazzyWindow = new SnazzyInfoWindow({
                  marker: markers[index],
                  content: snazzyContent,
                  callbacks: {
                    open: function(event) {
                      console.log(this);
                      new Vue().$mount(`#info-window${item.sys.id}`);
                    }
                  }
                });
                snazzyWindow.open();
              });
              */

              let infoWindow = new SnazzyInfoWindow(
              {
                marker: marker,
                content: content,
                callbacks: {
                  open: function(event) {
                    console.log(this);
                    new Vue().$mount(`#info-window${item.sys.id}`);
                  }
                }
              });

              //infoWindow.open();
              /*
              // create infowindow
              let cs = `<div>${item.fields.titel}</div>`;
              let cms_iw = new google.maps.InfoWindow({
                    content: cs
              });

              // Infowindow oeffenen bei Click auf Marker
              marker.addListener('click', event => { cms_iw.open(this.map, marker)});
              */

              cms_markers.push(marker);
              //console.log("added marker");
            });
          });

        contentfulClient
          .getEntries(
          {
            content_type: "buildingLines"
          })
          .then(entry =>
          {
            entry.items.forEach(function(item)
            {
              buildingLinePoints = buildingLinePoints.concat(
                item.fields.buildingPointCoord
              );
            });

            let isFirstEntry = true;
            buildingLinePoints.forEach(function(point, index)
            {
              let point1 = {};
              let point2 = {};

              if (isFirstEntry)
              {
                point1 = new google.maps.LatLng(point);
                isFirstEntry = false;
              }
              else
              {
                point1 = new google.maps.LatLng(buildingLinePoints[index -1]);
                point2 = new google.maps.LatLng(point);

                // add points to start and end of lines
                let iconsequ = [];
                let testObj = {
                  "path": "M -2,0 C -1.947018,-2.2209709 1.9520943,-2.1262691 2,0.00422057 2.0378955,1.3546185 1.5682108,2.0631345 1.4372396e-8,2.0560929 -1.7155482,2.0446854 -1.9145886,1.0142836 -2,0.06735507 Z",
                  "fillColor": "#ff0024",
                  "fillOpacity": 0.8,
                  "strokeColor": "#ff0024",
                  "strokeWeight": 1,
                  "scale": 1
                };

                iconsequ.push(
                {
                  icon: testObj,
                  offset: "0%",
                  repeat: "0"
                });
                
                iconsequ.push(
                {
                  icon: testObj,
                  offset: "100%",
                  repeat: "0"
                });

                // create polyline between points, add start and end point
                let poly = new google.maps.Polyline(
                {
                  path: [point1, point2],
                  strokeColor: conceptBuildingColor,
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                  icons: iconsequ
                });

                poly.infoWin = createInfoWindow("Fadenstrasse");

                window.polyLines.push(poly);
                google.maps.event.addListener(
                  poly,
                  "mouseover",
                  mouseOverFunction
                );
                google.maps.event.addListener(
                  poly,
                  "mouseout",
                  mouseOutFunction
                );

                setTimeout(function ()
                {
                  poly.setMap(window.map);
                }, Math.random() * threadDelay);
                //poly.setMap(window.map);
              }
              
            });

            window.buildingLinePoints = buildingLinePoints;
            
            /*
            // combine every building line with every other
            entry.items.forEach(function(item)
            {
              console.log(item.fields.buildingPointCoord);
              buildingLinePoints = buildingLinePoints.concat(
                item.fields.buildingPointCoord
              );
            });

            buildingLinePoints.forEach(function(point, index)
            {
              let tempArr = [];
              let point1 = {};
              let point2 = {};

              tempArr = buildingLinePoints.slice(index + 1);

              tempArr.forEach(function(tempArrPoint)
              {
                point1 = new google.maps.LatLng(point);
                point2 = new google.maps.LatLng(tempArrPoint);

                let poly = new google.maps.Polyline(
                {
                  path: [point1, point2],
                  strokeColor: conceptBuildingColor,
                  strokeOpacity: 1.0,
                  strokeWeight: 5
                });

                poly.infoWin = createInfoWindow("Fadenstrasse");

                window.polyLines.push(poly);
                google.maps.event.addListener(
                  poly,
                  "mouseover",
                  mouseOverFunction
                );
                google.maps.event.addListener(
                  poly,
                  "mouseout",
                  mouseOutFunction
                );
                poly.setMap(window.map);
              });
            });

            window.buildingLinePoints = buildingLinePoints;

            */
          });

        contentfulClient
          .getEntries(
          {
            content_type: "companyLines"
          })
          .then(entry =>
          {
            entry.items.forEach(function(item)
            {
              console.log(item.fields.companyPointCoordinates);
              companyLinePoints = companyLinePoints.concat(
                item.fields.companyPointCoordinates
              );
            });

            companyLinePoints.forEach(function(point, index)
            {
              let tempArr = [];
              let point1 = {};
              let point2 = {};

              tempArr = companyLinePoints.slice(index + 1);

              tempArr.forEach(function(tempArrPoint)
              {
                point1 = new google.maps.LatLng(point);
                point2 = new google.maps.LatLng(tempArrPoint);

                /*
                let poly = new google.maps.Polyline(
                {
                  path: [point1, point2],
                  strokeColor: conceptCompanyColor,
                  strokeOpacity: 1.0,
                  strokeWeight: 4
                });
                */
                // add points to start and end of lines
                let iconsequ = [];
                let testObj = {
                  "path": "M -2,0 C -1.947018,-2.2209709 1.9520943,-2.1262691 2,0.00422057 2.0378955,1.3546185 1.5682108,2.0631345 1.4372396e-8,2.0560929 -1.7155482,2.0446854 -1.9145886,1.0142836 -2,0.06735507 Z",
                  "fillColor": "#ff0024",
                  "fillOpacity": 0.8,
                  "strokeColor": "#ff0024",
                  "strokeWeight": 1,
                  "scale": 1
                };

                iconsequ.push(
                {
                  icon: testObj,
                  offset: "0%",
                  repeat: "0"
                });
                
                iconsequ.push(
                {
                  icon: testObj,
                  offset: "100%",
                  repeat: "0"
                });

                // create polyline between points, add start and end point
                let poly = new google.maps.Polyline(
                {
                  path: [point1, point2],
                  strokeColor: conceptBuildingColor,
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                  icons: iconsequ
                });

                poly.infoWin = createInfoWindow("Ast beschriftet");

                window.polyLines.push(poly);
                google.maps.event.addListener(
                  poly,
                  "mouseover",
                  mouseOverFunction
                );
                google.maps.event.addListener(
                  poly,
                  "mouseout",
                  mouseOutFunction
                );
                setTimeout(function ()
                {
                  poly.setMap(window.map);
                }, Math.random() * threadDelay);
                //poly.setMap(window.map);
              });
            });

            window.companyLinePoints = companyLinePoints;
          });
      });
  }
};
</script>


<style lang="scss">
/*
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

h1,
h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}
*/
</style>
