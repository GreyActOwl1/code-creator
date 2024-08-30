export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CodeCreators",
  description: "Explore your favorite tech creators",
  navItems: [
    {
      label: "Creators",
      href: "/creators",
    },
    {
      label: "New Creator",
      href: "/creators/add",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Creators",
      href: "/creators",
    },
    {
      label: "New Creator",
      href: "/creators/add",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui-docs-v2.vercel.app",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
