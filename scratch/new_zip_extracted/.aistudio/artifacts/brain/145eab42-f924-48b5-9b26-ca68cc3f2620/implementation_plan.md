# Minimal & Natural Photography Plan — Wusooly Features

## 1. Visual Tone & Feel
Every photo will feel calm, familiar, and comfortable to look at—like stepping into a well-organized, sunlit neighborhood store or café.

- **Soft, Easy Daylight**: Gentle natural window light with low, comfortable contrast. No harsh shadows, no dramatic spotlights, and no heavy color grading.
- **Uncluttered Framing**: Clean counters and simple backgrounds with plenty of breathing room so the eye goes straight to the moment without visual noise.
- **Natural Everyday Palette**: Soft warm neutrals—oat, linen, warm oak, light stone, kraft paper, and brushed steel. Forest green appears only as a tiny natural detail (like a plant leaf or apron strap), plus one small lime-yellow accent (a sticker, pen clip, or tag) to gently connect with the button color.
- **Relaxed, Genuine People**: Everyday Indian store owners, staff, and customers looking comfortable and natural in their workspace—never stiff or overly posed.
- **Clean, Distraction-Free Screens**: POS tablets and payment terminals show soft, out-of-focus light blocks with no readable text or clutter, keeping the focus on the human interaction and making it easy to overlay real Wusooly screens later.
- **Clear Space for Headlines**: The lower third of full-bleed photos stays calm and uncluttered so the white headlines are effortless to read.

---

## 2. How Photos Match Each Card

- **Inset Photos on Dark Green Cards**: Bright, airy, and softly lit (pale stone, light wood, cream) so the photo feels fresh and lifts cleanly off the dark background.
- **Full-Bleed Photos (With Text Overlay)**: Warm, balanced natural tones (walnut wood, kraft brown, soft slate) with a calm lower area so the white headline sits comfortably without straining the eyes.
- **Inset Photo on Cream Card**: Soft warm kitchen tones (stainless steel, ceramic plates, warm daylight) that blend naturally with the cream card surface.

---

## 3. Photo List (14 Cards)

### Tab 1: Shops & Supermarkets

1. **Hero Card — `MANAGE BILLING THAT GROWS SMARTER EVERY SINGLE DAY.`**
   - **File**: `/public/images/retail-lifetime-billing.jpg`
   - **Scene**: A clean, sunlit light-stone counter with a modern black POS tablet and wireless barcode scanner. A hand rests naturally near the scanner, with soft out-of-focus glass jars in the background and a small lime-yellow cable clip.

2. **Row 2 Right — `TURN SIMPLE CHECKOUT INTO LONG-TERM STORE GROWTH.`**
   - **File**: `/public/images/retail-lifetime-wallets.jpg`
   - **Scene**: A customer in a soft knit sleeve gently tapping a card on a clean white payment reader held by a friendly staff member over a warm wooden counter.

3. **Row 3 Wide Banner — `STOCK THAT UPDATES ITSELF. ALERTS BEFORE YOU RUN OUT.`**
   - **File**: `/public/images/retail-lifetime-stock.jpg`
   - **Scene**: The store owner in a comfortable linen shirt checking neat wooden shelves with a tablet in soft morning light, framed gently past tidy glass jars on the right, leaving the left side calm for the headline.

4. **Row 4 Left — `RECORD EVERY PURCHASE. REPLENISH WITHOUT GUESSWORK.`**
   - **File**: `/public/images/retail-lifetime-purchase.jpg`
   - **Scene**: The owner calmly scanning a kraft paper pouch on a clean steel counter with soft daylight through the window behind him and a calm, uncluttered foreground.

5. **Row 5 Wide Banner — `PERFORMANCE REPORTS THAT REVEAL WHAT MATTERS MOST.`**
   - **File**: `/public/images/retail-lifetime-reports.jpg`
   - **Scene**: A warm, welcoming checkout moment where the owner hands a kraft paper bag to a smiling customer, with a softly blurred POS screen in the foreground and plenty of calm space on the left for text.

6. **Row 6 Wide Banner — `LIVE DASHBOARD & CLOUD BACKUP ACROSS WEB AND MOBILE.`**
   - **File**: `/public/images/retail-cloud-dashboard.jpg`
   - **Scene**: A quiet morning moment before opening—the store owner sitting at a clean wooden table with a cup of coffee, checking a laptop and phone in soft natural light.

7. **Row 7 Left — `PROMO CODES & GIFT CARDS THAT DRIVE REPEAT VISITS.`**
   - **File**: `/public/images/retail-cloud-promos.jpg`
   - **Scene**: A simple, close-up moment of hands exchanging a clean kraft gift card with a small lime-yellow seal over a calm stone counter.

---

### Tab 2: Cafés & Restaurants

8. **Hero Card — `FAST BILLING. MULTIPLE PAYMENT METHODS. ZERO FRICTION.`**
   - **File**: `/public/images/cafe-lifetime-billing.jpg`
   - **Scene**: A bright, tidy light-wood café counter with a clean white POS screen, a small tap reader, and a ceramic cappuccino cup in soft morning daylight.

9. **Row 2 Right — `EVERY TABLE CHECKED OUT. EVERY PAYMENT TRACKED.`**
   - **File**: `/public/images/cafe-lifetime-wallets.jpg`
   - **Scene**: A relaxed table-side payment moment with a guest tapping a card on a compact reader beside a coffee cup and pastry on a warm wooden table.

10. **Row 3 Left (Cream Card) — `KITCHEN ORDER TICKETS & LIVE DISPLAY`**
    - **File**: `/public/images/cafe-lifetime-kot.jpg`
    - **Scene**: A clean, calm open kitchen pass where a cook plates a dish in warm natural light, with a simple kitchen screen and paper order slip clipped nearby.

11. **Row 3 Right — `TABLE MANAGEMENT & RESERVATIONS MADE EFFORTLESS`**
    - **File**: `/public/images/cafe-lifetime-tables.jpg`
    - **Scene**: A calm wooden host stand with a tablet showing a soft, blurred floor plan in the foreground, looking out into a warm, comfortable café dining room.

12. **Row 4 Wide Banner — `CUSTOMER RECORDS, WALLETS & CREDIT BALANCES.`**
    - **File**: `/public/images/cafe-lifetime-stock.jpg`
    - **Scene**: A friendly café counter scene where the owner hands a regular guest her coffee while she taps a loyalty card, with a calm, uncluttered counter space on the left for the headline.

13. **Row 5 Left — `SHIFT, SALES & BEST-SELLER REPORTS AT A GLANCE.`**
    - **File**: `/public/images/cafe-lifetime-reports.jpg`
    - **Scene**: The owner and a team member sitting comfortably at a wooden café table after hours, reviewing a tablet together beside a notebook and espresso cup.

14. **Row 7 Wide Banner — `QR DIGITAL MENU, ONLINE ORDERING & LIVE CLOUD REPORTS.`**
    - **File**: `/public/images/cafe-cloud-qr-online.jpg`
    - **Scene**: A sunlit café table where a guest holds a phone over a simple wooden stand with a clean, minimal QR code beside an iced coffee, with soft open space on the left for text.

---

## 4. Implementation Steps
1. **Generate All 14 Photos**: Use the attached reference images for natural warmth and generate each scene with soft daylight, clean compositions, and comfortable tones.
2. **Save High-Resolution Files (`2000px+`)**: Export all 14 images to `/public/images/` and keep the prompt list documented in `/src/utils/editorialData.ts`.
3. **Fit & Verify Crops**: Check every card in both tabs to make sure the framing feels balanced, calm, and easy to read.
