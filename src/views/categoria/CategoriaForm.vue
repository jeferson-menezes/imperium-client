<template>
	<v-row justify="center">
		<icon-pickers @icone-selecionado="iconeSelecionado"></icon-pickers>
		<color-pickers @cor-selecionada="corSelecionada"></color-pickers>

		<v-dialog v-model="dialog" persistent max-width="350px">
			<v-card>
				<v-card-title>
					<span class="headline">Adicionar Categoria</span>
				</v-card-title>
				<v-card-text>
					<v-form ref="form" v-model="valid">
						<v-row>
							<v-col cols="12">
								<v-radio-group
									v-model="form.natureza"
									:rules="rules.natureza"
									row
								>
									<v-radio
										label="Despesa"
										color="red"
										value="DESPESA"
									></v-radio>
									<v-radio
										label="Receita"
										color="success"
										value="RECEITA"
									></v-radio>
								</v-radio-group>
							</v-col>
							<v-col cols="12">
								<v-text-field
									v-model="form.nome"
									:rules="rules.nome"
									label="Nome"
									type="text"
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field
									v-model="form.descricao"
									:rules="rules.descricao"
									label="Descrição"
									type="text"
								></v-text-field>
							</v-col>
							<v-col cols="8">
								<v-container>
									<v-row justify="space-between">
										<v-col class="pl-0 pr-0">
											<v-btn
												class="pa-0 ma-0"
												text
												small
												color="primary"
												@click="
													$root.$emit(
														'icon-pickers::show'
													)
												"
												>icone</v-btn
											>
										</v-col>
										<v-col class="pl-0 pr-0">
											<v-btn
												class="pa-0 ma-0"
												text
												small
												color="primary"
												@click="
													$root.$emit(
														'cor-pickers::show'
													)
												"
												>cor</v-btn
											>
										</v-col>
										<v-col class="pl-0 pr-0">
											<v-icon
												class="pa-0 ma-0"
												:color="form.cor"
												>mdi-{{ form.icone }}</v-icon
											>
										</v-col>
									</v-row>
								</v-container>
							</v-col>
							<v-col cols="4">
								<v-switch
									v-model="form.ativo"
									:label="form.ativo ? 'Ativo' : 'Inativo'"
								></v-switch>
							</v-col>
						</v-row>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialog = false"
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
	</v-row>
</template>

<script>
import { required } from "../../shared/rules";
import IconPickers from "../../shared/components/IconPickers";
import ColorPickers from "../../shared/components/ColorPickers";
import { Toast } from "../../shared/models/toast";
import { mapActions } from "vuex";

export default {
	name: "CategoriaForm",

	components: { IconPickers, ColorPickers },

	data: () => ({
		dialog: false,
		valid: true,
		loading: false,
		form: {
			id: 0,
			nome: "",
			descricao: "",
			natureza: "DESPESA",
			ativo: true,
			icone: "",
			cor: "",
		},
		rules: {
			natureza: [required("A natureza é obrigatória")],
			nome: [required("O nome é obrigatório")],
			descricao: [required("A descrição é obrigatória")],
			natureza: [required("A natureza é obrigatória")],
		},
	}),

	methods: {
		...mapActions("categoria", [
			"ActionAdicionarCategoria",
			"ActionAtualizarCategoria",
		]),

		iconeSelecionado(payload) {
			this.form.icone = payload;
		},
		corSelecionada(payload) {
			this.form.cor = payload;
		},

		async salvar() {
			if (!this.form.cor || !this.form.icone) {
				this.$root.$emit(
					"sweet-toast::show",
					new Toast("Selecione um icone e uma cor!", "info")
				);
				return;
			}

			this.loading = true;
			try {
				let message = "Categoria acadastrada com sucesso!";
				if (this.form.id) {
					await this.ActionAtualizarCategoria(this.form);
					message = "Categoria atualizada com sucesso!";
				} else await this.ActionAdicionarCategoria(this.form);

				this.$root.$emit(
					"sweet-toast::show",
					new Toast(message, "success")
				);

				if (this.form.id) this.close();
				
				this.$refs.form.reset();
				this.dialog = false;
			} catch (error) {
				console.error(error);
				this.$root.$emit(
					"sweet-toast::show",
					new Toast(
						"Houve um erro ao adicionar a categoria!",
						"error"
					)
				);
			} finally {
				this.loading = false;
			}
		},

		populaForm(payload) {
			Object.keys(payload).forEach((e) => {
				this.form[e] = payload[e];
			});
		},
	},

	created() {
		this.$root.$on("categoria-form::show", (payload) => {
			if (payload) {
				this.populaForm(payload);
			}

			this.dialog = true;
		});
	},
};
</script>