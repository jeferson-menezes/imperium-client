<template>
	<v-dialog v-model="dialog" persistent max-width="330px">
		<v-card>
			<v-card-title>
				<span class="headline">{{form.id ? 'Atualizar':'Adicionar'}} Despesa</span>
			</v-card-title>
			<v-card-text>
				<v-form ref="form" v-model="valid">
					<v-text-field
						v-show="!form.id"
						v-model="form.valor"
						:rules="rules.valor"
						label="Valor"
						type="text"
					></v-text-field>
					<v-text-field v-model="form.descricao" :rules="rules.descricao" label="Nome"></v-text-field>
					<v-select
						v-model="form.categoriaId"
						:items="categorias"
						item-value="id"
						item-text="nome"
						label="Categoria"
					></v-select>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="close()">cancelar</v-btn>
				<v-btn :loading="loading" :disabled="!valid" color="blue darken-1" text @click="salvar()">salvar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required } from "../../shared/rules";

export default {
	name: "ContaForm",

	data: () => ({
		dialog: false,
		valid: false,
		loading: false,
		form: {
			id: 0,
			valor: 0,
			descricao: "",
			data: "",
			hora: "",
			concluida: false,
			categoriaId: 0,
			contaId: 0
		},
		rules: {
			valor: [required("O valor é obrigatório!")],
			descricao: [required("Adescrição é obrigatória!")]
		}
	}),

	methods: {
		...mapActions("categoria", ["ActionListarPorNatureza"]),

		close() {
			this.$refs.form.reset();
			this.dialog = false;
		},

		async populaForm(payload) {}
	},

	computed: {
		...mapState("conta", ["contas"]),
		...mapState("categoria", ["categorias"])
	},

	mounted() {
		this.ActionListarPorNatureza({ natureza: "DESPESA" });
	},

	created() {
		this.$root.$on("despesa-form::show", payload => {
			if (payload) {
				this.populaForm(payload);
			}
			this.dialog = true;
		});
	}
};
</script>