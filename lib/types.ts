export type About = {
  name: string;
  headshot: string;
  headline: string;
  email: string;
  phone: string;
  phoneHref: string;
  smsHref: string;
  resume: string;
  linkedin: string;
  blog: string;
  bullets: string[];
};

export type ShowcaseLink = { label: string; href: string };

export type ShowcaseItem = {
  id: string;
  title: string;
  tile: { image: string; labelOnDark: boolean };
  siteUrl: string;
  siteLabel: string;
  body: string;
  links: ShowcaseLink[];
  graphic: { image: string; href: string; alt: string };
};

export type ShowcaseContent = { items: ShowcaseItem[] };
