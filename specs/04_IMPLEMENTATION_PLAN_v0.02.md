# 04_IMPLEMENTATION_PLAN_v0.01

-   Version: v0.01
-   Status: Codex Execution Baseline
-   Dependencies:
    -   `01_TOOL_SITE_ENGINE_SPEC_v0.01.md`
    -   `02_SAJANG_PROJECT_SPEC_v0.01.md`
    -   `03_BOSS_TOOLS_DESIGN_SPEC_v0.01.md`
-   Governing instructions: `AGENTS.md`

## 1. Purpose

이 문서는 Tool Site Engine과 첫 Reference Project인 사장도구를 Codex가
단계적으로 구현하기 위한 실행 명세다.

목표는 "한 번에 완성된 사이트를 생성"하는 것이 아니다.

> Engine → Design Foundation → Static Page → Calculator Runtime →
> Reference Tool → Reference Gate → 나머지 Tool → Production QA

순서로 진행하여 구조, 계산, 디자인 오류가 전체 프로젝트로 복제되는 것을
막는다.

## 2. Specification Authority

충돌 시 담당 영역에 따라 다음 문서를 기준으로 한다.

``` text
Architecture / Engine boundary
→ 01_TOOL_SITE_ENGINE_SPEC_v0.01.md

Sajang behavior / calculation / content contract
→ 02_SAJANG_PROJECT_SPEC_v0.01.md

Visual / responsive / interaction design
→ 03_BOSS_TOOLS_DESIGN_SPEC_v0.01.md

Implementation order / phase gates
→ 04_IMPLEMENTATION_PLAN_v0.01.md

Persistent Codex operating rules
→ AGENTS.md
```

04는 01--03의 승인된 요구사항을 재해석하거나 덮어쓰기 위한 문서가
아니다.

## 3. Global Implementation Rules

1.  Work one requested Phase at a time.
2.  Do not automatically continue to the next Phase.
3.  Inspect the repository before modifying it.
4.  Read relevant specifications before implementation.
5.  Preserve Engine / Project separation.
6.  Do not change approved formulas.
7.  Do not redesign approved UI.
8.  Do not add backend infrastructure.
9.  Do not add login/account/payment.
10. Do not send calculator input values to Analytics.
11. Do not add dependencies without a concrete need.
12. Do not introduce generic SaaS/AI visual patterns.
13. Run tests after meaningful changes.
14. Run production build before declaring a Phase complete where
    applicable.
15. Report all specification deviations.
16. Stop and request review at Phase gates.
17. Keep `PROJECT_STATE.md` synchronized only at verified milestones or
    exact blocking states.
18. Prefer green handoffs: tests/typecheck/build passing before
    switching model or Phase.
19. Do not reread unrelated specifications for routine local changes.

Critical rule:

> Do not improve, redesign, simplify, modernize, or reinterpret an
> approved specification unless explicitly instructed.

Design fallback rule:

> Absence of a specified visual treatment is not permission to introduce
> common SaaS or AI-generated design patterns.

## 4. Phase Completion Report

Every Phase completion report must contain:

``` text
PHASE X COMPLETE

Implemented
- ...

Changed Files
- ...

Tests
- command
- result

Build
- command
- result

QA
- ...

Spec Deviations
- None
or
- deviation + reason

Remaining
- ...

Ready for Review
```

Do not hide workarounds or deviations.

------------------------------------------------------------------------

# PHASE 0 --- Repository Bootstrap + Specification Lock

## Goal

Create a clean project foundation and make the specifications part of
the repository before product implementation begins.

## Tasks

-   Initialize Astro + TypeScript static project.
-   Configure static output suitable for GitHub Pages.
-   Add testing foundation.
-   Add `/specs/`.
-   Place specifications 01--04 in `/specs/`.
-   Place `AGENTS.md` at repository root.
-   Establish initial `src/engine/` and `src/projects/sajang/`
    boundaries.
