<template>
	<v-container fluid>
		<v-row>
			<v-col cols="12" sm="6" md="4">
				<v-card>
					<v-card-title primary-title>
						<v-btn fab small dark color="green accent-2" elevation="0">
							<v-icon medium>mdi-finance</v-icon>
						</v-btn>
						<span class="ml-3">Receita</span>
					</v-card-title>
					<v-card-subtitle class="ml-13">
						<span class="font-weight-black">Total:</span>
						{{$toReal(somaReceitasMes())}}
						<span class="font-weight-black">Entradas:</span>
						{{totalReceitasMes()}}
					</v-card-subtitle>
				</v-card>
			</v-col>

			<v-col cols="12" sm="6" md="4">
				<v-card>
					<v-card-title primary-title>
						<v-btn fab small dark color="red accent-2" elevation="0">
							<v-icon medium>mdi-cart-arrow-down</v-icon>
						</v-btn>
						<span class="ml-3">Despesa</span>
					</v-card-title>
					<v-card-subtitle class="ml-13">
						<span class="font-weight-black">Total:</span>
						{{ $toReal(somaDespesasMes())}}
						<span class="font-weight-black">Compras:</span>
						{{totalDespesasMes()}}
					</v-card-subtitle>
				</v-card>
			</v-col>

			<v-col cols="12" sm="6" md="4">
				<v-card>
					<v-card-title>
						<v-btn fab small dark color="amber accent-2" elevation="0">
							<v-icon medium>mdi-credit-card</v-icon>
						</v-btn>
						<span class="ml-3">Despesa</span>
					</v-card-title>
					<v-card-subtitle class="ml-13">
						<span class="font-weight-black">Total:</span>
						0
						<span class="font-weight-black">Compras:</span>
						0
					</v-card-subtitle>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col></v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
	name: "Home",

	components: {},

	methods: {
		...mapActions("home", [
			"ActionListarDespesasPorMes",
			"ActionListarReceitasPorMes"
		]),
		...mapGetters("home", [
			"somaDespesasMes",
			"totalDespesasMes",
			"somaReceitasMes",
			"totalReceitasMes"
		])
	},

	computed: {
		...mapState("auth", ["user"]),
		...mapState("home", ["despesasMes"])
	},

	created() {
		this.ActionListarDespesasPorMes({
			id: this.user.id,
			mes: new Date().toISOString().substr(0, 7)
		});

		this.ActionListarReceitasPorMes({
			id: this.user.id,
			mes: new Date().toISOString().substr(0, 7)
		});
	}
};
</script>
