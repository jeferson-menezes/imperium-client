// conta
import currency from 'currency.js'

export const findConta = ({ contas }) => id => contas.find(c => c.id === id) 

export const totalIncluidasSoma = ({ contas }) => {
    let total = currency("0.0")
    for (let i = 0; i < contas.length; i++) {
    if (!contas[i].incluiSoma) continue;
        total = total.add(contas[i].saldo)
    }
    return total
} 


export const totalRestantes = ({ contas }) => {
    let total = currency("0.0")
    for (let i = 0; i < contas.length; i++) {
        if (contas[i].incluiSoma) continue;
        total = total.add(contas[i].saldo)
    }
    return total
} 
