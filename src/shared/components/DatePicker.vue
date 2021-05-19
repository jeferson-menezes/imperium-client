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
	name: "DatePicker",

	props: ["value"],

	data: vm => ({
		date: vm.value || vm.formataUS(new Date()),
		dateFormatted: vm.formatDate(vm.value ) || vm.formatDate(vm.formataUS(new Date())),
		menu: false
	}),

	watch: {
		value(val) {
			this.dateFormatted = this.formatDate(this.value);
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
			this.$emit("input", this.date);
		},
        formataUS(data) {
			const day = data.getDate().toString().padStart(2, "0");
			const month = (data.getMonth() + 1).toString().padStart(2, "0");
			const year = data.getFullYear();
			return `${year}-${month}-${day}`;
		},
	},
	mounted() {
		this.$emit("input", this.date);
	}
};
</script>