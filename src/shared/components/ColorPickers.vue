<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" persistent max-width="400px">
			<v-card>
				<v-card-title>
					<v-row justify="space-between">
						<span class="headline">Selecione uma cor</span>

						<v-btn fab small elevation="0" v-on:click="close()">
							<v-icon>mdi-close</v-icon>
						</v-btn>
					</v-row>
				</v-card-title>
				<v-card-text>
					<v-row>
						<v-col cols="6">
							<v-text-field
								@keyup="filtraPorNome()"
								v-model="form.nome"
								label="Filtrar por nome"
								type="text"
							></v-text-field>
						</v-col>
						<v-col cols="6">
							<v-select
								v-model="form.paleta"
								@change="filtraPorCategoria()"
								item-text="name"
								:items="data.paletas"
								label="Filtrar por paleta"
							></v-select>
						</v-col>
					</v-row>
					<v-row justify="space-around">
						<v-progress-circular v-show="loading" :width="3" color="green" indeterminate></v-progress-circular>
						<v-btn
							@click="showDialogConfirma(cor)"
							elevation="0"
							class="ma-1"
							small
							v-for="(cor, index) in data.cores"
							:key="index"
							:color="cor.name"
						>
				
							<v-tooltip bottom>
								<template v-slot:activator="{on}">
									<span v-on="on">&#9757;</span>
								</template>
								<span>{{cor.name}}</span>
							</v-tooltip>
						</v-btn>
					</v-row>
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-dialog v-model="dialogConfirm" transition="dialog-transition" width="250px">
			<v-card>
				<v-card-title primary-title>
					<v-row justify="space-between">
						<span>Confirma a cor</span>
						<v-btn fab small elevation="0" v-on:click="dialogConfirm=false">
							<v-icon>mdi-close</v-icon>
						</v-btn>
					</v-row>
				</v-card-title>
				<v-card-text>
					<v-row align="center" justify="center" class="ma-2">
						<v-btn block :color="cor.name">&#9996;</v-btn>
					</v-row>
					<v-row align="center" justify="center" class="ma-2">
						<span>{{cor.name}} {{cor.hexa}}</span>
					</v-row>
				</v-card-text>
				<v-card-actions>
					<v-btn color="blue darken-1" text @click="dialogConfirm = false">cancelar</v-btn>
					<v-btn color="blue darken-1" text @click="seleciona()">selecionar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import { http } from "../../http";
import { icons } from "../../http/apis";

export default {
	name: "ColorPickers",

	data: () => ({
		dialog: false,
		dialogConfirm: false,
		timer: 0,
		loading: false,
		form: { nome: "", paleta: "" },
		data: { paletas: [], cores: [] },
		cor: {}
	}),

	methods: {
		filtraPorCategoria() {
			this.data.cores = [];
			if (!this.form.paleta) return;
			this.loading = true;
			http.get(icons + "colors?palette=" + this.form.paleta)
				.then(res => (this.data.cores = res.body))
				.finally(() => (this.loading = false));
		},

		filtraPorNome() {
			this.data.cores = [];
			if (!this.form.nome) return;
			this.form.paleta = "";
			if (this.timer) clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.loading = true;

				http.get(icons + "colors/filtrar?nome=" + this.form.nome)
					.then(res => (this.data.cores = res.body))
					.finally(() => (this.loading = false));
			}, 300);
		},

		showDialogConfirma(cor) {
			this.cor = cor;
			this.dialogConfirm = true;
		},

		seleciona() {
			this.$emit("cor-selecionada", this.cor.name);
			this.dialogConfirm = false;
			this.close();
		},

		close() {
			this.dialog = false;
			this.form.nome = "";
			this.form.tag = "";
			this.data.cores = [];
		}
	},

	created() {
		this.$root.$on("cor-pickers::show", () => {
			this.dialog = true;
		});
	},
	mounted() {
		http.get(icons + "colors/palettes").then(
			res => (this.data.paletas = res.body)
		);
	}
};
</script>