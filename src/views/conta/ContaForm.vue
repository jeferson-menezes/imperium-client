<template>
	<v-dialog v-model="dialog" persistent max-width="330px">
		<v-card>
			<v-card-title>
				<span class="headline"
					>{{ form.id ? "Atualizar" : "Adicionar" }} Conta</span
				>
			</v-card-title>
			<v-card-text>
				<v-form ref="form" v-model="valid">
					<v-currency-field
						v-show="!form.id"
						v-model="form.saldo"
						:rules="rules.saldo"
						label="Saldo"
					/>

					<v-text-field
						v-model="form.nome"
						:rules="rules.nome"
						label="Nome"
					></v-text-field>

					<v-text-field
						v-model="form.descricao"
						:rules="rules.descricao"
						label="Descrição"
					></v-text-field>

					<v-select
						v-model="form.tipoContaId"
						:items="tiposConta"
						item-value="id"
						item-text="nome"
						label="Tipo de conta"
					></v-select>

					<v-row justify="space-around">
						<v-switch
							v-model="form.incluiSoma"
							:label="
								form.incluiSoma
									? 'Incluir as somas'
									: 'Não incluir as somas'
							"
						></v-switch>

						<v-switch
							v-model="form.ativo"
							:label="form.ativo ? 'Ativo' : 'Inativo'"
						></v-switch>
					</v-row>
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
import { mapActions, mapState } from "vuex";
import { required } from "../../shared/rules";
import { Toast } from "../../shared/models/toast";
import { ContaModel } from "./conta.model";
import VCurrencyField from "../../shared/components/VCurrencyField";

export default {
	name: "ContaForm",

	components: {
		VCurrencyField,
	},

	data: () => ({
		dialog: false,
		valid: false,
		loading: false,
		form: {
			id: 0,
			saldo: 0,
			nome: "",
			descricao: "",
			incluiSoma: true,
			tipoContaId: 0,
			usuarioId: 0,
			ativo: true,
		},
		rules: {
			saldo: [required("O salvo é obrigatório")],
			nome: [required("O Nome é obrigatório")],
			descricao: [required("A descrição é obrigatória")],
		},
	}),

	methods: {
		...mapActions("conta", [
			"ActionListarTipoContas",
			"ActionAdicionarConta",
			"ActionDetalharConta",
			"ActionAtualizarConta",
		]),

		async salvar() {
			this.loading = true;
			try {
				const {
					id,
					ativo,
					saldo,
					nome,
					descricao,
					incluiSoma,
					tipoContaId,
					usuarioId,
				} = this.form;

				const conta = new ContaModel(
					id,
					ativo,
					descricao,
					incluiSoma,
					nome,
					saldo,
					tipoContaId,
					this.user.id
				);

				let message = "Conta cadastrada com sucesso!";

				if (this.form.id) {
					await this.ActionAtualizarConta(conta);
					message = "Conta atualizada com sucesso!";
				} else await this.ActionAdicionarConta(conta);

				this.$root.$emit(
					"sweet-toast::show",
					new Toast(message, "success")
				);

				if (this.form.id) this.close();
				
				this.resetForm();
			} catch (error) {
				const { err } = error.body;

				this.$root.$emit(
					"sweet-toast::show",
					new Toast(
						err.message || "Houve um erro ao adicionar a conta!",
						"error"
					)
				);
			} finally {
				this.loading = false;
			}
		},

		async populaForm(payload) {
			try {
				const conta = await this.ActionDetalharConta({ id: payload });
				Object.keys(conta.data).forEach((e) => {
					if (e === "tipo")
						this.form.tipoContaId = conta.data.tipo.id;
					else this.form[e] = conta.data[e];
				});
			} catch (error) {
				console.error(error);
			}
		},

		resetForm() {
			this.form.nome = "";
			this.form.descricao = "";
			this.form.id = 0;
			this.form.saldo = 0;
			this.form.tipoContaId = 0;
			this.form.usuarioId = 0;
			this.form.incluiSoma = true;
			this.form.ativo = true;
			this.$refs.form.reset();
		},

		close() {
			this.dialog = false;
		},
	},

	computed: {
		...mapState("conta", ["tiposConta"]),
		...mapState("auth", ["user"]),
	},

	mounted() {
		this.ActionListarTipoContas();
	},

	created() {
		this.$root.$on("conta-form::show", (payload) => {
			if (payload) {
				this.populaForm(payload);
			}
			this.dialog = true;
		});
	},
};
</script>