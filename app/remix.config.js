const { flatRoutes } = require('remix-flat-routes');
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: 'cloudflare-workers',
  server: './server.js',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['**/*'],
  routes: async (defineRoutes) => {
    return flatRoutes('routes', defineRoutes);
  },
};
