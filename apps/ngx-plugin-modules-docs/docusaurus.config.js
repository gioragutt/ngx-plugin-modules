const libraryName = 'ngx-plugin-modules';
const organizationName = 'gioragutt';

const docsUrl = `https://${libraryName}.netlify.app`;
const repoUrl = `https://github.com/${organizationName}/${libraryName}`;
const editUrl = `${repoUrl}/edit/main/apps/${libraryName}-docs/`;
const demoUrl = `https://${libraryName}-demo.netlify.app`;

module.exports = {
  title: libraryName,
  tagline: 'Build your perfect Plugin-Based architecture in Angular 🚀',
  url: docsUrl,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName,
  projectName: libraryName,
  themeConfig: {
    navbar: {
      title: 'Ngx Plugin Modules',
      logo: {
        alt: 'Ngx Plugin Modules Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'blog',
          label: 'Blog',
          position: 'left',
        },
        {
          href: demoUrl,
          label: 'Demo',
          position: 'right',
        },
        {
          href: repoUrl,
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
              label: 'Style Guide',
              to: 'docs/styleguide',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'Demo',
              to: demoUrl,
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: repoUrl,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Giora Guttsait. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {editUrl, sidebarPath: require.resolve('./sidebars.js')},
        blog: {editUrl, showReadingTime: true},
        theme: {customCss: require.resolve('./src/css/custom.css')},
      },
    ],
  ],
};
