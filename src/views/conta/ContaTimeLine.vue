<template>
  <v-card class="mt-5">
    <v-card-title> Timeline </v-card-title>
    <v-card-text>
      <v-timeline align-top dense>
        <v-timeline-item
          :color="cor(item.natureza)"
          small
          v-for="(item, i) in historias.content"
          :key="i"
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>{{ $parseISO(item.data) | date("dd MMM") }}</strong>
            </v-col>
            <v-col>
              <strong>{{ $toReal(item.valor) }}</strong>
              <div class="caption">{{ item.descricao }}</div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="listar()">
        <v-icon x-large>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ContaTimeLine",

  data: () => ({
    loadingData: false,
    page: 0,
  }),

  computed: {
    ...mapState("historia", ["historias"]),
    ...mapState("auth", ["user"]),
  },

  methods: {
    ...mapActions("historia", ["ActionListarHistoriasPorUsuarios"]),

    cor(natureza) {
      if (natureza === "DESPESA") return "red accent-2";
      if (natureza === "RECEITA") return "green accent-2";
      if (natureza === "TRANSFERENCIA") return "purple accent-2";
    },

    async listar() {
      try {
        this.page++;
        this.loadingData = true;

        this.ActionListarHistoriasPorUsuarios({
          id: this.user.id,
          size: 5,
          page: this.page,
        });
      } catch (error) {
      } finally {
        this.loadingData = false;
      }
    },
  },

  mounted() {
    this.loadingData = true;
    this.ActionListarHistoriasPorUsuarios({
      id: this.user.id,
      size: 5,
      page: 0,
    }).finally(() => (this.loadingData = false));
  },
};
</script>