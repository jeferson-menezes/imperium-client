<template>
	<v-dialog v-model="dialog" persistent max-width="330px">
		<v-card>
			<v-card-title>
				<span class="headline">Transferência</span>
			</v-card-title>
			<v-card-text>
				<v-form ref="form" v-model="valid">
					<v-currency-field
						v-model="form.valor"
						:rules="rules.valor"
						label="Valor"
					/>

					<v-text-field
						v-model="form.descricao"
						:rules="rules.descricao"
						label="Descrição"
					></v-text-field>

					<v-row>
						<v-col>
							<date-picker v-model="form.data"></date-picker>
						</v-col>
						<v-col>
							<time-pickers v-model="form.hora"></time-pickers>
						</v-col>
					</v-row>

					<v-select
						:rules="rules.conta"
						v-model="form.contaOrigemId"
						:items="contas"
						item-value="id"
						item-text="nome"
						label="Conta origem"
					></v-select>

					<v-select
						:rules="rules.conta"
						v-model="form.contaDestinoId"
						:items="contas"
						item-value="id"
						item-text="nome"
						label="Conta destino"
					></v-select>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="close()"
					>cancelar</v-btn
				>
				<v-btn
					:loading="loading"
					:disabled="!valid"
					color="blue darken-1"
					text
					@click="salvar()"
					>salvar</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import DatePicker from "../../shared/components/DatePicker";
import TimePickers from "../../shared/components/TimePicker";
import { mapState, mapActions } from "vuex";
import { required } from "../../shared/rules";
import { Toast } from "../../shared/models/toast";
import VCurrencyField from "../../shared/components/VCurrencyField";

export default {
	name: "TransferenciaForm",

	components: { VCurrencyField, DatePicker, TimePickers },

	data: () => ({
		dialog: false,
		valid: false,
		loading: false,
		timer: 0,
		form: {
			valor: 0,
			descricao: "",
			data: "",
			hora: "",
			contaOrigemId: 0,
			contaDestinoId: 0,
		},
		rules: {
			valor: [required("O valor é obrigatório!")],
			descricao: [required("Adescrição é obrigatória!")],
			conta: [required("A Conta é obrigatória")],
		},
	}),

	methods: {
		...mapActions("transferencia", ["ActionAdicionarTransferencia"]),
		...mapActions("conta", ["ActionListarContasPorUsuario"]),

		close() {
			this.dialog = false;
		},

		resetForm() {
			for (const field in this.form) {
				if (field === "data" || field === "hora") continue;
				const tipo = typeof this.form[field];
				if (tipo === "number") this.form[field] = 0;
				if (tipo === "string") this.form[field] = "";
			}
		},
		async salvar() {
			try {
				const { contaOrigemId, contaDestinoId } = this.form;
				if (contaOrigemId === contaDestinoId) {
					this.$root.$emit(
						"sweet-toast::show",
						new Toast("Contas selecionadas são a mesma!", "warning")
					);
					return;
				}
				this.loading = true;
				await this.ActionAdicionarTransferencia(this.form);

				this.$root.$emit(
					"sweet-toast::show",
					new Toast("Transferência realizada com sucesso!", "success")
				);

				// this.resetForm();
				this.dialog = false;
			} catch (error) {
				console.log(error);
				const err = error.body;

				if (err.length) {
					err.forEach((e) =>
						this.$root.$emit("notification::show", e)
					);
				}
				this.$root.$emit(
					"sweet-toast::show",
					new Toast(
						error.data.message || "Erro ao realizar a operação!",
						"error"
					)
				);
			} finally {
				this.loading = false;
			}
		},
	},

	computed: {
		...mapState("auth", ["user"]),
		...mapState("conta", ["contas"]),
	},

	mounted() {
		this.ActionListarContasPorUsuario({ id: this.user.id });
	},
	created() {
		this.$root.$on(
			"transferencia-form::show",
			(payload) => (this.dialog = true)
		);
	},
};
</script>