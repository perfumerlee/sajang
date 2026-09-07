# 01_TOOL_SITE_ENGINE_SPEC_v0.01

-   Version: v0.01
-   Status: Baseline Specification
-   Project role: Shared engine specification
-   First reference project: Sajang / 사장도구

## 1. Purpose

Tool Site Engine은 검색엔진과 AI가 이해하기 쉬운 정적 지식 문서 안에
인터랙티브 도구를 결합하고, 프로젝트별 콘텐츠·계산 로직·테마만 교체하여
여러 전문 Tool 사이트를 구축하기 위한 공통 엔진이다.

> The engine generates structure, not knowledge.

엔진은 구조를 자동화한다. 질문 선정, 계산 정확성, 사례, 해석, 출처의
품질은 프로젝트가 책임진다.

## 2. Core Principles

1.  Static-first --- 핵심 지식은 JavaScript 없이 읽을 수 있어야 한다.
2.  Local-first --- 핵심 계산은 브라우저에서 수행한다.
3.  Tool-first --- 페이지는 실제 사용자 질문을 해결해야 한다.
4.  Answer-first --- 계산기 사용 전에도 핵심 개념과 계산 방식을 이해할
    수 있어야 한다.
5.  Semantic --- HTML 의미 구조를 우선한다.
6.  Reusable --- 특정 프로젝트의 비즈니스 로직을 Engine에 넣지 않는다.
7.  Verifiable --- 계산식, 예제, 생성 HTML을 테스트할 수 있어야 한다.
8.  Cheap --- 기본 서비스는 정적 호스팅만으로 운영 가능해야 한다.
9.  Privacy-conscious --- 사용자 입력값을 불필요하게 서버나 Analytics로
    보내지 않는다.
10. No thin-page factory --- 엔진을 대량 저품질 검색 페이지 생성기로
    사용하지 않는다.

## 3. Engine / Project Boundary

판단 질문:

> 이 기능은 전혀 다른 카테고리의 Tool 사이트에서도 그대로 사용할 수
> 있는가?

YES → Engine\
NO → Project

### Engine responsibilities

-   Page layout primitives
-   Calculator UI primitives
-   Result primitives
-   Content rendering
-   SEO metadata generation
-   Structured data generation
-   Breadcrumb/navigation
-   Sitemap/robots generation
-   Local storage abstraction
-   Analytics abstraction
-   AdSlot abstraction
-   Data-source abstraction
-   Accessibility contract
-   Responsive composition
-   Build-time validation

### Project responsibilities

-   Brand and theme
-   Categories
-   User questions
-   Tool definitions
-   Calculation functions
-   Domain terminology
-   Static answers
-   Examples
-   FAQ
-   Limitations
-   Related decisions
-   Sources/reference values

## 4. Technical Direction

Preferred v0.01 stack:

-   Astro
-   TypeScript
-   Static output
-   React islands only where interaction complexity justifies them
-   GitHub Pages compatible build
-   No required backend for core functionality

Architecture:

``` text
Static HTML / Knowledge
        +
Interactive Calculator Island
        +
Optional Local Storage
        +
Optional Remote Reference Data
```

Knowledge = Static\
Interaction = Client

## 5. Repository Concept

``` text
tool-site-engine/
├─ src/
│  ├─ engine/
│  │  ├─ components/
│  │  ├─ calculator/
│  │  ├─ content/
│  │  ├─ seo/
│  │  ├─ schema/
│  │  ├─ navigation/
│  │  ├─ storage/
│  │  ├─ analytics/
│  │  ├─ ads/
│  │  └─ data/
│  ├─ projects/
│  │  └─ sajang/
│  │     ├─ project.ts
│  │     ├─ categories/
│  │     ├─ tools/
│  │     ├─ calculators/
│  │     ├─ content/
│  │     └─ sources/
│  ├─ layouts/
│  └─ pages/
├─ public/
└─ tests/
```

v0.01에서는 미래의 복잡한 monorepo를 선제 구현하지 않는다.

## 6. Project Definition Contract

Project Definition은 최소 다음 개념을 가진다.

``` text
id
name
description
locale
baseUrl
owner
navigation
features
theme
```

Feature flags 예:

``` text
localStorage
analytics
ads
remoteData
```

프로젝트별로 기능을 켜고 끌 수 있어야 한다.

## 7. Category Definition

