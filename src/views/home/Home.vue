<template>
	<v-container fluid>
		<v-row>
			<v-col cols="12" sm="6" md="3">
				<v-card min-height="120">
					<v-row align="start" justify="start">
						<v-col cols="2" sm="3" class="ml-2 pt-2">
							<v-btn fab small dark color="green accent-2" elevation="1">
								<v-icon medium>mdi-finance</v-icon>
							</v-btn>
						</v-col>
						<v-col class="pa-1">
							<span class="text-lg-h6">Receita</span>
							<br />
							<div class="caption">
								<span class="font-weight-black">Total:</span>
								{{$toReal(somaReceitasMes())}}
								<span class="font-weight-black">Entradas:</span>
								{{totalReceitasMes()}}
							</div>
						</v-col>
					</v-row>
					<sparkline-receita :data="valoresReceitasMes()"></sparkline-receita>
				</v-card>
			</v-col>

			<v-col cols="12" sm="6" md="3">
				<v-card min-height="120">
					<v-row align="start" justify="start">
						<v-col cols="2" sm="3" class="ml-2 pt-2">
							<v-btn fab small dark color="red accent-2" elevation="1">
								<v-icon medium>mdi-cart-arrow-down</v-icon>
							</v-btn>
						</v-col>
						<v-col class="pa-1">
							<span class="text-lg-h6">Despesa</span>
							<br />
							<div class="caption">
								<span class="font-weight-black">Total:</span>
								{{ $toReal(somaDespesasMes())}}
								<span class="font-weight-black">Compras:</span>
								{{totalDespesasMes()}}
							</div>
						</v-col>
					</v-row>
					<sparkline-despesa :data="valoresDespesasMes()"></sparkline-despesa>
				</v-card>
			</v-col>

			<v-col cols="12" sm="6" md="3">
				<v-card min-height="120">
					<v-row align="start" justify="start">
						<v-col cols="2" sm="3" class="ml-2 pt-2">
							<v-btn fab small dark color="amber accent-2" elevation="1">
								<v-icon medium>mdi-credit-card</v-icon>
							</v-btn>
						</v-col>
						<v-col class="pa-1">
							<span class="text-lg-h6">Despesa</span>
							<br />
							<div class="caption">
								<span class="font-weight-black">Total:</span>
								<span class="font-weight-black">Compras:</span>
							</div>
						</v-col>
					</v-row>
				</v-card>
			</v-col>

			<v-col cols="12" sm="6" md="3">
				<v-card min-height="120">
					<v-row align="start" justify="start">
						<v-col cols="2" sm="3" class="ml-2 pt-2">
							<v-btn fab small dark color="info accent-2" elevation="1">
								<v-icon medium>mdi-scale-balance</v-icon>
							</v-btn>
						</v-col>
						<v-col class="pa-1">
							<span class="text-lg-h6">Balanço</span>
							<br />
							<div class="caption">
								<span class="font-weight-black">Total:</span>
								{{ $toReal(totalBalancoMes())}}
							</div>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<v-card>
					<lines-chart-receita-despesa></lines-chart-receita-despesa>
				</v-card>
			</v-col>
			<v-col cols="12" sm="6">
				<v-card>
					<donut-chart-categorias :dados="agruparDespesasCategorias()"></donut-chart-categorias>
				</v-card>
			</v-col>
			<v-col cols="12" sm="6">
				<v-card>
					<donut-chart-categorias :dados="agruparReceitasCategorias()"></donut-chart-categorias>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import BarChartCategorias from "./charts/BarChartCategorias";
import LinesChartReceitaDespesa from "./charts/LinesChartReceitaDespesa";
import SparklineDespesa from "./charts/SparklineDespesa";
import SparklineReceita from "./charts/SparklineReceita";
import DonutChartCategorias from "./charts/DonutChartCategorias";

export default {
	name: "Home",

	data: () => ({
		mes : new Date().toISOString().substr(0, 7)
	}),

	components: {
		BarChartCategorias,
		LinesChartReceitaDespesa,
		SparklineDespesa,
        SparklineReceita,
        DonutChartCategorias
	},

	methods: {
		...mapActions("home", [
			"ActionListarDespesasPorMes",
			"ActionListarReceitasPorMes",
		]),
		...mapGetters("home", [
			"somaDespesasMes",
			"totalDespesasMes",
			"somaReceitasMes",
			"totalReceitasMes",
			"valoresDespesasMes",
			"valoresReceitasMes",
            "totalBalancoMes",
			"agruparDespesasCategorias",
			"agruparReceitasCategorias"
		]),
	},

	computed: {
		...mapState("auth", ["user"]),
		...mapState("home", ["despesasMes"]),
	},

	created() {
		this.ActionListarDespesasPorMes({
			id: this.user.id,
			mes: this.mes,
		});

		this.ActionListarReceitasPorMes({
			id: this.user.id,
			mes: this.mes,
		});
	},
};
</script>
