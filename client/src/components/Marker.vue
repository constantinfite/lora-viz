<template>
  <l-marker :lat-lng="marker.coordinates">
    <l-popup>
      <div @click="innerClick">
        I am a popup
        <p v-show="showParagraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed
          pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi. Donec
          finibus semper metus id malesuada.
        </p>
      </div>
    </l-popup>
  </l-marker>
</template>

<script>
import { LMarker } from "vue2-leaflet";
export default {
  components: { LMarker },
  props: {
    marker: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>