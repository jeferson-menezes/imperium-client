<template>
	<v-container>
		<v-row></v-row>
		<v-row>
			<v-col>
				<v-card class="pa-sm-3 pa-md-7 pa-xs-0">
					<v-card-title class="pr-0">
						<v-icon x-large color="blue">mdi-bookmark</v-icon>Lista de categorias
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
						</v-data-table>
					</v-card>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ContaForm from './ContaForm'

export default {
    name: "Conta",
    
    components:{ContaForm},

	data: () => ({
		loadingData: false,
		headers: [
			{ text: "", sortable: false, value: "icone" },
			{ text: "Nome", sortable: true, value: "nome" },
			{ text: "Descrição", sortable: false, value: "descricao" },
			{ text: "Saldo", sortable: false, value: "saldo" },
			{ text: "Categoria", sortable: false, value: "tipoContaNome" },
			{ text: "Ações", sortable: false, value: "acoes" }
		]
	}),

	computed: {
		...mapState("auth", ["user"]),
		...mapState("conta", ["contas"])
	},

	methods: {
		...mapActions("conta", ["ActionListarPorUsuario"])
	},
	mounted() {
		this.loadingData = true;
		this.ActionListarPorUsuario({ id: this.user.id }).finally(
			() => (this.loadingData = false)
		);
	}
};
</script>