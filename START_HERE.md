# START_HERE.md

# Sajang / 사장도구 --- Codex First Run

이 문서는 **새 `sajang` repository에서 최초 한 번 PHASE 0을 시작하기
위한 실행 지시문**입니다.

PHASE 0 완료 후에는 이 문서를 반복 실행 지시로 사용하지 않습니다. 이후
작업은 `PROJECT_STATE.md`의 현재 상태와
`specs/04_IMPLEMENTATION_PLAN_v0.02.md`의 해당 Phase를 기준으로
진행합니다.

------------------------------------------------------------------------

## 1. First Run

새 프로젝트를 시작합니다.

이 패키지에 포함된 문서가 프로젝트의 기준 명세입니다.

코드를 작성하기 전에 다음 순서로 확인하십시오.

1.  `AGENTS.md`
2.  `PROJECT_STATE.md`
3.  `specs/04_IMPLEMENTATION_PLAN_v0.02.md`의 **PHASE 0**
4.  PHASE 0 수행에 필요한 다른 명세 부분
5.  현재 작업 디렉터리의 실제 상태

이전 대화나 모델의 기억을 프로젝트 상태의 근거로 사용하지 마십시오.

------------------------------------------------------------------------

## 2. Project Identity

내부 프로젝트 식별자는 다음으로 고정합니다.

``` text
Project name: sajang
Project ID: sajang
Repository: sajang
Project source directory: src/projects/sajang/
Internal English label: Sajang
Public Korean brand: 사장도구
```

내부 이름이 `sajang`이라고 해서 사용자에게 보이는 브랜드를 `사장`으로
변경하지 마십시오.

------------------------------------------------------------------------

## 3. Execute PHASE 0 Only

이번 작업에서는:

> **PHASE 0 --- Repository Bootstrap + Specification Lock**

만 수행하십시오.

목표는 Astro + TypeScript 기반의 작고 깨끗한 Static-first foundation을
만드는 것입니다.

이번 단계에서는 제품을 완성하려 하지 마십시오.

------------------------------------------------------------------------

## 4. Required Foundation

현재 repository 상태를 먼저 검사한 후 필요한 foundation을 구성하십시오.

기본 방향:

``` text
Astro
TypeScript
Static Output
GitHub Pages compatible
Testing foundation
Engine / Project directory boundary
```

최소 source boundary:

``` text
src/
├─ engine/
└─ projects/
   └─ sajang/
```

프로젝트 기준 문서는 repository에 유지하십시오.

``` text
/
├─ START_HERE.md
├─ AGENTS.md
├─ PROJECT_STATE.md
└─ specs/
   ├─ 01_TOOL_SITE_ENGINE_SPEC_v0.01.md
   ├─ 02_SAJANG_PROJECT_SPEC_v0.01.md
   ├─ 03_BOSS_TOOLS_DESIGN_SPEC_v0.01.md
   ├─ 04_IMPLEMENTATION_PLAN_v0.02.md
   └─ 05_MODEL_WORKFLOW_SPEC_v0.01.md
```

------------------------------------------------------------------------

## 5. Required Verification

프로젝트에서 최소 다음 검증이 가능하도록 구성하십시오.

``` text
dev
test
typecheck
build
```

작업 종료 전에 실제로 다음을 실행하십시오.

``` text
test
typecheck
build
```

프로젝트의 실제 script 이름에 따라 정확한 명령을 사용하십시오.

성공했다고 추정하지 말고 실제 명령 결과를 확인하십시오.

------------------------------------------------------------------------

## 6. Do NOT Implement in PHASE 0

이번 단계에서는 다음을 구현하지 마십시오.

-   Homepage
-   Working Ledger 실제 화면
-   Calculator UI
-   Daily Sales Target
-   다른 계산기
-   Tool Definition system
-   SEO Engine
-   JSON-LD Engine
-   Analytics
-   AdSense
-   Google Apps Script
-   Google Sheets
-   localStorage 기능
-   login
-   account
-   database
-   backend
-   payment
-   CMS
-   dark mode
-   AI content generation

