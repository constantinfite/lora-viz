<template lang="">
    <div class="home">
    <v-container>
      <v-row justify="center" class="mb-12">
        <v-col cols="8" align="center">
          <h1>Dashboard LoRaWAN</h1>
          <v-row justify="center" class="my-12">
            <v-btn
              x-large
              color="green darken-1"
              class="white--text"
              @click="Go_to_TempHum"
            >
              Temperature Humidity
            </v-btn>
          </v-row>
          <v-row justify="center">
            <v-btn color="indigo" class="white--text" x-large @click="Go_to_GPS">
              GPS
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
    name: "Home",
    methods: {
    Go_to_TempHum() {
      
      this.$router.push({
        name: "Temp_hum",
      });
    },
    Go_to_GPS() {
      
      this.$router.push({
        name: "GPS",
      });
    }
}
}

</script>