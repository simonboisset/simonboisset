const { defineFeatureRoutes } = require('@remix-routes/feature');
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/*'],
  routes: async (defineRoutes) => {
    return defineFeatureRoutes('app', 'routes', 'routes', defineRoutes);
  },
};