"나중에 필요할 것 같아서" 미리 구현하지 마십시오.

PHASE 1 이후 작업을 선행하지 마십시오.

------------------------------------------------------------------------

## 7. Architecture Guardrails

-   Static-first architecture를 유지하십시오.
-   핵심 사이트에 SSR/server runtime 의존성을 만들지 마십시오.
-   향후 GitHub Pages에 배포 가능해야 합니다.
-   Engine과 Sajang Project 경계를 유지하십시오.
-   불필요한 UI framework를 설치하지 마십시오.
-   장기 재사용을 이유로 monorepo/plugin/multi-tenant/CLI 같은 구조를
    선행 구축하지 마십시오.
-   기존 명세를 임의로 확장하거나 재설계하지 마십시오.

Engine 판단 기준:

> Would this still make sense for a completely different Tool category?

아니라면 generic Engine에 넣지 마십시오.

------------------------------------------------------------------------

## 8. Model / Context Efficiency

이번 PHASE 0은 명확하고 검증 가능한 작업이므로 lightweight
implementation model로 진행해도 됩니다.

모든 명세를 처음부터 끝까지 반복해서 읽을 필요는 없습니다.

다음 순서를 사용하십시오.

``` text
AGENTS.md
→ PROJECT_STATE.md
→ Implementation Plan의 PHASE 0
→ 필요한 관련 명세 부분
→ 실제 repository
```

Architecture 충돌이 발견될 때만 읽기 범위를 넓히십시오.

------------------------------------------------------------------------

## 9. PHASE 0 Exit Criteria

다음을 모두 확인하십시오.

``` text
□ Astro project foundation exists
□ TypeScript configured
□ Static build works
□ GitHub Pages-compatible direction preserved
□ Test environment works
□ typecheck passes
□ test passes
□ build passes
□ START_HERE.md exists
□ AGENTS.md exists
□ PROJECT_STATE.md exists
□ /specs contains the baseline specifications
□ src/engine exists
□ src/projects/sajang exists
□ no calculator implemented
□ no homepage implemented
□ no backend introduced
□ no unnecessary UI framework introduced
```

------------------------------------------------------------------------

## 10. PROJECT_STATE Update

PHASE 0이 실제 검증을 통과한 경우에만 `PROJECT_STATE.md`를
업데이트하십시오.

최소한 다음 사실을 반영하십시오.

-   PHASE 0 completed
-   next Phase = PHASE 1
-   test result
-   typecheck result
-   build result
-   known issue가 있으면 정확한 상태

계획된 작업을 완료된 작업으로 기록하지 마십시오.

------------------------------------------------------------------------

## 11. Stop Rule

PHASE 0 완료 후 **멈추십시오.**

PHASE 1을 시작하지 마십시오.

다음 Phase는 PHASE 0 결과를 검토한 후 별도 요청으로 진행합니다.

------------------------------------------------------------------------

## 12. Completion Report

`AGENTS.md`의 형식에 따라 간결하게 보고하십시오.

``` text
PHASE 0 COMPLETE

Implemented
- ...

Repository Structure
- ...

Changed Files
- ...

Dependencies Added
- ...
- reason: ...

Tests
- command:
- result:

Typecheck
- command:
- result:

Build
- command:
- result:

Production Output
- ...

QA
- ...

Spec Deviations
- None

Remaining
- PHASE 1 not started

Ready for Review
```

Deviation이 있다면 `None`이라고 쓰지 말고 정확히 기록하십시오.

이번 작업의 성공 기준은 많은 코드를 작성하는 것이 아니라:

> **다음 Phase들을 안정적으로 진행할 수 있는 작고 검증된 foundation을
> 만드는 것**

입니다.
