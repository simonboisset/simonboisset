/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    unstable_tailwind: true,
    unstable_postcss: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