-   Add basic lint/typecheck/test/build scripts where appropriate.
-   Do not implement calculators.
-   Do not design the homepage.

Suggested conceptual structure:

``` text
/
├─ AGENTS.md
├─ specs/
│  ├─ 01_TOOL_SITE_ENGINE_SPEC_v0.01.md
│  ├─ 02_SAJANG_PROJECT_SPEC_v0.01.md
│  ├─ 03_BOSS_TOOLS_DESIGN_SPEC_v0.01.md
│  └─ 04_IMPLEMENTATION_PLAN_v0.01.md
├─ src/
│  ├─ engine/
│  └─ projects/
│     └─ sajang/
├─ public/
└─ tests/
```

## Exit Criteria

-   project starts locally
-   typecheck passes
-   test command runs
-   production build succeeds
-   specification files are committed/present
-   no business calculator implementation yet

------------------------------------------------------------------------

# PHASE 1 --- Core Types / Project Contract

## Goal

Define the declarative contracts that separate the shared Engine from
individual projects.

## Required Types

At minimum:

``` text
ProjectDefinition
ProjectFeatures
ProjectThemeReference
CategoryDefinition
ToolDefinition
ToolStatus
InputDefinition
OutputDefinition
RelatedToolDefinition
SourceDefinition
VerifiedExampleDefinition
```

## Required Validation

-   project ID valid
-   category IDs unique
-   tool IDs unique
-   tool slugs unique
-   referenced category exists
-   referenced calculator exists or can be resolved
-   related Tool IDs exist
-   Source IDs exist
-   published Tool has required content
-   reviewedAt format valid

Validation should fail early during development/build where practical.

## Non-goals

-   no full UI
-   no Tool-specific calculator implementation beyond fixtures needed
    for contract tests
-   no SEO rendering yet

## Tests

Test: - valid definition accepted - duplicate ID rejected - duplicate
slug rejected - missing related Tool rejected - missing source
rejected - invalid published Tool rejected

## Exit Criteria

-   typed contracts exist
-   validation tests pass
-   build passes
-   no Boss-specific assumptions embedded in generic Engine types

------------------------------------------------------------------------

# PHASE 2 --- Design Foundation / Working Ledger Tokens

## Goal

Implement the shared design primitives and Sajang theme foundation
without building the final calculators.

## Engine-level Foundation

-   global reset/base styles
-   responsive containers
-   reading width
-   calculator width
-   typography hierarchy
-   spacing scale
-   accessible focus behavior
-   basic rule primitives
-   button primitives
-   section primitives

## Sajang Theme

Implement tokens for:

``` text
paper
ink
muted
rule
ledger accent
warning

radius 0 / 2 / 4 / 6
spacing scale
content widths
numeric typography
```

## Working Ledger Rules

-   warm paper surface
-   near-black ink
-   muted ledger green accent
-   limited warning red
-   no default shadows
-   no large rounded cards
-   underline-oriented inputs
-   double rule reserved for primary results

## Explicit Prohibitions

Do not introduce: - gradients - glassmorphism - `rounded-3xl` style
surfaces - `shadow-xl` style cards - decorative emoji - dashboard KPI
cards - floating decorative blobs - 3D/AI illustrations - pill-shaped
everything

## Exit Criteria

-   theme tokens exist
-   base responsive container works
-   typography/rules/buttons render
-   accessibility focus remains visible
-   no calculator logic
-   no generic SaaS visual treatment

------------------------------------------------------------------------

# PHASE 3 --- Static Page & Content Engine

## Goal

Render a Tool as a complete static knowledge document before interactive
calculation is added.

## Required Page Sections

-   Breadcrumb
-   Tool header/question
-   Quick Answer
-   Definition / How it works
-   Formula
-   Verified Example placeholder/render path
-   Limitations
-   FAQ
-   Related Decisions
-   Source / Review information

## Requirements

