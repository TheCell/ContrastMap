<template>
	<div id="app">
		<!--
		<h1>{{ msg }}</h1>
		<h2>Essential Links</h2>
		<div class="row">
			<div class="large-4 columns">content</div>
			<div class="large-8 columns">content</div>
		</div>
		-->


		<div id="map">
		</div>
	</div>
</template>

<script>
var mapStyleJson = "";

// set map style

</script>


<script>
import SnazzyInfoWindow from "snazzy-info-window";
export default {
	name: "app",
	mapStyleJson: "",

	data() {
		return {
			msg: "Welcome to Your Vue.js App"
		};
	},
	mounted: function()
	{
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
		contentfulClient.getEntries({
			content_type: "mapstyle"
		}).then(entry => {
			if (entry.items.length > -1)
			{
				this.mapStyleJson = entry.items[entry.items.length -1];
				// console.log(this.mapStyleJson.fields);
				this.mapStyleJson = this.mapStyleJson.fields;

				options.styles = this.mapStyleJson["mapstyle"];
				// console.log(options);
				this.map = new google.maps.Map(element, options);
				// console.log(this.map.getHeading());
			}
			else
			{
				console.warn("Keine Mapstyles im CMS");
				this.map = new google.maps.Map(element, options);
			}
		});

		// get and display all markers
	const cms_markers = [];
	contentfulClient.getEntries({
				content_type: "mapdata"
			}).then(entries =>
			{
				console.log("entries: ",entries);
				// fuer jeden Eintrag einen Marker und ein Infowindow erstellen
				entries.items.forEach((item, index) => {
					// wenn kein Icon definiert ist, den Default verwenden
					console.log("item: ",item);
					let icon = item.fields.markerImage ? item.fields.markerImage.fields.file : "";

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

					//create marker
					let marker = new google.maps.Marker(
						{
							position: { lat: item.fields.markerPosition.lat, lng: item.fields.markerPosition.lon },
							icon: icon,
							map: this.map
						});

					// create infowindow
					let cs = `<div>${item.fields.titel}</div>`;
					let cms_iw = new google.maps.InfoWindow({
								content: cs
					});

					// Infowindow oeffenen bei Click auf Marker
					marker.addListener('click', event => { cms_iw.open(this.map, marker)});
					cms_markers.push(marker);
				});
			});

	infoWindow: new SnazzyInfoWindow(
		{
			//marker: marker,
			content: 'Snazzy!'
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
