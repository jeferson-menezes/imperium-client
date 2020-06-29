<template>
	<div>
		<v-icon @click="dialog = true">mdi-currency-usd</v-icon>

		<v-dialog v-model="dialog" persistent max-width="250px">
			<v-card>
				<v-card-title>
					<span class="headline">Alterar saldo</span>
				</v-card-title>
				<v-card-subtitle>{{conta.nome}}</v-card-subtitle>
				<v-card-text>
					<v-form ref="form" v-model="valid">
						<v-text-field v-model="conta.saldo" :rules="rules.saldo" label="Saldo" type="text"></v-text-field>
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
import { mapActions } from "vuex";
import { required } from "../../shared/rules";
import { Toast } from "../../shared/models/toast";

export default {
	name: "ContaSaldoForm",

	props: {
		conta: Object
	},

	data: () => ({
		dialog: false,
		valid: false,
		loading: false,
		rules: {
			saldo: [required("O salvo é obrigatório")]
		}
	}),

	methods: {
		...mapActions("conta", ["ActionAlterarSaldo"]),

		async salvar() {
			try {
				const { id, saldo } = this.conta;
				await this.ActionAlterarSaldo({ id, saldo });
				this.$root.$emit(
					"sweet-toast::show",
					new Toast("Saldo alterado com sucesso!", "success")
				);
				this.dialog = false;
			} catch (error) {
				this.$root.$emit(
					"sweet-toast::show",
					new Toast(
						error.data.message || "Saldo alterado com sucesso!",
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