-   semantic HTML
-   one logical H1
-   static core content present in generated HTML
-   calculator interaction must not be required to understand the page
-   content sections driven by Tool Definition where appropriate

## JavaScript-off Requirement

Without client-side JS, user must still be able to read: - what the Tool
does - formula - example - limitations - FAQ - related tools

## Exit Criteria

-   a fixture Tool can render as static HTML
-   page remains meaningful without JS
-   no final Boss calculator yet
-   build output contains actual content, not an empty client shell

------------------------------------------------------------------------

# PHASE 4 --- Calculator Runtime / Input & Result Primitives

## Goal

Create shared interactive primitives while keeping mathematical logic
independent from UI.

## Input Primitives

At minimum: - MoneyInput - PercentageInput - NumberInput - DaysInput -
QuantityInput

Optional only if immediately needed: - SelectInput - ToggleInput

## Result Primitives

-   PrimaryResult
-   SecondaryResult
-   ComparisonResult
-   Breakdown
-   FormulaSteps
-   Interpretation
-   Warning
-   Error

## Calculator Contract

Calculator functions should behave conceptually as:

``` text
typed input
→ pure calculation
→ typed result data
```

Calculator must not: - query DOM - generate HTML - contain page copy -
directly emit analytics - directly access localStorage

## Error Rules

UI must never display: - NaN - Infinity - undefined numeric result

Errors belong near the relevant input.

## Accessibility

-   real labels
-   logical tab order
-   visible focus
-   error association
-   result announcement strategy where appropriate

## Exit Criteria

-   primitives render
-   sample pure calculator can drive result renderer
-   invalid data is handled
-   no duplicated math in components

------------------------------------------------------------------------

# PHASE 5 --- Reference Tool: Daily Sales Target

## Goal

Fully implement one Tool and use it to validate architecture, design,
responsive behavior and calculation accuracy before copying patterns to
the remaining four Tools.

Tool: `daily-sales-target`

## Required Inputs

-   monthly fixed cost
-   average variable cost rate
-   monthly operating days
-   monthly target profit
-   optional average order value

## Production Formula

``` text
contributionRate =
1 - variableRate

breakEvenMonthly =
fixedCost / contributionRate

breakEvenDaily =
breakEvenMonthly / operatingDays

targetMonthly =
(fixedCost + targetProfit) / contributionRate

targetDaily =
targetMonthly / operatingDays

customersNeeded =
targetDaily / averageOrderValue
```

Customer/order display uses ceiling where applicable.

## Locked Test Vector

Input:

``` text
fixedCost = 4,000,000
variableRate = 0.35
targetProfit = 3,000,000
operatingDays = 26
```

Expected raw:

``` text
contributionRate = 0.65

targetMonthly =
10,769,230.769230...

targetDaily =
414,201.183431...
```

Expected rounded display:

``` text
targetMonthly = 10,769,231원
targetDaily = 414,201원
```

If these do not match, Phase 5 fails.

## Verified Example

The static worked example must call/reuse the same production
calculation logic. Do not manually duplicate calculated output values as
an independent source of truth.

## Required Page Experience

``` text
Question
Quick Answer
Calculator
Result
Interpretation
Calculation Breakdown
Formula
Verified Example
Limitations
FAQ
Related Decisions
```

## Desktop Composition

At \>= 1200px:

``` text
INPUT ~45% | RESULT ~55%
```

Reading content returns to narrower reading width.

## Tablet Portrait / Smartphone

``` text
INPUT
↓
CALCULATE
↓
RESULT
```

## Reference Visual Gate

Must manually/visually inspect at minimum:

-   1440×900
-   390×844
-   375×812 --- iPhone XS

Then verify: - 1180×820 - 820×1180 - 360×800

## Visual Gate Checklist

