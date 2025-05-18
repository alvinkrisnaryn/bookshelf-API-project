require("dotenv").config();
const Hapi = require('@hapi/hapi');
const routes = require('../src/routes/routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();