
<template>
	<v-card class="mt-5">
		<v-card-title>
			<v-icon x-large color="purple accent-2">mdi-bookmark</v-icon>Transferencias
			<v-spacer></v-spacer>
			<transferencia-form></transferencia-form>
			<v-btn
				fab
				small
				elevation="0"
				color="purple"
				dark
				v-on:click="$root.$emit('transferencia-form::show','')"
			>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</v-card-title>

		<v-card-text>
			<v-list>
				<v-list-item v-for="(item, i) in transferencias.content" :key="i">
					<v-list-item-icon class="mr-1">
						<v-icon large :color="item.contaOrigemTipo.cor">mdi-{{item.contaOrigemTipo.icone}}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{item.contaOrigemNome}} &#10149; {{item.contaDestinoNome}}</v-list-item-title>
						<v-list-item-subtitle>{{$parseISO(item.data) | date('dd MMMM yyyy') }} - {{item.hora}}</v-list-item-subtitle>
						<v-list-item-subtitle>{{item.descricao}}</v-list-item-subtitle>
					</v-list-item-content>

					<v-list-item-action>
						<v-icon large :color="item.contaDestinoTipo.cor">mdi-{{item.contaDestinoTipo.icone}}</v-icon>
						<v-list-item-action-text>
							<v-chip small label>{{$toReal(item.valor)}}</v-chip>
						</v-list-item-action-text>
					</v-list-item-action>
				</v-list-item>
			</v-list>
		</v-card-text>

		<v-card-actions>
			<v-btn :disabled="!page" icon @click="listar(-1)">
				<v-icon x-large>mdi-chevron-left</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn :disabled="transferencias.totalPages === page + 1" icon @click="listar(+1)">
				<v-icon x-large>mdi-chevron-right</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TransferenciaForm from "./TransferenciaForm";

export default {
	name: "Transferencias",

	components: { TransferenciaForm },

	data: () => ({
		loadingData: false,
		page: 0
	}),

	methods: {
		...mapActions("transferencia", [
			"ActionListarTransferenciasPorUsuario"
		]),

		async listar(value) {
			this.page = this.page + value;
			this.loadingData = true;
			await this.ActionListarTransferenciasPorUsuario({
				id: this.user.id,
				size: 5,
				page: this.page,
			}).finally(() => (this.loadingData = false));
		}
	},

	computed: {
		...mapState("auth", ["user"]),
		...mapState("transferencia", ["transferencias"])
	},

	created() {
		this.$root.$on(
			"transferencia-form::show",
			payload => (this.dialog = true)
		);
	},
	mounted() {
		this.loadingData = true;
		this.ActionListarTransferenciasPorUsuario({
			id: this.user.id,
			size: 5,
			page: 0
		}).finally(() => (this.loadingData = false));
	}
};
</script>