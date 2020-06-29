<template>
	<v-container fluid>
		<v-row></v-row>
		<v-row>
			<v-col>
				<v-card class="pa-sm-3 pa-md-7 pa-xs-0">
					<v-card-title class="pr-0">
						<v-icon x-large color="blue">mdi-bookmark</v-icon>Lista de contas
					</v-card-title>

					<v-card>
						<v-card-title primary-title>
							Contas
							<v-spacer></v-spacer>
							<conta-form></conta-form>
							<v-btn fab small elevation="0" v-on:click="$root.$emit('conta-form::show','')">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</v-card-title>
						<v-data-table
							:headers="headers"
							:items="contas"
							:items-per-page="5"
							:loading="loadingData"
							loading-text="Carregando..."
						>
							<template v-slot:item.icone="{item}">
								<v-avatar color="grey lighten-4">
									<v-icon large :color="item.tipoContaCor">mdi-{{item.tipoContaIcone}}</v-icon>
								</v-avatar>
							</template>

							<template v-slot:item.saldo="{item}">{{$toReal(item.saldo)}}</template>

							<template v-slot:item.ativo="{item}">
								<v-icon v-if="item.ativo" color="green darken-0">mdi-eye</v-icon>
								<v-icon v-else color="orange darken-2">mdi-eye-off</v-icon>
							</template>

							<template v-slot:item.acoes="{item}">
								<!--  -->
								<v-btn fab small elevation="0" @click="$root.$emit('conta-form::show', item.id)">
									<v-icon>mdi-pencil</v-icon>
								</v-btn>
								<!--  -->
								<v-btn fab small elevation="0">
									<conta-saldo-form :conta="item"></conta-saldo-form>
								</v-btn>

								<v-btn fab small elevation="0" @click="inativaConta(item)">
									<v-icon v-if="item.ativo">mdi-eye-off</v-icon>
									<v-icon v-else>mdi-eye</v-icon>
								</v-btn>

								<v-btn fab small elevation="0" @click="excluirConta(item)">
									<v-icon>mdi-delete</v-icon>
								</v-btn>
							</template>
						</v-data-table>
					</v-card>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ContaForm from "./ContaForm";
import ContaSaldoForm from "./ContaSaldoForm";
import { Confirm } from "../../shared/models/confirm";
import { Alert } from "../../shared/models/alert";

export default {
	name: "Conta",

	components: { ContaForm, ContaSaldoForm },

	data: () => ({
		loadingData: false,
		headers: [
			{ text: "", sortable: false, value: "icone" },
			{ text: "Nome", sortable: true, value: "nome" },
			{ text: "Descrição", sortable: false, value: "descricao" },
			{ text: "Saldo", sortable: false, value: "saldo" },
			{ text: "Categoria", sortable: false, value: "tipoContaNome" },
			{ text: "Ativa", value: "ativo" },
			{ text: "Ações", sortable: false, value: "acoes", align: "center" }
		]
	}),

	computed: {
		...mapState("auth", ["user"]),
		...mapState("conta", ["contas"])
	},

	methods: {
		...mapActions("conta", [
			"ActionListarPorUsuario",
			"ActionExcluirConta",
			"ActionInativarConta"
		]),

		excluirConta(conta) {
			this.$root.$emit(
				"sweet-confirm::show",
				new Confirm(
					"Deseja realmente excluir a conta " + conta.nome + "?"
				)
			);
			this.$root.$once("sweet-confirm::result", async payload => {
				if (payload) {
					const id = conta.id;
					try {
						await this.ActionExcluirConta({ id });
						this.$root.$emit(
							"sweet-alert::show",
							new Alert("Conta excluida com sucesso!", "success")
						);
					} catch (error) {
						console.log(error);
						this.$root.$emit(
							"sweet-alert::show",
							new Alert(
								error.body.message ||
									"Houve um erro para excluir!",
								"error",
								4000
							)
						);
					}
				}
			});
		},

		inativaConta(conta) {
			const message = conta.ativo ? "inativar" : "ativar";
			this.$root.$emit(
				"sweet-confirm::show",
				new Confirm(
					"Deseja " + message + " a conta " + conta.nome + "?"
				)
			);

			this.$root.$once("sweet-confirm::result", async payload => {
				if (payload) {
					const id = conta.id;
					try {
						await this.ActionInativarConta({ id });
						const message = conta.ativo ? "inativada" : "ativada";
						this.$root.$emit(
							"sweet-alert::show",
							new Alert(
								"Conta " + message + " com sucesso!",
								"success"
							)
						);
					} catch (error) {
						console.log("ERR", error.body);
						this.$root.$emit(
							"sweet-alert::show",
							new Alert(
								error.body.message ||
									"Houve um erro para" + message,
								"error",
								4000
							)
						);
					}
				}
			});
		}
	},

	mounted() {
		this.loadingData = true;
		this.ActionListarPorUsuario({ id: this.user.id }).finally(
			() => (this.loadingData = false)
		);
	}
};
</script>