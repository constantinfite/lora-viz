<template>
  <v-container>
    <Map />
  </v-container>
</template>

<script>
import axios from "axios";

import Map from "../components/Map.vue";

export default {
  name: "GPS",
  components: {
    Map,
  },
  data() {
    return {
      items: [],
      loaded: false,
    };
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