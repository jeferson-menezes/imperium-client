<template>
	<v-apexchart type="area" height="60" :options="chartOptions" :series="series"></v-apexchart>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	name: "LinesChart",
	props: ["data"],
	data() {
		return {
			series: [
				{
					data: this.data,
				},
			],
			chartOptions: {
				chart: {
					type: "area",
					height: 160,
					sparkline: {
						enabled: true,
					},
				},
				colors: ["#f72047"],
				stroke: {
					curve: "straight",
				},
				fill: {
					opacity: 0.3,
					type: "gradient",
					gradient: {
						shade: "dark",
						gradientToColors: ["#fdd535"],
						shadeIntensity: 1,
						type: "vertical",
						opacityFrom: 1,
						opacityTo: 1,
						stops: [0, 100, 100, 100],
					},
				},
				xaxis: {
					crosshairs: {
						width: 1,
					},
				},
				yaxis: {
					min: 0,
				},
				title: {
					offsetX: 0,
					style: {
						fontSize: "24px",
					},
				},
				subtitle: {
					offsetX: 0,
					style: {
						fontSize: "14px",
					},
				},
			},
		};
	},

	methods: {
		...mapGetters("home", ["valoresDespesasMes"]),
	},

	watch: {
		data() {
			this.series = [
				{
					data: this.valoresDespesasMes(),
				},
			];
		},
	},
};
</script>