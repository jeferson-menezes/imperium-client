<template>
  <v-dialog v-model="dialog" persistent max-width="330px">
    <v-card>
      <v-card-title>
        <span class="headline"
          >{{ form.id ? "Atualizar" : "Adicionar" }} Despesa</span
        >
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-currency-field
            v-show="!form.id"
            v-model="form.valor"
            :rules="rules.valor"
            label="Valor"
          />

          <v-text-field
            v-model="form.descricao"
            :rules="rules.descricao"
            label="Descrição"
          ></v-text-field>

          <v-row>
            <v-col>
              <date-picker v-model="form.data"></date-picker>
            </v-col>
            <v-col>
              <time-pickers v-model="form.hora"></time-pickers>
            </v-col>
          </v-row>

          <v-select
            :rules="rules.categoria"
            v-model="form.categoriaId"
            :items="getCategoriasDespesa()"
            item-value="id"
            item-text="nome"
            label="Categoria"
          ></v-select>
          <v-select
            v-show="!form.id"
            :rules="rules.conta"
            v-model="form.contaId"
            :items="contas"
            item-value="id"
            item-text="nome"
            label="Conta"
          ></v-select>
          <v-switch
            v-show="!form.id"
            v-model="form.concluida"
            :label="form.concluida ? 'Já foi paga' : 'Não foi paga'"
          ></v-switch>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close()">cancelar</v-btn>
        <v-btn
          :loading="loading"
          :disabled="!valid"
          color="blue darken-1"
          text
          @click="salvar()"
          >salvar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { required } from "../../shared/rules";
import DatePicker from "../../shared/components/DatePicker";

import TimePickers from "../../shared/components/TimePicker";
import { Toast } from "../../shared/models/toast";
import VCurrencyField from "../../shared/components/VCurrencyField";

export default {
  name: "DespesaForm",

  components: { VCurrencyField, DatePicker, TimePickers },

  data: () => ({
    dialog: false,
    valid: false,
    loading: false,
    timer: 0,
    form: {
      id: 0,
      valor: 0,
      descricao: "",
      data: "",
      hora: "",
      concluida: true,
      categoriaId: 0,
      contaId: 0,
    },
    rules: {
      valor: [required("O valor é obrigatório!")],
      descricao: [required("A descrição é obrigatória!")],
      categoria: [required("A Categoria é obrigatório")],
      conta: [required("A Conta é obrigatório")],
    },
  }),

  methods: {
    ...mapActions("categoria", ["ActionListarCategorias"]),
    ...mapActions("conta", ["ActionListarContasPorUsuario"]),
    ...mapActions("despesa", [
      "ActionAdicionarDespesa",
      "ActionDetalharDespesa",
      "ActionAtualizarDespesa",
    ]),

    ...mapGetters("categoria", ["getCategoriasDespesa"]),
    close() {
      this.resetForm();
      this.dialog = false;
    },

    populaForm(payload) {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.detelharForm(payload);
      }, 300);
    },

    async detelharForm(id) {
      try {
        const { data } = await this.ActionDetalharDespesa({ id });

        Object.keys(this.form).forEach((e) => {
          if (e === "categoriaId") this.form.categoriaId = data.categoria.id;
          else if (e === "contaId") this.form.contaId = data.conta.id;
          else this.form[e] = data[e];
        });
        this.dialog = true;
      } catch (error) {
        console.error(error);
        this.$root.$emit(
          "sweet-toast::show",
          new Toast(
            error.data.message || "Erro ao realizar a operação!",
            "error"
          )
        );
      }
    },
    async salvar() {
      try {
        this.loading = true;

        let message = "Despesa salva com sucesso!";

        if (this.form.id) {
          await this.ActionAtualizarDespesa(this.form);
          message = "Despesa atualizada com sucesso!";
        } else await this.ActionAdicionarDespesa(this.form);

        this.$root.$emit("sweet-toast::show", new Toast(message, "success"));

        if (this.form.id) this.close();

        this.resetForm();
      } catch (error) {
        console.log(error);
        const err = error.body;
        if (err.length) {
          err.forEach((e) => this.$root.$emit("notification::show", e));
        }
        this.$root.$emit(
          "sweet-toast::show",
          new Toast(
            error.data.message || "Erro ao realizar a operação!",
            "error"
          )
        );
      } finally {
        this.loading = false;
      }
    },

    resetForm() {
      for (const field in this.form) {
        if (field === "data" || field === "hora") continue;
        const tipo = typeof this.form[field];
        if (tipo === "number") this.form[field] = 0;
        if (tipo === "string") this.form[field] = "";
        if (tipo === "boolean") this.form[field] = true;
      }
    },
  },

  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("conta", ["contas"]),
  },

  mounted() {
    this.ActionListarCategorias();
    this.ActionListarContasPorUsuario({ id: this.user.id });
  },

  created() {
    this.$root.$on("despesa-form::show", (payload) => {
      if (payload) this.populaForm(payload);
      else this.dialog = true;
    });
  },
};
</script>