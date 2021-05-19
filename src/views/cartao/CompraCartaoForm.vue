<template>
	<v-dialog v-model="dialog" persistent max-width="330px">
		<v-card>
			<v-card-title>
				<span class="headline"
					>{{ form.id ? "Atualizar" : "Adicionar" }} Compra
					cartão</span
				>
			</v-card-title>
			<v-card-subtitle v-if="cartao">
				{{ cartao.nome }}
			</v-card-subtitle>
			<v-card-text>
				<v-form ref="form" v-model="valid">
					<v-text-field
						v-model="form.descricao"
						:rules="rules.descricao"
						label="Descricão"
					></v-text-field>

					<v-currency-field
						v-model="valor"
						:rules="rules.valor"
						label="Valor"
					/>

					<v-row>
						<v-col>
							<v-text-field
								v-model="parcelas"
								:rules="rules.parcelas"
								label="Parcelas"
								type="number"
							></v-text-field>
						</v-col>
						<v-col>
							<v-currency-field
								readonly
								v-model="form.valorParcela"
								:rules="rules.valorParcela"
								:disable="true"
								label="Valor da parcela"
							/>
						</v-col>
					</v-row>

					<v-select
						v-model="form.categoriaId"
						:items="categorias"
						:rules="rules.categoriaId"
						item-value="id"
						item-text="nome"
						label="Categoria"
					></v-select>

					<v-row>
						<v-col>
							<date-picker v-model="form.data"></date-picker>
						</v-col>
						<v-col>
							<time-pickers v-model="form.hora"></time-pickers>
						</v-col>
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
import VCurrencyField from "../../shared/components/VCurrencyField";
import DatePicker from "../../shared/components/DatePicker";
import TimePickers from "../../shared/components/TimePicker";
import { minNum, required } from "../../shared/rules";
import { Compra } from "./compra.model";
import { Toast } from "../../shared/models/toast";

export default {
	name: "CompraCartao",

	components: {
		VCurrencyField,
		DatePicker,
		TimePickers,
	},

	data: () => ({
		dialog: false,
		loading: false,
		valid: false,
		valor: 0,
		parcelas: 1,
		cartao: null,
		form: {
			descricao: "",
			data: "",
			hora: "",
			valorParcela: 0,
			cartaoId: null,
			categoriaId: null,
		},
		rules: {
			valor: [required("O valor é obrigatório!")],
			valorParcela: [required("O valor é obrigatório!")],
			descricao: [required("A descrição é obrigatória!")],
			parcelas: [minNum("O valor mínimo é 1", 1)],
			categoriaId: [required("A categoria é obrigatória!")],
		},
	}),

	computed: {
		...mapState("categoria", ["categorias"]),
	},

	watch: {
		valor(a) {
			this.calculaParcelas();
		},

		parcelas(a) {
			this.calculaParcelas();
		},
	},

	methods: {
		...mapActions("categoria", ["ActionListarCategoriasPorNatureza"]),

		...mapActions("cartao", ["ActionAdicionarCompraCartao"]),

		salvar() {
			try {
				this.loading = true;

				const compra = new Compra();

				Object.assign(compra, this.form);

				compra.cartaoId = this.cartao.id;
				compra.parcelas = this.parcelas;
				compra.valor = this.valor;

				this.ActionAdicionarCompraCartao(compra);

				this.$root.$emit(
					"sweet-toast::show",
					new Toast("Compra adicionada com sucesso!", "success")
				);

				this.$refs.form.reset();
			} catch (error) {
				const { err } = error.body;

				this.$root.$emit(
					"sweet-toast::show",
					new Toast(
						err.message || "Houve um erro ao adicionar a compra!",
						"error"
					)
				);
			} finally {
				this.loading = false;
			}
		},

		close() {
			this.$refs.form.reset();
			this.dialog = false;
		},

		calculaParcelas() {
			if (this.parcelas <= 0) this.form.valorParcela = 0;
			else
				this.form.valorParcela =
					Math.floor((this.valor / this.parcelas) * 100) / 100;
		},
	},

	mounted() {
		this.ActionListarCategoriasPorNatureza({ natureza: "DESPESA" });
	},

	created() {
		this.$root.$on("compra-cartao-form::show", (payload) => {
			this.cartao = payload;
			this.dialog = true;
		});
	},
};
</script>