# 02_BOSS_TOOLS_PROJECT_SPEC_v0.01
## Project Identity Lock

- Internal project name: `sajang`
- Project ID: `sajang`
- Repository name: `sajang`
- Project source directory: `src/projects/sajang/`
- Public Korean brand: `사장도구`
- Internal English label: `Sajang`

The internal identifier `sajang` and the public brand `사장도구` are intentionally separate. Do not rename the public brand to `사장` merely because the repository/project ID is `sajang`.

-   Version: v0.01
-   Status: Baseline Project Specification
-   Engine dependency: 01_TOOL_SITE_ENGINE_SPEC_v0.01
-   Project: 사장도구 / Sajang

## 1. Product Definition

사장도구는 장사하면서 결정을 내려야 할 때 숫자로 미리 확인할 수 있게
해주는 무료 의사결정 Tool 사이트다.

> 장사하면서 필요한 숫자를 쉽게 계산하세요.

Positioning:

> "계산해드립니다"보다 "결정하기 전에 한번 돌려보세요."

사장도구는 ERP, 세무서비스, 회계프로그램, 범용 계산기 모음이 아니다.

## 2. Business Model

``` text
Google Search
→ Free useful tool
→ Answer / Interpretation
→ Related decision tool
→ Additional pageviews
→ AdSense
```

초기 핵심 KPI는 페이지 수가 아니라: - 검색 노출 - 실제 query - Tool
사용 - related-tool 이동 - 반복적으로 발견되는 신규 질문

Search Console을 제품 탐색 데이터로 사용한다.

## 3. v0.01 Scope

출시 Tool은 정확히 5개다.

1.  `daily-sales-target` --- 오늘 얼마 팔아야 하지?
2.  `selling-price` --- 얼마에 팔아야 하지?
3.  `price-change` --- 가격 올려도 될까?
4.  `discount-profit` --- 할인해도 될까?
5.  `hiring-profit` --- 한 명 더 써도 될까?

구현 중 새 Tool을 추가하지 않는다.

## 4. Product Principles

-   Free
-   No login
-   No required backend
-   No server-side storage of calculation inputs
-   Local calculation
-   Static knowledge
-   Formula disclosed
-   Assumptions disclosed
-   Result interpreted
-   Related next decision provided
-   Conservative financial language

## 5. Common Business Math Vocabulary

### Revenue

매출.

### Fixed Cost

판매량/매출 변화와 직접 비례하지 않는 비용.

### Fixed Variable Cost Per Unit

판매 1건/1개가 추가될 때 일정 금액으로 증가하는 비용. 예: 상품원가,
포장비, 건당 배송비.

### Percentage Variable Cost

판매금액에 비례하는 비용. 예: 결제수수료, 플랫폼수수료.

### Contribution

고정비와 목표수익을 충당하는 데 사용할 수 있는 금액.

``` text
Unit Contribution
= Selling Price
- Fixed Variable Cost Per Unit
- Percentage Variable Cost
```

## 6. Language Safety

계산 범위에 포함하지 않은 항목이 있을 때 다음 표현을 사용하지 않는다.

-   정확한 순이익
-   세후수익
-   실수령액
-   정확한 이익

대신:

-   예상 기여금
-   입력 비용 차감 후 금액
-   입력 조건 기준 예상
-   목표수익
-   손익분기 기준
-   세금 전 단순 추정 (해당되는 경우)

공통 안내:

> 본 계산 결과는 입력한 비용과 조건을 바탕으로 한 단순 추정치이며 실제
> 세금, 부가가치세, 금융비용 및 기타 비용에 따라 달라질 수 있습니다.

## 7. Tool 01 --- Daily Sales Target

### Identity

-   ID: `daily-sales-target`
-   URL: `/tools/daily-sales-target/`
-   Question: 오늘 얼마 팔아야 하지?
-   Name: 하루 목표 매출 계산기
-   Category: sales

### Search Title

`하루 목표 매출 계산기 - 오늘 얼마 팔아야 할까? | 사장도구`

### Description

월 고정비, 변동비율, 영업일과 목표수익을 입력하면 손익분기 월매출과 하루
목표 매출을 계산한다.

### Inputs

