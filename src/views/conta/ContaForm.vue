<template>
	<v-dialog v-model="dialog" persistent max-width="330px">
		<v-card>
			<v-card-title>
				<span class="headline">Adicionar Conta</span>
			</v-card-title>
			<v-card-text>
				<v-form ref="form" v-model="valid">
					<v-text-field
						v-money="money"
						v-model.lazy="form.saldo"
						:rules="rules.saldo"
						label="Saldo"
						type="text"
					></v-text-field>
					<v-text-field v-model="form.nome" :rules="rules.nome" label="Nome"></v-text-field>
					<v-text-field v-model="form.descricao" :rules="rules.descricao" label="Descrição"></v-text-field>

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
							:label=" form.incluiSoma ?'Incluir as somas' :'Não incluir as somas'"
						></v-switch>
						<v-switch v-model="form.ativo" :label=" form.ativo ?'Ativo' :'Inativo'"></v-switch>
					</v-row>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="dialog = false">cancelar</v-btn>
				<v-btn :loading="loading" :disabled="!valid" color="blue darken-1" text @click="salvar()">salvar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>


<script>
import { mapActions, mapState } from "vuex";
import { required } from "../../shared/rules";
import { Toast } from "../../shared/models/toast";
import { moeda, toDolar } from "../../shared/helpers/currency";
import { Conta } from "./conta";

export default {
	name: "ContaForm",

	data: () => ({
		money: moeda,
		dialog: false,
		valid: false,
		loading: false,
		form: {
			saldo: 0,
			nome: "",
			descricao: "",
			incluiSoma: true,
			tipoContaId: 0,
			usuarioId: 0,
			ativo: true
		},
		rules: {
			saldo: [required("O salvo é obrigatório")],
			nome: [required("O Nome é obrigatório")],
			descricao: [required("A descrição é obrigatória")]
		}
	}),

	methods: {
		...mapActions("conta", [
			"ActionListarTipoContas",
			"ActionAdicionarConta"
		]),

		async salvar() {
			this.loading = true;
			try {
                const {ativo, saldo, nome, descricao, incluiSoma, tipoContaId, usuarioId } = this.form
                const conta = new Conta(ativo, descricao, incluiSoma, nome, toDolar(saldo), tipoContaId, this.user.id);
                
                console.log(conta);
                
				let message = "Conta cadastrada com sucesso!";
				await this.ActionAdicionarConta(conta);

				this.$root.$emit(
					"sweet-toast::show",
					new Toast("Conta cadastrada com sucesso!", "success")
				);
				this.$refs.form.reset();
				this.dialog = false;
			} catch (error) {
                console.log(error);
                
				this.$root.$emit(
					"sweet-toast::show",
					new Toast("Houve um erro ao adicionar a conta!", "error")
				);
			} finally {
				this.loading = false;
			}
		}
	},

	computed: {
		...mapState("conta", ["tiposConta"]),
		...mapState("auth", ["user"])
	},

	mounted() {
		this.ActionListarTipoContas();
	},

	created() {
		this.$root.$on("conta-form::show", payload => {
			this.dialog = true;
		});
	}
};
</script>