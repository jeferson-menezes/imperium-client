<template></template>

<script>
import Swal from "sweetalert2/dist/sweetalert2";

export default {
	name: "SweetConfirm",
	data: () => ({
		message: "",
		title: ""
	}),

	methods: {
		show() {
			const Question = Swal.fire({
				title: this.title || "Confirme",
				text: this.message,
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Sim",
				cancelButtonText: "Não"
			}).then(result => {
				this.emite(result);
			});
		},
		emite(result) {
			this.$root.$emit("sweet-confirm::result", result.isConfirmed);
		}
	},

	created() {
		this.$root.$on("sweet-confirm::show", payload => {
			this.message = payload.message;
			this.title = payload.title;
			this.show();
		});
	}
};
</script>