const { createRequestHandler } = require('@remix-run/architect');

const build = require('./build');

exports.handler = createRequestHandler({
  build,
  getLoadContext(event) {
    // use lambda event to generate a context for loaders
    return {};
  },
});
