/* eslint-disable indent */

// tes saja
console.log('Compile berhasil');

// kode untuk hapi (HTTP server)
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        // eslint-disable-next-line no-trailing-spaces

        // Mencegah same-origin polivy
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });
    server.route(routes);
    await server.start();

    console.log(`Server dijalankan di ${server.info.uri}`);
};

init();
