const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: 'Simon Boisset',
    tagline: 'React, Node, Typescript ...',
    url: 'https://simonboisset.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'facebook', // Usually your GitHub org/user name.
    projectName: 'docusaurus', // Usually your repo name.
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'fr'],
    },
    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve('./sidebars.js'),
            // Please change this to your repo.
            editUrl: 'https://github.com/simonboisset/website/web',
          },
          blog: {
            showReadingTime: true,
            // Please change this to your repo.
            editUrl: 'https://github.com/simonboisset/website/web/blog/',
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: 'Simon Boisset',
          logo: {
            alt: 'Logo',
            src: 'img/logo.svg',
          },
          items: [
            {
              type: 'doc',
              docId: 'intro',
              position: 'left',
              label: 'Projects',
            },
            { to: '/blog', label: 'Blog', position: 'left' },
            {
              type: 'localeDropdown',
              position: 'right',
            },
            {
              href: 'https://github.com/simonboisset',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Docs',
              items: [
                {
                  label: 'Projects',
                  to: '/docs/intro',
                },
              ],
            },
            {
              title: 'Contacts',
              items: [
                {
                  label: 'Linkedin',
                  href: 'https://www.linkedin.com/in/simon-boisset-733445138/',
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/simonboisset',
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} simonboisset, Inc. Built with Docusaurus.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  }
);
