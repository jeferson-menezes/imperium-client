<template>
	<v-container fluid>
		<v-row></v-row>
		<v-row>
			<v-col>
				<v-card class="pa-sm-3 pa-md-7 pa-xs-0">
					<v-card-title class="pr-0">
						<v-icon x-large color="blue">mdi-bookmark</v-icon>Lista de despesas
					</v-card-title>
					<v-card>
						<v-card-title primary-title>
							Despesas
							<v-spacer></v-spacer>
							<despesa-form></despesa-form>
							<v-btn fab small elevation="0" v-on:click="$root.$emit('despesa-form::show','')">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</v-card-title>

						<v-data-table
							:headers="headers"
							:items="despesas"
							:items-per-page="5"
							:loading="loadingData"
							loading-text="Carregando..."
						></v-data-table>
					</v-card>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Confirm } from "../../shared/models/confirm";
import { Alert } from "../../shared/models/alert";
import DespesaForm from "./DespesaForm";

export default {
	name: "Despesa",

	components: {DespesaForm},

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
		...mapState("despesa", ["despesas"])
	},

	methods: {
		...mapActions("despesa", [""])
	}
};
</script>