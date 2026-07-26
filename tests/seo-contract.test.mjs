import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const htmlFiles = readdirSync(root).filter((file) => file.endsWith('.html')).sort();
const htmlByFile = new Map(
  htmlFiles.map((file) => [file, readFileSync(new URL(file, root), 'utf8')]),
);

const expectedRoutes = [
  '/',
  '/about',
  '/services',
  '/residential-construction',
  '/commercial-construction',
  '/industrial-construction',
  '/renovations',
  '/design-and-construct',
  '/home-and-land-packages',
  '/management-services',
  '/projects',
  '/process',
  '/team',
  '/contact',
  '/privacy',
  '/terms',
];

const getMetaContent = (html, selector) => {
  const tag = html.match(new RegExp(`<meta\\b(?=[^>]*(?:name|property)="${selector}")[^>]*>`, 'i'))?.[0];
  return tag?.match(/content="([^"]*)"/i)?.[1] ?? '';
};

test('every page uses a unique clean canonical URL and valid metadata', () => {
  const titles = new Set();
  const canonicals = new Set();

  for (const [file, html] of htmlByFile) {
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? '';
    const description = getMetaContent(html, 'description');
    const canonical = html.match(/<link rel="canonical" href="([^"]+)" \/>/i)?.[1] ?? '';
    const ogTitle = getMetaContent(html, 'og:title');
    const ogDesc = getMetaContent(html, 'og:description');
    const ogUrl = getMetaContent(html, 'og:url');
    const ogImage = getMetaContent(html, 'og:image');
    const twitterCard = getMetaContent(html, 'twitter:card');

    assert.ok(title, `${file} has a title`);
    assert.ok(!titles.has(title), `${file} has a unique title`);
    assert.ok(description.length > 70 && description.length <= 160, `${file} description is concise`);
    assert.match(canonical, /^https:\/\/milestonedevelopment\.com\.au\//);
    assert.doesNotMatch(canonical, /\.html(?:$|[?#])/);
    assert.ok(!canonicals.has(canonical), `${file} has a unique canonical`);
    assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, `${file} has one H1`);
    assert.doesNotMatch(html, /href="\/[^"#?]+\.html(?:["#?])/);
    assert.ok(ogTitle, `${file} has og:title`);
    assert.ok(ogDesc, `${file} has og:description`);
    assert.ok(ogUrl, `${file} has og:url`);
    assert.ok(ogImage, `${file} has og:image`);
    assert.ok(twitterCard, `${file} has twitter:card`);
    assert.ok(html.includes('href="/privacy"'), `${file} has privacy link in footer`);
    assert.ok(html.includes('href="/terms"'), `${file} has terms link in footer`);

    for (const imgMatch of html.matchAll(/<img\b([^>]*)>/gi)) {
      assert.match(imgMatch[1], /\balt="/i, `${file} img has alt attribute`);
    }

    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      const schema = JSON.parse(match[1]);
      assert.doesNotMatch(JSON.stringify(schema), /milestonedevelopment\.com\.au\/[^"]+\.html/);
    }

    titles.add(title);
    canonicals.add(canonical);
  }
});

test('sitemap and robots expose every clean canonical route', () => {
  const sitemap = readFileSync(new URL('public/sitemap.xml', root), 'utf8');
  const robots = readFileSync(new URL('public/robots.txt', root), 'utf8');
  const locations = [...sitemap.matchAll(/<loc>https:\/\/milestonedevelopment\.com\.au([^<]*)<\/loc>/g)].map(
    (match) => match[1],
  );

  assert.deepEqual(locations, expectedRoutes);
  assert.doesNotMatch(sitemap, /\.html/);
  assert.match(robots, /Sitemap: https:\/\/milestonedevelopment\.com\.au\/sitemap\.xml/);
});

test('trust and structured-content claims remain accurate', () => {
  const projects = htmlByFile.get('projects.html');
  const process = htmlByFile.get('process.html');
  const services = htmlByFile.get('services.html');
  const llms = readFileSync(new URL('public/llms.txt', root), 'utf8');

  assert.match(projects, /It does not represent completed client work\./);
  assert.doesNotMatch(projects, /Proven delivery across/);
  assert.doesNotMatch(process, /"@type": "HowTo"/);
  assert.match(process, /"@type": "ItemList"/);
  assert.ok(services.indexOf('<h2>') < services.indexOf('<h3>'));
  assert.doesNotMatch(llms, /\.html/);

  for (const route of expectedRoutes.slice(1)) {
    assert.ok(
      llms.includes(`https://milestonedevelopment.com.au${route}`),
      `llms.txt links to ${route}`,
    );
  }
});

test('Vercel config consolidates the www host and caches static assets', () => {
  const config = JSON.parse(readFileSync(new URL('vercel.json', root), 'utf8'));
  const hostRedirect = config.redirects.find((redirect) =>
    redirect.has?.some(
      (condition) =>
        condition.type === 'host' && condition.value === 'www.milestonedevelopment.com.au',
    ),
  );
  const assetHeaders = config.headers.find((entry) => entry.source === '/assets/(.*)');

  const globalHeaders = config.headers.find((entry) => entry.source === '/(.*)');

  assert.equal(config.cleanUrls, true);
  assert.equal(hostRedirect?.destination, 'https://milestonedevelopment.com.au/:path*');
  assert.equal(hostRedirect?.permanent, true);
  assert.match(
    assetHeaders?.headers.find((header) => header.key === 'Cache-Control')?.value ?? '',
    /max-age=86400/,
  );
  assert.match(
    globalHeaders?.headers.find((header) => header.key === 'Strict-Transport-Security')?.value ?? '',
    /max-age=63072000/,
  );
  assert.match(
    globalHeaders?.headers.find((header) => header.key === 'Content-Security-Policy')?.value ?? '',
    /default-src 'self'/,
  );
});

