<template>
	<v-overlay :z-index="203" :value="notifications.length">
		<v-alert
			v-for="(n, i) in notifications"
			:key="i"
			dense
			transition="slide-y-transition"
			type="warning"
		>{{n.campo}} - {{n.erro}}.</v-alert>
	</v-overlay>
</template>

<script>
export default {
	name: "Notification",

	data: () => ({
		notifications: []
	}),

	methods: {
		removeNotification(toRemove) {
			this.notifications = this.notifications.filter(
				notification => notification != toRemove
			);
		}
	},

	mounted() {
		this.$root.$on("notification::show", notification => {
			if (!notification) {
				this.notifications = [];
				return;
			}

			this.notifications.push(notification);
			setTimeout(() => {
				this.removeNotification(notification);
			}, 3000);
		});
	}
};
</script>