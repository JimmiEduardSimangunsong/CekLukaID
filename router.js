const {masukhandler,daftarhandler} = require('./handler');

const routes = [
    {
        method : 'GET',
        path : '/',
        handler : (request, h) => {
            return h.response('CekLukaID API');
        },
    },
    {
        method : 'POST',
        path : '/masuk',
        handler : masukhandler,
    },
    {
        method : 'POST',
        path : '/daftar',
        handler : daftarhandler,
    },
]

module.exports = routes;