<template>
	<div id="app">
		<img src="./assets/logo.png">
		<h1>{{ msg }}</h1>
		<h2>Essential Links</h2>
		<div class="row">
			<div class="large-4 columns">content</div>
			<div class="large-8 columns">content</div>
		</div>

		<div id="map">
		</div>
	</div>
</template>

<script>
export default
{
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted: function()
  {
    const element = document.getElementById("map");
    const options = {
    	zoom: 14,
    	center: new google.maps.LatLng(47.071467, 8.277621)
    };
    this.map = new google.maps.Map(element, options);
  }
};
</script>

<style lang="scss">
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
</style>
