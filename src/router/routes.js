import { routes as auth } from "../core/auth";
import { routes as home } from "../views/home";
import { routes as conta } from "../views/conta";
import { routes as categoria } from "../views/categoria";

export default [
    ...auth,
    ...home,
    ...conta,
    ...categoria
]