<template>
	<v-menu
		v-model="menu"
		:close-on-content-click="false"
		transition="scale-transition"
		offset-y
		max-width="290px"
		min-width="290px"
	>
		<template v-slot:activator="{on}">
			<v-text-field
				v-model="dateFormatted"
				label="Data"
				persistent-hint
				prepend-icon="mdi-calendar"
				readonly
				v-on="on"
			></v-text-field>
		</template>
		<v-date-picker @input="seleciona" locale="pt-BR" v-model="date" no-title></v-date-picker>
	</v-menu>
</template>

<script>
export default {
	name: "DatePickers",

	data: vm => ({
		date: new Date().toISOString().substr(0, 10),
		dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
		menu: false
	}),

	watch: {
		date(val) {
			this.dateFormatted = this.formatDate(this.date);
		}
	},

	methods: {
		formatDate(date) {
			if (!date) return null;

			const [year, month, day] = date.split("-");
			return `${day}/${month}/${year}`;
		},
		seleciona() {
			this.menu = false;
			this.$emit("data-selecionada", this.date);
		}
	},
	mounted() {
		this.$emit("data-selecionada", this.date);
		this.$root.$on("seleciona-data", payload => {
			this.dateFormatted = this.formatDate(payload);
		});
	}
};
</script>