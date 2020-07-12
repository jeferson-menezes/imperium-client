<template>
	<v-container fluid>
		<v-row></v-row>
		<v-row>
			<v-col>
				<v-card class="pa-sm-3 pa-md-7 pa-xs-0">
					<v-card-title class="pr-0">
						<v-icon x-large color="green accent-2">mdi-bookmark</v-icon>Lista de receitas
					</v-card-title>
					<v-card>
						<v-card-title primary-title>
							<receita-filtra :page="page"></receita-filtra>
							<v-spacer></v-spacer>
							<receita-form></receita-form>
							<v-btn fab small elevation="0" v-on:click="$root.$emit('receita-form::show','')">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</v-card-title>

						<v-data-table
							:headers="headers"
							:items="receitas.content"
							:loading="loadingData"
							loading-text="Carregando..."
							hide-default-footer
						>
							<template v-slot:item.valor="{item}">{{$toReal(item.valor) }}</template>

							<template v-slot:item.data="{item}">{{$parseISO(item.data) | date('dd MMMM yyyy') }}</template>
							<template v-slot:item.hora="{item}">{{item.hora }}</template>
							<template v-slot:item.concluida="{item}">
								<div class="text-lowercase">
									<span v-if="item.concluida" class="green--text">&#9679; recebida</span>
									<span v-else class="red--text">&#9679; pendente</span>
								</div>
							</template>

							<template v-slot:item.acoes="{item}">
								<v-btn fab small elevation="0" @click="$root.$emit('receita-form::show', item.id)">
									<v-icon>mdi-pencil</v-icon>
								</v-btn>
								<v-btn v-show="!item.concluida" fab small elevation="0" @click="receberReceita(item)">
									<v-icon>mdi-account-cash</v-icon>
								</v-btn>
								<v-btn fab small elevation="0">
									<receita-altera-conta :receita="item"></receita-altera-conta>
								</v-btn>
								<v-btn fab small elevation="0">
									<receita-altera-valor :receita="item"></receita-altera-valor>
								</v-btn>
								<v-btn fab small elevation="0" @click="excluirReceita(item)">
									<v-icon>mdi-delete</v-icon>
								</v-btn>
							</template>
						</v-data-table>

						<div class="text-center pa-2">
							<v-pagination
								@input="listar"
								v-model="page"
								total-visible="10"
								:length="receitas.totalPages"
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
import { Confirm } from "../../shared/models/confirm";
import ReceitaForm from "./ReceitaForm";
import ReceitaAlteraConta from "./ReceitaAlteraConta";
import ReceitaAlteraValor from "./ReceitaAlteraValor";
import ReceitaFiltra from './ReceitaFiltra'
export default {
	name: "Receita",

	components: {
		ReceitaForm,
        ReceitaAlteraConta,
        ReceitaAlteraValor,
        ReceitaFiltra
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
			{ text: "Recebido", value: "concluida" },
			{ text: "Ações", sortable: false, value: "acoes", align: "center" }
		],
		page: 1,
		paginaAtual: ""
	}),

	computed: {
		...mapState("receita", ["receitas"]),
		...mapState("auth", ["user"])
	},

	methods: {
		...mapActions("receita", [
			"ActionListarReceitas",
			"ActionFinalizarReceita",
			"ActionExcluirReceita"
		]),

		listar() {
			this.loadingData = true;
			this.ActionListarReceitas({
				page: this.page - 1,
				size: 10,
				id: this.user.id
			}).finally(() => (this.loadingData = false));
		},

		receberReceita(receita) {
			const message = "Confirma o recebimento da receita!";
			this.$root.$emit("sweet-confirm::show", new Confirm(message));
			this.$root.$once("sweet-confirm::result", async payload => {
				if (payload) {
					try {
						const id = receita.id;
						await this.ActionFinalizarReceita({ id });
						this.$root.$emit(
							"sweet-alert::show",
							new Alert(
								"Receita recebida com sucesso!",
								"success"
							)
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

		excluirReceita(receita) {
			this.$root.$emit(
				"sweet-confirm::show",
				new Confirm(
					"Deseja realmente excluir a receita " +
						receita.descricao +
						"?"
				)
			);
			this.$root.$once("sweet-confirm::result", async payload => {
				if (payload) {
					try {
						const { id } = receita;
						await this.ActionExcluirReceita({ id });
						this.$root.$emit(
							"sweet-alert::show",
							new Alert(
								"Receita excluida com sucesso!",
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