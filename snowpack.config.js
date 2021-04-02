const { dirname } = require('path')

/** @type {import("snowpack-dev-server-hooks-plugin").DevServerHooksPluginOptions} */
const devServerHooksPluginOptions = {
  devServer: {
    beforeWriteHead (statusCode, headers) {
      if (statusCode === 200 && headers['Content-Type'] === 'text/html') {
        Object.assign(headers, {
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Embedder-Policy': 'require-corp'
        })
      }
    }
  }
}

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    [dirname(require.resolve('box2d-wasm'))]: { url: '/box2d-wasm', static: true },
    src: { url: '/dist' }
  },
  plugins: [
    '@snowpack/plugin-svelte',
    ['@snowpack/plugin-typescript', { args: '--project ./src/main' }],
    ['snowpack-dev-server-hooks-plugin', devServerHooksPluginOptions]
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  }
}
