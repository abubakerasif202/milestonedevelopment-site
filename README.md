# Milestone Development Website

Production-ready static website for Milestone Development, built with Vite, vanilla HTML, CSS and JavaScript.

## Install

```powershell
npm install
```

## Local Development

```powershell
npm run dev
```

## Production Build

```powershell
npm run build
```

## Preview Build

```powershell
npm run preview
```

## Vercel Deployment

```powershell
npm install -g vercel
vercel login
vercel
vercel --prod
```

## Domain Setup

In Vercel, open the project settings and add these domains:

- `milestonedevelopment.com.au`
- `www.milestonedevelopment.com.au`

Then update the domain DNS records at the registrar using the records Vercel provides. Set `milestonedevelopment.com.au` as the primary production domain and redirect `www.milestonedevelopment.com.au` to the primary domain, or keep both active if preferred.