-   Desktop uses Input \| Result
-   Tablet Portrait uses Input → Result
-   Smartphone uses Input → Result
-   iPhone XS 375×812 has no overflow
-   no horizontal page scroll
-   large numeric result remains readable
-   number/unit do not collide
-   underline input language is present
-   primary result uses double-rule motif
-   no generic dashboard cards
-   no gradient/glass/giant radius
-   mobile is not merely scaled-down desktop

## Reference Gate

**STOP after Phase 5.**

Do not implement Tools 02--05 until the Reference Tool has been reviewed
and approved.

Any visual or structural correction discovered here should be fixed
before pattern replication.

------------------------------------------------------------------------

# PHASE 6 --- SEO / Metadata / Schema / Sitemap

## Goal

Attach machine-readable search infrastructure to the approved static
Tool structure.

## Implement

-   page title
-   meta description
-   canonical
-   robots metadata
-   Open Graph
-   WebSite where applicable
-   WebPage
-   BreadcrumbList
-   Organization only when actual project owner information is available
-   sitemap
-   robots.txt

## Critical Test

Inspect generated production `dist` HTML.

Do not test only source components.

The built Tool HTML must contain before JS execution: - meaningful H1 -
short answer/static content - formula/example content - canonical -
metadata - valid JSON-LD

## Sitemap Rules

``` text
published → included
draft → excluded
noindex → excluded
```

## Exit Criteria

-   production HTML is search-readable
-   structured data parses
-   canonical correct
-   sitemap links resolve
-   no schema/content mismatch

------------------------------------------------------------------------

# PHASE 7 --- Selling Price

## Goal

Implement Tool 02 using existing primitives and the same business cost
model.

## Modes

A. 얼마에 팔아야 하지?\
B. 지금 가격에 얼마나 남지?

Keep both modes under one URL.

## Core Formula

``` text
C = unitCost + fixedSellingCost
F = percentageFee
M = targetContributionRate

sellingPrice =
C / (1 - F - M)
```

Validity: `F + M < 1`

Current-price mode:

``` text
feeAmount =
sellingPrice * percentageFee

unitContribution =
sellingPrice
- unitCost
- fixedSellingCost
- feeAmount

contributionRate =
unitContribution / sellingPrice
```

## UI Rule

Reuse Phase 5 primitives.

If a mode selector is required, do not default to pill-tab SaaS styling.
Use Working Ledger/document language.

## Exit Criteria

-   unit tests
-   edge cases
-   verified example
-   static content
-   responsive layout
-   no new generic visual system

------------------------------------------------------------------------

# PHASE 8 --- Price Change

## Goal

Implement the signature price-change decision simulator.

## Core Formula

``` text
currentUnitContribution =
currentPrice
- unitCost
- fixedSellingCost
- currentPrice * percentageFee

currentTotalContribution =
currentUnitContribution * currentQuantity

newUnitContribution =
newPrice
- unitCost
- fixedSellingCost
- newPrice * percentageFee

requiredQuantity =
currentTotalContribution / newUnitContribution
```

Renderer determines increase/decrease language.

Optional expected quantity:

``` text
expectedContribution =
newUnitContribution * expectedQuantity
```

## UI

Add `ComparisonResult` only if existing primitives cannot express the
comparison clearly.

Desktop comparison may use columns. Mobile must reflow/stack rather than
force horizontal scrolling.

## Edge

If new unit contribution \<= 0: - do not calculate meaningless
break-even quantity - show Warning

------------------------------------------------------------------------

# PHASE 9 --- Discount Profit

## Goal

Implement discount decision logic and danger state.

## Formula

Use Project Spec exactly.

## Required UX

Primary answer: how much volume must increase to maintain current
contribution.

Danger: if discounted unit contribution \<= 0, explicitly state that
additional volume cannot recover the current contribution under the
modeled condition.

## Scenario Generator

5/10/15/20% comparison may be implemented if it remains simple and
derives from the same calculator logic.

Keep Scenario Generator separate from calculator core.

------------------------------------------------------------------------

