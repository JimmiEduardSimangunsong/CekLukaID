const sequelize = require('./database');
const routes = require('./router');

'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost',
});

 try {
    // Menghubungkan ke database
    await sequelize.authenticate();
    console.log('Connected to the database.');

     // Menginisialisasi tabel di database (jika belum ada)
     await sequelize.sync();
     console.log('Database synchronized.');

     //Menambahkan routes ke server
    server.route(routes);

    // Menjalankan server
    await server.start();
    console.log('Server running on', server.info.uri);

 } catch (error) {
    console.error('Error:', error);
    process.exit(1);
 }
};

init();