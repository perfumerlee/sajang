# PROJECT_STATE.md

-   Project: Tool Site Engine + Sajang / 사장도구
-   State format version: 0.02
-   Current Phase: PHASE 8 --- Price Change Tool
-   Status: PHASE 8 COMPLETE
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
-   PHASE 1 core contracts and definition validation completed.
-   PHASE 2 design foundation and Working Ledger tokens completed.
-   PHASE 3 static page and content engine completed.
-   PHASE 4 calculator runtime and input/result primitives completed.
-   PHASE 5 `daily-sales-target` Reference Tool completed.
-   PHASE 6 SEO, metadata, schema, sitemap, and robots.txt completed.
-   PHASE 7 `selling-price` Tool completed.
-   PHASE 8 `price-change` Tool completed.

## In Progress

-   PHASE 8 is complete. Price Change calculation, static content, SEO, sitemap, and safety verification passed.

## Not Started

-   PHASE 0 repository bootstrap completed
-   PHASE 1 core contracts completed
-   PHASE 2 design foundation completed
-   PHASE 3 static page engine completed
-   PHASE 4 calculator runtime completed
-   PHASE 5 daily-sales-target reference Tool completed; Reference Gate PASS
-   PHASE 6 SEO/schema/sitemap completed
-   PHASE 7 selling-price completed
-   PHASE 8 price-change completed
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

-   No known PHASE 8 blockers remain.

## Next Task

PHASE 9 pending. Begin only after a separate request.

Recommended execution: lightweight implementation model.

## Verification

``` text
tests: PASS (`npm.cmd test`, 32 tests; PHASE 5/7 regressions, Price Change
vectors, validation boundaries, overflow, static contract, parity, runtime safety,
Engine leakage, and SEO contract checks included)
typecheck: PASS (`ASTRO_TELEMETRY_DISABLED=1 npm run typecheck`)
build: PASS (`ASTRO_TELEMETRY_DISABLED=1 npm run build`, static output)
code gate: PASS
visual gate: PASS (1440×900, 390×844, 375×812)
SEO metadata/schema/sitemap: PASS (production HTML and static endpoints verified)
PHASE 7 calculation/static contract: PASS
PHASE 8 calculation/static contract: PASS
Price Change production HTML and sitemap inclusion: PASS
```

## Handoff Note

Use this file plus the actual repository as the continuity source.

Task start: 1. AGENTS.md 2. PROJECT_STATE.md 3. relevant specification
sections 4. affected repository files

Do not infer implementation progress from previous chat context.

Update this file only after a verified milestone or when recording an
exact blocking/failing state.
