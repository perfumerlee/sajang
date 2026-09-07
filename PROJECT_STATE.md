# PROJECT_STATE.md

-   Project: Tool Site Engine + Sajang / 사장도구
-   State format version: 0.02
-   Current Phase: PHASE 15 --- Production QA
-   Status: PHASE 15 COMPLETE; Release Candidate QA: PASS; Manual viewport QA: PASS
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
-   PHASE 15 production code/static/accessibility/safety QA and manual viewport review completed.

## In Progress

-   PHASE 15 is complete. Production routes, calculators, static HTML, metadata, links, BASE_PATH, safety checks, and manual viewport QA passed.

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
-   PHASE 15 final QA completed; PHASE 16 waiting
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

-   No known PHASE 15 blockers remain. Daily Sales Target Quick Answer semantics should be reviewed in the PHASE 16 final audit; storage, analytics, ads, and remote user-data activation remain disabled.

## Next Task

PHASE 16 pending. Begin only after a separate request.

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
PHASE 15 calculation, validation/state, static HTML, SEO, internal link, infrastructure, and architecture regression QA: PASS (58 tests)
PHASE 15 normal and BASE_PATH=/sajang builds: PASS
PHASE 15 manual viewport QA: PASS (375×812, 1440×900; overflow, composition, wrapping, numeric layout, and Working Ledger integrity reviewed)
PHASE 16 carry-forward: verify whether the Daily Sales Target Quick Answer fixed value is clearly identified as an example rather than an interactive result.
```

## Handoff Note

Use this file plus the actual repository as the continuity source.

Task start: 1. AGENTS.md 2. PROJECT_STATE.md 3. relevant specification
sections 4. affected repository files

Do not infer implementation progress from previous chat context.

Update this file only after a verified milestone or when recording an
exact blocking/failing state.
