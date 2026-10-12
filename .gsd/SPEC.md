# SPEC.md — Project Specification

> **Status**: `FINALIZED`
>
> ⚠️ **Planning Lock**: Spec finalized based on the existing working Tile World website. Enhancements build directly upon the current codebase.

## Vision
Transform the existing Tile World Vijayawada showroom website into an indispensable digital tool for homeowners, architects, and interior designers by adding interactive estimation tools, multidimensional search, and room preview capabilities while preserving verified business accuracy.

## Current Baseline (What Already Exists & Must Be Preserved)
The existing React + TypeScript + Vite application is fully functional:
- Complete editorial aesthetic (Warm Ivory, Limestone, Basalt Charcoal, Bronze)
- 10 verified tile collections with dimensions and finishes
- 3 verified physical showrooms in Governorpet and Chilakaluripeta with Google Maps
- 10 verified authorized brands with vector SVGs
- Real MP4 video player running `/videos/tile-range.mp4`
- Fullscreen keyboard-accessible lightbox (`Esc`, `←`, `→`)
- Form validation routing directly into pre-filled WhatsApp enquiries
- Schema.org JSON-LD LocalBusiness metadata and SEO headers

---

## Enhancement Goals (Milestone v1.1)

1. **Tile Coverage & Box Estimator Calculator** — Interactive tool calculating required square footage, exact tile counts, box counts, and 10% standard wastage for any given room dimensions and tile size.
2. **Multi-Dimensional Tile Filtering & Search** — Instant keyword search and multi-tag filtering across tile sizes (e.g. 600x1200mm, 300x600mm, 75x300mm), surface finishes, and room applications.
3. **Interactive 2D Surface Switcher (Room Previewer)** — Visual comparison tool allowing users to preview how different tile surfaces (e.g. *Statuario Gold* vs *Urban Grey*) look on simulated floor and wall planes.
4. **Automated Verification & Performance Hardening** — Vitest test suite for estimator math, form validation, modal focus trap, and responsive testing across viewports.

---

## Non-Goals (Out of Scope)
- No rewriting or replacing the existing React + TypeScript + Vite stack.
- No third-party heavy 3D rendering engines (Three.js/WebGL) that would cause mobile performance regressions.
- No fictional e-commerce checkout or online payment gateways (Tile World operates as a physical showroom consultation business).
- No fictional customer reviews or fabricated brand partnerships.

---

## Constraints
- **Strict Data Integrity:** Only verified showroom addresses, phone numbers (`+91 99086 86789`), and authorized brand relationships.
- **Mobile Responsiveness:** All new calculators and filters must be fluid down to 375px without horizontal scrolling.
- **Zero Build Bloat:** Vanilla CSS design system tokens; keep bundle size optimized (< 300 kB).

---

## Success Criteria
- [ ] Estimator calculator outputs accurate tile piece counts and box totals with wastage toggles.
- [ ] Users can transfer calculated estimate directly into the WhatsApp consultation form.
- [ ] Filter updates the collections view in under 16ms with zero layout shifts.
- [ ] Production build (`npm run build`) passes with zero TypeScript and bundling errors.

---

## Technical Requirements

| Requirement | Priority | Notes |
| :--- | :--- | :--- |
| **REQ-01: Tile Estimator Component** | Must-have | Room dimensions (ft/m) + tile size → total sq ft, boxes, wastage |
| **REQ-02: Instant Tile Search & Filter** | Must-have | Text search + dimension pills + finish checkboxes |
| **REQ-03: WhatsApp Integration for Estimates** | Must-have | Transfers calculated box counts directly into WhatsApp message |
| **REQ-04: Surface Previewer** | Should-have | Interactive toggle between finishes in an architectural mockup |
| **REQ-05: Unit & Component Tests** | Should-have | Tests for calculator math and form validation |

---

*Last updated: 2026-10-12*