-   `fixedCost`: 월 고정비 / money / required / \>= 0
-   `variableRate`: 평균 변동비율 / percentage / required / 0 \<= x \< 1
-   `operatingDays`: 월 영업일 / integer days / required / 1--31
-   `targetProfit`: 월 목표수익 / money / required / \>= 0
-   `averageOrderValue`: 평균 객단가 / money / optional / \> 0 if
    supplied

### Formula

``` text
contributionRate = 1 - variableRate

breakEvenMonthly = fixedCost / contributionRate
breakEvenDaily   = breakEvenMonthly / operatingDays

targetMonthly =
(fixedCost + targetProfit) / contributionRate

targetDaily =
targetMonthly / operatingDays

customersNeeded =
targetDaily / averageOrderValue
```

고객/주문 수 사용자 표시는 올림한다.

### Reference Example

``` text
fixedCost = 4,000,000
variableRate = 35%
targetProfit = 3,000,000
operatingDays = 26
```

Expected: - contribution rate = 65% - target monthly ≈ 10,769,231원 -
target daily ≈ 414,201원

Static example은 production calculator로 생성한다.

### Primary Result

`하루 약 41만 4천원`

Meaning: 입력한 조건에서 월 목표수익을 달성하기 위한 하루 평균 목표
매출.

### Secondary Results

-   목표 월매출
-   손익분기 월매출
-   손익분기 일매출
-   필요 고객/주문 수 (객단가 입력 시)

### Important Semantics

목표수익은 고정비가 아니라 비용 충당 후 목표로 하는 추가 금액이다. 세후
실수령액으로 표현하지 않는다.

### Edge Cases

-   variableRate \>= 100% → calculation invalid
-   operatingDays \<= 0 → invalid
-   fixedCost \< 0 → invalid
-   targetProfit \< 0 → invalid
-   fixedCost = 0 and targetProfit = 0 → result 0 allowed

## 8. Tool 02 --- Selling Price

### Identity

-   ID: `selling-price`
-   URL: `/tools/selling-price/`
-   Question: 얼마에 팔아야 하지?
-   Name: 판매가격 계산기
-   Category: pricing

### Modes

A. 얼마에 팔아야 하지?\
B. 지금 가격에 얼마나 남지?

같은 비용 모델과 검색 의도를 공유하므로 v0.01에서는 한 URL 안의 두
Mode로 구성한다.

### Mode A Inputs

-   `unitCost`: 개당 원가
-   `fixedSellingCost`: 건당 추가비용
-   `percentageFee`: 판매금액 비례 수수료율
-   `targetContributionRate`: 목표 기여율

### Formula

``` text
C = unitCost + fixedSellingCost
F = percentageFee
M = targetContributionRate

sellingPrice = C / (1 - F - M)
```

Validation: `F + M < 1`

### Primary Result

`목표 기여율을 위한 계산가격`

시장 수요와 경쟁가격을 반영한 "권장가격"이라고 과장하지 않는다.

### Mode B Inputs

-   sellingPrice
-   unitCost
-   fixedSellingCost
-   percentageFee

### Mode B Formula

``` text
percentageFeeAmount =
sellingPrice * percentageFee

unitContribution =
sellingPrice
- unitCost
- fixedSellingCost
- percentageFeeAmount

contributionRate =
unitContribution / sellingPrice
```

### Mode B Result

-   개당 예상 기여금
-   기여율
-   비용 breakdown

### Limitation

시장 수요나 경쟁가격을 고려한 판매가격 추천 서비스가 아니다.

## 9. Tool 03 --- Price Change

### Identity

-   ID: `price-change`
-   URL: `/tools/price-change/`
-   Question: 가격 올려도 될까?
-   Name: 가격변경 손익 시뮬레이터
-   Category: pricing

### Inputs

-   currentPrice
-   currentQuantity
-   unitCost
-   fixedSellingCost
-   percentageFee
-   newPrice
-   expectedQuantity (optional)

### Formula

``` text
currentFee =
currentPrice * percentageFee

currentUnitContribution =
currentPrice
- unitCost
- fixedSellingCost
- currentFee

currentTotalContribution =
currentUnitContribution * currentQuantity

newFee =
newPrice * percentageFee

newUnitContribution =
newPrice
- unitCost
- fixedSellingCost
- newFee

requiredQuantity =
currentTotalContribution / newUnitContribution
```

