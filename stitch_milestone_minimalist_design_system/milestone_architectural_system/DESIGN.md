---
name: Milestone Architectural System
colors:
  surface: '#f6faf6'
  surface-dim: '#d6dbd7'
  surface-bright: '#f6faf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f5f1'
  surface-container: '#eaefeb'
  surface-container-high: '#e5e9e5'
  surface-container-highest: '#dfe4e0'
  on-surface: '#181d1b'
  on-surface-variant: '#414846'
  inverse-surface: '#2c322f'
  inverse-on-surface: '#edf2ee'
  outline: '#727876'
  outline-variant: '#c1c8c5'
  surface-tint: '#48645f'
  primary: '#021e1a'
  on-primary: '#ffffff'
  primary-container: '#18332f'
  on-primary-container: '#7f9c96'
  inverse-primary: '#afcdc6'
  secondary: '#735b2b'
  on-secondary: '#ffffff'
  secondary-container: '#fddb9f'
  on-secondary-container: '#775f2f'
  tertiary: '#251700'
  on-tertiary: '#ffffff'
  tertiary-container: '#3f2a00'
  on-tertiary-container: '#b59051'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cbe9e2'
  primary-fixed-dim: '#afcdc6'
  on-primary-fixed: '#03201c'
  on-primary-fixed-variant: '#314c47'
  secondary-fixed: '#ffdea3'
  secondary-fixed-dim: '#e2c289'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#594316'
  tertiary-fixed: '#ffdeaa'
  tertiary-fixed-dim: '#e9c07d'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5d4209'
  background: '#f6faf6'
  on-background: '#181d1b'
  surface-variant: '#dfe4e0'
  forest-strong: '#0F2421'
  forest-soft: '#244942'
  cream-canvas: '#F7F4EC'
  cream-muted: '#EFE8DA'
  muted-ash: '#5C6763'
  border-glass: rgba(24, 51, 47, 0.14)
typography:
  display-h1:
    fontFamily: Hanken Grotesk
    fontSize: 74px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-h1-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 42px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  heading-h2:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  heading-h3:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  eyebrow:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '900'
    lineHeight: '1.2'
    letterSpacing: 0.15em
  label-caps:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  section-padding-lg: 120px
  section-padding-md: 80px
  section-padding-sm: 60px
  gutter: 24px
  container-max: 1280px
  stack-xl: 48px
  stack-lg: 32px
  stack-md: 24px
  stack-sm: 12px
---

## Brand & Style

This design system is engineered to project an atmosphere of **Architectural Precision** and **Elite Craftsmanship**. It avoids the generic, cluttered aesthetics of the construction industry in favor of a high-end, gallery-like experience that positions Milestone Development as a premier Australian developer.

The style is a synthesis of **Minimalism** and **Modern Corporate**, utilizing expansive whitespace and a structured, grid-based layout that mimics the stability of a blueprint. The visual narrative is anchored by large-scale, high-contrast typography and a sophisticated organic palette, evoking materials like sandstone, forest landscapes, and structural steel.

**Design Principles:**
- **Structural Integrity:** Every element aligns to a rigorous grid, emphasizing precision.
- **Architectural Breathing Room:** Generous whitespace (macro-paddings) creates a sense of luxury and focus.
- **Premium Materiality:** Textures and colors should feel derived from high-end building materials rather than digital-first gradients.
- **Dynamic Stability:** Use subtle, staggered reveals that "build" the page as the user scrolls, mirroring the construction process.

## Colors

The palette is grounded in natural, authoritative tones that distinguish the brand from standard "safety yellow" construction companies.

- **Primary (Forest Green):** Represents longevity, trust, and the natural Australian landscape. Used for primary branding and major call-to-actions.
- **Secondary (Sand Gold):** Evokes premium finishes and sandstone. Used for highlighting active states and architectural accents.
- **Tertiary (Ochre Gold):** A darker variant of the gold used specifically for typography and labels on light backgrounds to ensure AAA accessibility.
- **Background (Cream Canvas):** Replaces harsh whites with a warmer, more sophisticated tone that feels like high-quality architectural paper.
- **Neutral (Carbon Ink):** A softened charcoal used for all primary reading text to reduce visual fatigue while maintaining high contrast.

