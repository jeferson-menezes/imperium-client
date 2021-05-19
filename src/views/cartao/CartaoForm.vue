<template>
	<v-dialog v-model="dialog" persistent max-width="330px">
		<v-card>
			<v-card-title>
				<span class="headline"
					>{{ form.id ? "Atualizar" : "Adicionar" }} Cartão</span
				>
			</v-card-title>
			<v-card-text>
				<v-form ref="form" v-model="valid">
					<v-text-field
						v-model="form.nome"
						:rules="rules.nome"
						label="Nome"
					></v-text-field>

					<v-currency-field
						v-model="form.limite"
						:rules="rules.limite"
						label="Limite"
					/>

					<v-text-field
						v-model="form.diaFechamento"
						:rules="rules.diaFechamento"
						label="Dia de fechamento"
					></v-text-field>

					<v-text-field
						v-model="form.diaVencimento"
						:rules="rules.diaVencimento"
						label="Dia de vencimento"
					></v-text-field>

					<v-select
						v-model="form.bandeiraId"
						:items="bandeiras"
						item-value="id"
						item-text="nome"
						label="Bandeiras"
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
import { mapActions, mapState } from "vuex";
import VCurrencyField from "../../shared/components/VCurrencyField";
import { Toast } from "../../shared/models/toast";
import { maxNum, minNum, required } from "../../shared/rules";
import { Cartao } from "./cartao.model";

export default {
	name: "CartaoForm",

	components: {
		VCurrencyField,
	},

	data: () => ({
		dialog: false,
		valid: false,
		loading: false,
		form: {
			id: null,
			nome: "",
			limite: 0,
			bandeiraId: null,
			diaFechamento: 0,
			diaVencimento: 0,
			usuarioId: null,
		},
		rules: {
			nome: [required("O nome é obrigatório!")],
			limite: [required("O limete é obrigatório!")],
			bandeiraId: [required("A bandeira é obrigatória!")],
			diaFechamento: [
				minNum("O minimo é 1", 1),
				maxNum("O limite é 31", 31),
			],
			diaVencimento: [
				required("O dia de vencimento é obrigatório!"),
				minNum("O minimo é 1", 1),
				maxNum("O limite é 31", 31),
			],
			usuarioId: [],
		},
	}),

	computed: {
		...mapState("cartao", ["bandeiras"]),
		...mapState("auth", ["user"]),
	},

	methods: {
		...mapActions("cartao", [
			"ActionListarBandeiras",
			"ActionAdicionarCartao",
		]),

		async salvar() {
			try {
				this.loading = true;

				const cartao = new Cartao();

				Object.assign(cartao, this.form);

				cartao.usuarioId = this.user.id;

				let message = "Cartão cadastrado com sucesso!";

				if (cartao.id) {
				} else {
					await this.ActionAdicionarCartao(cartao);
				}

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
						err.message || "Houve um erro ao adicionar o cartão!",
						"error"
					)
				);
			} finally {
				this.loading = false;
			}
		},

		resetForm() {
			this.$refs.form.reset();
		},

		close() {
			this.dialog = false;
		},
	},

	mounted() {
		this.ActionListarBandeiras();
	},

	created() {
		this.$root.$on("cartao-form::show", (payload) => {
			this.dialog = true;
		});
	},
};
</script>