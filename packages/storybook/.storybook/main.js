import { mergeConfig } from 'vite';

export default {
  framework: '@storybook/react-vite', // OR whatever framework you're using
  features: {
    storyStoreV7: true,
  },
  // async viteFinal(config) {
  //   return {
  //     ...config,
  //     define: {
  //       ...config.define,
  //       global: 'window',
  //     },
  //   };
  // },
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    // <-- you have to add this addon
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      define: {
        ...config.define,
        global: 'window',
      },
      // Add storybook-specific dependencies to pre-optimization
      optimizeDeps: {
        include: ['@newline-ds/foundation', '@newline-ds/react'],
      },
      server: {
        // configure vite for HMR with Gitpod
        hmr: process.env.GITPOD_WORKSPACE_URL
          ? {
              // removes the protocol and replaces it with the port we're connecting to
              host: process.env.GITPOD_WORKSPACE_URL.replace('https://', '6006-'),
              protocol: 'wss',
              clientPort: 443
            }
          : true
      }
      // build: {
      //   commonjsOptions: {
      //     include: [/linked-dep/, /node_modules/],
      //   },
      // },
    });
  },
};
