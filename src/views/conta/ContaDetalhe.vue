<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-sheet
          rounded="rounded"
          class="d-flex pa-5"
          color="cyan"
          width="100%"
        >
          <v-container>
            <v-row>
              <v-col>
                <v-icon v-if="conta.tipo" x-large :color="conta.tipo.cor"
                  >{{ "mdi-" + conta.tipo.icone }}
                </v-icon>
                <span class="title white--text"> {{ conta.nome }} </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <span class="subtitle-1 white--text">Saldo</span>
                <br />
                <span class="display-1 white--text">{{
                  $toReal(conta.saldo)
                }}</span
                ><br />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <span class="white--text text--darken-1">
                  {{ conta.descricao }}</span
                >
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="mt-5">
          <v-card-title>
            Atividades
            <v-spacer></v-spacer>
            <v-icon x-large color="purple accent-2">mdi-timeline</v-icon>
          </v-card-title>

          <v-card-text style="height: 450px; overflow-y: auto">
            <v-timeline dense>
              <v-timeline-item
                :color="cor(item.natureza)"
                small
                v-for="(item, i) in historias.content"
                :key="i"
              >
                <v-row class="pt-1" no-gutters>
                  <v-col cols="12" sm="3">
                    <strong>{{ $parseISO(item.data) | date("dd MMM") }}</strong>
                    <div class="caption">{{ item.hora }}</div>
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
            <v-row align="center" justify="space-around">
              <v-btn text :disabled="temMais()" @click="carregar()">
                carregar mais
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ContaDetalhe",

  data: () => ({
    conta: {},
    loadingData: false,
    page: 0,
  }),

  computed: {
    ...mapState("historia", ["historias"]),
  },
  methods: {
    ...mapActions("conta", ["ActionDetalharConta"]),
    ...mapActions("historia", ["ActionListarHistoriasPorConta"]),

    cor(natureza) {
      if (natureza === "DESPESA") return "red accent-2";
      if (natureza === "RECEITA") return "green accent-2";
      if (natureza === "TRANSFERENCIA") return "purple accent-2";
    },

    async listar() {
      try {
        this.loadingData = true;

        this.ActionListarHistoriasPorConta({
          id: this.conta.id,
          size: 5,
          page: this.page,
        });
      } catch (error) {
      } finally {
        this.loadingData = false;
      }
    },

    async carregar() {
      try {
        this.page++;
        this.loadingData = true;

        this.ActionListarHistoriasPorConta({
          id: this.conta.id,
          size: 5,
          page: this.page,
        });
      } catch (error) {
      } finally {
        this.loadingData = false;
      }
    },

    temMais() {
      if (this.historias.content) {
        return this.historias.content.length === this.historias.totalElements;
      } else {
        return true;
      }
    },
  },

  async created() {
    const id = this.$route.params.id;
    const res = await this.ActionDetalharConta({ id });
    this.conta = res.data;

    this.listar();
  },
};
</script>

<style>
</style>