// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion


const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HybridCLR',
  tagline: '特性完整、零成本、高性能、低内存的Unity全平台原生c#热更方案',
  favicon: 'img/logo.png',

  // Set the production url of your site here
  url: 'https://hybridclr.doc.code-philosophy.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'focus-creative-games', // Usually your GitHub org/user name.
  projectName: 'hybridclr-doc', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    localeConfigs: {
      zh: {
        htmlLang: 'zh-cn',
      },
      en: {
        htmlLang: 'en-us',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true
        },
      },
      navbar: {
        title: 'HybridCLR',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '文档',
          },
          // {
          //   position: 'left',
          //   label: 'Tutorial2',
          //   to: '/docs/intro',
          // },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/focus-creative-games/hybridclr',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'localeDropdown',
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
                label: '文档',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Repository',
            items: [
              {
                label: 'hybridclr',
                href: 'https://github.com/focus-creative-games/hybridclr',
              },
              {
                label: 'il2cpp_plus',
                href: 'https://github.com/focus-creative-games/il2cpp_plus',
              },
              {
                label: 'hybridclr package',
                href: 'https://github.com/focus-creative-games/hybridclr_unity',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://gitee.com/focus-creative-games/hybridclr',
              },
              {
                label: 'Gitee',
                href: 'https://github.com/focus-creative-games/hybridclr',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://code-philosophy.com/">Code Philosophy</a>. All Rights Reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp', 'cpp'],
      },
    }),
};

module.exports = config;
