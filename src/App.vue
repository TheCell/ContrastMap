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
		
		<!--
		<h2>Essential Links</h2>
		<div class="row">
			<div class="large-4 columns">content</div>
			<div class="large-8 columns">content</div>
		</div>
		-->

		 <nav id="mainNavigation">
			<a href="">Mehr zum Projekt</a>
			<a href="">Digitales Weben</a>
			<a href="/home">home test</a>
			<a href="/markerwindow">markerwindow test</a>
		</nav> 

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
    const options = {
      zoom: 19,
      center: new google.maps.LatLng(47.07056757581144, 8.27907532453537),
      heading: 90,
      styles: this.mapStyleJson,
      scrollwheel: false,
      disableDefaultUI: true
    };

    window.mapThreadPoints = [];
    window.polyLines = [];

    let mouseOverFunction = function(event)
    {
      window.line = this;
      //console.log(event.latLng.lat());
      //console.log("mouseoverlistener",this);
      //window.line.setOptions({strokeWeight: 5});
      
      window.infoWindow = new google.maps.InfoWindow(
        {
          content: "testinhalt"
        }
      );

      /*
      let pointInHalf = window.line.getPath().getArray();
      pointInHalf[0].lat = (pointInHalf[0].lat + pointInHalf[1].lat) / 2
      pointInHalf[0].lng = (pointInHalf[0].lng + pointInHalf[1].lng) / 2
      */
      //pointInHalf = window.line.GetPointsAtDistance(window.line.length);
      var pointCoordinate = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());

      window.infoWindow.setPosition(pointCoordinate);
      window.infoWindow.open(window.map);

      /*
      window.infoWindow.setContent();
      window.infoWindow.setMap(window.map);
      */

      setTimeout( function() 
      {
        window.line.setOptions({strokeWeight: window.line.strokeWeight +1});
      }, 50);

      setTimeout( function() 
      {
        window.line.setOptions({strokeWeight: window.line.strokeWeight +1});
      }, 100);

      setTimeout( function() 
      {
        window.line.setOptions({strokeWeight: window.line.strokeWeight +1});
      }, 150);

      setTimeout( function() 
      {
        window.line.setOptions({strokeWeight: window.line.strokeWeight +1});
      }, 200);

      /*
      this.interval = setInterval( function()
      {
        console.log("interval",this.strokeWeight);
        window.line.setOptions({strokeWeight: this.strokeWeight +1});
        if (this.strokeWeight > 6)
        {
          clearInterval(this.interval);
        }
      }, 600);
      */
      /*
      console.log(this.strokeWeight);
      */
    };

    let mouseOutFunction = function(event)
    {
      window.line = this;

      setTimeout( function() 
      {
        window.line.setOptions({strokeWeight: window.line.strokeWeight -1, strokeOpacity: 0.8});
        //window.line.setOptions({strokeWeight: window.line.strokeWeight -1});
      }, 50);

      setTimeout( function() 
      {
        window.line.setOptions({strokeWeight: window.line.strokeWeight -1, strokeOpacity: 0.6});
        //window.line.setOptions({strokeWeight: window.line.strokeWeight -1});
      }, 100);

      setTimeout( function() 
      {
        window.line.setOptions({strokeWeight: window.line.strokeWeight -1, strokeOpacity: 0.4});
        //window.line.setOptions({strokeWeight: window.line.strokeWeight -1});
      }, 150);

      setTimeout( function() 
      {
        window.line.setOptions({strokeWeight: window.line.strokeWeight -1, strokeOpacity: 0.2});
        //window.line.setOptions({strokeWeight: window.line.strokeWeight -1});
        window.line.setVisible(false);
        window.infoWindow.close(window.map);        
      }, 200);
      
      //console.log(this);
      /*
      this.interval = setInterval( function()
      {
        window.line.setOptions({strokeWeight: this.strokeWeight -1});
        if (this.strokeWeight < 2)
        {
          clearInterval(this.interval);
        }
      }, 600);
      */
      //window.line.setOptions({strokeWeight: 1});
      /*
      console.log(this.strokeWeight);
      */
    };

    // set map style
    contentfulClient
      .getEntries({
        content_type: "mapstyle"
      })
      .then(entry => {
        if (entry.items.length > -1) {
          this.mapStyleJson = entry.items[entry.items.length - 1];
          // console.log(this.mapStyleJson.fields);
          this.mapStyleJson = this.mapStyleJson.fields;

          options.styles = this.mapStyleJson["mapstyle"];
          // console.log(options);
          this.map = new google.maps.Map(element, options);
          window.map = this.map;
          
          window.tempPoints = [];

          google.maps.event.addListener(window.map, "rightclick", function(event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            window.tempPoints.push({"lat": lat, "lng": lng});
            // populate yor box/field with lat, lng
            //console.log('{"Lat":' + lat + ',"Lng":' + lng + '},');
            console.log(JSON.stringify(window.tempPoints));

          });
          // console.log(this.map.getHeading());

        } else {
          console.warn("Keine Mapstyles im CMS");
          this.map = new google.maps.Map(element, options);
        }
      });

    contentfulClient
    .getEntries({
      content_type: "streetLines"
    })
    .then(entry => 
    {
      //console.log(entry);
      //console.log(entry.items[0].fields.streetEndCoordinatePairs);
      window.mapThreadPoints = entry.items[0].fields.streetEndCoordinatePairs;
      //console.log(mapThreadPoints);
      let point1 = {};
      let point2 = {};

      console.log(window.mapThreadPoints);
      console.log(window.map);

      window.mapThreadPoints.forEach(function(point, index)
      {
        if (index % 2 == 0)
        {
          point1 = new google.maps.LatLng(point);
        }
        else
        {
          point2 = new google.maps.LatLng(point);

          let poly = new google.maps.Polyline({
            path: [point1, point2],
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 1
          });

          window.polyLines.push(poly);
          google.maps.event.addListener(poly, 'mouseover', mouseOverFunction);
          google.maps.event.addListener(poly, 'mouseout', mouseOutFunction);
          poly.setMap(window.map);
          //console.log(poly);                
          //console.log(window.polyLines);                
        }
      });            
      
      /*
      const mapThreadPoints = [
      new google.maps.LatLng(47.0739332834699, 8.28320144433587),
      new google.maps.LatLng(47.0682447101286, 8.27144119042964)];
      */

      /*
      const poly = new google.maps.Polyline({
        path: mapThreadPoints,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 1
      });
      */

      /*
      const mapOverlay = new google.maps.OverlayView();
      mapOverlay.draw = function() {};
      mapOverlay.setMap(window.map);
      */
    });
    
    contentfulClient
      .getEntries({
        content_type: "kmlLayers"
      })
      .then(entries => {
        //console.log("allkmlEntries", entries);

        entries.items.forEach((item, index) => {
          let kmlurl = "";

          kmlurl = item.fields.kmlUrlAsJson
            ? item.fields.kmlUrlAsJson.url
            : kmlurl;
          kmlurl = decodeURIComponent(kmlurl);
          //console.log(kmlurl);
          //console.log("kmlentries:", item);
          //console.log("kmlentries:", item.fields.kmlUrlAsJson.url);
          let ctaLayer = new google.maps.KmlLayer({
            url: kmlurl,
            map: this.map
          });
          let ctaLayerTest = new google.maps.KmlLayer({
            url: "https://dev.thecell.eu/contrastmapdata/test.kml",
            map: this.map
          });

          console.log("layer added", ctaLayer);
        });
      });

    // set map image overlays
    contentfulClient
      .getEntries({
        content_type: "mapImageOverlays"
      })
      .then(entries => {
        entries.items.forEach((item, index) => {
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

    // get and display all markers
    const cms_markers = [];
    
    const markerBackground =
      "//images.contentful.com/ssruiqlv9y3c/U7gODS2A004gmsKogm2mS/668591e3cf123b2bab922144cb891c7e/InfoboxBackground.png";
    const signBackground =
      "//images.contentful.com/ssruiqlv9y3c/5iAPEKxUWIqWG0WiYgUgcw/337cba04110c36db523952e76b1ed78c/placeholderSign.png";

    contentfulClient
      .getEntries({
        content_type: "mapmarkerlook"
      })
      .then(entries => {
        entries.items.forEach((item, index) => {
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
      .getEntries({
        content_type: "mapdata"
      })
      .then(entries => {
        //console.log("entries: ",entries);
        // fuer jeden Eintrag einen Marker und ein Infowindow erstellen
        entries.items.forEach((item, index) => {
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
          let marker = new google.maps.Marker({
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
          let buttonText = item.fields.buttonText ? item.fields.buttonText : "";

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

          let content = `<div id="info-window${item.sys.id}"><markerwindow button-text="${buttonText}" sign-image="${signImage}" marker-background="${this.markerBackground}" titel="${titel}" info-alt="${infoAlt}" info-neu="${infoNeu}"></markerwindow></div>`;

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

          let infoWindow = new SnazzyInfoWindow({
            marker: marker,
            content: content,
            callbacks: {
              open: function(event) {
                console.log(this);
                new Vue().$mount(`#info-window${item.sys.id}`);
              }}
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