가격 인상 시:

``` text
maxTolerableDecline =
1 - requiredQuantity / currentQuantity
```

가격 인하 시:

``` text
requiredIncrease =
requiredQuantity / currentQuantity - 1
```

Expected quantity 입력 시:

``` text
expectedContribution =
newUnitContribution * expectedQuantity

changeRate =
(expectedContribution - currentTotalContribution)
/ currentTotalContribution
```

### Interpretation

Calculator는 direction-neutral data를 반환하고 renderer가 가격
인상/인하에 맞는 문장을 선택한다.

### Example Interpretation

가격 인상:
`판매량이 최대 약 20% 감소해도 현재 수준의 기여금을 유지할 수 있습니다.`

가격 인하: `현재 수준을 유지하려면 판매량이 약 25% 증가해야 합니다.`

### Edge Case

`newUnitContribution <= 0`이면 break-even quantity 계산을 중단하고
Warning 표시.

## 10. Tool 04 --- Discount Profit

### Identity

-   ID: `discount-profit`
-   URL: `/tools/discount-profit/`
-   Question: 할인해도 될까?
-   Name: 할인 손익 계산기
-   Category: promotion

### Inputs

-   regularPrice
-   currentQuantity
-   unitCost
-   fixedSellingCost
-   percentageFee
-   discountRate

### Formula

``` text
discountPrice =
regularPrice * (1 - discountRate)

currentUnitContribution =
regularPrice
- unitCost
- fixedSellingCost
- regularPrice * percentageFee

currentTotalContribution =
currentUnitContribution * currentQuantity

discountUnitContribution =
discountPrice
- unitCost
- fixedSellingCost
- discountPrice * percentageFee

requiredQuantity =
currentTotalContribution / discountUnitContribution

requiredIncreaseRate =
requiredQuantity / currentQuantity - 1
```

### Primary Result

`10% 할인 시 현재 수준을 유지하려면 판매량이 약 33% 증가해야 합니다.`

보조: - 현재 판매량 - 필요 판매량 - 추가 판매량

### Danger State

`discountUnitContribution <= 0`

표시: \> 현재 비용구조에서는 이 할인율로 판매할수록 손실이 발생합니다.
판매량 증가만으로 현재 기여금 수준을 회복할 수 없습니다.

### Scenario Comparison

가능하면 5/10/15/20% 등 유효한 할인 시나리오를 비교하되 Calculator
core와 Scenario Generator를 분리한다.

## 11. Tool 05 --- Hiring Profit

### Identity

-   ID: `hiring-profit`
-   URL: `/tools/hiring-profit/`
-   Question: 한 명 더 써도 될까?
-   Name: 직원고용 손익 계산기
-   Category: staff

### Inputs

-   `employeeMonthlyCost`: 추가 직원 월 총비용
-   `variableRate`: 평균 변동비율
-   `operatingDays`: 월 영업일
-   `currentDailyRevenue`: 현재 하루 평균 매출 / optional

### Formula

``` text
contributionRate =
1 - variableRate

additionalMonthlyRevenue =
employeeMonthlyCost / contributionRate

additionalDailyRevenue =
additionalMonthlyRevenue / operatingDays

requiredIncreaseRate =
additionalDailyRevenue / currentDailyRevenue
```

### Primary Result

`이 직원을 쓰려면 월 약 333만원의 추가 매출이 필요합니다.`

Secondary: `26일 영업 기준 하루 약 12만 8천원의 추가 매출입니다.`

현재 일매출 입력 시 현재 일매출 대비 추가 필요 매출 비율을 표시한다.

### Input Language

"월급"이 아니라 `추가 직원 월 총비용`.

Helper: 급여뿐 아니라 사업주가 실제로 추가 부담할 것으로 예상하는 월
비용을 입력.

### Limitation

노동관계법령에 따른 실제 급여/4대보험/법정 인건비를 산정하는 급여
계산기가 아니다.

## 12. Tool Relationship Graph

