module.exports = {
  title: 'ngx-plugin-modules Docs',
  tagline: 'The tagline of my site',
  url: 'https://ngx-plugin-modules.netlify.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'gioragutt', // Usually your GitHub org/user name.
  projectName: 'ngx-plugin-modules', // Usually your repo name.
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
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/gioragutt/ngx-plugin-modules',
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
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
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
              href: 'https://github.com/gioragutt/ngx-plugin-modules',
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
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/gioragutt/ngx-plugin-modules/edit/main/apps/ngx-plugin-modules-docs/docs/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/gioragutt/ngx-plugin-modules/edit/main/apps/ngx-plugin-modules-docs/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
