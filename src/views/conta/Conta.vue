<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<v-sheet
					rounded="rounded"
					class="d-flex pa-5"
					color="blue darken-2"
					width="100%"
					>
					<v-container>	 
						<v-row>
							<v-col>
								<span class="title white--text">Soma de saldos</span>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<span class="subtitle-1 white--text">Incluidas nas somas</span> <br>
								<span class="display-1 white--text">{{$toReal(totalIncluidasSoma())}}</span><br>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<span class="title light-blue--text text--lighten-4">{{$toReal(totalRestantes())}}</span><br>
								<span class="blue--text light-blue--text text--darken-1"> Soma das demais contas</span>
							</v-col>
						</v-row>
					</v-container>
				</v-sheet>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-card class="pa-sm-3 pa-md-7 pa-xs-0">

					<v-card-title class="pr-0">
						<v-icon x-large color="blue accent-2">mdi-bookmark</v-icon>Lista de contas
					</v-card-title>

					<v-card >
						<v-card-title primary-title>
							Contas
							<v-spacer></v-spacer>
							<conta-form></conta-form>
							<v-btn color="blue accent-2" dark fab small elevation="0" v-on:click="$root.$emit('conta-form::show','')">
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

								<!-- <v-btn fab small elevation="0" @click="excluirConta(item)">
									<v-icon>mdi-delete</v-icon>
								</v-btn>-->
							</template>
						</v-data-table>
					</v-card>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<v-col xs='12' sm='6' md="6">
				<transferencias></transferencias>
			</v-col>

			
			<v-col xs='12' sm='6' md="6">
				<conta-time-line></conta-time-line>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import ContaForm from "./ContaForm";
import ContaSaldoForm from "./ContaSaldoForm";
import Transferencias from "../transferencia/Transferencias";
import ContaTimeLine from "./ContaTimeLine";
import { Confirm } from "../../shared/models/confirm";
import { Alert } from "../../shared/models/alert";

export default {
	name: "Conta",

	components: { ContaForm, ContaSaldoForm, Transferencias, ContaTimeLine },

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
		...mapState("conta", ["contas"]),
	},

	methods: {
		...mapActions("conta", [
			"ActionListarContasPorUsuario",
			"ActionExcluirConta",
			"ActionInativarConta"
		]),

		...mapGetters("conta", ["totalIncluidasSoma","totalRestantes"]), 

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
						console.error(error.body);
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
		},
	},

	mounted() {
		this.loadingData = true;
		this.ActionListarContasPorUsuario({ id: this.user.id }).finally(
			() => (this.loadingData = false)
		);
	}
};
</script>