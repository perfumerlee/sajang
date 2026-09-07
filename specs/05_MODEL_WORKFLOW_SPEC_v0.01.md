# 05_MODEL_WORKFLOW_SPEC_v0.01

-   Version: v0.01
-   Status: Operating Guidance
-   Purpose: Maintain development continuity while using different Codex
    model configurations efficiently.
-   Important: This document defines roles by task risk, not by
    permanent dependence on a specific model.

## 1. Core Principle

The project must never depend on one model's conversation memory.

Continuity is stored in:

``` text
AGENTS.md
+
PROJECT_STATE.md
+
Specifications
+
Source Code
+
Tests
+
Git History
```

A model is a temporary worker reading the same project state.

## 2. Recommended Role Split

When both a stronger reasoning model (for example Astra Light) and a
lighter implementation model (for example Luna Light) are available:

### Lightweight implementation model --- default

Use for: - repository bootstrap - implementation from an approved spec -
routine TypeScript/Astro work - CSS implementation - test writing -
validation tests - repetitive Tool implementation - responsive fixes -
accessibility fixes - build/type errors - metadata/content wiring - QA
fixes

### Stronger reasoning model --- selective

Use for: - architecture ambiguity - Engine / Project boundary
decisions - high-impact public contract changes - difficult calculator
semantics - new reusable primitive decisions - Reference Tool Gate
audit - cross-project abstraction audit - final production architecture
audit - repeated failures suggesting a structural issue

The stronger model is a reviewer/technical lead, not the default coder.

## 3. Default Allocation Target

A practical target is:

``` text
Lightweight implementation model: ~75–85%
Stronger reasoning model:         ~15–25%
```

This is guidance, not a quota.

If the project is proceeding cleanly, the stronger model may be used
even less.

## 4. No-Block Rule

If the stronger model is unavailable, rate-limited or consuming tokens
too quickly:

> Do not stop routine development.

Continue with the lightweight model when: - the specification is
clear, - no public contract change is needed, - tests can verify the
work, - the task is local/reversible.

Escalate later at the next meaningful Gate if needed.

## 5. Model Handoff Protocol

Before changing models, prefer a green repository:

``` text
tests PASS
typecheck PASS
build PASS
```

Then ensure `PROJECT_STATE.md` reflects: - current Phase, - completed
milestone, - known issues, - next task, - verification state.

The next model starts by reading: 1. `AGENTS.md` 2. `PROJECT_STATE.md`
3. relevant spec sections 4. affected source files

Do not ask the previous model to write a long narrative handoff unless
the repository is in a failing/blocking state that cannot be represented
concisely.

## 6. Context Budget Rule

Do not give every model all project history.

### Routine task context

Provide/read: - AGENTS - PROJECT_STATE - current Phase section -
relevant product/design section - affected files

### Architecture audit context

Expand to: - relevant full specification - neighboring contracts -
tests - repository structure

### Final Gate context

Broader reading is justified.

This keeps token consumption proportional to risk.

## 7. Recommended Phase Allocation

### PHASE 0 --- Repository Bootstrap

Default: lightweight model.

Reason: The task is explicit, reversible and easy to verify with
build/test/typecheck.

### PHASE 1 --- Core Contracts

Default: 1. stronger model only if contract design is ambiguous, 2.
otherwise lightweight model implements, 3. tests validate definitions.

### PHASE 2 --- Design Foundation

Default: lightweight model.

Escalate only if the theme conflicts with reusable Engine styling.

### PHASE 3 --- Static Page Engine

Default: lightweight model.

Optional short stronger-model review if semantic/static architecture
becomes unclear.

### PHASE 4 --- Calculator Runtime

Default: lightweight model using approved calculator contract.

Escalate only for cross-project API/contract ambiguity.

### PHASE 5 --- Daily Sales Target Reference Tool

Implementation: lightweight model. Gate audit: stronger model
recommended if available.

This is one of the highest-value uses of the stronger model.

### PHASE 6 --- SEO / Schema

Implementation: lightweight model. Short stronger-model review only for
structural/schema ambiguity.

### PHASE 7 --- Selling Price

Default: lightweight model.

### PHASE 8 --- Price Change

Default: lightweight model. Escalate if increase/decrease semantics or
comparison model is ambiguous.

### PHASE 9 --- Discount Profit

Default: lightweight model.

### PHASE 10 --- Hiring Profit

Default: lightweight model.

### PHASE 11 --- Site Pages

Default: lightweight model.

### PHASE 12 --- Related Decision Navigation

Default: lightweight model.

### PHASE 13 --- Storage / Analytics / AdSlot

Default: lightweight model. Escalate only if privacy/architecture
boundaries change.

### PHASE 14 --- Cross-project Fixture

Implementation: lightweight model. Architecture audit: stronger model
recommended.

### PHASE 15 --- Final QA

Bulk fixes: lightweight model. Escalate recurring structural failures.

### PHASE 16 --- Production / GitHub Pages

Implementation/deployment setup: lightweight model. Final
architecture/production audit: stronger model recommended if available.

## 8. High-Value Stronger-Model Moments

If token budget is very limited, reserve stronger-model usage for these
three moments:

1.  **Reference Gate --- after PHASE 5**
2.  **Cross-project Architecture Gate --- PHASE 14**
3.  **Final Production Audit --- PHASE 16**

Everything else should be capable of proceeding with the lightweight
model under the specifications and tests.

## 9. Stronger-Model Prompt Style

Avoid:

> Review the whole project and improve everything.

Prefer:

> Audit PHASE 5 Reference Gate only. Do not modify code. Read AGENTS.md,
> PROJECT_STATE.md, the PHASE 5 requirements, daily-sales-target
> implementation and its tests. Report only Blocker / Major / Minor
> findings, with file references. Do not propose unrelated improvements.

Narrow prompts reduce token use and unwanted redesign.

## 10. Lightweight-Model Prompt Style

Give precise execution scope:

> Implement only the validation tests required by PHASE 1. Do not change
> public contracts unless a test proves the current contract cannot
> satisfy the specification. Run test/typecheck/build, update
> PROJECT_STATE only if the milestone is verified, then stop.

## 11. Failure Handoff

If a task ends red:

Record in `PROJECT_STATE.md`:

``` text
Current failing command
Exact error summary
Affected files
Last known green state
Changes attempted
Next narrow diagnostic step
```

Do not make the next model reconstruct the failure from chat history.

## 12. Git Handoff

Prefer Phase/milestone commits after green verification.

Suggested naming:

``` text
phase-00-bootstrap
phase-01-contracts
phase-02-design-foundation
phase-03-static-engine
phase-04-calculator-runtime
phase-05-reference-tool
...
```

Exact Git workflow may vary, but verified checkpoints should be easy to
identify and restore.

## 13. Rewrite Protection

A model change is not a refactoring event.

Do not rewrite stable code because: - naming style differs, - another
pattern is preferred, - the new model would have implemented it
differently.

Refactor only when: - a specification requires it, - a test exposes a
defect, - an approved architectural decision requires it, - accumulated
duplication creates a demonstrated maintenance problem.

## 14. Project-State Discipline

`PROJECT_STATE.md` must remain short.

It should answer: - Where are we? - What is verified? - What is
broken? - What is next? - What decisions are locked?

It must not become: - a transcript, - a full changelog, - a copy of the
specifications, - a model-specific handoff essay.

## 15. Success Condition

The workflow succeeds when the project can switch between Astra Light,
Luna Light, or another capable model without losing:

-   architecture,
-   calculation correctness,
-   visual direction,
-   current implementation status,
-   verified build state.

The repository must carry the project memory.
