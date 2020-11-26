<template>
		<v-container class="fill-height" fluid>
			<v-row align="center" justify="center">
				<v-col cols="12" sm="8" md="5" lg="4">
					<v-card class="elevation-1" tile>
						<v-toolbar color="info" dark flat>
							<v-toolbar-title>Logue para acessar o sistema</v-toolbar-title>
						</v-toolbar>

						<v-card-text class="pa-5">
							<v-form ref="form">
								<v-text-field
									v-model="form.email"
									:rules="rules.email"
									label="E-mail"
									prepend-icon="mdi-account"
									type="email"
								></v-text-field>

								<v-text-field
									v-model="form.senha"
									:rules="rules.senha"
									label="Senha"
									prepend-icon="mdi-lock"
									type="password"
								></v-text-field>
							</v-form>
						</v-card-text>
						<v-card-actions class="pa-5">
							<v-spacer></v-spacer>
							<v-btn
								class="ma-2"
								@click="logar()"
								:loading="loading"
								:disabled="loading"
								tile
								color="info"
							>Logar</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
</template>

<script>
import { mapActions } from "vuex";
import { required, email } from "../../shared/rules";
import { Toast } from "../../shared/models/toast"

export default {
	name: "Login",
	data: () => ({
		loading: false,
		form: {
			email: "",
			senha: ""
		},
		rules: {
			email: [
				required("O e-mail é obrigatorio"),
				email("E-mail inválido!")
			],
			senha: [required("A senha é obrigatorio")]
		}
	}),
	methods: {
		...mapActions("auth", ["ActionLogar"]),

		async logar() {
			if (!this.$refs.form.validate()) return;

			try {
				this.loading = true;

				await this.ActionLogar(this.form);

				this.$router.push({ name: "home" });
			} catch (error) {
				console.error(error);
				const err = error.body;
				if (err.length) {
					err.forEach(e => this.$root.$emit("notification::show", e));
				}
				this.$root.$emit(
					"sweet-toast::show",
					new Toast(
						"Usuário ou senha inválido!",
						"error"
					)
				);
			} finally {
				this.loading = false;
			}
		}
	}
};
</script>