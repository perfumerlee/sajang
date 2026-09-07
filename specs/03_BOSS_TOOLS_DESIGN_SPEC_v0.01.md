# 03_BOSS_TOOLS_DESIGN_SPEC_v0.01

-   Version: v0.01
-   Status: Baseline Design Specification
-   Dependencies:
    -   01_TOOL_SITE_ENGINE_SPEC_v0.01
    -   02_BOSS_TOOLS_PROJECT_SPEC_v0.01

## 1. Concept

### WORKING LEDGER

> 사장이 장사 중 숫자가 궁금할 때 펼쳐보는 계산 장부.

Visual sources: - 장부 - 거래명세표 - 계산표 - 간이영수증 - 발주서 -
사장님의 메모

목표는 복고풍 장부를 모사하는 것이 아니다.

> Modern utility × Korean business document

Accordbook의 "노트"처럼, 사장도구에서는 장부의 정보 구조가 인터랙션과
직접 연결되어야 한다.

## 2. Personality

-   Calm
-   Practical
-   Precise
-   Human
-   Utilitarian
-   Numeric
-   Editorial
-   Korean
-   Tactile

태도: 친절하지만 떠들지 않는다. 숫자를 숨기지 않고 판단은 사용자에게
맡긴다.

피할 카피: - 스마트하게 성장하세요 - 수익을 극대화하세요 - 완벽한
비즈니스 솔루션 - 성공을 위한 AI 도구

선호 카피: - 월 고정비를 입력하세요. - 입력한 조건을 기준으로
계산합니다. - 현재 수준을 유지하려면 167개를 더 판매해야 합니다.

## 3. Visual Anti-patterns --- NEVER

-   No gradients
-   No glassmorphism
-   No giant rounded cards
-   No generic SaaS dashboard cards
-   No decorative emoji
-   No floating blobs
-   No 3D illustration
-   No fake AI imagery
-   No neon accents
-   No unnecessary shadows
-   No pill-shaped everything
-   No excessive badges
-   No marketing-style hero illustration
-   Do not "modernize" by adding common SaaS visual patterns

사장도구는 fintech 앱이나 회계 SaaS처럼 보이지 않아야 한다.

## 4. Primary Visual Motifs

### 4.1 Ledger Rule

Spacing과 rule로 영역을 나눈다. 카드/그림자 대신 문서 구조를 사용한다.

### 4.2 Double Underline

Primary Result 전용 브랜드 모티프.

``` text
414,201원
══════════
```

남발하지 않는다.

### 4.3 Calculation Trace

결과를 마법처럼 제시하지 않고 계산 흔적을 보여준다.

### 4.4 Numeric Hero

일러스트 대신 숫자가 Hero다.

## 5. Surface / Color Direction

기본: - Paper: warm off-white - Ink: near-black - Rule: warm gray -
Muted text: document gray - Primary accent: muted ledger green -
Warning: limited muted red

밝은 fintech green, neon green을 피한다.

색은 의미의 보조 수단이다. 수익/손실을 색만으로 구분하지 않는다.

정확한 hex 값은 visual prototype 단계에서 확정하되 token 이름은 먼저
고정한다.

## 6. Radius / Shadow

Radius scale: - 0 - 2 - 4 - 6px

기본 shadow: - none

Floating layer 등 실제 계층이 필요한 경우에만 minimal shadow.

24/32/999px radius를 기본 디자인 문법으로 사용하지 않는다.

## 7. Typography

원칙: - 한국어 가독성 우선 - 숫자 정렬 우선 - 과도한 웹폰트 의존 금지 -
`font-variant-numeric: tabular-nums` 사용 검토/적용

검증 항목: - ₩ - % - decimal - 0/6/8 구분 - 큰 금액 - 한글/숫자 baseline

Hierarchy guideline: - Display Question: Desktop 48--64 / Mobile
36--44 - Tool H1: 24--32 - H2: 22--28 - H3: 18--22 - Body: 16--18 -
Small: 13--14 - Primary Number: Desktop 48--56 / Mobile 36--42

실제 폰트 렌더링 후 line-height를 조정한다.

## 8. Spacing Tokens

