<template>
	<!-- <div class="text-center"> -->
		<v-overlay color="cyan" absolute :value="overlay">
			<v-progress-circular color="blue" indeterminate size="64"></v-progress-circular>
		</v-overlay>
	<!-- </div> -->
</template>

<script>
export default {
	name: "LoadingOverlay",

	data: () => ({
		overlay: true
	}),

	created() {
		this.$root.$on("loading-overlay::hide", () => (this.overlay = false));
	}
};
</script>