<script>
import { Line, mixins } from "vue-chartjs";

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Object,
      //required: true,
      default: () => {},
    },
    options: {
      type: Object,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    options() {
      this.renderChart(this.chartData, this.options);
    },
  },
};
</script>
