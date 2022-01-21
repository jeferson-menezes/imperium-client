
const urlAPiImperium = () => {
    let url = 'http://localhost:8081/'
    const production = process.env.NODE_ENV === 'production';
    const externo = window.location.origin === 'http://zionflame.ddns.net:9876';

    if (production && externo) {
        url = 'http://zionflame.ddns.net:9877/'
    }

    if (production && !externo) {
        url = 'http://192.168.15.100:8081/'
    }
    return url
}

const urlAPiIcons = () => {
    let url = 'http://localhost:8082/';
    const production = process.env.NODE_ENV === 'production';
    const externo = window.location.origin === 'http://zionflame.ddns.net:9876';

    if (production && externo) {
        url = 'http://zionflame.ddns.net:9878/'
    }

    if (production && !externo) {
        url = 'http://192.168.15.100:8082/'
    }

    return url;
}

export const server = urlAPiImperium() // process.env.NODE_ENV === 'production' ? 'http://zionflame.ddns.net:9877/' : 'http://localhost:8081/'
export const icons = urlAPiIcons() // process.env.NODE_ENV === 'production' ? 'http://zionflame.ddns.net:9878/' : 'http://localhost:8082/'
