/**
 * PHOTOGRAPHY PROMPTS & ASSET MANIFEST
 * Generated once during development using reference images strictly for photographic style
 * and saved as static assets under /public/images/...
 *
 * Shared photographic rules:
 * Photorealistic, full-frame camera look, 50mm-85mm, warm natural window light, shallow depth
 * of field, deep green and mustard-yellow accents in wardrobe or props, authentic Indian
 * grocery/supermarket and cafe/restaurant settings, no readable text, no logos, no watermarks,
 * no brand names, natural hands, no distorted faces. Calm negative space at top and bottom for
 * text overlay. Color graded consistently (slightly warm, gentle contrast).
 *
 * --- SHOPS & SUPERMARKETS ---
 * 1) /images/shop-barcode.jpg (portrait 4:5)
 * Prompt: "A friendly Indian supermarket cashier at a stainless-steel billing counter, scanning a
 * packaged grocery item with a handheld barcode scanner, glowing scanner light, shot from a
 * slightly low three-quarter angle, soft bokeh of stocked shelves behind, a paper bag of
 * groceries in the foreground."
 *
 * 2) /images/shop-stock.jpg (landscape 4:3)
 * Prompt: "An Indian shop owner (woman) in a deep green apron standing in a tidy stockroom aisle
 * with neatly stacked packaged goods, checking a tablet held at chest height, the tablet screen
 * softly glowing green (no readable text), warm light from a side window, calm focused expression."
 *
 * 3) /images/shop-wallet.jpg (landscape 4:3)
 * Prompt: "Close view of a customer's hand tapping a phone to pay at a shop billing counter, a
 * small receipt printer and a glass jar of sweets blurred beside it, the smiling shopkeeper
 * softly out of focus in the background, a cloth shopping bag in the foreground."
 *
 * --- CAFES & RESTAURANTS ---
 * 4) /images/cafe-pos.jpg (landscape 16:9)
 * Prompt: "A young Indian woman in a deep green apron at a cafe counter, tapping a touchscreen
 * POS terminal showing a colorful grid of food and drink photo tiles (interface text unreadable),
 * a compact receipt printer beside the screen, a pastry display case and hanging plants softly
 * blurred behind. Subject in the center-right, extra headroom so it crops safely to a wide 2:1
 * banner."
 *
 * 5) /images/cafe-qr-menu.jpg (portrait 4:5)
 * Prompt: "Over-the-shoulder view of a family of four at a rustic wooden restaurant table, one
 * person holding up a phone to scan a small dark-green standing table card with a plain QR code
 * (no text on the card), water glasses and a small plant in a vase, dappled sunlight across the
 * table."
 *
 * 6) /images/cafe-kitchen.jpg (landscape 4:3)
 * Prompt: "A chef in a dark green apron at a kitchen pass, pulling a printed order ticket from a
 * small thermal printer mounted on the rail, a plated dish and steam softly blurred,
 * stainless-steel surfaces, warm tungsten light, ticket text unreadable."
 */

export type BadgeType = 'LIFETIME' | 'CLOUD';

export type CardSize = 'tall' | 'standard' | 'wide';

export type CardTheme = 'photo' | 'white';

export type GlassChipConfig =
  | {
      type: 'status';
      text: string;
      dotColor?: 'amber' | 'green';
    }
  | {
      type: 'plain';
      text: string;
    }
  | {
      type: 'counter';
      prefix: string;
      currencySymbol: string;
      targetAmount: number;
    }
  | {
      type: 'segmented-cycle';
      options: string[];
      intervalMs: number;
    };

export interface ProfitBarItem {
  id: string;
  label: string;
  heightPercent: number;
  marginText: string;
  isHighlight?: boolean;
}

export interface LedgerRowItem {
  id: string;
  label: string;
  amount: string;
}

export interface ReportTabMetric {
  id: 'Shift' | 'Sales' | 'P&L' | 'Stock';
  label: 'Shift' | 'Sales' | 'P&L' | 'Stock';
  sparklinePoints: string;
  areaPath: string;
  endPoint: { x: number; y: number };
}

export interface FloorTableTile {
  id: string;
  tableName: string;
  status: 'free' | 'occupied' | 'reserved';
  subLabel: string;
}

export interface HorizontalBarItem {
  id: string;
  label: string;
  widthPercent: number;
  marginLabel: string;
  isTop?: boolean;
}

