<template>
  <section>
    <v-row align="center">
      <v-col align-self="center">
        <div id="glass" v-show="show">
          <div id="glassheader">
            <v-btn icon color="blue" @click="close">
              <v-icon dark> mdi-checkbox-blank-circle </v-icon>
            </v-btn>
          </div>
          <div class="content">
            <form class="calculator" nome="calc">
              <input type="text" readonly class="value" v-model="text" />
              <span class="num clear" @click="add('c')">c</span>
              <span class="num" @click="add('/')">/</span>
              <span class="num" @click="add('*')">*</span>
              <span class="num" @click="add('7')">7</span>
              <span class="num" @click="add('8')">8</span>
              <span class="num" @click="add('9')">9</span>
              <span class="num" @click="add('-')">-</span>
              <span class="num" @click="add('4')">4</span>
              <span class="num" @click="add('5')">5</span>
              <span class="num" @click="add('6')">6</span>
              <span class="num plus" @click="add('+')">+</span>
              <span class="num" @click="add('1')">1</span>
              <span class="num" @click="add('2')">2</span>
              <span class="num" @click="add('3')">3</span>
              <span class="num" @click="add('0')">0</span>
              <span class="num" @click="add('00')">00</span>
              <span class="num" @click="add(',')">,</span>
              <span class="num equal" @click="add('=')">=</span>
            </form>
          </div>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import * as currency from "currency.js";

export default {
  name: "Calculadora",

  data: () => ({
    show: false,
    x: "",
    y: "",
    operator: "",
    text: "",
    decimal: { decimal: "," },
  }),

  methods: {
    dragElement(elmnt) {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        /* se estiver presente, o cabeçalho é de onde você move o DIV:*/
        document.getElementById(elmnt.id + "header").onmousedown =
          dragMouseDown;
      } else {
        /* caso contrário, mova o DIV de qualquer lugar dentro do DIV:*/
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // obter a posição do cursor do mouse na inicialização:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // chamar uma função sempre que o cursor se mover:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // definir a nova posição do elemento:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }

      function closeDragElement() {
        /* parar de se mover quando o botão do mouse for liberado: */
        document.onmouseup = null;
        document.onmousemove = null;
      }
    },

    close() {
      this.show = false;
    },

    toogle() {
      this.show = !this.show;
    },

    add(acao) {
      switch (acao) {
        case "c":
          console.log("caiu aqui");
          this.clean();
          this.update();

          break;
        case "/":
          if (!this.isOperator()) this.operator = acao;
          this.update();
          break;
        case "*":
          if (!this.isOperator()) this.operator = acao;
          this.update();
          break;
        case "-":
          if (!this.isOperator()) this.operator = acao;
          this.update();
          break;
        case "+":
          if (!this.isOperator()) this.operator = acao;
          this.update();
          break;
        case "=":
          if (this.x && this.isOperator() && this.y) {
            this.calcula();
            this.clean();
          }
          break;
        case ",":
          if (this.isOperator()) {
            if (!this.y.includes(acao)) {
              this.y += acao;
            }
          } else {
            if (!this.x.includes(acao)) {
              this.x += acao;
            }
          }
          this.update();
          break;
        default:
          if (this.isOperator()) {
            this.y += acao;
          } else {
            this.x += acao;
          }
          this.update();
          break;
      }
    },

    isOperator() {
      return !!this.operator;
    },

    clean() {
      this.x = "";
      this.y = "";
      this.operator = "";
    },

    update() {
      this.text = this.x + this.operator + this.y;
    },

    calcula() {
      if (this.operator == "/") {
        const total = currency(this.x, this.decimal).divide(this.y);
        this.formata(total);
      }

      if (this.operator == "*") {
        const total = currency(this.x, this.decimal).multiply(this.y);
        this.formata(total);
      }

      if (this.operator == "+") {
        const total = currency(this.x, this.decimal).add(this.y);
        this.formata(total);
      }

      if (this.operator == "-") {
        const total = currency(this.x, this.decimal).subtract(this.y);
        this.formata(total);
      }
    },

    formata(valor) {
      if (valor.cents()) {
        this.text = valor.format();
      } else {
        this.text = valor.value;
      }
    },
  },

  created() {
    this.$root.$on("calculadora::toogle", this.toogle);
  },
  mounted() {
    this.dragElement(document.getElementById("glass"));
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap");

* {
  font-family: "Quicksand", sans-serif;
}

#glass {
  position: absolute;
  z-index: 10;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  background: rgb(9 25 33 / 10%); /* #091921;*/
  /* top: 0; */
}

#glassheader {
  cursor: move;
  z-index: 10;
  backdrop-filter: blur(50px);
}

.content {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  backdrop-filter: blur(15px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
}

.content .calculator {
  position: relative;
  display: grid;
}

.content .calculator .value {
  grid-column: span 4;
  height: 80px;
  width: 240px;
  text-align: right;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 30px;
  background: transparent;
  color: #474747;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.content .calculator span {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  color: #474747;
  font-weight: 400;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  transition: 0.5s;
}

.content .calculator span:hover {
  transition: 0s;
  background: rgba(255, 255, 255, 0.3);
}

.content .calculator span:active {
  background: #00e676;
  color: #192f00;
  font-size: 24px;
  font-weight: 500;
}
.content .calculator .clear {
  grid-column: span 2;
  width: 120px;
  background: rgba(255, 255, 255, 0.05);
}

.content .calculator .plus {
  grid-row: span 2;
  height: 120px;
}

.equal {
  background: rgba(255, 255, 255, 0.05);
}
</style>