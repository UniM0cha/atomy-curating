# CLAUDE.md - 프로젝트 컨텍스트

## 프로젝트 개요

애터미 큐레이팅 - 마트체인지 캐쉬백 계산 앱

**핵심 컨셉**: 일반 제품을 애터미 제품으로 대체했을 때 예상 캐쉬백을 계산

## 기술 스택

- **프레임워크**: React Native + Expo (Expo Router 사용)
- **상태관리**: Zustand
- **스타일링**: StyleSheet (Tailwind 사용 안함)
- **로컬 저장**: AsyncStorage
- **플랫폼**: Android 우선 (iOS 추후 대응)

## 아키텍처 특징

- **서버 없음**: 완전 오프라인 앱
- **로그인 없음**: 인증 불필요
- **데이터 업데이트**: 제품 가격/PV는 앱 업데이트 시 갱신 (JSON 내장)

## 핵심 비즈니스 로직

### 캐쉬백 계산 공식

```typescript
const calculateCashback = (annualPV: number) => {
  const PV_PER_CASHBACK = 300000; // 30만 PV
  const CASHBACK_AMOUNT = 60000;  // 6만원

  const cashbackCount = Math.floor(annualPV / PV_PER_CASHBACK);
  const totalCashback = cashbackCount * CASHBACK_AMOUNT;

  return { cashbackCount, totalCashback };
};
```

### 연간 계산

```typescript
const calculateAnnual = (selectedProducts: Product[]) => {
  const annualPrice = selectedProducts.reduce(
    (sum, p) => sum + (p.price * p.monthlyUsage * 12), 0
  );
  const annualPV = selectedProducts.reduce(
    (sum, p) => sum + (p.pv * p.monthlyUsage * 12), 0
  );
  return { annualPrice, annualPV };
};
```

## 앱 플로우

```
index.tsx (온보딩)
    ↓
survey/family.tsx (가족 수 선택)
    ↓
survey/age.tsx (연령대 선택)
    ↓
survey/experience.tsx (애터미 경험)
    ↓
select/index.tsx (제품 카테고리 선택)
    ↓
result/index.tsx (결과 화면)
```

## 데이터 구조

### products.json

```json
{
  "categories": [
    {
      "id": "living",
      "name": "리빙/생활용품",
      "items": [
        {
          "id": "living_tissue",
          "name": "화장지,휴지",
          "price": 15000,
          "pv": 10000,
          "monthlyUsage": 1
        }
      ]
    }
  ],
  "config": {
    "pvPerCashback": 300000,
    "cashbackAmount": 60000
  }
}
```

### Zustand Store 구조

```typescript
interface StoreState {
  // 설문 데이터
  survey: {
    familySize: number | null;
    ageGroup: string | null;
    hasAtomyExperience: boolean | null;
  };

  // 선택된 제품 ID 목록
  selectedProductIds: string[];

  // Actions
  setSurvey: (key: string, value: any) => void;
  toggleProduct: (productId: string) => void;
  selectAllInCategory: (categoryId: string) => void;
  clearAllInCategory: (categoryId: string) => void;
  reset: () => void;
}
```

## 디자인 시스템

### 색상

```typescript
const colors = {
  primary: '#5BC0DE',      // 하늘색 (메인)
  background: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  button: '#00B4D8',       // 시작하기 버튼
  border: '#E5E5E5',
  card: '#F5F5F5',
};
```

### 컴포넌트 스타일 패턴

```typescript
// 카드 스타일
cardStyle: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 16,
  marginVertical: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
}

// 하단 고정 버튼
bottomButton: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#00B4D8',
  padding: 16,
  alignItems: 'center',
}
```

## 개발 규칙

### 의사소통 정책

| 컨텍스트 | 언어 | 예시 |
|---------|------|------|
| 사용자 응답 | 한글 | "완료했습니다" |
| 커밋 메시지 | 한글 | `feature: 온보딩 화면 구현` |
| 코드 주석 | 한글 | `// 캐쉬백 계산` |
| 문서 | 한글 | CLAUDE.md, README.md |

### 커밋 가이드라인

**형식**: `<type>: <한글 메시지>`

| Type | 용도 |
|------|------|
| `feature:` | 새로운 기능 구현 |
| `fix:` | 버그 수정 |
| `refactor:` | 코드 리팩토링 |
| `docs:` | 문서 업데이트 |
| `chore:` | 빌드, 의존성, 설정 |

### 코드 스타일 규칙

