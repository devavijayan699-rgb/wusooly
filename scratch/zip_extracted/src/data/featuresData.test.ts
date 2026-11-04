import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FEATURES_SECTION_DATA,
  formatIndianNumber,
  getNextTabId,
} from './featuresData';

test('FEATURES_SECTION_DATA contains exact header copy and per-tab sublines', () => {
  assert.equal(FEATURES_SECTION_DATA.headingLine1, 'Everything you need');
  assert.equal(FEATURES_SECTION_DATA.headingLine2, 'in one POS');
  assert.equal(FEATURES_SECTION_DATA.tabs.length, 2);

  const [shopsTab, cafesTab] = FEATURES_SECTION_DATA.tabs;
  assert.equal(shopsTab.label, 'Shops & Supermarkets');
  assert.equal(shopsTab.subline, 'Built for counters, shelves & stock');

  assert.equal(cafesTab.label, 'Cafes & Restaurants');
  assert.equal(cafesTab.subline, 'From table to kitchen to bill');
});

test('Shops & Supermarkets tab has 3 photo cards and 4 white cards with LIFETIME badges', () => {
  const shopsTab = FEATURES_SECTION_DATA.tabs.find((t) => t.id === 'shops')!;
  assert.equal(shopsTab.cards.length, 7);

  const photoCards = shopsTab.cards.filter((c) => c.theme === 'photo');
  const whiteCards = shopsTab.cards.filter((c) => c.theme === 'white');
  assert.equal(photoCards.length, 3);
  assert.equal(whiteCards.length, 4);

  for (const card of shopsTab.cards) {
    assert.equal(card.badge, 'LIFETIME');
  }
});

test('Cafes & Restaurants tab has all 7 exact cards, badges, and chip groups', () => {
  const cafesTab = FEATURES_SECTION_DATA.tabs.find((t) => t.id === 'cafes')!;
  assert.equal(cafesTab.cards.length, 7);

  const expectedCards = [
    { title: 'Dine-in, Takeaway & Delivery', badge: 'LIFETIME', theme: 'photo', size: 'wide' },
    { title: 'QR Digital Menu', badge: 'CLOUD', theme: 'photo', size: 'tall' },
    { title: 'Tables & Reservations', badge: 'LIFETIME', theme: 'white', size: 'standard' },
    { title: 'KOT Slips', badge: 'LIFETIME', theme: 'photo', size: 'standard' },
    { title: 'Online Ordering', badge: 'CLOUD', theme: 'white', size: 'standard' },
    { title: 'Best-sellers & Margins', badge: 'LIFETIME', theme: 'white', size: 'standard' },
    { title: 'Promo Codes & Gift Cards', badge: 'CLOUD', theme: 'white', size: 'standard' },
  ];

  assert.deepEqual(
    cafesTab.cards.map((c) => ({
      title: c.title,
      badge: c.badge,
      theme: c.theme,
      size: c.size,
    })),
    expectedCards
  );

  assert.equal(cafesTab.chipGroups.length, 2);
  assert.deepEqual(cafesTab.chipGroups[0].items, [
    'Offline Billing',
    'Wallet',
    'Customer Orders',
    'Expense Ledger',
    'Low Stock Alerts',
    'Shift, Sales & P&L Reports',
    'Multi-staff Roles',
  ]);
  assert.deepEqual(cafesTab.chipGroups[1].items, [
    'Live Dashboard',
    'Dynamic Role Controls',
    'Cloud Backup',
  ]);
});

test('formatIndianNumber formats numbers with Indian comma grouping', () => {
  assert.equal(formatIndianNumber(1250), '1,250');
  assert.equal(formatIndianNumber(12400), '12,400');
  assert.equal(formatIndianNumber(384), '384');
});

test('getNextTabId handles ArrowLeft, ArrowRight, Home, and End navigation', () => {
  const tabs = FEATURES_SECTION_DATA.tabs;
  assert.equal(getNextTabId(tabs, 'shops', 'ArrowRight'), 'cafes');
  assert.equal(getNextTabId(tabs, 'cafes', 'ArrowRight'), 'shops');
  assert.equal(getNextTabId(tabs, 'shops', 'ArrowLeft'), 'cafes');
  assert.equal(getNextTabId(tabs, 'cafes', 'Home'), 'shops');
  assert.equal(getNextTabId(tabs, 'shops', 'End'), 'cafes');
  assert.equal(getNextTabId(tabs, 'shops', 'Enter'), null);
});
