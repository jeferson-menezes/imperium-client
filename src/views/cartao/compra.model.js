import { Transacao } from '../../shared/models/transacao';

export class Compra extends Transacao {


    constructor(valor, descricao, data, hora, parcelas,
        valorParcela,
        cartaoId,
        categoriaId
    ) {
        super(valor, descricao, data, hora)
        this.parcelas = parcelas;
        this.valorParcela = valorParcela
        this.cartaoId = cartaoId
        this.categoriaId = categoriaId
    }
}