``` text
id
name
question
description
tools[]
status
```

Tool이 하나뿐이고 독립적인 검색/사용자 가치가 없는 경우 얇은 category
URL을 강제로 생성하지 않는다.

## 8. Tool Definition --- Single Source of Truth

Tool Definition은 페이지의 핵심 기준점이다.

``` text
identity
- id
- slug
- category
- status
- version

search
- question
- name
- title
- description

knowledge
- shortAnswer
- definition
- howItWorks
- formula
- example
- limitations
- faq

interaction
- inputs
- outputs
- calculator

relations
- relatedTools
- sources

maintenance
- publishedAt
- reviewedAt
- dataEffectiveAt
```

동일한 이름/URL/설명을 여러 파일에 복사하지 않는다. Metadata,
Breadcrumb, Related links, Sitemap 등은 가능한 한 Tool Definition에서
생성한다.

## 9. Calculator Contract

Calculator는 DOM과 독립적인 pure logic을 우선한다.

``` text
INPUT
  ↓
CALCULATOR
  ↓
RESULT DATA
```

Calculator가 HTML, 마케팅 문장, UI 상태를 직접 생성하지 않는다.

숫자 계산과 결과 언어를 분리한다.

``` text
calculator → targetDaily = 414201.18...
renderer   → 414,201원
meaning    → 하루 평균 목표 매출입니다.
```

## 10. Input Primitives

Engine 공통 입력 타입:

-   MoneyInput
-   PercentageInput
-   NumberInput
-   QuantityInput
-   DaysInput
-   SelectInput
-   ToggleInput

공통 필드:

``` text
id
label
description
unit
required
defaultValue
min
max
step
inputMode
```

실제 label/input 연결, keyboard focus, 오류 연결을 보장한다.

## 11. Result Primitives

-   PrimaryResult
-   SecondaryResult
-   ComparisonResult
-   Breakdown
-   FormulaSteps
-   Interpretation
-   Warning
-   Error

Infinity, NaN, undefined가 사용자 UI에 노출되면 실패로 간주한다.

## 12. Common Tool Page Contract

기본 순서:

``` text
Breadcrumb
Header / Question
Quick Answer
Calculator
Result
Interpretation
Formula / Calculation
Example
Limitations
FAQ
Related Decisions
Source / Review Information
```

필요 없는 섹션은 생략 가능하지만 Tool마다 임의의 SaaS 랜딩페이지 구조를
만들지 않는다.

## 13. Static HTML Contract

JavaScript 없이 읽혀야 하는 핵심:

-   Page title / H1
-   User question
-   Short answer
-   Definition
-   Formula
-   Static worked example
-   Limitations
-   FAQ
-   Sources
-   Related tools

JavaScript가 필요한 것:

-   User input
-   Live calculation
-   Dynamic result
-   Explicit local preference storage

## 14. SEO Engine

Tool Definition 기반으로 생성:

-   `<title>`
-   meta description
-   canonical
-   robots
-   Open Graph metadata
-   sitemap.xml
-   robots.txt

Status rules:

``` text
published → indexable + sitemap
draft     → not published
noindex   → noindex + sitemap 제외
```

## 15. Structured Data

공통 후보:

-   WebSite
-   WebPage
-   BreadcrumbList
-   Organization (실제 운영 정보가 확정된 경우)
-   적절한 WebApplication/SoftwareApplication 계열 (실제 페이지 성격과
    맞을 때만)

Schema를 얻기 위해 콘텐츠를 만들지 않는다. 실제 보이는 내용과 structured
data는 일치해야 한다.

## 16. Content Contract

구조화된 의미 단위:

``` text
shortAnswer
definition
howItWorks
formula
example
limitations
faq
sources
```

구조는 일정하게 유지하되 문장 표현은 프로젝트가 자유롭게 작성한다.

## 17. Verified Example Contract

Static example의 숫자는 가능하면 동일 Calculator 함수를 사용해 생성한다.

``` text
Example Input
   ↓
Production Calculator
   ↓
Example Result
   ↓
Static HTML
```

문서에 수작업으로 계산 결과를 중복 입력하여 Calculator와 예제가
불일치하는 문제를 방지한다.

## 18. Source Registry

``` text
id
title
publisher
url
effectiveDate
checkedAt
notes
```

Tool은 source ID만 참조하고 Engine이 출처/기준일/확인일을 렌더링한다.