| ❌ 금지 | ✅ 필수 |
|--------|--------|
| `React.FC` 패턴 | 함수 선언문 |
| ESLint 무시 | 모든 경고 수정 |
| `any` 타입 | 명시적 타입 |
| `index.ts` 배럴 파일 | 직접 파일 import |
| 영문 주석 | 한글 주석 |

### 기본 규칙

1. **한국어 UI**: 모든 텍스트는 한국어로 작성
2. **TypeScript 사용**: 타입 안전성 보장
3. **컴포넌트 분리**: 재사용 가능한 컴포넌트는 `components/`에 분리
4. **상수 분리**: 설정값은 `constants/` 또는 JSON에서 관리
5. **숫자 포맷**: 금액은 천단위 콤마 (toLocaleString)

## 파일 생성 시 참고

### 새 화면 추가

```typescript
// app/새화면/index.tsx
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function NewScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 내용 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
```

### 새 컴포넌트 추가

```typescript
// components/NewComponent.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  // props 정의
}

export function NewComponent({ ...props }: Props) {
  return (
    <View style={styles.container}>
      {/* 내용 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
```

## 주의사항

- **PV 값**: 제품별 PV는 추후 실제 데이터로 교체 필요
- **가격 데이터**: 더미 데이터로 시작, 나중에 실제 값으로 업데이트
- **캐쉬백 공식**: 30만 PV = 6만원 (공식 앱 기준, 변경 시 config 수정)

---

## 개발 워크플로우

### 검증 워크플로우

```
코드 작성
    ↓
npm run lint        (린팅 검사)
    ↓
npm run type-check  (타입 검사)
    ↓
npm run build       (빌드 확인)
    ↓
커밋
```

### Code Reviewer 워크플로우

**트리거 조건**: 코드 파일 수정 후 커밋 전

**워크플로우**:
```
코드 작성/수정
    ↓
lint + type-check 통과
    ↓
code-reviewer 리뷰 실행   ← 필수 단계
    ↓
리뷰 결과 검토 및 수정
    ↓
커밋
```

**리뷰 요청 방법**:
```
Plan 파일: ~/.claude/plans/current-plan.md
변경 범위: [어떤 기능/파일을 수정했는지]

위 plan에 따른 코드 변경사항을 리뷰해주세요.
```

**리뷰 결과 보고 형식**:
```markdown
## 리뷰 결과 상세

| 항목 | 개수 |
|------|------|
| Critical | 0개 |
| Warning | 0개 |
| Suggestion | N개 |

### [항목별 상세 내용]
**파일**: 파일경로:라인번호
**내용**: 구체적인 내용
**평가**: 적용 필요 여부

---
커밋 진행 가능 여부 판단
```

**심각도 기준**:
| 레벨 | 의미 | 조치 |
|------|------|------|
| Critical | 반드시 수정 필요 | 수정 후 재리뷰 |
| Warning | 수정 권장 | 검토 후 결정 |
| Suggestion | 개선 제안 | 선택적 적용 |

### Git 안전 프로토콜

**명시적 승인 없이 금지**:
- `rm` (파일 삭제)
- `git restore` (변경 취소)
- `git reset --hard` (하드 리셋)
- `git push --force` (강제 푸시)

---

## CLAUDE.md 유지보수 정책

이 문서는 프로젝트의 살아있는 문서입니다. 개발 과정에서 깨달은 교훈, 결정사항, 패턴 등을 지속적으로 업데이트합니다.

### 업데이트 시점

- 새로운 패턴/규칙 발견 시
- 버그 원인 파악 후 예방책 정리 시
- 라이브러리 사용법 정리 필요 시
- 프로젝트 구조 변경 시

### 기록 형식

교훈은 아래 섹션에 날짜와 함께 기록합니다.

---

## 개발 교훈 (Lessons Learned)

### 2026-01-01

**Expo 프로젝트 초기화 시 기존 파일 보존**
- `create-expo-app`은 디렉토리를 완전히 덮어쓰므로, 기존 파일(README.md, CLAUDE.md, .git 등)을 미리 백업 후 복원해야 함
- 백업 → 생성 → 복원 순서로 진행

**Expo default 템플릿 구조**
- default 템플릿은 `(tabs)` 폴더 기반 탭 네비게이션으로 생성됨
- Stack 네비게이션으로 변경 시 `(tabs)` 폴더와 modal.tsx 삭제 필요
- 기본 생성되는 components, hooks, constants 폴더는 활용 가능

**Context7 MCP 활용**
- 최신 라이브러리 API는 Context7를 통해 공식 문서 조회 가능
- `resolve-library-id` → `query-docs` 순서로 사용
- Zustand persist, Expo Router 등 최신 사용법 확인에 유용
