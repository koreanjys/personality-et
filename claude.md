# Personality & Egen-Teto Compatibility Test - Claude AI Guidelines

## 기술 스택
- **Frontend Framework**: React 18.3 with TypeScript 5.6
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4 + tailwindcss-animate
- **UI Components**: shadcn/ui (Radix UI primitives) - 최소한만 사용
- **Internationalization**: react-i18next 15.6
- **Routing**: wouter 3.3 (가벼운 라우터)
- **State Management**: React hooks (useState, useEffect)
- **Deployment**: Cloudflare Pages (정적 배포)
- **Domain**: personality-et.jybr.me

## 프로젝트 구조 (정리 완료)
```
personality_et/
├── client/                     # 클라이언트 애플리케이션
│   ├── src/
│   │   ├── components/         # 재사용 가능한 UI 컴포넌트
│   │   │   ├── ui/            # 핵심 UI 컴포넌트만 (6개)
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── progress.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   ├── toaster.tsx
│   │   │   │   └── tooltip.tsx
│   │   │   ├── language-switcher.tsx
│   │   │   ├── loading-screen.tsx
│   │   │   ├── result-screen.tsx
│   │   │   ├── test-screen.tsx
│   │   │   └── welcome-screen.tsx
│   │   ├── hooks/             # 커스텀 React hooks
│   │   ├── lib/               # 핵심 비즈니스 로직
│   │   │   ├── i18n.ts        # 다국어 설정
│   │   │   ├── result-calculator.ts  # 성격 유형 계산 로직
│   │   │   └── test-data.ts   # 테스트 질문 데이터
│   │   ├── locales/           # 다국어 번역 파일
│   │   │   ├── ko.json        # 한국어 번역
│   │   │   └── en.json        # 영어 번역
│   │   ├── pages/             # 페이지 컴포넌트
│   │   └── types/             # 타입 정의 (로컬)
│   │       └── index.ts       # 프로젝트 타입 정의
│   ├── public/                # 정적 파일
│   │   ├── ads.txt           # Google AdSense 설정
│   │   ├── robots.txt        # SEO 크롤러 설정
│   │   ├── sitemap.xml       # 사이트맵
│   │   └── _headers          # Cloudflare Pages 헤더 설정
│   └── index.html            # 메인 HTML (SEO 메타태그 포함)
├── claude.md                  # 프로젝트 가이드라인 (이 파일)
└── 설정 파일들
    ├── package.json          # 의존성 대폭 정리 (282개 패키지 제거)
    ├── tailwind.config.ts    # 불필요한 플러그인 제거
    ├── vite.config.ts
    └── tsconfig.json
```

## 주요 명령어
```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 타입 체킹
npm run type-check

# 린팅 (설정 시)
npm run lint

# Git 커밋 및 배포
git add .
git commit -m "description"
git push  # Cloudflare Pages 자동 배포
```

## 의존성 관리
```bash
# 현재 설치된 핵심 의존성만 (282개 패키지 제거됨)
npm install  # 정리된 의존성 설치

# 새 UI 컴포넌트 추가 시 (필요한 경우만)
npx shadcn-ui@latest add [component-name]
```

## 코드 스타일 및 규칙

### TypeScript/React 규칙
- **Import 스타일**: 구조 분해 할당 우선 사용
  ```typescript
  // Good
  import { useState, useEffect } from 'react'
  import { Button, Card } from '@/components/ui'
  
  // Avoid - 사용하지 않는 컴포넌트 import 금지
  import * as UI from '@/components/ui'
  ```

- **컴포넌트 명명**: PascalCase 사용
- **파일 명명**: kebab-case 사용 (result-screen.tsx)
- **타입 정의**: `@/types` 사용, interface 우선

### Tailwind CSS 규칙 (정리됨)
- **클래스 순서**: layout → spacing → typography → colors → effects
- **반응형**: mobile-first 접근 (md:, lg: 등)
- **플러그인**: tailwindcss-animate만 사용 (typography 제거됨)
- **커스텀 컴포넌트**: 6개 핵심 shadcn/ui 컴포넌트만 사용

### UI 컴포넌트 사용 규칙
**✅ 사용 가능한 컴포넌트 (6개만)**
- `Button`: 모든 버튼 요소
- `Card`: 카드 레이아웃
- `Progress`: 진행 표시
- `Toast`: 알림 메시지
- `Toaster`: Toast 컨테이너
- `Tooltip`: 툴팁

**❌ 제거된 컴포넌트들**
- accordion, alert, avatar, badge, calendar, carousel, chart
- checkbox, dialog, dropdown, form, input, select, table 등 40개+
- 새로 추가하기 전에 반드시 필요성 검토!

### 다국어 처리
- **번역 키**: nested object 구조 사용 (`t('result.title')`)
- **성격 유형 키 형식**: `"MBTI + 캐릭터"` (예: "ENFJ + 테토")
- **번역 파일**: ko.json과 en.json 구조 일치 필수

## 저장소 에티켓

### 브랜치 명명
- `main`: 프로덕션 브랜치
- `feature/description`: 새 기능 개발
- `fix/description`: 버그 수정
- `improve/description`: 기존 기능 개선

