# Apple.com Page Topology

## Visual Order
1. **Global Navigation (Sticky Overlay):** Standard Apple global nav with dropdown megamenus.
2. **Ribbon:** Temporary promotional/shopping guidance banner.
3. **Hero Section 1:** iPhone 17 Family (Dark theme, center aligned content).
4. **Hero Section 2:** MacBook Neo (Light theme, center aligned content).
5. **Hero Section 3:** iPad Air M4 (Light theme, center aligned content).
6. **Promo Bento Grid:** A 2x3 grid of square promo cards:
   - WWDC26 Announce
   - Apple Watch Series 11
   - MacBook Pro M5
   - AirPods Pro 3
   - iPhone Trade In
   - Apple Card
7. **Apple TV+ Carousel:** Horizontal scrolling slider of Apple TV+ shows.
8. **Global Footer:** Fluid multi-column site map with footnotes and accordion menus on mobile.

## Dependencies & Layering
- **Global Nav** is `position: fixed` or `sticky`, floating above all content (`z-index: 9999`).
- **Hero Sections** and **Promo Grid** are flow content.
- Hero text blocks are absolute positioned over the background image layers.

## Interaction Models
- **Sticky Nav**: Changes transparency/backdrop-filter depending on scroll.
- **Hero & Promo Sections**: Primarily purely click-driven interactions with subtle hover states for CTA buttons/links. Background images remain mostly static or have micro-scale effects.
- **TV+ Carousel**: Drag or button-based horizontal scrolling snap containers (`scroll-snap-type: x mandatory`).
