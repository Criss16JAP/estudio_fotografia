# Design System: High-End Editorial Photography Experience
 
## 1. Overview & Creative North Star
**Creative North Star: "The Obsidian Gallery"**
 
This design system moves away from the utilitarian feel of standard chat interfaces and adopts the persona of a high-end digital curator. By leveraging the heavy, sophisticated blacks and luminous gold accents of Daniel Fotografía, we create an experience that feels less like a "bot" and more like a private consultation in a luxury studio.
 
The system breaks the rigid "template" look through **intentional asymmetry** and **tonal depth**. We prioritize breathing room (negative space) and high-contrast typography scales to ensure that every interaction feels like a deliberate editorial choice. We avoid "boxed-in" layouts, opting instead for overlapping elements and soft, organic layering that mimics the way light falls in a darkroom.
 
---
 
## 2. Colors
Our palette is rooted in deep obsidian tones and metallic highlights, creating a premium "Dark Theme" that emphasizes content through light rather than lines.
 
*   **Surface Hierarchy & Nesting:** We treat the UI as a series of physical layers. Use the `surface-container` tiers to define importance:
    *   **Base Layer:** `surface` (#131313) for the main application background.
    *   **Nesting:** Place a `surface-container-low` (#1C1B1B) area for chat sidebars, and use `surface-container-high` (#2A2A2A) for floating chat bubbles to create a natural, "lifted" feel.
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. For example, the message input area should sit on a `surface-container-highest` background to distinguish it from the main `surface` chat thread, without using a stroke.
*   **The "Glass & Gradient" Rule:** Use Glassmorphism for high-level overlays (like specialized photo package cards). Apply `surface-variant` at 60% opacity with a 20px backdrop-blur.
*   **Signature Textures:** For primary CTAs or the "Send" button, use a subtle linear gradient from `primary_fixed` (#FFE087) to `primary_container` (#FDD762) to provide a metallic, high-end finish.
 
---
 
## 3. Typography
The typography system uses a sophisticated interplay between an authoritative Serif and a functional, modern Sans-Serif.
 
*   **Display & Headline (`notoSerif`):** Used for brand expression and major section headers. The serif conveys tradition, artistry, and the timeless nature of photography. 
    *   *Usage:* "Asistente de Daniel Fotografía" or large price points.
*   **Title & Body (`manrope`):** A modern, geometric sans-serif that ensures absolute readability. Manrope provides a neutral, high-tech counterpoint to the romanticism of the serif.
    *   *Usage:* Chat bubbles, descriptions of photography services, and input fields.
*   **Label (`manrope`):** Used for micro-copy and metadata. Keep these in `label-md` or `label-sm` with increased letter-spacing (0.05rem) to maintain an editorial, spaced-out feel.
 
---
 
## 4. Elevation & Depth
Elevation in this system is achieved through light and tone, not structural shadows.
 
*   **The Layering Principle:** Depth is "stacked." Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural recession.
*   **Ambient Shadows:** For floating elements (like a photo preview modal), use extra-diffused shadows. 
    *   *Spec:* `0px 24px 48px rgba(0, 0, 0, 0.4)`. The shadow should feel like a soft glow of darkness, never a harsh line.
*   **The "Ghost Border":** If a separation is functionally required (e.g., distinguishing two similar dark images), use `outline-variant` (#4D4636) at 15% opacity. This creates a "suggestion" of a boundary rather than a hard wall.
*   **Backdrop Blurs:** Use `blur(12px)` on any element using a `surface-variant` or `primary` with transparency. This integrates the UI into the background, making it feel like "frosted lens" glass.
 
---
 
## 5. Components
 
### Buttons
*   **Primary:** Solid `primary_container` (#FDD762) with `on_primary_container` (#745D00) text. Corner radius: `full`. No shadow.
*   **Secondary:** Ghost style. No background, `outline` (#99907C) ghost border at 20% opacity. Text in `primary`.
*   **Tertiary:** Text only in `primary_fixed_dim`. Used for "Cancel" or "Skip" actions.
 
### Chat Bubbles (Cards)
*   User Bubbles: `surface_container_highest` background. Corner radius: `md` (1.5rem), with the bottom-right corner set to `sm` (0.5rem).
*   Bot Bubbles: `surface_container_low` background. Use a `notoSerif` font for the initial greeting to establish the brand voice immediately.
*   **Rule:** Forbid divider lines within chat bubbles. Use `1.5rem` vertical spacing to separate paragraphs.
 
### Chips (Quick Replies)
*   **Style:** `surface_container_high` background. No border.
*   **Interaction:** On hover, transition background to `primary_container` and text to `on_primary_container`. This mimics the "focus" of a camera lens.
 
### Input Fields
*   **Style:** Minimalist. `surface_container_lowest` background. 
*   **Active State:** Instead of a thick border, use a 2px underline in `surface_tint` (#E7C350).
*   **Placeholder:** `on_surface_variant` at 50% opacity.
 
---
 
## 6. Do's and Don'ts
 
### Do:
*   **Do** use asymmetrical layouts for photo galleries within the chat. Offset images by 8-16px to create a "scrapbook" editorial look.
*   **Do** use `display-lg` for single, impactful words or numbers.
*   **Do** rely on the `surface-container` hierarchy to separate the sidebar from the chat thread.
 
### Don't:
*   **Don't** use pure white (#FFFFFF) for body text; use `on_surface` (#E5E2E1) to reduce eye strain and maintain the "Obsidian" mood.
*   **Don't** use standard Material Design drop shadows. They look "cheap" in a luxury context.
*   **Don't** use 100% opaque borders. They break the fluid, light-based experience of the studio.
*   **Don't** crowd the interface. If the chatbot has many options, use a "See More" progressive disclosure rather than cluttering the screen.
