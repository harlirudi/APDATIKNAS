# Apple.com Behaviors

## Global Interaction Models

### 1. Global Navigation (Scroll / Click-Driven)
- **State A (Top):** Background is fully transparent or slightly translucent, text is white or black depending on the first hero theme.
- **Trigger:** Scroll past 10px.
- **State B (Scrolled):** Background becomes frosted glass (`backdrop-filter: blur(20px)`), `background-color` transitions to `rgba(0,0,0,0.8)` or `rgba(255,255,255,0.8)`. 
- **Transition:** `transition: background-color 0.3s ease, backdrop-filter 0.3s ease`.
- **Dropdowns:** Clicking a top-level nav item smoothly expands a megamenu containing multi-column links using opacity and transform adjustments.

### 2. Promo Grid Hover Effects
- **Target:** Anchor tags wrapping the `.promo-card`
- **State A (Default):** Static sizes and shadows.
- **Trigger:** Hover
- **State B (Hovered):** Call-to-action buttons/links (e.g., "Learn more >") might underline or slightly shift right. The background image itself doesn't scale massively; instead it's mostly static. We will replicate standard Apple subtle opacity pulses on links.

### 3. Apple TV+ Carousel
- **Interaction:** Scroll-snapping and Autoplay
- **Behavior:** Slides move horizontally. User can drag or swipe.
- **CSS:** `.carousel { scroll-snap-type: x mandatory; overflow-x: scroll; }` `.slide { scroll-snap-align: start; }`

### 4. Footers Accordion
- **Interaction (Mobile):** Clicking a footer directory section `<h3>` expands the `<ul>` underneath via height animation.
- **Interaction (Desktop):** Static columns, no click interaction needed.
