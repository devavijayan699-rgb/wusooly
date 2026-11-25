export const HELPER_HERO = {
  title: "Wusooly Helper",
  subtitle:
    "Connect your shop phone to the POS. See who's calling and get WhatsApp alerts at the counter.",
  chips: [
    { id: "caller-id", label: "Caller ID", icon: "PhoneIncoming" },
    { id: "whatsapp", label: "WhatsApp alerts", icon: "MessageSquare" },
    { id: "qr", label: "QR pairing", icon: "QrCode" },
  ],
  anchorLabel: "How to set up",
  apkCard: {
    title: "Download for Android",
    version: "v0.5.2",
    size: "3.4 MB",
    ctaLabel: "Download APK",
    caption: "Open this page on your phone to install.",
    specs: [
      { label: "Requires", value: "Android 10+" },
      { label: "Updated", value: "Nov 14, 2026" },
    ],
    trustLabel: "Signed by Wusooly",
  },
};

export const HELPER_STEPS = [
  {
    number: "01",
    title: "Install",
    body: "Download the APK on your shop phone and open it. Allow installs from your browser if asked.",
    icon: "Download",
  },
  {
    number: "02",
    title: "Pair",
    body: "On the POS, add this phone as a Caller ID source. Then open Helper and scan the QR code shown on the POS.",
    icon: "QrCode",
  },
  {
    number: "03",
    title: "Allow access",
    body: "Turn on call forwarding and caller ID. For WhatsApp, pick your apps and allow notification access.",
    icon: "PhoneCall",
  },
];

export const HELPER_NOTES = [
  {
    id: "same-wifi",
    title: "Same Wi-Fi",
    body: "Phone and POS must share a network. Helper reconnects if the POS IP changes.",
    icon: "Wifi",
  },
  {
    id: "qr-expiry",
    title: "QR expires in 5 min",
    body: "Refresh it on the POS, or enter the code manually.",
    icon: "Clock",
  },
  {
    id: "privacy",
    title: "You choose what's shared",
    body: "Toggle calls and WhatsApp separately. Data goes encrypted to your POS only; contacts are never uploaded.",
    icon: "Lock",
  },
];

export const PAIRING_GUIDE = {
  headline: "How to pair",
  groups: [
    {
      id: "pos",
      label: "On the POS",
      icon: "Monitor",
      steps: [
        {
          number: "1",
          text: "Open the Caller ID settings:",
          breadcrumbs: ["More", "Caller ID", "Add source", "Android phone"],
        },
        {
          number: "2",
          text: "Choose Scan QR to show a code, or Enter code to show a short code instead.",
        },
      ],
    },
    {
      id: "phone",
      label: "On your phone",
      icon: "Smartphone",
      steps: [
        {
          number: "3",
          text: "Open Wusooly Helper and point the camera at the QR on the POS screen.",
        },
        {
          number: "4",
          text: "No camera? Type the code shown on the POS. The POS shows Connected when it's done.",
        },
      ],
    },
  ],
  troubleshoot: {
    prefix: "Still not connecting?",
    body: " On the POS pairing screen, tap Not connecting? to see the POS address, then enter it in Helper.",
  },
};
