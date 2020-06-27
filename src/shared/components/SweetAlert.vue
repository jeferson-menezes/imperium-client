<template></template>

<script>
import Swal from "sweetalert2/dist/sweetalert2";
//SUCCESS ERROR   WARNING   INFO

const title = {
	success: "Sucesso!",
	error: "Erro!",
	warning: "Alerta!",
	info: "Informação!"
};
export default {
	name: "SweetAlert",

	data: () => ({
		time: 0,
		message: "",
		type: ""
	}),

	methods: {
		show() {
			Swal.fire({
				icon: this.type || "error",
				title: title[this.type],
				text: this.message,
				timer: this.time || 3000
			});
		}
	},

	created() {
		this.$root.$on("sweet-alert::show", payload => {
			this.time = payload.time;
			this.message = payload.message;
			this.type = payload.type;
			this.title = payload.title;
			this.show();
		});
	}
};
</script>