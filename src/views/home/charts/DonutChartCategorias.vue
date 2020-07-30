<template>
	<v-apexchart type="donut" :options="chartOptions" :series="series"></v-apexchart>
</template>

<script>
export default {
	name: "DonutChartCategorias",

	props: {
		dados: Array,
	},
	data() {
		return {
			series: this.dados.map((e) => e.valor),
			chartOptions: {
				chart: {
					type: "donut",
					height: "300",
				},
			},
		};
	},
	watch: {
		dados() {
			this.chartOptions = {
				...this.chartOptions,
				labels: this.dados.map((e) => e.categoria),
			};
			this.series = this.dados.map((e) => e.valor);
		},
	},
};
</script>