**Usage Note:** Avoid using Sand Gold (#D8B980) for small text on Cream backgrounds; utilize Tertiary (Ochre Gold) for those instances to maintain legibility.

## Typography

The typography system relies on a clean, geometric sans-serif stack. **Hanken Grotesk** is chosen for headings for its modern, architectural precision and sharp character. **Inter** handles body and functional UI text for its exceptional legibility and systematic feel.

- **Scale:** Headings utilize a fluid scale (`clamp`) for large displays, ensuring the "multi-million dollar" look is maintained on 4K monitors while remaining readable on mobile.
- **Hierarchy:** Eyebrows (small, all-caps labels) should always precede H2 headings to provide context and anchor the layout.
- **Contrast:** Headings should almost always use `primary` or `neutral` colors to maintain a bold, heavy visual weight.

## Layout & Spacing

This design system uses a **12-column fluid grid** for desktop and a **single-column vertical stack** for mobile. 

- **The Whitespace Rule:** Sections are separated by a minimum of 80px-120px on desktop to ensure the brand feels "expensive" and uncrowded.
- **Grid Discipline:** Elements should span 4, 6, or 8 columns for balance. 3-column layouts are reserved for service and project cards.
- **Margins:** Desktop margins are fixed at 40px, while mobile margins compress to 20px. 
- **Content Width:** To maintain readability, long-form text (body copy) is capped at an 8-column width (approx. 800px) even within a full-width section.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Blueprint Hairlines** rather than heavy shadows.

- **Surface Strategy:** The `cream-canvas` is the base. High-priority information or interactive cards use `white` surfaces with a very subtle `border-glass` outline.
- **Shadow Profile:** When used, shadows must be "Ambient" — extremely diffused with low opacity (4-8%) and a slight color tint of Forest Green to ground them.
- **Structural Lines:** Use 1px vertical and horizontal lines in `border-glass` to delineate sections, mimicking architectural drafting paper.
- **Interactive Depth:** On hover, elements should lift slightly (e.g., `translateY(-4px)`) and increase their shadow diffusion to signal interactivity.

## Shapes

The shape language is primarily **Geometric and Soft**. While the brand is architectural, pure 90-degree sharp corners can feel overly aggressive.

- **Base Radius:** 0.25rem (4px) for most UI elements like inputs and small buttons.
- **Container Radius:** 0.5rem (8px) for cards and modals to provide a modern, refined feel.
- **Icons:** Should be linear, using a consistent 2px stroke weight to match the "drafting" aesthetic.

## Components

### Buttons
- **Primary:** Forest Green background, white text, 8px radius. Heavy weight, high contrast.
- **Secondary (Outline):** 1px border of Forest Green, transparent background, Forest Green text.
- **Accent:** Sand Gold background with Forest Green text. Reserved for the "Get a Quote" or main conversion event.
- **Interaction:** All buttons shift background color 10% darker on hover with a 200ms transition.

### Cards (Premium Architectural Style)
- **Base:** White background, 8px radius, `border-glass` outline.
- **Top Accent:** A 4px vertical bar or top border in Sand Gold to draw the eye.
- **Content:** Large imagery on top, followed by an Ochre Gold eyebrow, H3 heading, and muted ash body text.
- **Project Showcase:** Use a "split" card style where the image occupies 60% of the card area.

### Form Fields
- **Inputs:** White background, `border-glass` 1px border. On focus, the border transitions to Sand Gold with a 4px soft glow in a matching hue.
- **Labels:** Always use the `label-caps` typography style in Forest Green for high visibility.

### Navigation
- **Header:** Translucent `cream-canvas` with a backdrop blur (12px). Links are uppercase with a 2px Sand Gold underline that expands from the center on hover.
- **Data Visualizations:** For stats (e.g., "10 Years Experience"), use massive H1-sized numbers in Sand Gold paired with small all-caps labels in Forest Green.

### Visual Accents
- **The Blueprint Overlay:** Use a repeating 60px grid pattern in a very faint `border-glass` color behind hero sections to reinforce the architectural theme.