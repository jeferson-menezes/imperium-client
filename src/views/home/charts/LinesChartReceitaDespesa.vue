<template>
	<v-apexchart ref="chart" type="line" height="300" :options="chartOptions" :series="series"></v-apexchart>
</template>

<script>
import { mapGetters } from "vuex";
import  optionLine from "./options";
export default {
	name: "BarsChartReceitaDespesa",
	props: ["despesas", "receitas"],
	data() {
		return {
			series: this.generateData(),
			chartOptions: optionLine
		};
	},
	methods: {
		...mapGetters("home", ["despesasGraficoLinha", "receitasGraficoLinha"]),
		generateData() {
			return [
				{
					name: "Receitas",
					data: this.receitasGraficoLinha()
				},
				{
					name: "Despesas",
					data: this.despesasGraficoLinha()
				}
			];
		}
	},
	computed: {
		data() {
			this.series = this.generateData();
		}
	},
	watch: {
		data() {
			this.series = this.generateData();
		}
	}
};
</script>