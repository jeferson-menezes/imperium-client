<template></template>

<script>
import Swal from "sweetalert2/dist/sweetalert2";
//SUCCESS ERROR   WARNING   INFO
export default {
	name: "SweetToast",

	data: () => ({
		time: 0,
		message: "",
		type: ""
	}),

	methods: {
		show() {
			const Toast = Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: this.time || 4000,
				timerProgressBar: true,
				onOpen: toast => {
					toast.addEventListener("mouseenter", Swal.stopTimer);
					toast.addEventListener("mouseleave", Swal.resumeTimer);
				}
			});

			Toast.fire({
				title: this.message,
				icon: this.type || "error"
			});
		}
	},

	created() {
		this.$root.$on("sweet-toast::show", payload => {
			this.time = payload.time;
			this.message = payload.message;
			this.type = payload.type;
			this.show();
		});
	}
};
</script>