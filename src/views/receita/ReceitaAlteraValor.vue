<template>
	<div>
		<v-icon @click="dialog = true">mdi-currency-usd</v-icon>

		<v-dialog v-model="dialog" persistent max-width="350px">
			<v-card>
				<v-card-title>
					<span class="headline">Alterar valor da receita</span>
				</v-card-title>
				<v-card-subtitle>{{receita.contaNome}}</v-card-subtitle>
				<v-card-text>
					<v-form ref="form" v-model="valid">
						<v-text-field v-model="receita.valor" :rules="rules.valor" label="Valor" type="text"></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="close()">cancelar</v-btn>
					<v-btn
						:loading="loading"
						:disabled="!valid"
						color="blue darken-1"
						text
						@click="salvar()"
					>salvar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required } from "../../shared/rules";
import { Toast } from "../../shared/models/toast";

export default {
	name: "ReceitaAlteraValor",

	props: {
		receita: Object
	},

	data: () => ({
		dialog: false,
		valid: false,
		loading: false,
		form: {
			valor: 0
		},
		rules: {
			valor: [required("O valor é obrigatório!")]
		}
	}),

	methods: {
		...mapActions("receita", ["ActionAlterarValor"]),

		async salvar() {
			try {
				this.loading = true;

				const { id, valor } = this.receita;
				await this.ActionAlterarValor({ id, valor });
				this.$root.$emit(
					"sweet-toast::show",
					new Toast(
						"Valor da receita alterado com sucesso!",
						"success"
					)
				);
				this.loading = false;
				this.dialog = false;
			} catch (error) {
				console.error(error);
				this.$root.$emit(
					"sweet-toast::show",
					new Toast(
						error.data.message ||
							"Não foi possível realizar a operação!",
						"error"
					)
				);
			}
		},

		close() {
			this.dialog = false;
		}
	}
};
</script>