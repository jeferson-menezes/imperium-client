<template>
    <v-menu offset-y>
      <template v-slot:activator="{ on: menu, attrs }">
            <v-btn v-bind="attrs"
              v-on="{...menu }" fab small color="green accent-3" elevation="0">
				<v-icon medium color="white">mdi-account-circle</v-icon>
			</v-btn>
      </template>
      <v-list flat>
        <v-list-item link @click="logout">
            <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>
<script>
import { mapActions } from "vuex";

export default {
    name: "Logout",

    methods: {
        ...mapActions("auth",["ActionLogout"]),

        logout() {
            this.ActionLogout()

            this.$router.push({name: 'login'})
        }
    },



}
</script>