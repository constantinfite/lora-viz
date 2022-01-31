<template>
  <l-map
    :center="center"
    :zoom="zoom"
    class="map"
    ref="map"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
  >
    <l-tile-layer :url="url"> </l-tile-layer>
    <l-marker
      v-for="(marker, index) in points"
      :lat-lng="marker.coordinates"
      :key="index"
    >
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
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    //LIcon,
    //LPopup,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [43.963, 4.9206],
      zoom: 18,
      showParagraph: false,
      items: [],
      loaded: false,
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
      console.log(this.markers);
    },
    centerUpdated(center) {
      this.center = center;
    },
    innerClick() {
      alert("Click!");
    },
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },
    points() {
      var list = [];

      this.items.map((item) => {
        list.push({
          Date: new Date(item.date),
          coordinates: [item.latitude, item.longitude],
          rssi: item.rssi,
        });
      });
      return list;
    },
  },
  async created() {
    this.loaded = false;
    try {
      const response = await axios.get("api/SensorDataList/gps");
      this.items = response.data;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style>
.map {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>