# PHASE 10 --- Hiring Profit

## Goal

Implement hiring decision Tool without turning it into a legal wage
calculator.

## Inputs

-   additional employee monthly total cost
-   variable cost rate
-   operating days
-   optional current daily revenue

## Formula

``` text
contributionRate =
1 - variableRate

additionalMonthlyRevenue =
employeeMonthlyCost / contributionRate

additionalDailyRevenue =
additionalMonthlyRevenue / operatingDays
```

## Language

Use "추가 직원 월 총비용", not merely "월급".

Do not automatically estimate statutory payroll/insurance in v0.01.

------------------------------------------------------------------------

# PHASE 11 --- Homepage / About / Privacy / Contact

## Goal

Build site-level pages only after the Tool visual language is proven.

## Homepage

Structure:

``` text
Header
Hero
Tool Index
Static About Summary
Footer
```

Hero:

``` text
장사하면서
궁금했던 숫자들.
```

Tool discovery uses editorial index, not colored card grid.

## About

Explain: - purpose - calculation principles - data handling -
update/error policy

## Privacy

State actual implemented behavior only.

At minimum: - no login - calculation values not stored on server -
optional localStorage behavior - Analytics policy if enabled -
advertising policy when actually enabled

## Contact

Keep simple and truthful. Do not invent contact details.

------------------------------------------------------------------------

# PHASE 12 --- Related Decision Navigation

## Goal

Turn isolated calculators into a decision journey.

Use Tool IDs, not manually duplicated raw URLs.

Example:

``` text
목표 매출이 너무 높나요?
→ 가격을 바꾸면 어떻게 달라지는지 계산해보세요.
```

Do not transfer private business values through URL query parameters in
v0.01.

------------------------------------------------------------------------

# PHASE 13 --- Storage / Analytics / AdSlot Infrastructure

## Goal

Add optional infrastructure behind project feature flags.

## Local Storage

-   explicit opt-in only
-   project namespace
-   clear stored values action
-   no cloud sync

## Analytics

Minimum events: - tool_view - tool_calculate - related_tool_click

Never send actual calculator values such as revenue, cost, rent or
payroll.

## Ads

Implement layout-level AdSlot abstraction.

Initial:

``` text
ads.enabled = false
```

Do not require active AdSense for production build.

AdSlot must never appear between input and calculate button or before
the primary result.

------------------------------------------------------------------------

# PHASE 14 --- Cross-project Fixture Test

## Goal

Prove the Engine is reusable and Boss-specific assumptions have not
leaked into it.

Create a minimal non-Boss fixture, for example:

``` text
test-project
└─ unit-converter
```

It must provide only: - Project Definition - Tool Definition -
Calculator - Content - Theme

## Pass Condition

The fixture builds without changing generic Engine code.

Fail examples: - Engine requires Boss category names - Engine requires
ledger-specific content semantics - generic page imports Boss
calculator - generic Engine requires Boss theme CSS to function

If leakage is discovered, refactor before production.

------------------------------------------------------------------------

# PHASE 15 --- Responsive / Accessibility / Calculation QA

## Responsive Matrix

### Desktop

-   1920×1080
-   1440×900

### Tablet Landscape

-   1180×820
-   1024×768

### Tablet Portrait

-   820×1180
-   768×1024

### Smartphone

-   430×932
-   390×844
-   **375×812 --- iPhone XS**
-   360×800

### Boundary

-   1199 / 1200
-   767 / 768

## Required Responsive Checks

-   no horizontal page scroll
-   no clipped headers
-   natural question wrapping
-   input/unit no collision
-   primary number no overflow
-   comparison reflows
-   formula remains readable
-   touch targets \>= 44×44
-   calculate button \>= 48px height
-   orientation change does not erase values
-   iPhone XS layout specifically passes

## Numeric Stress Matrix

``` text
0
1
999
999,999
999,999,999
9,999,999,999
0.1%
99.99%
999,999 units
```

