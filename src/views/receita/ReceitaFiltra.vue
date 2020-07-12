<template>
	<v-text-field
		@input="input"
		v-model="filtro"
		append-icon="mdi-magnify"
		:loading="loadingData"
		rounded
		dense
		filled
	></v-text-field>
</template>


<script>
import { mapActions, mapState } from "vuex";

export default {
	name: "ReceitaFiltra",

	props: {
		page: Number
	},

	data: () => ({
		filtro: "",
		loadingData: false,
		timer: 0
	}),

	methods: {
		...mapActions("receita", [
			"ActionListarPorData",
			"ActionListarReceitas",
			"ActionListarPorDescricao",
			"ActionListarPorMes"
		]),

		input() {
			if (this.timer) clearTimeout(this.timer);

			this.timer = setTimeout(() => {
				this.filtrar();
			}, 600);
		},

		async filtrar() {
			if (Number(this.filtro.substr(0, 2))) {
				const patternData = new RegExp(/\d{2}\/\d{2}\/\d{4}/g);

				if (patternData.test(this.filtro)) {
					this.loadingData = true;
					await this.ActionListarPorData({
						id: this.user.id,
						data: this.filtro
							.split("/")
							.reverse()
							.join("-"),
						size: 50,
						page: 0
					}).finally(() => (this.loadingData = false));
				}

				const patternMes = new RegExp(/\d{2}\/\d{4}/g);

				if (patternMes.test(this.filtro)) {
					this.loadingData = true;
					await this.ActionListarPorMes({
						id: this.user.id,
						mes: this.filtro
							.split("/")
							.reverse()
							.join("-"),
						size: 100,
						page: 0
					}).finally(() => (this.loadingData = false));
				}
			} else {
				this.loadingData = true;

				await this.ActionListarPorDescricao({
					id: this.user.id,
					descricao: this.filtro,
					page: this.page - 1,
					size: 10
				}).finally(() => (this.loadingData = false));
			}

			if (!this.filtro) {
				this.loadingData = true;

				await this.ActionListarReceitas({
					page: 0,
					size: 10,
					id: this.user.id
				}).finally(() => (this.loadingData = false));
			}
		}
	},

	computed: {
		...mapState("auth", ["user"])
	}
};
</script>