export type CardVisualConfig =
  | {
      type: 'profit-chart';
      bars: ProfitBarItem[];
    }
  | {
      type: 'barcode-generator';
      defaultCode: string;
      buttonLabel: string;
    }
  | {
      type: 'ledger-list';
      rows: LedgerRowItem[];
    }
  | {
      type: 'reports-sparkline';
      defaultTab: 'Shift' | 'Sales' | 'P&L' | 'Stock';
      tabs: ReportTabMetric[];
    }
  | {
      type: 'tables-floor-plan';
      tables: FloorTableTile[];
    }
  | {
      type: 'online-order-notification';
      orderText: string;
      buttonLabel: string;
    }
  | {
      type: 'bestsellers-bars';
      items: HorizontalBarItem[];
    }
  | {
      type: 'promo-gift-card';
      couponCode: string;
      couponSub: string;
      giftCardAmount: string;
      giftCardLabel: string;
    };

export interface FeatureCardData {
  id: string;
  badge: BadgeType;
  title: string;
  description: string;
  size: CardSize;
  theme: CardTheme;
  image?: {
    src: string;
    alt: string;
    aspectRatio: '4:5' | '4:3' | '16:9';
    objectPositionClass?: string;
  };
  glassChip?: GlassChipConfig;
  visual?: CardVisualConfig;
}

export interface ChipGroupData {
  id: string;
  caption: string;
  tone: 'green' | 'yellow';
  items: string[];
}

export interface FeatureTabContent {
  id: 'shops' | 'cafes';
  label: string;
  subline: string;
  cards: FeatureCardData[];
  chipGroups: ChipGroupData[];
}

export interface FeaturesSectionData {
  headingLine1: string;
  headingLine2: string;
  defaultTabId: 'shops' | 'cafes';
  tabs: FeatureTabContent[];
}

