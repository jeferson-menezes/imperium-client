<template>
	<v-menu
		ref="menu"
		v-model="menu"
		:close-on-content-click="false"
		transition="scale-transition"
		offset-y
		max-width="250px"
		min-width="250px"
	>
		<template v-slot:activator="{ on }">
			<v-text-field
				v-model="time"
				label="Hora"
				prepend-icon="mdi-clock-outline"
				readonly
				v-on="on"
			></v-text-field>
		</template>
		<v-time-picker
			v-if="menu"
			v-model="time"
			full-width
			format="24hr"
			@click:minute="seleciona"
		></v-time-picker>
	</v-menu>
</template>

<script>
export default {
	name: "TimePickers",

	props: ["value"],

	data: (vm) => ({
		menu: false,
		time: vm.value || new Date().toLocaleTimeString().substr(0, 5),
	}),

	watch: {
		value(v) {
			console.log(this.value);
			this.time = this.value.substr(0, 5)
		},
	},

	methods: {
		seleciona() {
			this.menu = false;
			this.$emit("input", this.time);
		},
	},

	mounted() {
		this.$emit("input", this.time);
	},
};
</script>