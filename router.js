const {masukhandler,daftarhandler,penagananhandler} = require('./handler');

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
    {
        method: 'POST',
        path: '/penanganan',
        handler: penagananhandler,
    },
]

module.exports = routes;