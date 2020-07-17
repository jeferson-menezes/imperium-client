export const somaDespesasMes = ({ despesasMes }) => despesasMes.reduce((t, v) => t + v.valor, 0);
export const totalDespesasMes = ({ despesasMes }) => despesasMes.length;

export const somaReceitasMes = ({ receitasMes }) => receitasMes.reduce((t, v) => t + v.valor, 0);
export const totalReceitasMes = ({ receitasMes }) => receitasMes.length;