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

### 모바일 반응형 디자인 규칙 (중요!)
- **텍스트 크기 균형**: 질문 제목 `text-xl md:text-2xl`, 선택지 `text-sm md:text-base`
- **자연스러운 줄바꿈**: `break-words`, `hyphens-auto`, `whitespace-normal` 사용
- **가독성 우선**: 텍스트 잘림 방지, 완전한 내용 표시를 위한 줄바꿈 허용
- **패딩 최적화**: 모바일 `p-3`, 데스크톱 `md:p-6`
- **컨테이너 안전성**: `overflow-hidden` 제거하여 내용 표시 우선
- **Flex 레이아웃**: `flex-1 min-w-0`로 텍스트 영역 최적화
- **라디오 버튼**: 모바일 `w-4 h-4`, 데스크톱 `md:w-6 md:h-6`

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
- **`ResultScreen`**: 결과 표시 및 공유 기능, 모바일 스크린샷 방식 사진첩 저장
- **`TestScreen`**: 질문 진행 및 답변 수집
- **`WelcomeScreen`**: 초기 화면 및 테스트 시작

### SEO 관련 파일
- **`client/index.html`**: 메타태그, Open Graph, AdSense 코드
- **`client/public/sitemap.xml`**: 모든 성격 유형 URL 포함
- **`client/public/robots.txt`**: 크롤러 접근 설정

## 꼭 해야할것
- 프로젝트 변경사항이 완료되고 git add 전에 claude.md도 업데이트 해주고 git add 하기
- 어떤것을 수정했을때 한글/영문에 영향을 주는거면 한글/영문 번역이 잘 작동하는지 확인하기

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
- **UI 변경 시 모바일 반응형 테스트 필수** (텍스트 오버플로우 체크)
- 번역 수정 시 양쪽 언어 모두 업데이트
- **새 의존성 추가 전 반드시 검토** (현재 최적화된 상태)
- **서버 관련 코드 추가 금지** (정적 배포만 사용)
- **긴 텍스트 콘텐츠 작성 시 모바일 줄바꿈 고려**

### 📋 권장사항 (업데이트됨)
- 새 기능 추가 전 기존 코드 패턴 따르기
- 컴포넌트 분리 시 재사용성 고려
- 성능에 영향을 줄 수 있는 변경 시 사전 검토
- 사용자 데이터나 결과 공유 관련 변경 시 특별한 주의
- **의존성 추가 시 bundle size 고려** (현재 571KB 적정선)
- **불필요한 shadcn/ui 컴포넌트 추가 금지**
- **모바일 우선 개발** (mobile-first responsive design)

## 최근 업데이트 현황 (2025.08.22)

### 🔧 모바일 UI 개선 완료
- **텍스트 크기 균형**: 질문 제목 `text-xl`, 선택지 `text-sm` (모바일)
- **자연스러운 줄바꿈**: `break-words`, `hyphens-auto`, `whitespace-normal`로 가독성 우선
- **완전한 내용 표시**: 텍스트 잘림 방지, 줄바꿈을 통한 전체 텍스트 가독성 확보
- **반응형 패딩**: 모바일 `p-3`, 데스크톱 `md:p-6`
- **최적화된 버튼 크기**: 모바일에서 더 작은 라디오 버튼 (`w-4 h-4`)
- **Flex 레이아웃 개선**: `flex-1 min-w-0`로 텍스트 영역 최적화
- **컨테이너 최적화**: `overflow-hidden` 제거로 내용 우선 표시

### 📱 모바일 사진첩 저장 기능 완전 개선
- **전체 화면 이미지 표시**: 모바일에서 오버레이로 이미지 전체 화면 표시
- **길게 눌러 저장**: 스크린샷처럼 이미지를 길게 눌러 사진첩에 직접 저장
- **사용자 친화적 UI**: 저장 방법 가이드와 닫기 버튼 제공
- **모바일 기기 감지**: User-Agent 기반 모바일/데스크톱 구분
- **완전한 다국어 지원**: 모바일 버튼 텍스트 "사진첩에 저장"/"Save to Photos"
- **데스크톱 호환성**: 데스크톱에서는 기존 파일 다운로드 방식 유지

### 🌐 다국어 지원 확인 완료
- **언어 전환기**: 우상단 Globe 아이콘으로 한/영 전환 가능
- **기본 언어**: 한국어 (ko)
- **폴백 언어**: 영어 (en)
- **번역 완성도**: 
  - 한국어: 332줄 완전 번역
  - 영어: 354줄 완전 번역
  - 32개 성격 유형 모두 양쪽 언어 지원
- **캐릭터명 번역**: 한국어 "에겐/테토" ↔ 영어 "Egen/Teto" 실시간 전환

### 📊 현재 상태
- **번들 크기**: 575.14KB (사진첩 저장 방식 완전 개선)
- **모바일 호환성**: 텍스트 가독성 우선, 스크린샷 방식 사진첩 저장 지원
- **배포 상태**: Cloudflare Pages 정상 배포 중 (다음 커밋 예정)
- **다국어 기능**: 실시간 언어 전환 및 모바일 버튼 완전 번역 지원

## 프로젝트 목표
이 프로젝트는 **무료 MBTI 성격 테스트와 에겐-테토 캐릭터 궁합 분석**을 제공하는 웹 애플리케이션입니다. 사용자 친화적인 UX, 정확한 다국어 지원, SEO 최적화를 통한 높은 접근성을 목표로 합니다.
