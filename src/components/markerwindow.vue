<template>
    <div class="markerWrapper">
        <div class="switchButton" onclick="switchText(this);">
            {{buttonText}}
        </div>
<!--        <div class="signWrapper" style="background-image: url();">{{signImage}}-->
        <div class="signWrapper" v-bind:style="{ backgroundImage: 'url(' + signImage + ')'}">
        </div>
        <div class="contentOuterWrap" v-bind:style="{ backgroundImage: 'url(' + markerBackground + ')' }">
            <div class="mittelDivInnerWrap">
                <h1 class="titleWrap">
                    {{titel}}
                </h1>
                <div class="textWrap">
                    <span class="textOld">
                        {{infoAlt}}
                    </span>
                    <span class="textNew">
                        {{infoNeu}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "markerwindow",
  data: function() {
    return {
      //greeting: "Hello"
    };
  },
  props: [
    "buttonText",
    "signImage",
    "markerBackground",
    "titel",
    "infoAlt",
    "infoNeu"
  ],
  mounted: function() {
    console.log(this.signImage);
  }
};
</script>