기본 scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`

카드가 적으므로 공간 자체가 레이아웃 역할을 한다.

## 9. Global Width

개념 목표: - Site max width: 약 1200px - Calculator width: 약
900--1000px - Reading width: 약 720px

긴 본문을 전체 화면 폭으로 늘리지 않는다.

## 10. Responsive Classes

CSS breakpoint:

``` text
Desktop: >= 1200px
Tablet: 768px–1199px
Smartphone: < 768px
```

QA는 4단계로 운영한다.

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
-   375×812
-   360×800
-   **375×812 --- iPhone XS reference viewport**

iPhone XS를 별도 명시한다: - CSS viewport reference: **375×812** - DPR
자체에 의존하는 layout을 만들지 않는다. - Safe-area inset을 고려할 수
있는 구조를 유지한다. - 375×812 QA 항목은 "generic 375"가 아니라
**iPhone XS reference**로도 검수한다.

Breakpoint boundary: - 1199 ↔ 1200 - 767 ↔ 768

## 11. Reference Views

개발/디자인의 두 대표 화면:

1.  Smartphone Reference: **390×844**
2.  Desktop Reference: **1440×900**

추가 핵심 Apple reference: 3. **iPhone XS: 375×812**

개발 검증 권장 순서:

``` text
390×844
→ iPhone XS 375×812
→ 1440×900
→ 820×1180
→ 1180×820
→ remaining stress matrix
```

## 12. Responsive Philosophy

> Same information. Different composition.

화면이 작아졌다고 Formula, Example, Limitation 같은 핵심 정보를 제거하지
않는다.

### Desktop / Tablet Landscape

``` text
INPUT | RESULT
```

### Tablet Portrait / Smartphone

``` text
INPUT
↓
BUTTON
↓
RESULT
```

Orientation 전환 시 입력값과 계산 결과를 초기화하지 않는다.

## 13. Desktop Tool Layout

Calculator만 넓은 2-column을 사용한다.

``` text
Header
Breadcrumb
Question / Tool Intro

┌───────────────┬──────────────────┐
│ Input         │ Result           │
│ ~45%          │ ~55%             │
└───────────────┴──────────────────┘

Reading column
- Interpretation
- Formula
- Example
- Limitations
- FAQ
- Related
```

설명 본문은 다시 좁은 reading width로 돌아온다.

## 14. Tablet Landscape

-   2-column 유지
-   50/50에 가까운 비율 허용
-   padding 축소
-   결과 숫자 overflow 금지

1024×768에서 input helper와 result가 답답하지 않은지 특별 검수한다.

## 15. Tablet Portrait

768/820 폭에서는 Calculator를 single column으로 전환한다.

``` text
계산 조건
Inputs
Calculate

계산 결과
Primary
Secondary
```

Desktop 2-column을 억지로 축소하지 않는다.

## 16. Smartphone / Receipt Flow

Smartphone은 긴 계산표/영수증 흐름으로 구성한다.

``` text
Header
Tool index label
Question
Short description

계산 조건
Input
Input
Input
Input

계산하기

계산 결과
Primary number
Double rule
Secondary metrics

Interpretation
AdSlot
Formula
Example
Limitations
FAQ
Related
Footer
```

### iPhone XS 375×812 specific QA

-   좌우 padding 기본 후보: 16px
-   H1/question이 한 글자만 다음 줄로 떨어지지 않음
-   10자리 이상 금액이 overflow하지 않음
-   단위 `원/%/일/개`가 숫자와 충돌하지 않음
-   Calculate button touch target \>= 48px height
-   input focus 시 화면 확대/레이아웃 점프를 유발하지 않도록 모바일 폰트
    크기 검토
-   결과가 fold 아래에 위치하더라도 계산 후 사용자가 결과를 자연스럽게
    발견할 수 있어야 함
-   safe-area가 있는 환경에서도 footer/action이 잘리지 않는 구조 유지

## 17. Suggested Smartphone Padding

-   360: 16px
-   375 / iPhone XS: 16px
-   390: 18px
-   430: 20px

실제 구현은 responsive token/clamp 방식 허용.

## 18. Header

Desktop:

``` text
사장도구                         도구   소개
──────────────────────────────────────
```

Mobile:

``` text
사장도구                         도구
────────────────────────────────────
```

-   Wordmark 중심
-   초기 로고 이미지 불필요
-   Desktop 약 64px
-   Mobile 약 56px
-   v0.01 기본 sticky 아님
-   Tool 5개 단계에서 복잡한 hamburger navigation을 강제하지 않음

## 19. Homepage

### Hero

``` text
장사하면서
궁금했던 숫자들.

매출, 가격, 할인, 직원 고용처럼
장사를 하며 자주 마주치는 숫자를
직접 계산해보세요.
```

거대한 CTA나 illustration을 두지 않는다.

### Tool Index

카드 grid가 아니라 editorial index.

``` text
01 / 매출
오늘 얼마 팔아야 하지?          →
하루 목표 매출 계산기
────────────────────────────────

