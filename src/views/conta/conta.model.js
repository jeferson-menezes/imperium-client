export class ContaModel {

    constructor(id, ativo, descricao, incluiSoma, nome, saldo, tipoContaId, usuarioId) {
        this.id = id
        this.ativo = ativo;
        this.descricao = descricao;
        this.incluiSoma = incluiSoma;
        this.nome = nome;
        this.saldo = saldo;
        this.tipoContaId = tipoContaId;
        this.usuarioId = usuarioId
    }
}