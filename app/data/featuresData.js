export const FEATURES_ASSETS = {
  brandLogoDark: "/brand/wusooly-logo-dark.png",
  // Shops & Supermarkets
  retailLifetimeBilling: "/features/retail/lifetime-billing.webp",
  retailLifetimeWallets: "/features/retail/lifetime-wallets.webp",
  retailLifetimeStock: "/features/retail/lifetime-stock.webp",
  retailLifetimePurchase: "/features/retail/lifetime-purchase.webp",
  retailLifetimeReports: "/features/retail/lifetime-reports.webp",
  retailCloudDashboard: "/features/retail/cloud-dashboard.webp",
  retailCloudPromos: "/features/retail/cloud-promos.webp",

  // Cafés & Restaurants
  cafeLifetimeBilling: "/features/cafe/lifetime-billing.webp",
  cafeLifetimeWallets: "/features/cafe/lifetime-wallets.webp",
  cafeLifetimeKot: "/features/cafe/lifetime-kot.webp",
  cafeLifetimeTables: "/features/cafe/lifetime-tables.webp",
  cafeLifetimeStock: "/features/cafe/lifetime-stock.webp",
  cafeLifetimeReports: "/features/cafe/lifetime-reports.webp",
  cafeCloudQrOnline: "/features/cafe/cloud-qr-online.webp",
};

