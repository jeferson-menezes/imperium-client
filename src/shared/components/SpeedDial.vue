<template>
  <v-speed-dial
    :absolute="true"
    v-model="fab"
    :top="false"
    :left="false"
    :bottom="true"
    :right="true"
    :open-on-hover="false"
    direction="top"
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="orange" dark fab>
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-plus </v-icon>
      </v-btn>
    </template>

    <v-btn
      fab
      dark
      small
      color="purple"
      v-on:click="$root.$emit('transferencia-form::show', '')"
    >
      <v-icon>mdi-swap-horizontal </v-icon>
    </v-btn>

    <v-btn
      fab
      dark
      small
      color="green"
      v-on:click="$root.$emit('receita-form::show', '')"
    >
      <v-icon>mdi-finance</v-icon>
    </v-btn>

    <v-btn
      fab
      dark
      small
      color="red"
      v-on:click="$root.$emit('despesa-form::show', '')"
    >
      <v-icon>mdi-cart-arrow-down</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: "SpeedDial",

  components: {},

  data: () => ({
    fab: false,
  }),
};
</script>

<style>
</style>