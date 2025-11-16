# Character Chat Client

AI 캐릭터와 대화할 수 있는 React Native 앱입니다.

## 기술 스택

- **Framework**: React Native + Expo
- **언어**: TypeScript
- **상태 관리**: Zustand
- **API 통신**: Axios + React Query
- **라우팅**: Expo Router
- **스타일링**: React Native StyleSheet

## 프로젝트 구조

```
src/
├── pages/              # 페이지 컴포넌트
│   └── ChatScreen.tsx
├── components/         # 재사용 가능한 컴포넌트
│   ├── chat/          # 채팅 관련 컴포넌트
│   ├── character/     # 캐릭터 관련 컴포넌트
│   └── common/        # 공통 컴포넌트
├── services/          # API 서비스 레이어
│   └── api/
├── stores/            # Zustand 상태 관리
├── types/             # TypeScript 타입 정의
├── hooks/             # 커스텀 훅
└── utils/             # 유틸리티 함수
```

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm start
```

### 플랫폼별 실행

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 주요 기능

- ✅ 캐릭터별 채팅
- ✅ 캐릭터 전환
- ✅ 다크 모드 지원
- ✅ 실시간 메시지 전송
- 🚧 API 서버 연동 (예정)

## 개발 환경

- Node.js >= 20.19.4
- npm 또는 pnpm
