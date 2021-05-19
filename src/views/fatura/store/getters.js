// faturas
export const faturaAberta = ({ faturas }) => faturas.find(f => f.status === 'ABERTA')