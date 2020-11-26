<template>
	<v-container fluid>
		<v-row></v-row>
		<v-row>
			<v-col>
				<v-card class="pa-sm-3 pa-md-7 pa-xs-0">
					<v-card-title class="pr-0">
						<v-icon x-large color="red accent-2">mdi-bookmark</v-icon>Lista de despesas
					</v-card-title>
					<v-card>
						<v-card-title primary-title>

							<v-text-field
								@input="input"
								v-model="filtro"
								append-icon="mdi-magnify"
								:loading="loadingData"
								rounded
								dense
								filled
							></v-text-field>

							<v-spacer></v-spacer>
							<despesa-form></despesa-form>
							<v-btn fab small elevation="0" v-on:click="$root.$emit('despesa-form::show','')">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</v-card-title>

						<v-data-table
							:headers="headers"
							:items="despesas.content"
							:loading="loadingData"
							loading-text="Carregando..."
							hide-default-footer
						>
							<template v-slot:item.valor="{item}">{{$toReal(item.valor) }}</template>

							<template v-slot:item.data="{item}">{{$parseISO(item.data) | date('dd MMMM yyyy') }}</template>
							<template v-slot:item.hora="{item}">{{item.hora }}</template>
							<template v-slot:item.concluida="{item}">
								<div class="text-lowercase">
									<span v-if="item.concluida" class="green--text">&#9679; pago</span>
									<span v-else class="red--text">&#9679; devendo</span>
								</div>
							</template>
							<template v-slot:item.acoes="{item}">
								<v-btn fab small elevation="0" @click="$root.$emit('despesa-form::show', item.id)">
									<v-icon>mdi-pencil</v-icon>
								</v-btn>
								<v-btn v-show="!item.concluida" fab small elevation="0" @click="pagarDespesa(item)">
									<v-icon>mdi-account-cash</v-icon>
								</v-btn>
								<v-btn fab small elevation="0">
									<despesa-altera-conta :despesa="item"></despesa-altera-conta>
								</v-btn>
								<v-btn fab small elevation="0">
									<despesa-altera-valor :despesa="item"></despesa-altera-valor>
								</v-btn>
								<v-btn fab small elevation="0" @click="excluirDespesa(item)">
									<v-icon>mdi-delete</v-icon>
								</v-btn>
							</template>
						</v-data-table>
						<div class="text-center pa-2">
							<v-pagination
								@input="listar"
								v-model="page"
								total-visible="10"
								:length="despesas.totalPages"
							></v-pagination>
						</div>
					</v-card>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DespesaForm from "./DespesaForm";
import DespesaAlteraConta from "./DespesaAlteraConta";
import DespesaAlteraValor from "./DespesaAlteraValor";

import { Confirm } from "../../shared/models/confirm";
import { Alert } from "../../shared/models/alert";
import { Pageable } from "../../shared/models/pageable";

export default {
	name: "Despesa",

	components: {
		DespesaForm,
		DespesaAlteraConta,
		DespesaAlteraValor,
	},

	data: () => ({
		loadingData: false,
		headers: [
			{ text: "Descrição", sortable: false, value: "descricao" },
			{ text: "Valor", sortable: false, value: "valor" },
			{ text: "Categoria", sortable: false, value: "categoriaNome" },
			{ text: "Conta", sortable: false, value: "contaNome" },
			{ text: "Data", sortable: false, value: "data" },
			{ text: "Hora", value: "hora" },
			{ text: "Pago", value: "concluida" },
			{ text: "Ações", sortable: false, value: "acoes", align: "center" }
		],
		page: 1,
		size: 10,
		filtro: "",
		timer:  0,
		paginaAtual: ""
	}),

	computed: {
		...mapState("despesa", ["despesas"]),
		...mapState("auth", ["user"])
	},

	methods: {
		...mapActions("despesa", [
			"ActionListarDespesas",
			"ActionFinalizarDespesa",
			"ActionExcluirDespesa",
			"ActionListarPorDescricao",
			"ActionListarPorData",
			"ActionFiltrarPorMes"
		]),

		listar() {
			if (this.filtro) {
				this.filtrar()
			} else {
				this.loadingData = true;
				const pageable = new Pageable(this.page, this.size)
				pageable.id = this.user.id
				this.ActionListarDespesas(pageable)
					.finally(() => (this.loadingData = false));
			}
		},

		input(){
			if (this.timer) clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.page = 1
				if (this.filtro) this.filtrar();
				else this.listar()
			}, 600);
		},

		filtrar(){
				const pageable = new Pageable(this.page, this.size)
				pageable.id = this.user.id

				const patternData = new RegExp(/\d{2}\/\d{2}\/\d{4}/g);
				const patternMes = new RegExp(/\d{2}\/\d{4}/g);

				if (Number(this.filtro.substr(0, 2))) {

					if (this.filtro.length === 10 && patternData.test(this.filtro)) {
						this.loadingData = true;
						pageable.data = this.filtro.split("/").reverse().join("-")
						this.ActionListarPorData(pageable)
							.finally(() => (this.loadingData = false));
					}
					
					if (this.filtro.length === 7 && patternMes.test(this.filtro)) {
						this.loadingData = true;
						pageable.mes = this.filtro.split("/").reverse().join("-")
						this.ActionFiltrarPorMes(pageable)
							.finally(() => (this.loadingData = false));
					} 

				} else {
					this.loadingData = true;
					pageable.descricao = this.filtro;
					this.ActionListarPorDescricao(pageable)
						.finally(() => (this.loadingData = false));
				}
				
		},

		pagarDespesa(despesa) {
			const message = "Confirma o pagamento da despesa!";
			this.$root.$emit("sweet-confirm::show", new Confirm(message));
			this.$root.$once("sweet-confirm::result", async payload => {
				if (payload) {
					try {
						const id = despesa.id;
						await this.ActionFinalizarDespesa({ id });
						this.$root.$emit(
							"sweet-alert::show",
							new Alert("Despesa paga com sucesso!", "success")
						);
					} catch (error) {
						console.error(error.body);
						this.$root.$emit(
							"sweet-alert::show",
							new Alert(
								error.body.message ||
									"Houve um erro para realizar a operação!",
								"error",
								4000
							)
						);
					}
				}
			});
		},

		excluirDespesa(despesa) {
			this.$root.$emit(
				"sweet-confirm::show",
				new Confirm(
					"Deseja realmente excluir a despesa " +
						despesa.descricao +
						"?"
				)
			);
			this.$root.$once("sweet-confirm::result", async payload => {
				if (payload) {
					try {
						const { id } = despesa;
						await this.ActionExcluirDespesa({ id });
						this.$root.$emit(
							"sweet-alert::show",
							new Alert(
								"Despesa excluida com sucesso!",
								"success"
							)
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
		}
	},

	mounted() {
		this.listar();
	}
};
</script>