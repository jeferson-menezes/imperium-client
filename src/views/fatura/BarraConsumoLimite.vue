<template>
	<v-row no-gutters>
		<v-col cols="8">
			<v-progress-linear
				value="100"
				color="green"
				height="15"
			></v-progress-linear>
		</v-col>
		<v-col cols="2">
			<v-progress-linear
				color="blue"
				value="100"
				height="15"
			></v-progress-linear>
		</v-col>
		<v-col cols="2">
			<v-progress-linear
				color="orange"
				value="100"
				height="15"
			></v-progress-linear>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: "BarraConsumoLimite",
	props: {
		limite: { type: Number },
		atual: { type: Number },
		futuras: { type: Number },
	},

    methods:{

    }
};
</script>