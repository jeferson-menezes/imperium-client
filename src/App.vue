<template>
  <v-app>
    <loading-overlay></loading-overlay>
    <sweet-toast></sweet-toast>
    <sweet-confirm></sweet-confirm>
    <sweet-alert></sweet-alert>
    <notification></notification>
    <Calculadora />

    <v-navigation-drawer v-if="isLogged()" app v-model="drawer">
      <DespesaForm />
      <ReceitaForm />
      <TransferenciaForm />
      <v-list>
        <v-list-item
          v-for="(item, index) in routerLinks"
          :key="index"
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.meta.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      v-show="isLogged()"
      dense
      app
      flat
      color="transparent"
      elevation="1"
    >
      <v-btn fab small color="green accent-3" class="mr-5">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="white--text"
        ></v-app-bar-nav-icon>
      </v-btn>
      <v-toolbar-title>Imperium</v-toolbar-title>
      <loading-progress></loading-progress>
      <v-spacer></v-spacer>
      <!-- <v-btn fab small color="green accent-3" elevation="0">
				<v-icon medium color="white">mdi-account-circle</v-icon>
			</v-btn> -->
      <v-btn
        class="mx-2"
        fab
        dark
        small
        color="primary"
        @click="toogleCalculadora"
      >
        <v-icon dark> mdi-calculator-variant </v-icon>
      </v-btn>
      <Logout />
    </v-app-bar>

    <v-main style="background: #fafafa">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer v-show="isLogged()" app class="mt-3">
      <v-row align="center" justify="space-around">
        Jeferson Menezes - 2020 - Version: 1.0.4
      </v-row>
      <SpeedDial />
    </v-footer>
  </v-app>
</template>

<script>
import store from "./store";
import SweetToast from "./shared/components/SweetToast.vue";
import SweetConfirm from "./shared/components/SweetConfirm";
import SweetAlert from "./shared/components/SweetAlert";
import LoadingProgress from "./shared/components/LoadingProgress";
import LoadingOverlay from "./shared/components/LoadingOverlay";
import Notification from "./shared/components/Notifications";
import Logout from "./core/auth/Logout";
import Calculadora from "./shared/components/Calculadora";
import SpeedDial from "./shared/components/SpeedDial.vue";

import DespesaForm from "./views/despesa/DespesaForm";
import ReceitaForm from "./views/receita/ReceitaForm";
import TransferenciaForm from "./views/transferencia/TransferenciaForm.vue";

export default {
  name: "App",

  components: {
    SweetToast,
    SweetConfirm,
    SweetAlert,
    LoadingProgress,
    LoadingOverlay,
    Notification,
    Logout,
    Calculadora,
    SpeedDial,
    DespesaForm,
    ReceitaForm,
    TransferenciaForm,
  },

  data: () => ({
    drawer: false,
  }),

  methods: {
    isLogged() {
      return store.getters["auth/hasToken"];
    },

    toogleCalculadora() {
      this.$root.$emit("calculadora::toogle");
    },
  },

  computed: {
    routerLinks() {
      return this.$router.options.routes.filter((r) => r.meta.show);
      // return this.$router.options.routes.filter(
      // 	(r) => r.name !== "login"
      // );
    },
  },

  mounted() {
    this.$root.$emit("loading-overlay::hide");
  },
};
</script>