02 / 가격
얼마에 팔아야 하지?             →
판매가격 계산기
────────────────────────────────
```

Mobile에서는 질문을 2줄로 자연스럽게 사용할 수 있다.

## 20. Tool Header

공통 시각 순서:

``` text
Breadcrumb

01 / SALES

오늘 얼마
팔아야 하지?

하루 목표 매출 계산기

짧은 설명
```

실제 semantic H1은 검색 의미가 명확한 전체 Tool 이름/질문을 포함하도록
구현할 수 있다. 시각적 line break와 semantic text를 혼동하지 않는다.

## 21. Calculator Surface

페이지 자체가 paper이므로 "종이 안의 카드"를 반복하지 않는다.

영역 구분: - spacing - hairline - strong rule - vertical divider
(desktop only where useful)

## 22. Rule System

### Hairline

일반 구분.

### Strong Rule

중요 section.

### Double Rule

Primary Result 전용.

Double Rule을 button, card, footer 등에 장식적으로 반복하지 않는다.

## 23. Input Design

기본:

``` text
월 고정비
매달 고정적으로 나가는 비용

4,000,000                         원
──────────────────────────────────
```

-   label
-   optional helper
-   value
-   unit
-   underline

Full rounded input box를 기본 문법으로 사용하지 않는다.

Focus: - underline 강조 - ledger green 보조 - 접근 가능한 focus
indication 유지

## 24. Numeric Input UX

-   money: 적절한 numeric input mode
-   decimal percentage: decimal input mode
-   unit은 placeholder가 아니라 별도 표시
-   thousands separator UX는 cursor 안정성을 우선
-   입력 포맷팅 때문에 값이 사라지거나 cursor가 튀면 포맷팅을 단순화한다

## 25. Buttons

Primary: - 계산하기 - height 약 48--52px - radius 2--4px - 충분한 touch
target

Secondary: - 다시 계산 - 이 값을 기억하기

Text action: - 저장된 값 삭제 - 계산 방식 보기

Pill button 금지.

## 26. Result

Primary:

``` text
계산 결과

오늘 목표 매출

414,201 원
══════════
```

Secondary metrics는 KPI card가 아니라 장부 row로 표현한다.

``` text
목표 월매출              10,769,231 원
────────────────────────────────────
손익분기 월매출            6,153,846 원
────────────────────────────────────
손익분기 일매출              236,686 원
```

## 27. Comparison

Desktop:

``` text
                 현재       변경 후
판매가격        10,000      11,000
판매량             500         400
기여금       2,000,000   2,000,000
```

Mobile: horizontal table 축소보다 stack 재구성.

``` text
현재
가격 10,000
판매량 500

↓ 변경 후

가격 11,000
판매량 400
```

가로 스크롤 의존을 피한다.

## 28. Warning / Error

큰 빨간 카드 대신 문서형 warning.

``` text
확인 필요
━━━━━━━━━━

현재 비용구조에서는
이 할인율로 판매할수록
손실이 발생합니다.
```

Input validation error는 해당 input 바로 아래 표시한다. 계산 시 첫 오류
input으로 focus 이동을 검토한다.

## 29. Formula

회색 code card보다 실제 계산표처럼 표현한다.

``` text
목표 월매출

고정비 + 목표수익
────────────────
1 - 변동비율

= 10,769,231원
```

Mobile에서도 분수/수식이 깨지지 않아야 한다.

## 30. Static Example

장부형 예제:

``` text
예를 들어

월 고정비             400만원
평균 변동비율             35%
월 목표수익            300만원
영업일                    26일

이라면,

하루 목표 매출
약 414,201원
════════════
```

숫자는 verified example contract를 따른다.

## 31. FAQ

기본은 열린 문서 형태를 선호한다.

``` text
자주 묻는 질문
────────────────

고정비에는 무엇을 넣나요?
답변...

상품 원가는 고정비인가요?
답변...
```

Mobile accordion을 도입하더라도 답변은 정적 HTML에 존재해야 한다.

## 32. Related Decisions

카드 대신 index language.

``` text
다음 계산
────────────────

목표 매출이 너무 높나요?
가격 올려도 될까?               →

할인을 고민하고 있나요?
할인해도 될까?                  →
```

## 33. AdSlot

광고는 서비스 UI와 명확하게 구분한다.

금지: - Input과 Calculate 사이 - Primary Result 이전 - 콘텐츠처럼 위장

권장:

``` text
Input
→ Result
→ Interpretation
→ AdSlot
→ Formula / Example
```

CLS를 줄이도록 공간 예약을 검토한다.

## 34. Footer

간결한 문서형 footer.

``` text
사장도구

