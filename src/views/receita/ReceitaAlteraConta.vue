<template>
	<div>
		<v-icon @click="showDialog()">mdi-bank-transfer</v-icon>

		<v-dialog v-model="dialog" persistent max-width="350px">
			<v-card>
				<v-card-title>
					<span class="headline">Alterar conta de pagamento</span>
				</v-card-title>
				<v-card-subtitle>{{receita.contaNome}}</v-card-subtitle>
				<v-card-text>
					<v-form ref="form" v-model="valid">
						<v-select
							:rules="rules.conta"
							v-model="form.contaId"
							:items="contas"
							item-value="id"
							item-text="nome"
							label="Selecione a conta"
						></v-select>
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
	name: "ReceitaAlteraConta",

	props: {
		receita: Object
	},
	data: () => ({
		dialog: false,
		valid: false,
		loading: false,
		form: {
			contaId: 0
		},
		rules: {
			conta: [required("A conta é obrigatória")]
		}
	}),

	methods: {
		...mapActions("receita", ["ActionAlterarConta"]),
		...mapActions("conta", ["ActionListarContasPorUsuario"]),

		async salvar() {
			try {
				this.form.id = this.receita.id;
				await this.ActionAlterarConta(this.form);
				this.$root.$emit(
					"sweet-toast::show",
					new Toast("Conta alterada com sucesso!", "success")
				);
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
        }, 
        
        showDialog(){
            this.ActionListarContasPorUsuario({ id: this.user.id });
            this.dialog = true
        }
	},

	computed: {
		...mapState("conta", ["contas"]),
		...mapState("auth", ["user"])
	}
};
</script>
