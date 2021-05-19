<template>
	<v-container>
		<v-card flat tile>
			<v-window v-model="onboarding" reverse>
				<v-window-item>
					<v-card elevation="1">
						<BarraConsumoLimite />

						<v-card-title v-if="!!faturaAtual" primary-title>
							{{ faturaAtual.mesExtenso }}
						</v-card-title>
						<v-card-subtitle class="blue--text">
							Fatura atual
						</v-card-subtitle>
						<v-card-title>
							<span class="blue--text">
								R$ {{ totalFaturaAtual() }}
							</span>
						</v-card-title>
						<v-card-text>
							Limite disponível
							<strong class="green--text accent-4">
								R$ 2.301.49
							</strong>
						</v-card-text>
					</v-card>
				</v-window-item>

				<v-window-item>
					<v-card elevation="1">
						<BarraConsumoLimite />

						<v-card-title class="green--text">
							R$ 2.301,49
						</v-card-title>
						<v-card-subtitle> Limite disponível </v-card-subtitle>

						<v-card-title class="blue--text">
							R$ 288, 51</v-card-title
						>
						<v-card-subtitle> Faura atual </v-card-subtitle>

						<v-card-title class="deep-orange--text"
							>R$ 660, 00
						</v-card-title>
						<v-card-subtitle> Próximas faturas </v-card-subtitle>
					</v-card>
				</v-window-item>
			</v-window>

			<v-card-actions class="justify-center">
				<v-item-group
					v-model="onboarding"
					class="text-center"
					mandatory
				>
					<v-item :key="`btn-0`" v-slot="{ active, toggle }">
						<v-btn :input-value="active" icon @click="toggle">
							<v-icon x-large>mdi-circle-small </v-icon>
						</v-btn>
					</v-item>
					<v-item :key="`btn-1`" v-slot="{ active, toggle }">
						<v-btn :input-value="active" icon @click="toggle">
							<v-icon x-large>mdi-dots-horizontal </v-icon>
						</v-btn>
					</v-item>
				</v-item-group>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import * as currency from "currency.js";
import BarraConsumoLimite from "./BarraConsumoLimite";

export default {
	name: "Faturas",

	components: {
		BarraConsumoLimite,
	},

	data: () => ({
		length: 2,
		onboarding: 0,
	}),

	computed: {
		...mapState("fatura", ["faturas", "faturaAtual"]),
	},

	methods: {
		...mapActions("fatura", [
			"ActionListarFaturas",
			"ActionDetalharFatura",
			"ActionTotaisFatura",
		]),

		...mapGetters("fatura", ["faturaAberta"]),

		totalFaturaAtual() {
			return this.faturaAtual.itens.reduce(
				(a, c) => (a = a.add(c.valor)),
				currency(0)
			);
		},
	},

	async created() {
		const id = this.$route.params.id;

		await this.ActionListarFaturas({ id });

		const fb = this.faturaAberta();

		this.ActionDetalharFatura({ id: fb.id });

		this.ActionTotaisFatura({ id });
	},
};
</script>