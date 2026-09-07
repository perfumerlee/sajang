# AGENTS.md

## Project

This repository contains the reusable Tool Site Engine and its first
reference project, Sajang / 사장도구.

The repository---not any individual model or previous chat---is the
source of project continuity.


## First Run
For a brand-new repository before PHASE 0 has been completed, follow `START_HERE.md` once.
After PHASE 0, do not use `START_HERE.md` as the current task source. Continue from `PROJECT_STATE.md` and the relevant implementation Phase.

## Task Start Protocol

At the beginning of every task:

1.  Read `AGENTS.md`.
2.  Read `PROJECT_STATE.md`.
3.  Read only the specification sections relevant to the current
    Phase/task.
4.  Inspect the actual files likely to be affected.
5.  Expand inspection only when dependencies or architecture require it.
6.  Work only on the explicitly requested scope.

Do not rely on previous chat context as the source of truth.

## Specification Authority

-   Architecture / Engine boundary:
    `specs/01_TOOL_SITE_ENGINE_SPEC_v0.01.md`
-   Sajang behavior / calculation:
    `specs/02_SAJANG_PROJECT_SPEC_v0.01.md`
-   Visual / responsive design:
    `specs/03_BOSS_TOOLS_DESIGN_SPEC_v0.01.md`
-   Implementation phases / gates:
    `specs/04_IMPLEMENTATION_PLAN_v0.02.md`
-   Model/task allocation guidance:
    `specs/05_MODEL_WORKFLOW_SPEC_v0.01.md`

## Project Continuity

`PROJECT_STATE.md` is the authoritative short-form record of current
implementation progress.

A model change must not change project direction.

Do not reinterpret completed decisions merely because another model
produced the implementation.

Prefer continuing from verified repository state over rewriting working
code.

> Do not rewrite working code merely to match your preferred
> implementation style.

## Green Handoff Rule

Before handing a Phase or major task to another model, preferably reach:

-   tests pass
-   typecheck passes
-   build passes

If the repository is not green: 1. do not disguise the failure, 2.
record the exact failure in `PROJECT_STATE.md`, 3. identify the last
known green point if known, 4. hand off the failing command/error and
affected scope.

## Core Operating Rules

1.  Work only on the requested Phase/task.
2.  Do not automatically continue to the next Phase.
3.  Preserve Engine / Project separation.
4.  Do not change approved formulas.
5.  Do not redesign approved UI.
6.  Do not add unrequested features.
7.  Do not introduce backend, accounts, payments or cloud user storage.
8.  Do not send calculator input values to Analytics.
9.  Do not add dependencies without a concrete need.
10. Run relevant tests/typecheck/build before completion.
11. Report changed files and deviations.
12. Stop at required review gates.

> Do not improve, redesign, simplify, modernize, or reinterpret an
> approved specification unless explicitly instructed.

> Absence of a specified visual treatment is not permission to introduce
> common SaaS or AI-generated design patterns.

## Model-Neutral Rule

The specifications do not require a specific model.

A stronger or more expensive model is not required for routine
implementation when the task is already well specified.

Use model capability according to task risk: - routine
implementation/fixes/tests/QA → lightweight implementation model is
preferred, - architecture ambiguity/high-impact contract
change/reference/final audit → stronger reasoning model may be used
selectively.

If the preferred model is unavailable or constrained, continue with
another capable model using the repository source of truth. Do not block
the project solely because one model is unavailable.

## Token-Efficient Work Protocol

Do not reread every specification on every task.

Always: - read `AGENTS.md`, - read `PROJECT_STATE.md`, - read the
relevant spec sections, - inspect affected code.

Avoid: - repeatedly summarizing all specs, - broad repository rereads
for a one-file fix, - architecture audits for routine CSS/test fixes, -
rewriting stable code, - speculative refactors, - long implementation
plans when the task is already precise.

Prefer: - targeted file inspection, - targeted edits, - focused tests, -
concise completion reports, - escalation only when an architectural
conflict is discovered.

## Escalation Rule

Routine work should continue without a heavyweight audit unless one of
these occurs:

-   Engine / Project boundary is unclear,
-   approved specifications conflict,
-   a public contract must change,
-   calculation semantics are ambiguous,
-   a new cross-project primitive is proposed,
-   a significant dependency or infrastructure change is proposed,
-   Reference Gate or Production Gate is being judged,
-   repeated fixes indicate a structural problem.

When escalating, describe the decision needed and relevant files instead
of asking for a broad review of the whole repository.

## Approved Sajang Design

Theme: **Working Ledger**

-   document-like
-   numeric
-   calm
-   practical
-   warm paper / ink
-   rule-driven
-   square/minimal controls
-   underline inputs
-   double rule for primary result

Never introduce unless explicitly approved:

-   gradients
-   glassmorphism
-   giant rounded cards
-   generic SaaS dashboard cards
-   decorative emoji
-   floating blobs
-   3D/AI illustrations
-   neon accents
-   unnecessary shadows
-   excessive badges
-   pill-shaped everything

## Responsive Contract

-   Desktop: \>= 1200px
-   Tablet: 768--1199px
-   Smartphone: \< 768px

Reference QA: - 1440×900 Desktop - 390×844 Smartphone - 375×812 iPhone
XS

Full QA: - 1920×1080 - 1440×900 - 1180×820 - 1024×768 - 820×1180 -
768×1024 - 430×932 - 390×844 - 375×812 iPhone XS - 360×800 - boundaries
1199/1200 and 767/768

> Same information. Different composition.

## Calculation Rules

-   Calculator logic is independent from UI.
-   Do not duplicate formulas inside components.
-   Static worked examples reuse production calculator logic.
-   Never expose NaN or Infinity.
-   Preserve calculation precision; round for display.
-   Use conservative business terminology.

## Privacy Rules

-   calculations local by default
-   no server-side calculation history
-   explicit opt-in localStorage only where specified
-   no business input values in analytics
-   no user business data in Google Sheets

## Static/Search Rules

Generated static HTML must contain core knowledge:

-   H1
-   short answer
-   definition/how it works
-   formula
-   verified example
-   limitations
-   FAQ
-   related tools

Do not build an empty client-side shell and call it complete.

## Engine Boundary Rule

Before adding code to `src/engine/`, ask:

> Would this still make sense for a completely different Tool category?

If no, it belongs in the project package.

If uncertain and the decision materially affects architecture, stop and
escalate narrowly.

## Reference Tool Gate

`daily-sales-target` is the reference Tool.

Do not implement the other four production Tools until it passes: -
calculation tests - static-content parity - 1440×900 - 390×844 - 375×812
iPhone XS - required responsive checks - Working Ledger visual review

Stop for review after the Reference Tool Phase.

## PROJECT_STATE Update Rule

Update `PROJECT_STATE.md` only: - after a verified Phase/milestone, -
when recording an exact blocker/failing state, - when a locked
architectural decision has actually changed with approval.

Do not record planned work as completed.

Keep the file concise. It is a current-state handoff, not a
chronological diary.

## Completion Report

Use concise reporting:

``` text
PHASE/TASK COMPLETE

Implemented
Changed Files
Tests
Typecheck
Build
QA
Spec Deviations
Remaining
Ready for Review
```

Do not repeat specification text.

## Do Not Guess

Stop and report if: - specifications conflict, - formula behavior is
ambiguous, - owner/contact data is required but unavailable, - scope
would materially expand, - Reference Gate fails, - production calculator
and static example disagree, - Engine change would introduce
Boss-specific assumptions.

The objective is faithful, verifiable implementation---not maximum code
output.
