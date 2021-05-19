export class Cartao {


    constructor(id, nome, limite, bandeiraId, diaFechamento, diaVencimento, usuarioId) {
        this.id = id
        this.nome = nome;
        this.limite = limite;
        this.bandeiraId = bandeiraId;
        this.diaFechamento = diaFechamento;
        this.diaVencimento = diaVencimento;
        this.usuarioId = usuarioId;
    }

}