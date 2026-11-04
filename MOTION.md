# Wusooly POS — Motion Bible & Specification

> **Awwwards-Caliber Motion System**  
> **Mood**: Calm Luxury / Editorial  
> **Animation Engine**: GSAP 3 (ScrollTrigger, useGSAP)  
> **Smooth Scroll**: Lenis (lenis/react)  
> **Strict Rule**: Animate only `transform`, `opacity`, and `clip-path`. Never layout properties. Travel is always upward.

---

## 1. Design Tokens

Derived from the calm luxury aesthetic (+15% lengthened durations for unhurried confidence).

| Token | Value | Purpose |
|---|---|---|
| `ease.out` | `expo.out` (`cubic-bezier(0.16, 1, 0.3, 1)`) | Primary reveal curve across all sections |
| `ease.inOut` | `power3.inOut` (`cubic-bezier(0.76, 0, 0.24, 1)`) | Curtain transitions and route wipes |
| `ease.micro` | `power2.out` | Quick UI & hover response |
| `duration.micro` | `0.35s` | Button hovers, micro-interactions |
| `duration.base` | `1.15s` | Cards, content blocks, standard reveals |
| `duration.hero` | `1.5s` | Master hero timeline |
| `duration.page` | `1.0s` | Route transition curtain wipe |
| `duration.split` | `0.85s` | Masked line reveal |
| `stagger.base` | `0.09s` | Grid items & sibling cards |
| `stagger.lines` | `0.06s` | Text lines inside masked headers |
| `travel.y` | `40px` | Maximum upward displacement |
| `travel.ySmall` | `24px` | Badges, pills, small meta elements |
| `travel.parallax` | `8%` | Image parallax travel |
| `image.clipFrom` | `inset(12% 0% 12% 0%)` | Image reveal initial clipping mask |
| `image.scaleFrom` | `1.15 -> 1.0` | Subtle zoom-out on image reveal |

### CSS Variables Mirror (`globals.css`)
```css
:root {
  --motion-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --motion-ease-inout: cubic-bezier(0.76, 0, 0.24, 1);
  --motion-micro: 0.35s;
  --motion-base: 1.15s;
}
```

---

## 2. Section-by-Section Choreography

### Home (`/`)
1. **Preloader** (first visit per session):
   - Wusooly brand logo rises + fades in (`opacity: 0->1, y: 15->0`, `0.6s`).
   - Short pause (`0.25s`).
   - Deep forest curtain wipes upward via `clip-path: inset(0 0 100% 0)` (`0.8s, ease.inOut`).
   - `lenis.start()` called upon completion.
2. **Hero Timeline** (starts as preloader ends):
   - Background artwork reveals via clip-path + scale (`1.08 -> 1.0`, `1.5s`).
   - Audience segmented control floats in (`y: 24->0, opacity: 0->1`, starts at `0.2s`).
   - Headline lines rise out of overflow masks line-by-line (`y: 100%->0%`, stagger `0.06s`, starts at `0.35s`).
   - Description copy fades and translates (`y: 20->0, opacity: 0->1`, starts at `0.55s`).
   - Navbar fades in seamlessly (`opacity: 0->1`, starts at `0.4s`).
3. **Editorial Features (Retail & Café)**:
   - Feature cards trigger at `top 85%`.
   - Cards rise upward (`y: 40->0, opacity: 0->1, duration: 1.15s, ease.out`).
   - Feature photography reveals with inner scale decay (`1.15 -> 1.0`).
4. **FAQ Section**:
   - Headline lines masked reveal (`y: 100%->0%`, stagger `0.06s`).
   - Subtext fades upward.
   - Accordion interaction preserved as instant responsive feedback.
5. **Pricing Cards**:
   - Headline rises into view.
   - POS Core and Cloud & Growth cards stagger upward (`y: 40->0, stagger: 0.12s`).
6. **Download Section**:
   - Section header rises.
   - Dual platform cards stagger into place (`y: 40->0, stagger: 0.12s`).
7. **Footer**:
   - Restrained ambient entrance: gentle fade and subtle upward rise.

### About (`/about`)
- Hero headline lines masked reveal.
- Purpose quote card glides upward (`y: 32->0`).
- Editorial photo strip images reveal with clip-path + subtle parallax.
- Story video & mission card trigger staggered upward entries.
- Values bento grid staggers 4 cards (`stagger: 0.08s`).
- Split cards ("Always improving" & "Always reliable") stagger entry.

### Contact (`/contact`)
- Contact headline lines masked reveal.
- Contact form container glides in smoothly (`y: 40->0, opacity: 0->1`).

---

## 3. Micro-Interactions (Desktop `(pointer: fine)`)
- **Nav Hide / Show**: Navbar slides subtly up on scroll down, returns smoothly on scroll up.
- **Magnetic Buttons**: Applied to primary CTA buttons (`Get Quote`, `Get a Demo`). Uses `gsap.quickTo` with max 12px translation and elastic reset.
- **Image Hover**: Micro-scale `1.03` with smooth ease.

---

## 4. Page Transitions
- Fullscreen route curtain (`#082012`).
- On route departure: Curtain wipes down (`0.5s, power3.inOut`).
- Next.js route push executes.
- `lenis.scrollTo(0, { immediate: true })`.
- Old ScrollTriggers killed and purged.
- On route arrival: Curtain wipes away (`0.5s, power3.inOut`).
- Page content staggers into view.

---

## 5. The Kill List (Deliberately Excluded)
- ❌ Custom cursor (adds noise, degrades native accessibility).
- ❌ Text scramble / typewriter effects (clashes with editorial calm).
- ❌ 3D card tilt / gyroscope (feels gimmicky for business POS).
- ❌ Horizontal scroll jacking (compromises usability).
- ❌ Infinite text marquees.
- ❌ Morphing blobs or ambient floating balls.
- ❌ Sound effects.

---

## 6. Accessibility & Performance Guardrails
- Full `prefers-reduced-motion: reduce` compliance: all transforms & parallax disabled; instant opacity transitions only.
- Touch screens `(pointer: coarse)`: magnetic button physics disabled.
- Zero layout shifts (CLS = 0): only `transform`, `opacity`, and `clip-path` are animated.
- `will-change` assigned exclusively during active animation, then cleared.
- `document.fonts.ready` synchronization before text line splitting.