export const FEATURES_SECTION_DATA: FeaturesSectionData = {
  headingLine1: 'Everything you need',
  headingLine2: 'in one POS',
  defaultTabId: 'shops',
  tabs: [
    {
      id: 'shops',
      label: 'Shops & Supermarkets',
      subline: 'Built for counters, shelves & stock',
      cards: [
        {
          id: 'barcode-billing',
          badge: 'LIFETIME',
          title: 'Barcode Billing',
          description: 'Scan, bill, done. Fast checkout even at rush hour.',
          size: 'tall',
          theme: 'photo',
          image: {
            src: '/images/shop-barcode.jpg',
            alt: 'Friendly Indian supermarket cashier at a stainless-steel counter scanning a packaged grocery item with a handheld barcode scanner',
            aspectRatio: '4:5',
          },
        },
        {
          id: 'automated-stock',
          badge: 'LIFETIME',
          title: 'Automated Stock',
          description:
            'Stock updates with every sale and purchase. Low-stock alerts before you run out.',
          size: 'standard',
          theme: 'photo',
          image: {
            src: '/images/shop-stock.jpg',
            alt: 'Indian shop owner in a deep green apron checking inventory levels on a glowing green tablet inside a tidy stockroom aisle',
            aspectRatio: '4:3',
          },
          glassChip: {
            type: 'status',
            text: 'Sugar 1kg · 3 left · Low stock',
            dotColor: 'amber',
          },
        },
        {
          id: 'wallet-credit',
          badge: 'LIFETIME',
          title: 'Wallet & Credit',
          description: 'Customer-based billing with wallets and credit balances.',
          size: 'standard',
          theme: 'photo',
          image: {
            src: '/images/shop-wallet.jpg',
            alt: 'Customer hand tapping a phone to pay at an Indian grocery billing counter with a smiling shopkeeper in the background',
            aspectRatio: '4:3',
          },
          glassChip: {
            type: 'counter',
            prefix: 'Wallet balance',
            currencySymbol: '₹',
            targetAmount: 1250,
          },
        },
        {
          id: 'profit-margins',
          badge: 'LIFETIME',
          title: 'Profit Margins',
          description: 'See what you really earn on every product, not just what you sell.',
          size: 'wide',
          theme: 'white',
          visual: {
            type: 'profit-chart',
            bars: [
              { id: 'b1', label: 'Grains', heightPercent: 38, marginText: '+14%' },
              { id: 'b2', label: 'Dairy', heightPercent: 52, marginText: '+18%' },
              { id: 'b3', label: 'Snacks', heightPercent: 46, marginText: '+16%' },
              { id: 'b4', label: 'Pulses', heightPercent: 68, marginText: '+22%' },
              { id: 'b5', label: 'Oils', heightPercent: 79, marginText: '+26%' },
              { id: 'b6', label: 'Spices', heightPercent: 96, marginText: '+34%', isHighlight: true },
            ],
          },
        },
        {
          id: 'barcode-generator',
          badge: 'LIFETIME',
          title: 'Barcode Generator',
          description: "Create and print barcodes for items that don't have one.",
          size: 'standard',
          theme: 'white',
          visual: {
            type: 'barcode-generator',
            defaultCode: '890142500391',
            buttonLabel: 'Print',
          },
        },
        {
          id: 'purchases-expenses',
          badge: 'LIFETIME',
          title: 'Purchases & Expenses',
          description: 'Log stock purchases and every expense in one ledger.',
          size: 'standard',
          theme: 'white',
          visual: {
            type: 'ledger-list',
            rows: [
              { id: 'l1', label: 'Stock purchase', amount: '₹12,400' },
              { id: 'l2', label: 'Shop rent', amount: '₹8,000' },
              { id: 'l3', label: 'Electricity', amount: '₹2,150' },
            ],
          },
        },
        {
          id: 'reports-that-matter',
          badge: 'LIFETIME',
          title: 'Reports that matter',
          description: 'Shift, sales, profit & loss and stock reports.',
          size: 'standard',
          theme: 'white',
          visual: {
            type: 'reports-sparkline',
            defaultTab: 'Sales',
            tabs: [
              {
                id: 'Shift',
                label: 'Shift',
                sparklinePoints: 'M 4 28 C 42 26, 68 17, 104 19 C 142 21, 174 10, 208 12 C 228 13, 242 7, 255 5',
                areaPath: 'M 4 28 C 42 26, 68 17, 104 19 C 142 21, 174 10, 208 12 C 228 13, 242 7, 255 5 L 255 35 L 4 35 Z',
                endPoint: { x: 255, y: 5 },
              },
              {
                id: 'Sales',
                label: 'Sales',
                sparklinePoints: 'M 4 30 C 44 28, 72 20, 110 22 C 148 24, 180 11, 214 13 C 232 14, 244 6, 255 5',
                areaPath: 'M 4 30 C 44 28, 72 20, 110 22 C 148 24, 180 11, 214 13 C 232 14, 244 6, 255 5 L 255 35 L 4 35 Z',
                endPoint: { x: 255, y: 5 },
              },
              {
                id: 'P&L',
                label: 'P&L',
                sparklinePoints: 'M 4 27 C 46 22, 78 25, 116 16 C 154 9, 186 15, 220 8 C 236 5, 246 6, 255 4',
                areaPath: 'M 4 27 C 46 22, 78 25, 116 16 C 154 9, 186 15, 220 8 C 236 5, 246 6, 255 4 L 255 35 L 4 35 Z',
                endPoint: { x: 255, y: 4 },
              },
              {
                id: 'Stock',
                label: 'Stock',
                sparklinePoints: 'M 4 23 C 44 25, 80 15, 118 18 C 156 20, 190 11, 224 9 C 238 8, 248 7, 255 6',
                areaPath: 'M 4 23 C 44 25, 80 15, 118 18 C 156 20, 190 11, 224 9 C 238 8, 248 7, 255 6 L 255 35 L 4 35 Z',
                endPoint: { x: 255, y: 6 },
              },
            ],
          },
        },
      ],
      chipGroups: [
        {
          id: 'also-included-shops',
          caption: 'Also included',
          tone: 'green',
          items: ['Offline Billing', 'Product Categories', 'Customer Orders', 'Multi-staff Roles'],
        },
        {
          id: 'cloud-addons-shops',
          caption: 'Cloud add-ons, first year free',
          tone: 'yellow',
          items: ['Live Dashboard', 'Promo Codes & Gift Cards', 'Cloud Backup'],
        },
      ],
    },
    {
      id: 'cafes',
      label: 'Cafes & Restaurants',
      subline: 'From table to kitchen to bill',
      cards: [
        {
          id: 'dine-in-takeaway-delivery',
          badge: 'LIFETIME',
          title: 'Dine-in, Takeaway & Delivery',
          description: 'One system for every order type, from the counter to the doorstep.',
          size: 'wide',
          theme: 'photo',
          image: {
            src: '/images/cafe-pos.jpg',
            alt: 'Young Indian woman in a deep green apron at a cafe counter tapping a touchscreen POS terminal showing food and drink tiles',
            aspectRatio: '16:9',
            objectPositionClass: 'object-[50%_22%]',
          },
          glassChip: {
            type: 'segmented-cycle',
            options: ['Dine-in', 'Takeaway', 'Delivery'],
            intervalMs: 3000,
          },
        },
        {
          id: 'qr-digital-menu',
          badge: 'CLOUD',
          title: 'QR Digital Menu',
          description: 'Guests scan, browse and order right from their table.',
          size: 'tall',
          theme: 'photo',
          image: {
            src: '/images/cafe-qr-menu.jpg',
            alt: 'Family of four at a wooden restaurant table scanning a dark-green standing QR code menu card with a smartphone',
            aspectRatio: '4:5',
          },
          glassChip: {
            type: 'plain',
            text: 'Table 7 · New order · 3 items',
          },
        },
        {
          id: 'tables-reservations',
          badge: 'LIFETIME',
          title: 'Tables & Reservations',
          description: 'Manage dine-in tables and bookings at a glance.',
          size: 'standard',
          theme: 'white',
          visual: {
            type: 'tables-floor-plan',
            tables: [
              { id: 't1', tableName: 'T1', status: 'free', subLabel: 'Free' },
              { id: 't2', tableName: 'T2', status: 'occupied', subLabel: 'Occupied' },
              { id: 't3', tableName: 'T3', status: 'free', subLabel: 'Free' },
              { id: 't4', tableName: 'T4', status: 'occupied', subLabel: 'Occupied' },
              { id: 't5', tableName: 'T5', status: 'reserved', subLabel: '8:00 PM' },
              { id: 't6', tableName: 'T6', status: 'free', subLabel: 'Free' },
            ],
          },
        },
        {
          id: 'kot-slips',
          badge: 'LIFETIME',
          title: 'KOT Slips',
          description: 'Orders print straight to the kitchen. No shouting, no missed items.',
          size: 'standard',
          theme: 'photo',
          image: {
            src: '/images/cafe-kitchen.jpg',
            alt: 'Chef in a dark green apron at a stainless-steel kitchen pass pulling a printed KOT order slip from a rail-mounted thermal printer',
            aspectRatio: '4:3',
          },
          glassChip: {
            type: 'plain',
            text: 'KOT #112 · Table 4 · 2× Latte, 1× Club Sandwich',
          },
        },
        {
          id: 'online-ordering',
          badge: 'CLOUD',
          title: 'Online Ordering',
          description: 'Take orders from your own online channel.',
          size: 'standard',
          theme: 'white',
          visual: {
            type: 'online-order-notification',
            orderText: 'New order · ₹384 · 7 items',
            buttonLabel: 'Accept',
          },
        },
        {
          id: 'bestsellers-margins',
          badge: 'LIFETIME',
          title: 'Best-sellers & Margins',
          description: 'Know which items actually make you money.',
          size: 'standard',
          theme: 'white',
          visual: {
            type: 'bestsellers-bars',
            items: [
              { id: 'bs1', label: 'Cold Coffee', widthPercent: 94, marginLabel: '72%', isTop: true },
              { id: 'bs2', label: 'Chicken Burger', widthPercent: 76, marginLabel: '58%' },
              { id: 'bs3', label: 'Masala Chai', widthPercent: 62, marginLabel: '64%' },
            ],
          },
        },
        {
          id: 'promo-codes-gift-cards',
          badge: 'CLOUD',
          title: 'Promo Codes & Gift Cards',
          description: 'Bring customers back with offers and gift cards.',
          size: 'standard',
          theme: 'white',
          visual: {
            type: 'promo-gift-card',
            couponCode: 'WELCOME15',
            couponSub: '15% OFF',
            giftCardAmount: '₹500',
            giftCardLabel: 'GIFT CARD',
          },
        },
      ],
      chipGroups: [
        {
          id: 'also-included-cafes',
          caption: 'Also included',
          tone: 'green',
          items: [
            'Offline Billing',
            'Wallet',
            'Customer Orders',
            'Expense Ledger',
            'Low Stock Alerts',
            'Shift, Sales & P&L Reports',
            'Multi-staff Roles',
          ],
        },
        {
          id: 'cloud-addons-cafes',
          caption: 'Cloud add-ons, first year free',
          tone: 'yellow',
          items: ['Live Dashboard', 'Dynamic Role Controls', 'Cloud Backup'],
        },
      ],
    },
  ],
};

/**
 * Pure helper utilities for formatting Indian Rupee values and keyboard tab navigation.
 */
export function formatIndianNumber(value: number): string {
  const clamped = Math.max(0, Math.round(value));
  return clamped.toLocaleString('en-IN');
}

export function getNextTabId(
  tabs: ReadonlyArray<{ id: 'shops' | 'cafes' }>,
  currentId: 'shops' | 'cafes',
  key: string
): 'shops' | 'cafes' | null {
  const index = tabs.findIndex((t) => t.id === currentId);
  if (index === -1 || tabs.length === 0) return null;

  if (key === 'ArrowRight' || key === 'ArrowDown') {
    const nextIndex = (index + 1) % tabs.length;
    return tabs[nextIndex].id;
  }
  if (key === 'ArrowLeft' || key === 'ArrowUp') {
    const prevIndex = (index - 1 + tabs.length) % tabs.length;
    return tabs[prevIndex].id;
  }
  if (key === 'Home') {
    return tabs[0].id;
  }
  if (key === 'End') {
    return tabs[tabs.length - 1].id;
  }
  return null;
}
