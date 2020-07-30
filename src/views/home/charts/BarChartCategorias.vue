<template>
	 <v-apexchart type="bar" height="350" :options="chartOptions" :series="series"></v-apexchart>
</template>

<script>
export default {
	name: "BarChart",
	components: {},
	data: () => ({
		series: [
			{
				data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
			},
		],
		chartOptions: {
			chart: {
				type: "bar",
				height: 350,
			},
			plotOptions: {
				bar: {
					horizontal: true,
				},
			},
			dataLabels: {
				enabled: false,
			},
			xaxis: {
				categories: [
					"South Korea",
					"Canada",
					"United Kingdom",
					"Netherlands",
					"Italy",
					"France",
					"Japan",
					"United States",
					"China",
					"Germany",
				],
			},
		},
	}),
};
</script>