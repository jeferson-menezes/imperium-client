// home
export const somaDespesasMes = ({ despesasMes }) => despesasMes.reduce((t, v) => t + v.valor, 0);
export const totalDespesasMes = ({ despesasMes }) => despesasMes.length;
export const valoresDespesasMes = ({ despesasMes }) => despesasMes.map(e => e.valor)

export const somaReceitasMes = ({ receitasMes }) => receitasMes.reduce((t, v) => t + v.valor, 0);
export const totalReceitasMes = ({ receitasMes }) => receitasMes.length;
export const valoresReceitasMes = ({ receitasMes }) => receitasMes.map(e => e.valor)

export const totalBalancoMes = ({ receitasMes, despesasMes }) => receitasMes.reduce((t, v) => t + v.valor, 0) - despesasMes.reduce((t, v) => t + v.valor, 0);

export const despesasGraficoLinha = ({ despesasMes }) => {
    return despesasMes.map(e => {
        return { x: e.data, y: e.valor }
    })
}

export const receitasGraficoLinha = ({ receitasMes }) => {
    return receitasMes.map(e => {
        return { x: e.data, y: e.valor }
    })
}

export const agruparDespesasMes = ({ despesasMes }) => {
    const grupos = despesasMes.reduce((acc, curr) => {
        acc[curr.data] = acc[curr.data] || [];
        acc[curr.data].push(curr.valor);
        return acc;
    }, {})
    let lista = []
    for (const i in grupos) {
        lista.push({
            data: i,
            valor: grupos[i].reduce((e, c) => e + c, 0)
        })
    }
    return lista
}

export const agruparReceitasMes = ({ receitasMes }) => {
    const grupos = receitasMes.reduce((acc, curr) => {
        acc[curr.data] = acc[curr.data] || [];
        acc[curr.data].push(curr.valor);
        return acc;
    }, {})
    let lista = []
    for (const i in grupos) {
        lista.push({
            data: i,
            valor: grupos[i].reduce((e, c) => e + c, 0)
        })
    }
    return lista;
}

export const agruparReceitasCategorias = ({ receitasMes }) => {
    const grupos = receitasMes.reduce((acc, curr) => {
        acc[curr.categoriaNome] = acc[curr.categoriaNome] || [];
        acc[curr.categoriaNome].push(curr.valor);
        return acc;
    }, {})
    let lista = []
    for (const i in grupos) {
        lista.push({
            categoria: i,
            valor: grupos[i].reduce((e, c) => e + c, 0)
        })
    }
    return lista;
}

export const agruparDespesasCategorias = ({ despesasMes }) => {
    const grupos = despesasMes.reduce((acc, curr) => {
        acc[curr.categoriaNome] = acc[curr.categoriaNome] || [];
        acc[curr.categoriaNome].push(curr.valor);
        return acc;
    }, {})
    let lista = []
    for (const i in grupos) {
        lista.push({
            categoria: i,
            valor: grupos[i].reduce((e, c) => e + c, 0)
        })
    }
    return lista;
}
