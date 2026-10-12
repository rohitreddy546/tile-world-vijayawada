---
milestone: v1.1-Interactive-Showroom-Suite
version: 1.1.0
updated: 2026-10-12T22:04:00+05:30
---

# Roadmap — Tile World Vijayawada

> **Current Phase:** Phase 2 — Multi-Dimensional Collections Filter & Instant Search
> **Status:** planning

## Must-Haves (from SPEC.md)

- [x] REQ-01: Interactive Tile Coverage & Box Estimator Calculator
- [ ] REQ-02: Instant Tile Search & Dimension/Finish Filtering
- [x] REQ-03: Direct Transfer of Calculated Estimates to WhatsApp Inquiry
- [ ] REQ-04: Surface Comparison / Room Preview Tool
- [ ] REQ-05: Unit Verification Tests for Estimator Math & Form Validation

---

## Phases

### Phase 1: Tile Coverage & Box Estimator Tool
**Status:** ✅ Complete
**Objective:** Deliver an interactive room tile calculator that takes room dimensions (length & width), selects tile format (e.g. 600x1200mm, 300x600mm), calculates total area, box requirements, and 10% wastage buffer, with a direct WhatsApp quote button.
**Requirements:** REQ-01, REQ-03

**Plans:**
- [x] Plan 1.1: Build `TileEstimatorCalculator.tsx` component with mathematical coverage models and unit toggle (Feet / Meters).
- [x] Plan 1.2: Integrate calculator into `App.tsx` and connect quote output to `EnquiryModal.tsx` and WhatsApp dispatch.

---

### Phase 2: Multi-Dimensional Collections Filter & Instant Search
**Status:** ⬜ Not Started
**Objective:** Add instant keyword search and dimensional filtering (600x1200mm, 300x600mm, 75x300mm) alongside existing surface types.
**Depends on:** Phase 1
**Requirements:** REQ-02

**Plans:**
- [ ] Plan 2.1: Enhance `CollectionsGallery.tsx` with search input and dimension chips.
- [ ] Plan 2.2: Add empty-state recovery and query string persistence.

---

### Phase 3: Architectural Surface Switcher (Room Previewer)
**Status:** ⬜ Not Started
**Objective:** Create an interactive 2D architectural room canvas allowing visitors to switch between Statuario Gold, Urban Grey, Natural Oak, and Kitkat Mosaic to visualize contrasting floor and wall surfaces.
**Depends on:** Phase 2
**Requirements:** REQ-04

**Plans:**
- [ ] Plan 3.1: Build `RoomSurfacePreviewer.tsx` with interactive surface swatches.
- [ ] Plan 3.2: Connect swatch selections to product specification modals.

---

### Phase 4: Quality Assurance & Testing Suite
**Status:** ⬜ Not Started
**Objective:** Add automated tests for calculation formulas, input sanitization, form validation, and keyboard accessibility.
**Depends on:** Phase 3
**Requirements:** REQ-05

**Plans:**
- [ ] Plan 4.1: Setup test suite and write estimator calculation tests.
- [ ] Plan 4.2: Audit accessibility, contrast, and perform final production build validation.
