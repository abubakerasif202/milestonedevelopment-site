import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

const normalize = (value) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

const getPrimaryNavigation = () => {
  const match = html.match(/<nav class="site-nav"[\s\S]*?<\/nav>/);
  assert.ok(match, 'primary navigation exists');
  return match[0];
};

test('homepage preserves required SEO metadata', () => {
  assert.match(html, /<title>Milestone Development \| Residential &amp; Commercial Construction<\/title>/);
  assert.match(
    html,
    /<meta\s+name="description"\s+content="Milestone Development provides residential, commercial, industrial and renovation construction services with experienced project management and trusted workmanship\."/,
  );
  assert.match(html, /<link rel="canonical" href="https:\/\/milestonedevelopment\.com\.au\/" \/>/);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image" \/>/);
});

test('primary navigation links to every dedicated content page', () => {
  const labels = [...getPrimaryNavigation().matchAll(/<a\b[^>]*>(.*?)<\/a>/g)].map((match) =>
    normalize(match[1]),
  );

  assert.deepEqual(labels, ['Home', 'About', 'Services', 'Projects', 'Process', 'Meet the Team', 'Contact']);
});

test('homepage contains only the focused home hero', () => {
  assert.equal([...html.matchAll(/<section\b/g)].length, 1);
  assert.match(html, /<section class="hero hero-premium"/);
  assert.match(html, /Premium construction delivered with care\./);
  assert.match(html, /href="\/services\.html">View Services<\/a>/);
  assert.match(html, /href="\/contact\.html">Request Consultation<\/a>/);

  for (const removedSection of [
    'featured-section',
    'stats-section',
    'services-section',
    'why-section',
    'leadership-section',
    'portfolio-section',
    'gallery-section',
    'process-section',
    'contact-section',
    'faq-section',
  ]) {
    assert.doesNotMatch(html, new RegExp(`class="[^"]*${removedSection}`));
  }

  assert.doesNotMatch(html, /data-contact-form/);
  assert.doesNotMatch(html, /<details class="faq-item/);
});

test('LocalBusiness JSON-LD remains valid without duplicating separate page content', () => {
  const scriptMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(scriptMatch, 'JSON-LD script exists');

  const graph = JSON.parse(scriptMatch[1])['@graph'];
  const business = graph.find((entry) => entry['@id'] === 'https://milestonedevelopment.com.au/#business');

  assert.equal(business.name, 'Milestone Development');
  assert.equal(business.telephone, '1800 008 883');
  assert.ok(business['@type'].includes('GeneralContractor'));
  assert.equal(graph.some((entry) => entry['@type'] === 'FAQPage'), false);
  assert.equal(graph.some((entry) => entry['@type'] === 'Person'), false);
});
