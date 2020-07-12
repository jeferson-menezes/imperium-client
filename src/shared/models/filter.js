export class Filter {

    constructor(page, size, offset = undefined) {
        this.page = page;
        this.size = size;
        this.offset = offset;
    }
}