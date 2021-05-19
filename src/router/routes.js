import { routes as auth } from "../core/auth";
import { routes as home } from "../views/home";
import { routes as conta } from "../views/conta";
import { routes as categoria } from "../views/categoria";
import { routes as despesa } from "../views/despesa";
import { routes as receita } from "../views/receita";
import { routes as cartao } from "../views/cartao";



export default [
    ...auth,
    ...home,
    ...conta,
    ...categoria,
    ...despesa,
    ...receita,
    // ...cartao
]