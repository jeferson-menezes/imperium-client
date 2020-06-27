export class Conta {

    constructor(ativo, descricao, incluiSoma, nome, saldo, tipoContaId, usuarioId) {
        this.ativo = ativo;
        this.descricao = descricao;
        this.incluiSoma = incluiSoma;
        this.nome = nome;
        this.saldo = saldo;
        this.tipoContaId = tipoContaId;
        this.usuarioId = usuarioId
    }
}