장사하면서 필요한 숫자를
쉽게 계산하는 무료 도구.

도구 · 소개 · 개인정보처리방침 · 문의
```

대형 corporate footer 금지.

## 35. Touch / Keyboard

Touch: - interactive target 최소 44×44 - primary calculate \>= 48px
height

Desktop keyboard: - Tab next input - Shift+Tab previous - Enter
calculate when valid

## 36. Accessibility

필수: - semantic headings - real labels - visible keyboard focus -
sufficient contrast - errors associated with fields - no color-only
meaning - appropriate result announcement (`aria-live` 검토) -
reduced-motion friendly - logical DOM order

## 37. Animation

허용: - hover - focus - menu - subtle result reveal - 100--200ms 수준

금지/비권장: - count-up number animation - bouncing CTA - parallax -
decorative motion

## 38. Empty / Loading

Local calculation은 즉시 수행하므로 spinner가 필요 없다.

초기 Result: `0원`을 표시하지 않는다.

Desktop: \> 조건을 입력하면 여기에 계산 결과가 표시됩니다.

Mobile: 계산 전 Result 영역을 축약 가능.

Remote reference data에만 최소 loading/error state 사용.

## 39. Dark Mode

v0.01 non-goal.

Working Ledger의 paper/ink identity를 먼저 확립한다. OS dark mode 때문에
임의 반전되지 않도록 한다.

## 40. Print Readiness

v0.01 필수 기능은 아니지만 구조적으로 막지 않는다.

Print에서 제거 후보: - navigation - ads - interactive-only controls -
related links

유지 후보: - tool title - input summary - result - calculation - date -
limitations

## 41. Numeric Stress Test

반드시 검수:

``` text
0원
1원
999원
999,999원
999,999,999원
9,999,999,999원
0.1%
99.99%
999,999개
```

Primary number는 필요 시 `clamp()`로 viewport에 맞춰 조절하되 과도하게
작아지지 않는다.

## 42. Responsive QA Matrix

  Class                 Resolution Purpose
  ------------------ ------------- ------------------------------
  Desktop                1920×1080 wide-screen spread
  Desktop                 1440×900 primary desktop reference
  Tablet Landscape        1180×820 2-column reference
  Tablet Landscape        1024×768 compact landscape
  Tablet Portrait         820×1180 single-column reference
  Tablet Portrait         768×1024 breakpoint edge
  Smartphone               430×932 large phone
  Smartphone               390×844 primary smartphone reference
  Smartphone           **375×812** **iPhone XS reference**
  Smartphone               360×800 minimum phone

Boundary: - 1199 / 1200 - 767 / 768

## 43. Per-resolution QA

각 화면에서 확인: - header overflow - question line breaks - input/unit
collision - numeric keyboard - primary result overflow - comparison
reflow - formula readability - AdSlot layout stability - related link
touch area - no horizontal page scroll - orientation change preserves
values

## 44. AI-aesthetic Visual QA Gate

출시 전 체크:

-   [ ] Gradient 없음
-   [ ] Glass 없음
-   [ ] Giant rounded cards 없음
-   [ ] 불필요한 shadow 없음
-   [ ] Decorative emoji 없음
-   [ ] Dashboard KPI cards 없음
-   [ ] Pill 남용 없음
-   [ ] AI illustration 없음
-   [ ] 의미 없는 badges 없음
-   [ ] 숫자가 visual priority
-   [ ] Rule/spacing 중심 구조
-   [ ] Working Ledger identity 유지
-   [ ] Mobile이 Desktop의 단순 축소판이 아님
-   [ ] Desktop이 Mobile의 단순 확대판이 아님

## 45. Engine Design vs Boss Theme

### Engine Design Contract

재사용: - responsive grid - breakpoints - spacing scale - typography
hierarchy - accessibility - input/result primitives - content sections -
AdSlot - interaction behavior

### Sajang Theme

프로젝트 고유: - Working Ledger - warm paper - ink - muted ledger
green - limited warning red - double rule - underline input - numeric
hero - editorial index - document-like microcopy

다른 프로젝트는 Engine Design Contract를 재사용하되 Theme를 교체한다.

## 46. Final Design Principle

> Same information. Different composition.

PC에서는 넓은 계산표, Tablet Portrait와 Smartphone에서는 긴 장부/영수증
흐름으로 재구성한다.

사장도구의 디자인 성공은 "화려함"이 아니라 **사용자가 질문 → 숫자 입력 →
답 → 의미 → 다음 결정의 흐름을 빠르고 신뢰감 있게 읽을 수 있는가**로
판단한다.
