export const required = text => {
    return v => !!v || text
}

export const email = text => {
    return v => /.+@.+/.test(v) || text
}

export const real = text => {
    // return v => d{1,3}(\.\d{3})*,\d{2}.test(v) || text
}