# AVEL Estates

Create a React + Vite + TypeScript + Tailwind project for AVEL Estates, a Colombian
luxury real estate agency selling to international buyers.

Build the design system FIRST. No pages yet.

In tailwind.config.ts extend theme.colors with these EXACT values:
  abyss:'#0F1614'  deep:'#16211E'  slate:'#4A4F51'  sage:'#8CA4A5'
  bone:'#EDE8DF'   paper:'#F7F5F1' gold:'#F7A73E'   goldDeep:'#C9832B'

Set theme.borderRadius.DEFAULT to '2px'. Sharp corners are intentional — never use
rounded-lg or rounded-xl anywhere in this project. te dejo el logo tambien para que lo inyectes de una vez

Load in index.html from Google Fonts:
  Bodoni Moda (400, 600) and Source Sans 3 (300, 400, 600).
Configure fontFamily: display:['Bodoni Moda','serif'], sans:['Source Sans 3','system-ui','sans-serif'].

In index.css define these utility classes:
  .type-hero   font-display 68px desktop / 44px mobile, weight 400, line-height 1.05, letter-spacing -0.02em
  .type-h1     font-display 48px / 34px, weight 400, line-height 1.1
  .type-h2     font-display 34px / 26px, weight 400, line-height 1.15
  .type-h3     font-sans 22px / 20px, weight 600
  .type-body   font-sans 17px / 16px, weight 400, line-height 1.65
  .type-label  font-sans 11px, weight 600, uppercase, letter-spacing 0.14em
  .type-figure font-display 32px / 26px, weight 600, font-variant-numeric tabular-nums
  .hairline    1px solid rgba(140,164,165,0.18)

Body background is abyss, body text is bone.

Create src/config/site.ts as the ONLY source of truth:
  export const SITE = {
    domain:'avelestates.com',
    url:'https://avelestates.com',
    name:'AVEL Estates',
    legalName:'AVEL Inmobiliaria',
    publicEmail:'hello@avelestates.com',
    notifyEmail:'avelinmobiliaria@gmail.com',
    fromEmail:'noreply@avelestates.com',
    phone:'',
    defaultLocale:'en',
    locales:['en','es'] as const,
  }
No component may hardcode a domain, email or phone. Everything imports from here.

This project has NO external API integrations. All content lives in our own Supabase
database and is entered through our own admin panel. Do not add any third-party data
source, scraper, feed importer or external fetch at any point in this project.
```

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://avel-estate-glow.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1afe76d1-ddb9-4d05-b725-3ff35759ceea).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