``` text
daily-sales-target
├─ selling-price
├─ price-change
└─ hiring-profit

selling-price
├─ price-change
└─ discount-profit

price-change
├─ discount-profit
├─ daily-sales-target
└─ selling-price

discount-profit
├─ price-change
└─ selling-price

hiring-profit
├─ daily-sales-target
└─ price-change
```

Related relation은 가능하면 이유까지 정의한다.

예:

``` text
tool: price-change
prompt: 목표 매출이 너무 높나요?
action: 가격을 바꾸면 어떻게 달라지는지 계산해보세요.
```

## 13. Common Published Content Contract

Published Tool 최소 구성:

-   question
-   shortAnswer
-   definition
-   howItWorks
-   formula
-   verified example
-   limitations
-   meaningful FAQ
-   relatedTools
-   reviewedAt

FAQ 개수를 SEO KPI로 삼지 않는다.

## 14. Homepage

H1/hero direction:

> 장사하면서\
> 궁금했던 숫자들.

Description:

> 매출, 판매가격, 할인, 직원 고용처럼 사업을 운영하며 자주 마주치는 숫자
> 문제를 로그인 없이 무료로 계산할 수 있습니다.

Tool은 질문형 index로 노출한다.

1.  오늘 얼마 팔아야 하지?
2.  얼마에 팔아야 하지?
3.  가격 올려도 될까?
4.  할인해도 될까?
5.  한 명 더 써도 될까?

홈 하단 정적 설명: - 사장도구는 무엇인가요? - 어떤 계산을 할 수
있나요? - 계산 결과는 어떻게 만들어지나요? - 입력한 숫자는 저장되나요?

## 15. Site Pages v0.01

-   `/`
-   `/tools/daily-sales-target/`
-   `/tools/selling-price/`
-   `/tools/price-change/`
-   `/tools/discount-profit/`
-   `/tools/hiring-profit/`
-   `/about/`
-   `/privacy/`
-   `/contact/`

Category hub는 충분한 독립 가치가 생길 때만 추가한다.

## 16. Local Preferences

저장 후보: - variableRate - operatingDays - percentageFee -
averageOrderValue

v0.01 기본 정책: 자동 저장하지 않는다. 사용자가 명시적으로 "이 값을 이
브라우저에 기억하기"를 선택한 경우만 저장한다.

필수: `저장된 값 삭제`

## 17. Privacy / Analytics

-   계산 입력값 서버 저장 없음
-   회원가입 없음
-   계산 history 서버 저장 없음
-   선택한 값만 localStorage
-   Analytics 활성화 시 실제 사업 숫자는 전송하지 않음

v0.01 최소 analytics: - tool_view - tool_calculate - related_tool_click

AdSense 활성화 시 실제 광고/쿠키/동의 구조에 맞춰 Privacy 문서를
갱신한다.

## 18. Search / Content Strategy

한 Tool URL 안에 calculator와 설명을 함께 둔다. 같은 검색 의도의
calculator/guide를 얇은 두 URL로 분리하지 않는다.

페이지는 다음 질문에 답해야 한다.

1.  무엇을 계산하는가?
2.  답은 무엇을 의미하는가?
3.  어떤 공식을 사용하는가?
4.  무엇을 입력해야 하는가?
5.  예시는?
6.  어떤 가정/한계가 있는가?
7.  다음에 무엇을 계산할 수 있는가?

## 19. Search Console Growth Loop

``` text
Search query
→ Existing Tool covers intent?
  → YES: improve page/example/content
  → NO: candidate for new Tool
→ validate repeated demand
→ add Tool only when justified
```

v0.02 후보는 기록만 하고 개발하지 않는다: - 원가변경 - 무료배송 - 1+1 /
2+1 - 월세 감당 - 배달 손익 - 플랫폼 판매 - 광고 ROAS - 영업시간

## 20. Publish Gate

-   calculator unit tests pass
-   edge cases pass
-   verified static example matches calculator
-   static answer exists
-   one H1
-   title/description/canonical
-   valid structured data
-   limitations
-   related decision links
-   responsive QA
-   accessibility QA
-   core information readable without JS
-   no actual input values sent to Analytics

v0.01은 5개 Tool의 정확성과 검색 가능한 문서 품질을 우선한다.
