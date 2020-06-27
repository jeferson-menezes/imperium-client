<template>
	<v-progress-linear :active="loading" :indeterminate="loading" absolute top color="cyan"></v-progress-linear>
</template>

<script>
export default {
	name: "LoadingProgress",

	data: () => ({
		loading: false
	}),

	created() {
		this.$root.$on("loading-progress::show", () => (this.loading = true));
		this.$root.$on("loading-progress::hide", () => (this.loading = false));
	}
};
</script>