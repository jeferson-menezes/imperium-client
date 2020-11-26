export class Pageable {

    constructor(page, size, offst = undefined){
        this.page = page - 1;
        this.size = size;
        this.offst = offst;
    }
}