# Aischool

AI 강의를 둘러보고 학습할 수 있는 DB 없는 Next.js MVP입니다. 교육용 배포와 프론트엔드 실습을 위해 정적 데이터와 생성 이미지 자산만 사용합니다.

## 주요 기능

- 홈, 강의 목록, 강의 상세, 학습 플레이어 라우트
- 12개 AI 강의 정적 데이터
- 검색, 카테고리/난이도 필터
- 브라우저 `localStorage` 기반 레슨 진행률 저장
- Vercel 배포 가능한 Next.js App Router 구성

## 로컬 실행

```bash
npm install
npm run dev
```

프로덕션 빌드 확인:

```bash
npm run typecheck
npm run build
npm audit --omit=dev
```

## 배포

Production URL: https://aischool-zeta-ten.vercel.app

이 프로젝트는 별도 DB나 서버 환경변수를 요구하지 않습니다.
