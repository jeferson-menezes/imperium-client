<template>
	<v-app>
		<loading-overlay></loading-overlay>
		<sweet-toast></sweet-toast>
		<sweet-confirm></sweet-confirm>
		<sweet-alert></sweet-alert>
		<v-navigation-drawer v-show="isLogged()" app v-model="drawer">
			<v-list>
				<v-list-item v-for="(item, index) in routerLinks" :key="index" :to="item.path">
					<v-list-item-icon>
						<v-icon>{{item.meta.icon}}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{item.meta.title}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar v-show="isLogged()" dense app flat>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>Imperium</v-toolbar-title>
			<loading-progress></loading-progress>
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon>mdi-heart</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
		</v-app-bar>

		<v-main style="background:#FAFAFA">
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-main>

		<v-footer v-show="isLogged()" app>Jeferson Menezes 2020</v-footer>
	</v-app>
</template>

<script>
import store from "./store";
import SweetToast from "./shared/components/SweetToast";
import SweetConfirm from "./shared/components/SweetConfirm";
import SweetAlert from "./shared/components/SweetAlert";
import LoadingProgress from "./shared/components/LoadingProgress";
import LoadingOverlay from "./shared/components/LoadingOverlay";

export default {
	name: "App",

	components: {
		SweetToast,
		SweetConfirm,
		SweetAlert,
		LoadingProgress,
		LoadingOverlay
	},

	data: () => ({
		drawer: true
	}),

	methods: {
		isLogged() {
			return store.getters["auth/hasToken"];
		}
	},

	computed: {
		routerLinks() {
			return this.$router.options.routes.filter(r => r.name !== "login");
		}
	},
	mounted() {
		this.$root.$emit("loading-overlay::hide");
	}
};
</script>