## Calculation Edge Cases

-   negative values

-   empty values

-   NaN

-   Infinity prevention

-   100%

-   100%

-   zero divisor

-   invalid optional input

-   zero contribution

-   negative contribution

## Accessibility

-   semantic headings
-   labels
-   keyboard flow
-   visible focus
-   input errors associated
-   contrast
-   no color-only meaning
-   result announcement where appropriate
-   reduced motion compatibility

## Visual Anti-AI Gate

-   no gradient
-   no glass
-   no giant rounded cards
-   no unnecessary shadows
-   no decorative emoji
-   no dashboard KPI cards
-   no pill overuse
-   no AI illustration
-   numbers remain visual priority
-   Working Ledger remains identifiable

------------------------------------------------------------------------

# PHASE 16 --- Production Build / GitHub Pages

## Goal

Verify the generated site, not only the source code.

## Required Commands

Use the project's actual scripts, at minimum equivalent to:

``` text
test
typecheck
build
```

All must pass.

## Expected Production Shape

Conceptually:

``` text
dist/
├─ index.html
├─ tools/
│  ├─ daily-sales-target/index.html
│  ├─ selling-price/index.html
│  ├─ price-change/index.html
│  ├─ discount-profit/index.html
│  └─ hiring-profit/index.html
├─ about/index.html
├─ privacy/index.html
├─ contact/index.html
├─ sitemap...
└─ robots...
```

## Production HTML Audit

For every published Tool: - static H1 - static answer - formula -
verified example - limitations - related links - title - meta
description - canonical - parseable JSON-LD

## GitHub Pages

Deployment must preserve static routing and project/domain
configuration.

Do not introduce a server dependency for deployment.

## Final Exit Criteria

-   all tests pass
-   production build passes
-   responsive matrix passes
-   iPhone XS 375×812 passes
-   static HTML audit passes
-   cross-project fixture passes
-   calculator/content parity passes
-   no unresolved spec deviations
-   no user calculator values sent to analytics
-   no unapproved backend/dependency/design expansion

------------------------------------------------------------------------

# 5. Engine Modification Rule

During a Sajang Phase, if Codex believes generic Engine code must
change:

1.  Determine whether the requirement is truly cross-project.
2.  Attempt Project-level composition first.
3.  If Engine modification is still necessary, explain why.
4.  Keep the change generic.
5.  Add/update Engine tests.
6.  Report the modification under `Spec Deviations` or architecture
    notes if it changes an approved contract.

Boss-specific shortcuts must not be placed in Engine simply for
convenience.

# 6. New Component Rule

Before creating a new UI primitive:

1.  Can existing primitives express the requirement?
2.  Is the new behavior reusable across projects?
3.  Is it Project-specific?
4.  Does it introduce a new visual language?

Prefer composition over component proliferation.

# 7. Dependency Rule

Before adding a package:

-   state the problem
-   verify native/Astro/TypeScript capability is insufficient
-   prefer small, maintained dependencies
-   avoid dependency for trivial formatting/UI
-   do not add UI framework merely to accelerate styling

# 8. Stop Conditions

Codex must stop and report instead of improvising when:

-   specification formulas conflict
-   required owner/contact information is unknown
-   a requested change would introduce backend/account/payment
-   a design requirement cannot be satisfied without changing approved
    visual language
-   Reference Gate fails
-   production calculation and static example disagree
-   Engine/Project boundary is ambiguous in a way that affects
    architecture

# 9. v0.01 Completion Definition

v0.01 is complete when:

> A search-readable static Tool site with five validated Sajang
> calculators runs on static hosting, preserves Working Ledger design
> across Desktop/Tablet/iPhone XS/Smartphone, exposes transparent
> calculation logic, keeps user calculations local, and proves the
> underlying Engine can build a non-Boss fixture without Engine changes.

Do not expand scope merely because additional features appear easy to
implement.
