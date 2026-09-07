# PROJECT_STATE.md

-   Project: Tool Site Engine + Sajang / 사장도구
-   State format version: 0.02
-   Current Phase: PHASE 0 --- Repository Bootstrap + Specification Lock
-   Status: COMPLETE
-   Last verified: 2026-09-08

## Current Objective

Create the smallest clean Astro/TypeScript static foundation that can
support the approved Tool Site Engine and Sajang specifications.

## Early Deployment Infrastructure

-   GitHub Pages deployment workflow added for the `main` branch.
-   Astro static base path is supplied through `BASE_PATH`; the project
    site workflow uses `/sajang`.
-   This is deployment infrastructure only and does not start PHASE 1.

## Completed

-   Product/market direction defined.
-   Tool Site Engine specification v0.01 completed.
-   Sajang project specification v0.01 completed.
-   Sajang Working Ledger design specification v0.01 completed.
-   Codex implementation plan v0.02 completed.
-   Model workflow / continuity specification v0.01 completed.
-   Persistent Codex operating rules established.

## In Progress

-   None. PHASE 0 foundation is complete.

## Not Started

-   PHASE 0 repository bootstrap completed
-   PHASE 1 core contracts
-   PHASE 2 design foundation
-   PHASE 3 static page engine
-   PHASE 4 calculator runtime
-   PHASE 5 daily-sales-target reference Tool
-   PHASE 6 SEO/schema/sitemap
-   PHASE 7 selling-price
-   PHASE 8 price-change
-   PHASE 9 discount-profit
-   PHASE 10 hiring-profit
-   PHASE 11 site pages
-   PHASE 12 related decisions
-   PHASE 13 storage/analytics/ad infrastructure
-   PHASE 14 cross-project fixture
-   PHASE 15 final QA
-   PHASE 16 production/GitHub Pages

## Locked Decisions
- internal project/repository ID: `sajang`
- source project directory: `src/projects/sajang/`
- public Korean brand remains `사장도구`

-   Astro + TypeScript
-   static-first
-   local-first calculations
-   no required backend
-   GitHub Pages compatible
-   Engine / Project separation
-   Sajang theme: Working Ledger
-   reference Tool: daily-sales-target
-   Reference Gate before Tools 02--05
-   responsive references: 1440×900, 390×844, iPhone XS 375×812
-   user calculation values must not be sent to Analytics
-   repository is the continuity source, not model chat memory
-   lightweight implementation model is the default for routine work
-   stronger reasoning model is reserved for ambiguity/high-impact gates
    when useful
-   stronger-model availability must not block routine development

## Current Known Issues

-   No known issues.

## Next Task

Review PHASE 0 results, then begin PHASE 1 only by separate request.

Recommended execution: lightweight implementation model.

## Verification

``` text
test: PASS (`npm test`, 1 test passed)
typecheck: PASS (`ASTRO_TELEMETRY_DISABLED=1 npm run typecheck`)
build: PASS (`ASTRO_TELEMETRY_DISABLED=1 npm run build`, static output)
```

## Handoff Note

Use this file plus the actual repository as the continuity source.

Task start: 1. AGENTS.md 2. PROJECT_STATE.md 3. relevant specification
sections 4. affected repository files

Do not infer implementation progress from previous chat context.

Update this file only after a verified milestone or when recording an
exact blocking/failing state.