export const AUDIENCE_BENTO = {
  retail: {
    sectionId: "features",
    headline: "The essentials to run your store, connected.",
    subtext:
      "From checkout to stock control and business reporting, manage key retail operations through one POS system.",
    outroTitle: "Ready to see Wusooly in your store?",
    rows: [
      {
        type: "hero",
        image: FEATURES_ASSETS.retailLifetimeBilling,
        alt: "Wusooly POS offline and barcode billing terminal on counter",
        title: "OFFLINE & BARCODE BILLING THAT GROWS SMARTER EVERY DAY.",
        ctaLabel: "Get a Demo",
      },
      {
        type: "row",
        items: [
          {
            type: "text",
            title: "BARCODE GENERATOR & PRODUCT CATEGORIES",
            body: "Print custom barcode labels, organize products by category, and connect wallets and scanners in one platform.",
            chipKind: "payments",
          },
          {
            type: "visual",
            flexClass: "flex-67",
            image: FEATURES_ASSETS.retailLifetimeWallets,
            alt: "Customer-based billing, store wallets, and credit system at counter",
            objectPosition: "center 35%",
            title: "CUSTOMER BILLING, WALLETS & CREDIT SYSTEM.",
          },
        ],
      },
      {
        type: "visual",
        variant: "wide",
        image: FEATURES_ASSETS.retailLifetimeStock,
        alt: "POS terminal showing automated stock updates and low-stock alerts",
        objectPosition: "center 22%",
        title: "STOCK THAT UPDATES ITSELF. ALERTS BEFORE YOU RUN OUT.",
        body: "Real-time inventory reconciliation across every register. Automated low-stock alerts keep your shelves full without manual checks.",
      },
      {
        type: "row",
        items: [
          {
            type: "visual",
            flexClass: "flex-61",
            image: FEATURES_ASSETS.retailLifetimePurchase,
            alt: "Store owner recording stock purchase expenses with barcode scanner",
            objectPosition: "center 18%",
            title: "RECORD EVERY PURCHASE. REPLENISH WITHOUT GUESSWORK.",
          },
          {
            type: "stat",
            number: "38.5%",
            body: "Review profit margins, expense ledgers, and multi-staff role records calculated automatically from your store activity.",
          },
        ],
      },
      {
        type: "visual",
        variant: "wide",
        image: FEATURES_ASSETS.retailLifetimeReports,
        alt: "Store owner reviewing shift, sales, P&L, and stock performance reports",
        objectPosition: "center 20%",
        title: "PERFORMANCE REPORTS THAT REVEAL WHAT MATTERS MOST.",
        body: "Shift, sales, profit & loss, and stock reports in one clear operations dashboard built for store owners.",
      },
      {
        type: "row",
        items: [
          {
            type: "visual",
            flexClass: "flex-59",
            image: FEATURES_ASSETS.retailCloudDashboard,
            alt: "Store owner checking live cloud dashboard on app and web",
            objectPosition: "center 22%",
            title: "LIVE CLOUD DASHBOARD ON APP & WEB. FIRST YEAR FREE.",
          },
          {
            type: "visual",
            flexClass: "flex-41",
            image: FEATURES_ASSETS.retailCloudPromos,
            alt: "Customer redeeming gift card and promo code at counter",
            objectPosition: "center 38%",
            title: "PROMO CODES, GIFT CARDS & CLOUD BACKUP.",
          },
        ],
      },
      {
        type: "outro",
        ctaLabel: "Schedule a 1-on-1 Walkthrough",
      },
    ],
  },
  cafe: {
    sectionId: "cafe-features",
    headline: "Every order. One simple system.",
    subtext:
      "From table service to takeaway and online ordering, manage billing, kitchen tickets, and business analytics through one unified POS.",
    outroTitle: "Ready to see Wusooly in your café?",
    rows: [
      {
        type: "hero",
        image: FEATURES_ASSETS.cafeLifetimeBilling,
        alt: "Modern café POS terminal displaying Wusooly POS billing interface",
        title: "FAST BILLING. MULTIPLE PAYMENT METHODS. ZERO\u00A0FRICTION.",
        body: "Accept cash, cards, UPI, wallets, and split payments from one screen—online or offline. Whether it's a single coffee or a full-table dinner, checkout stays fast and accurate.",
        ctaLabel: "Get a Demo",
      },
      {
        type: "row",
        items: [
          {
            type: "text",
            title: "DINE-IN, TAKEAWAY & ONLINE ORDERING",
            body: "One POS handles sit-down service, counter pickup, category menus, and online delivery orders without juggling systems.",
            chipKind: "channels",
          },
          {
            type: "visual",
            flexClass: "flex-67",
            image: FEATURES_ASSETS.cafeLifetimeWallets,
            alt: "Customer orders, wallets, and credit balances at espresso bar",
            objectPosition: "center 35%",
            title: "CUSTOMER ORDERS, WALLETS & CREDIT BALANCES.",
          },
        ],
      },
      {
        type: "row",
        items: [
          {
            type: "kot",
            logo: FEATURES_ASSETS.brandLogoDark,
            logoAlt: "Wusooly POS",
            title: "KITCHEN ORDER TICKETS & LIVE DISPLAY",
            body: "Every order fires a KOT straight to the kitchen printer or display screen. Cooks see exactly what to make, modifications included without lost tickets.",
            ctaLabel: "See KOT in Action",
            image: FEATURES_ASSETS.cafeLifetimeKot,
            alt: "Chef plating dishes in front of Wusooly Kitchen Display Screen",
          },
          {
            type: "visual",
            variant: "tall",
            flexClass: "flex-62",
            image: FEATURES_ASSETS.cafeLifetimeTables,
            alt: "Table ordering and reservations floor plan tablet in restaurant",
            objectPosition: "82% 45%",
            title: "TABLE ORDERING & RESERVATIONS MADE EFFORTLESS",
            body: "Visual floor plans, real-time table status, and reservation management to seat guests faster and maximise covers without the chaos.",
          },
        ],
      },
      {
        type: "visual",
        variant: "wide",
        image: FEATURES_ASSETS.cafeLifetimeStock,
        alt: "Automated kitchen stock updates, low-stock alerts, and purchase expenses",
        objectPosition: "center 22%",
        title: "AUTOMATED STOCK UPDATES, ALERTS & PURCHASE EXPENSES.",
        body: "Deduct kitchen ingredients automatically, receive low-stock alerts before prep runs short, and record supplier purchase expenses.",
      },
      {
        type: "row",
        items: [
          {
            type: "visual",
            flexClass: "flex-61",
            image: FEATURES_ASSETS.cafeLifetimeReports,
            alt: "Café owner reviewing shift, sales, P&L, and best-seller margin reports",
            objectPosition: "center 18%",
            title: "SHIFT, SALES, P&L & BEST-SELLER MARGIN REPORTS.",
          },
          {
            type: "stat",
            number: "6+",
            body: "Cashier, waiter, kitchen, manager, admin, delivery: assign roles with dynamic access control so every team member sees only what they need.",
          },
        ],
      },
      {
        type: "strip",
        items: [
          {
            icon: "BarChart3",
            title: "Expense Ledger & Tracking",
            body: "Categorise every café expense (ingredients, utilities, rent, wages) and see exactly where money goes each month.",
          },
          {
            icon: "Tag",
            title: "Promo Codes & Gift Cards",
            body: "Create promo codes, happy-hour discounts, and preloadable gift cards. Auto-apply at checkout for a seamless guest experience.",
          },
          {
            icon: "Cloud",
            title: "Cloud Backup (1st Year Free)",
            body: "Automatic cloud backup and live multi-device sync across web and mobile—included free for your entire first year.",
          },
        ],
      },
      {
        type: "visual",
        variant: "wide",
        image: FEATURES_ASSETS.cafeCloudQrOnline,
        alt: "Guest scanning table QR digital menu while live cloud dashboard updates",
        objectPosition: "center 35%",
        title: "QR DIGITAL MENU & LIVE CLOUD DASHBOARD.",
        body: "Scan-at-table QR menus, direct online ordering, and live app & web performance reports—all in one clear dashboard.",
      },
      {
        type: "outro",
        ctaLabel: "Schedule a 1-on-1 Walkthrough",
      },
    ],
  },
};