### 커밋 메시지 형식
```
Type: Brief description

Examples:
- Add: Google AdSense integration
- Fix: Korean translation display issues
- Update: Personality descriptions for better UX
- Improve: Loading screen animations
- Clean: Remove debugging console logs
```

### 배포 프로세스
- `main` 브랜치에 push 시 Cloudflare Pages 자동 배포
- 중요한 변경사항은 반드시 테스트 후 배포

## 핵심 파일 및 유틸리티

### 필수 파일
- **`src/lib/result-calculator.ts`**: 성격 유형 계산 핵심 로직
- **`src/lib/test-data.ts`**: 10개 질문 데이터 및 점수 매핑
- **`src/lib/i18n.ts`**: 다국어 설정 및 초기화
- **`src/types/index.ts`**: 프로젝트 타입 정의 (로컬)
- **`src/locales/ko.json`**: 한국어 번역 (personalities 객체 포함)
- **`src/locales/en.json`**: 영어 번역 (personalities 객체 포함)

### 중요 컴포넌트
- **`ResultScreen`**: 결과 표시 및 공유 기능
- **`TestScreen`**: 질문 진행 및 답변 수집
- **`WelcomeScreen`**: 초기 화면 및 테스트 시작

### SEO 관련 파일
- **`client/index.html`**: 메타태그, Open Graph, AdSense 코드
- **`client/public/sitemap.xml`**: 모든 성격 유형 URL 포함
- **`client/public/robots.txt`**: 크롤러 접근 설정

## 꼭 해야할것
프로젝트에 수정이 있다면 claude.md도 수정해야하는지 확인하고 수정할 부분이 있으면 수정하기

## "절대 건드리지 마시오" 목록 (업데이트됨)

### 🚨 변경 금지 사항
1. **성격 계산 로직 (`result-calculator.ts`)**
   - 32개 성격 유형 매핑 로직
   - 질문별 점수 계산 알고리즘
   - personalityType 형식 ("MBTI + 캐릭터")

2. **번역 파일 키 구조**
   - `personalities` 객체의 키 형식 절대 변경 금지
   - 기존 번역 키 삭제나 이름 변경 금지
   - ko.json과 en.json 구조 일치 유지 필수

3. **URL 공유 시스템**
   - `handleShareResult` 함수의 URL 생성 로직
   - MBTI-character 형식의 URL 파라미터 구조
   - 기존 공유 링크 호환성 유지

4. **Google AdSense 설정**
   - `client/public/ads.txt` 파일
   - AdSense 스크립트 태그 및 publisher ID
   - SEO 메타태그 구조

5. **Cloudflare Pages 설정**
   - `client/public/_headers` 파일
   - 도메인 설정 및 CNAME 레코드
   - 자동 배포 워크플로우

6. **핵심 UI 컴포넌트** (새로 추가)
   - 현재 6개 UI 컴포넌트 삭제 금지
   - 새 컴포넌트 추가 시 반드시 필요성 검토
   - package.json 의존성 함부로 추가 금지

### ⚠️ 주의사항 (업데이트됨)
- 성격 설명 내용 수정 시 한국어/영어 버전 모두 동기화 필수
- 새로운 질문 추가 시 기존 결과 호환성 고려
- UI 변경 시 모바일 반응형 테스트 필수
- 번역 수정 시 양쪽 언어 모두 업데이트
- **새 의존성 추가 전 반드시 검토** (현재 최적화된 상태)
- **서버 관련 코드 추가 금지** (정적 배포만 사용)

### 📋 권장사항 (업데이트됨)
- 새 기능 추가 전 기존 코드 패턴 따르기
- 컴포넌트 분리 시 재사용성 고려
- 성능에 영향을 줄 수 있는 변경 시 사전 검토
- 사용자 데이터나 결과 공유 관련 변경 시 특별한 주의
- **의존성 추가 시 bundle size 고려** (현재 571KB 적정선)
- **불필요한 shadcn/ui 컴포넌트 추가 금지**

## 프로젝트 최적화 현황 (2025.08.22 업데이트)

### ✅ 완료된 정리 작업
- **282개 패키지 제거**: 불필요한 의존성 대폭 정리
- **40개+ UI 컴포넌트 제거**: 핵심 6개만 유지
- **서버 코드 완전 제거**: 정적 배포에 최적화
- **타입 시스템 로컬화**: shared 폴더 제거, types/index.ts로 통합
- **빌드 성공**: 571KB 최적화된 번들 크기

### 📊 현재 상태
- **번들 크기**: 571KB (적정 수준)
- **의존성**: 필수 최소한만 유지
- **빌드 시간**: ~4초 (최적화됨)
- **타입 체크**: 모든 오류 해결 완료

## 프로젝트 목표
이 프로젝트는 **무료 MBTI 성격 테스트와 에겐-테토 캐릭터 궁합 분석**을 제공하는 웹 애플리케이션입니다. 사용자 친화적인 UX, 정확한 다국어 지원, SEO 최적화를 통한 높은 접근성을 목표로 합니다.
