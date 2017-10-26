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
      debugTrue: true,
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
      zoom: 17,
      center: new google.maps.LatLng(47.071467, 8.277621),
      heading: 90,
      styles: this.mapStyleJson,
      scrollwheel: false,
      disableDefaultUI: true
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
          // console.log(this.map.getHeading());
        } else {
          console.warn("Keine Mapstyles im CMS");
          this.map = new google.maps.Map(element, options);
        }
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

          let content = `<div id="info-window${item.sys.id}"><markerwindow button-text="${buttonText}" sign-image="//images.contentful.com/ssruiqlv9y3c/U7gODS2A004gmsKogm2mS/668591e3cf123b2bab922144cb891c7e/InfoboxBackground.png" marker-background="//images.contentful.com/ssruiqlv9y3c/U7gODS2A004gmsKogm2mS/668591e3cf123b2bab922144cb891c7e/InfoboxBackground.png" titel="marker titel" info-alt="test info alt" info-neu="test info neu"></markerwindow></div>`;

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
