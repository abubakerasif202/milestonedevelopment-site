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

const textIncludes = (expected) => {
  assert.match(normalize(html), new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
};

const getPrimaryNavigation = () => {
  const match = html.match(/<nav class="site-nav"[\s\S]*?<\/nav>/);
  assert.ok(match, 'primary navigation exists');
  return match[0];
};

test('homepage preserves required SEO metadata', () => {
  assert.match(
    html,
    /<title>Milestone Development \| Residential &amp; Commercial Construction<\/title>/,
  );
  assert.match(
    html,
    /<meta\s+name="description"\s+content="Milestone Development provides residential, commercial, industrial and renovation construction services with experienced project management and trusted workmanship\."/,
  );
  assert.match(html, /<link rel="canonical" href="https:\/\/milestonedevelopment\.com\.au\/" \/>/);
  assert.match(html, /<meta property="og:title" content="Milestone Development \| Residential &amp; Commercial Construction" \/>/);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image" \/>/);
  assert.match(html, /<script type="application\/ld\+json">/);
});

test('primary navigation matches client-facing information architecture', () => {
  const nav = getPrimaryNavigation();
  const labels = [...nav.matchAll(/<a\b[^>]*>(.*?)<\/a>/g)].map((match) => normalize(match[1]));

  assert.deepEqual(labels, [
    'Home',
    'About',
    'Residential',
    'Commercial',
    'Industrial',
    'Management Services',
    'Contact',
  ]);
});

test('homepage contains the premium hero, trust, services and leadership content', () => {
  textIncludes('Premium construction delivered with care.');
  textIncludes(
    'Milestone Development helps clients plan, build and manage residential, commercial, industrial, renovation and home-and-land package projects with clear communication and builder-led oversight.',
  );
  textIncludes('View Projects');
  textIncludes('Request Consultation');

  for (const trustPoint of [
    '10+ Years Experience',
    'Certified Builder',
    'Residential & Commercial',
    'Project Management',
  ]) {
    textIncludes(trustPoint);
  }

  for (const service of [
    'Residential Construction',
    'Commercial Construction',
    'Industrial Construction',
    'Design & Construct',
    'Renovations',
    'Home & Land Packages',
    'Management Services',
  ]) {
    textIncludes(service);
  }

  textIncludes('Mohammad Mohsini');
  textIncludes('10 years construction experience');
  textIncludes('Hussain Jafari');
  textIncludes('Home & Land Package Specialist');
});

test('homepage contains the editorial project, gallery, process and contact sections', () => {
  for (const project of [
    'Sunset Ridge Residence',
    'Luxury Homes',
    'Dual Occupancy',
    'Townhouses',
    'Commercial Projects',
    'Industrial Facilities',
    'Luxury Renovations',
    'Home & Land Packages',
  ]) {
    textIncludes(project);
  }

  textIncludes('Cinematic Gallery');
  textIncludes('Project visuals across the main construction services.');

  for (const step of ['Consultation', 'Planning', 'Construction', 'Handover']) {
    textIncludes(step);
  }

  textIncludes('Ready To Build With Confidence?');
  textIncludes('Discuss your next project with Milestone Development.');
  textIncludes('1800 008 883');
  textIncludes('Request Consultation');
  textIncludes('Call Now');
  assert.match(html, /<form\b[^>]*data-contact-form/);
  assert.match(html, /<details class="faq-item reveal">/);
});

test('LocalBusiness and FAQ JSON-LD remain valid and point to Milestone Development', () => {
  const scriptMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.ok(scriptMatches.length >= 1, 'JSON-LD scripts exist');

  const lastGraph = JSON.parse(scriptMatches[scriptMatches.length - 1][1]);
  if (lastGraph['@graph']) {
    const graph = lastGraph['@graph'];
    const business = graph.find((entry) => entry['@id'] === 'https://milestonedevelopment.com.au/#business');
    const faq = graph.find((entry) => entry['@type'] === 'FAQPage');

    assert.equal(business.name, 'Milestone Development');
    assert.equal(business.telephone, '1800 008 883');
    assert.ok(business['@type'].includes('GeneralContractor'));
    assert.ok(faq.mainEntity.length >= 4);
  } else {
    assert.fail('Expected JSON-LD graph');
  }
});
