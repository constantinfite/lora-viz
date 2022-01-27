<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="8" sm="10" md="8" col="8" align="center">
        <v-row justify="center"
          ><v-switch v-model="switch1" inset label="Live Data"></v-switch
        ></v-row>

        <v-row v-if="switch1">
          <v-col align="center" xs="12" sm="12" md="12" col="12">
            <v-card
              class="mx-auto mb-2"
              max-width="344"
              outlined
              color="#41B783"
              dark
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title
                    class="headline mb-1 bold font-weight-medium"
                  >
                    {{ lastTime }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar tile size="50" color="#41B783">
                  <v-icon size="50">
                    mdi-clock-time-four-outline
                  </v-icon></v-list-item-avatar
                >
              </v-list-item>
            </v-card>

            <v-card
              v-for="(measure, index) in data.listSeries"
              :key="index"
              class="mx-auto mb-2"
              max-width="344"
              outlined
              color="#2f3450"
              dark
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-2">{{ measureName[index] }}</div>
                  <v-list-item-title
                    class="display-1 mb-1 bold font-weight-medium"
                  >
                    {{ measure[0].data[measure[0].data.length - 1].y }}
                    <span class="headline"> {{ unit[index] }}</span>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar tile size="80" color="#2f3450">
                  <v-icon size="50">{{
                    icon[index]
                  }}</v-icon></v-list-item-avatar
                >
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-if="!switch1">
          <v-col align="center">
            <!--
            <v-date-picker v-model="dates" range></v-date-picker> -->

            <apexchart
              v-for="(series, index) in data.listSeries"
              :key="index"
              width="500"
              type="line"
              :options="chartOptionList[index]"
              :series="series"
            >
            </apexchart> </v-col
        ></v-row>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
//import moment from 'moment'
// @ is an alias to /src
//import LineChart from "../components/Chart.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      loaded: false,
      icon: [
        "mdi-thermometer",
        "mdi-water-percent",
        "mdi-battery-medium",
        "mdi-signal-cellular-3",
      ],
      items: [],
      unit: ["°C", "%", "V", "dBm"],
      switch1: true,
      measureName: ["Temperature", "Humidity", "Volt", "RSSI"],
      color: [
        "rgb(75, 192, 192)",
        "rgb(192, 102, 100)",
        "rgb(192, 72, 192)",
        "rgb(100, 72, 192)",
      ],
    };
  },

  computed: {
    lastTime() {
      if (this.data.dateList[this.data.dateList.length - 1]) {
        var date = this.data.dateList[this.data.dateList.length - 1];

        var dateStr =
          ("00" + (date.getMonth() + 1)).slice(-2) +
          "/" +
          ("00" + date.getDate()).slice(-2) +
          "/" +
          date.getFullYear() +
          " " +
          ("00" + date.getHours()).slice(-2) +
          ":" +
          ("00" + date.getMinutes()).slice(-2) +
          ":" +
          ("00" + date.getSeconds()).slice(-2);

        return dateStr;
      } else {
        return null;
      }
    },
    dateMin() {
      var d = new Date();

      d.setMonth(d.getMonth() - 1);

      return d;
    },
    chartOptionList() {
      var list = [];
      for (var i = 0; i < this.measureName.length; i++) {
        var chartOptions = {
          chart: {
            type: "line",
            stacked: false,
            height: 350,
            zoom: {
              type: "x",
              enabled: true,
              autoScaleYaxis: true,
            },
            toolbar: {
              autoSelected: "zoom",
            },
            selection: {
              enabled: true,
              type: "x",
              fill: {
                color: "#24292e",
                opacity: 0.1,
              },
              stroke: {
                width: 1,
                dashArray: 3,
                color: "#24292e",
                opacity: 0.4,
              },
              xaxis: {
                min: undefined,
                max: undefined,
              },
              yaxis: {
                min: undefined,
                max: undefined,
              },
            },
          },
          colors: [this.color[i]],
          dataLabels: {
            enabled: false,
          },
          markers: {
            size: 0,
          },
          stroke: {
            show: true,
            curve: "smooth",
            lineCap: "butt",
            width: 2,
            dashArray: 0,
          },
          xaxis: {
            type: "datetime",
            labels: {
              datetimeFormatter: {
                year: "yyyy",
                month: "MMM 'yyyy",
                day: "dd MMM",
                hour: "HH:mm",
              },
            },
            min: Date.now() - 3 * 86400000, // Where the 6 is the number of days
            max: Date.now(), // Today
            //range: 20,
          },
          yaxis: {
            title: {
              text: this.measureName[i],
            },
          },
          tooltip: {
            x: {
              show: true,
              format: "dd MMM HH:mm  ",
              formatter: undefined,
            },
            y: {
              formatter: (val) => {
                //console.log(opts)
                return val;
                //+ " "+ this.unit[opts.seriesIndex];
              },
            },
          },
        };
        list.push(chartOptions);
      }

      return list;
    },
    data() {
      var dateList = [];
      var tempList = [{ name: this.measureName[0], data: [] }];
      var humList = [{ name: this.measureName[1], data: [] }];
      var VccList = [{ name: this.measureName[2], data: [] }];
      var rssiList = [{ name: this.measureName[3], data: [] }];
      var listSeries = [];

      listSeries.push(tempList);
      listSeries.push(humList);
      listSeries.push(VccList);
      listSeries.push(rssiList);

      this.items.map((item) => {
        tempList[0].data.push({
          x: new Date(item.date),
          y: Math.round(item.temperature * 100) / 100,
        });
        humList[0].data.push({
          x: new Date(item.date),
          y: Math.round(item.humidite * 100) / 100,
        });
        VccList[0].data.push({ x: new Date(item.date), y: item.VCC });
        rssiList[0].data.push({ x: new Date(item.date), y: item.rssi });
        dateList.push(new Date(item.date));
      });

      //var measureList = [tempList, humList, VccList, rssiList];
      //console.log("ok" ,listSeries[0][0].data[listSeries[0][0].data.length-1].y)
      return { listSeries, dateList };
    },
  },

  async created() {
    this.loaded = false;
    try {
      const response = await axios.get("api/SensorDataList");
      this.items = response.data;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  async mounted() {},
};
</script>