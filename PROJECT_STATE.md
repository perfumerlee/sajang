# PROJECT_STATE.md

-   Project: Tool Site Engine + Sajang / 사장도구
-   State format version: 0.02
-   Current Phase: PHASE 14 --- Cross-project Architecture Gate
-   Status: PHASE 14 COMPLETE; Architecture Gate: STRONG PASS
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
-   PHASE 9 `discount-profit` Tool completed.
-   PHASE 10 `hiring-profit` Tool completed.
-   PHASE 11 site pages, shared shell, truthful privacy/contact documents, and homepage Tool index completed.
-   PHASE 12 Related Decision Navigation completed with static, BASE_PATH-aware links.
-   PHASE 13 generic Storage, Analytics, and AdSlot infrastructure completed; all activation remains OFF.
-   PHASE 14 independent Unit Fixture architecture gate completed with STRONG PASS.

## In Progress

-   PHASE 14 is complete. Independent fixture, Engine boundary, infrastructure contracts, and production isolation passed verification.

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
-   PHASE 9 discount-profit completed
-   PHASE 9 discount-profit
-   PHASE 10 hiring-profit completed
-   PHASE 11 site pages completed
-   PHASE 12 related decisions completed
-   PHASE 13 storage/analytics/ad infrastructure completed
-   PHASE 14 cross-project architecture fixture completed
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

-   No known PHASE 14 architecture blockers remain. Storage, analytics, ads, and remote user-data activation remain disabled.

## Next Task

PHASE 15 pending. Begin only after a separate request.

Recommended execution: lightweight implementation model.

## Verification

``` text
tests: PASS (`npm.cmd test`, 48 tests; PHASE 5/7/8/9 regressions, Hiring Profit
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
Discount Profit production HTML and sitemap inclusion: PASS
Hiring Profit production HTML and sitemap inclusion: PASS
PHASE 11 site route, homepage content, navigation, privacy truthfulness, and sitemap tests: PASS
PHASE 11 default static build routes and metadata inspection: PASS
PHASE 11 BASE_PATH=/sajang build and link/canonical/sitemap inspection: PASS
PHASE 12 relation graph and static link tests: PASS (50 tests)
PHASE 12 production HTML related sections and destination links: PASS
PHASE 12 BASE_PATH=/sajang related-link inspection: PASS
PHASE 13 infrastructure tests: PASS (54 tests)
PHASE 13 activation safety: PASS (analytics OFF, ads OFF, auto-save OFF, remote user storage NONE)
PHASE 13 provider/source/build inspection: PASS (no provider scripts or identifiers)
PHASE 13 BASE_PATH=/sajang regression and Privacy consistency: PASS
PHASE 14 architecture and fixture tests: PASS (58 tests)
PHASE 14 Engine/fixture source dependency audit: PASS (no Sajang leakage)
PHASE 14 production isolation and BASE_PATH regression: PASS
```

## Handoff Note

Use this file plus the actual repository as the continuity source.

Task start: 1. AGENTS.md 2. PROJECT_STATE.md 3. relevant specification
sections 4. affected repository files

Do not infer implementation progress from previous chat context.

Update this file only after a verified milestone or when recording an
exact blocking/failing state.
