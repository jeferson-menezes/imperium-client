<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" persistent max-width="400px">
			<v-card>
				<v-card-title>
					<v-row justify="space-between">
						<span class="headline">Selecione um icone</span>

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
								v-model="form.tag"
								@change="filtraPorCategoria()"
								item-text="name"
								:items="data.tags"
								label="Filtrar por tags"
							></v-select>
						</v-col>
					</v-row>
					<v-row justify="space-around">
						<v-progress-circular v-show="loading" :width="3" color="green" indeterminate></v-progress-circular>
						<v-btn
							@click="showDialogConfirma(icon)"
							color="transparent"
							elevation="0"
							class="mx-1"
							fab
							small
							v-for="(icon, index) in data.icons"
							:key="index"
						>
							<v-tooltip top>
								<template v-slot:activator="{on,attrs}">
									<v-icon v-bind="attrs" v-on="on">mdi-{{icon.name}}</v-icon>
								</template>
								<span>{{icon.name}}</span>
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
						<span>Confirma o icone</span>
						<v-btn fab small elevation="0" v-on:click="dialogConfirm=false">
							<v-icon>mdi-close</v-icon>
						</v-btn>
					</v-row>
				</v-card-title>
				<v-card-text>
					<v-row align="center" justify="center">
						<v-icon x-large>mdi-{{icon.name}}</v-icon>
					</v-row>
					<v-row align="center" justify="center">
						<span>{{icon.name}}</span>
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
	name: "IconPickers",

	data: () => ({
		dialog: false,
		dialogConfirm: false,
		timer: 0,
		loading: false,
		form: { nome: "", tag: "" },
		data: { tags: [], icons: [] },
		icon: {}
	}),

	methods: {
		filtraPorCategoria() {
			this.data.icons = [];
			if (!this.form.tag) return;
			this.loading = true;
			http.get(icons + "icons?tag=" + this.form.tag)
				.then(res => (this.data.icons = res.body))
				.finally(() => (this.loading = false));
		},

		filtraPorNome() {
			this.data.icons = [];
			if (!this.form.nome) return;
			this.form.tag = "";
			if (this.timer) clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.loading = true;

				http.get(icons + "icons/filtrar?nome=" + this.form.nome)
					.then(res => (this.data.icons = res.body))
					.finally(() => (this.loading = false));
			}, 300);
		},

		showDialogConfirma(icon) {
			this.icon = icon;
			this.dialogConfirm = true;
		},

		seleciona() {
			this.$emit("icone-selecionado", this.icon.name);
			this.dialogConfirm = false;
			this.close();
		},

		close() {
			this.dialog = false;
			this.form.nome = "";
			this.form.tag = "";
			this.data.icons = [];
		}
	},

	created() {
		this.$root.$on("icon-pickers::show", () => {
			this.dialog = true;
		});
	},
	mounted() {
		http.get(icons + "icons/tags").then(res => (this.data.tags = res.body));
	}
};
</script>