## 19. Data Source Layer

개념 인터페이스:

``` text
getData(key)
```

권장 흐름:

``` text
Bundled fallback
→ local cache
→ optional remote provider
→ validation
→ use latest valid value
```

v0.01 remote provider 후보: Google Apps Script → Google Sheets

Remote 장애가 핵심 계산을 중단시키지 않아야 한다.

Sheets는 사용자 사업 데이터 저장소로 사용하지 않는다. 운영자가 갱신하는
공용 기준값에만 사용한다.

## 20. Storage Contract

Project namespace 사용:

``` text
toolsite:{projectId}:{key}
```

자동 저장보다 명시적 opt-in을 우선한다.

필수: - 저장 여부 설명 - 브라우저에만 저장 - 저장된 값 삭제 기능

## 21. Analytics Contract

공통 이벤트 후보:

``` text
tool_view
tool_start
tool_calculate
tool_result
related_tool_click
source_click
local_value_save
local_value_clear
```

공통 context:

``` text
project_id
category_id
tool_id
```

사용자의 매출, 원가, 월세, 인건비 등 실제 입력 숫자를 Analytics
payload에 포함하지 않는 것을 기본 정책으로 한다.

## 22. Ad Contract

Tool 내부에 AdSense 코드를 직접 흩뿌리지 않는다.

``` text
AdSlot
- after-result
- after-explanation
- content-end
```

`ads.enabled = false`이면 렌더링하지 않는다.

광고는 Input과 Calculate 사이 또는 핵심 결과 이전에 삽입하지 않는다.

## 23. Navigation Contract

Related Tool은 raw URL이 아니라 tool ID를 참조한다.

``` text
related:
- tool
- prompt
- action
```

Engine이 이름, URL, 설명을 해결한다.

## 24. Responsive Engine Contract

CSS breakpoint:

``` text
Desktop: >= 1200px
Tablet:  768–1199px
Phone:   < 768px
```

QA class는 4단계:

-   Desktop
-   Tablet Landscape
-   Tablet Portrait
-   Smartphone

핵심 원칙:

> Same information. Different composition.

화면이 작아졌다고 핵심 정보, 공식, 예제를 제거하지 않는다. 배치와 밀도만
변경한다.

공통 Calculator composition:

``` text
Desktop / Tablet Landscape:
INPUT | RESULT

Tablet Portrait / Smartphone:
INPUT
↓
RESULT
```

## 25. Build-time Validation

Published Tool은 최소 다음을 검사한다.

-   unique id
-   unique slug
-   category exists
-   calculator exists
-   related tools exist
-   sources exist
-   title exists
-   description exists
-   shortAnswer exists
-   example exists
-   reviewedAt valid
-   calculator example executes
-   generated result finite
-   published page has H1
-   canonical exists
-   JSON-LD parses
-   internal links resolve

중대한 오류는 build failure 처리한다.

## 26. Calculator QA

각 Calculator는 unit test를 가진다.

공통 edge cases:

-   zero
-   negative
-   empty
-   NaN
-   100%
-   over 100%
-   decimals
-   extremely large values
-   zero divisor
-   invalid optional input

계산 함수는 가능한 한 precision을 유지하고 표시 단계에서 반올림한다.

## 27. Cross-project Separation Test

Engine v0.01 완료 전 사장도구와 무관한 작은 fixture project를 만든다.

예:

``` text
test-project
└─ unit-converter
```

Engine 수정 없이 다음만 추가해 별도 사이트가 빌드되어야 한다.

-   Project Definition
-   Tool Definition
-   Calculator
-   Content
-   Theme

성공 시 Engine/Project separation test 통과.

## 28. Explicit Non-goals v0.01

-   Login/account
-   Cloud user database
-   Payment/subscription
-   User calculation history server storage
-   CMS
-   Multi-tenant SaaS
-   AI content generation
-   Keyword page factory
-   Complex dashboard
-   Required SSR infrastructure
-   Full multilingual system

## 29. Engine Success Criteria

1.  Static
2.  Interactive
3.  Semantic
4.  Reusable
5.  Verifiable
6.  Maintainable
7.  Cheap

Engine의 성공은 많은 페이지를 생성하는 것이 아니라, **좋은 Tool 페이지를
다른 분야에서도 일관되게 만들 수 있는가**로 판단한다.
