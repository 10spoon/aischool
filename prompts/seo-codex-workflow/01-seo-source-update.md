너는 OpenAI Codex에서 실행 중인 코딩 에이전트다.

# 01. Aischool 온페이지 SEO 소스 수정 프롬프트

## 목표

공개 GitHub 레포 `10spoon/aischool`을 가져와서 Next.js App Router 기반 Aischool 서비스에 기본 SEO를 적용하라. 강의자료의 SEO 기본기인 크롤링, 인덱싱, 랭킹, 온페이지 SEO, 내부 링크 구조를 반영한다.

사용자가 보는 서비스 화면에는 "가짜", "실습용", "SEO 적용 실습용", "진짜 서비스가 아니다" 같은 문구를 절대 추가하지 않는다.

## 작업 순서

1. 새 작업 폴더에서 레포를 가져온다.

   ```bash
   gh repo clone 10spoon/aischool
   cd aischool
   npm install
   ```

2. 현재 구조를 먼저 확인한다.

   ```bash
   rg --files -g '!node_modules/**' -g '!.next/**'
   rg -n "metadata|title|description|openGraph|twitter|canonical|robots|sitemap|generateMetadata" src
   ```

3. `src/app/layout.tsx`에 사이트 공통 metadata를 추가한다.
   - `metadataBase`는 `https://aischool-zeta-ten.vercel.app`을 기본값으로 사용한다.
   - `title`은 서비스명과 페이지명을 함께 표현하도록 template/default를 구성한다.
   - `description`은 AI 강의 탐색과 학습 서비스임을 자연스럽게 설명한다.
   - `alternates.canonical`을 루트 기준으로 설정한다.

4. 주요 페이지별 metadata를 추가한다.
   - `/`: Aischool 홈
   - `/courses`: AI 강의 목록
   - `/courses/[slug]`: 강의 상세. `generateMetadata`를 사용해 강의명, subtitle, canonical URL을 동적으로 생성한다.
   - `/learn/[slug]`: 학습 화면. 검색 노출보다 학습 진입용 페이지 성격을 고려해 과도한 키워드 반복은 피한다.

5. 크롤링과 인덱싱 기본 파일을 추가한다.
   - `src/app/robots.ts`
   - `src/app/sitemap.ts`
   - sitemap에는 `/`, `/courses`, 모든 `/courses/[slug]`, 모든 `/learn/[slug]`를 포함한다.
   - robots는 기본적으로 모든 검색엔진 접근을 허용하고 sitemap URL을 제공한다.

6. Heading과 내부 링크 구조를 점검한다.
   - 각 페이지의 `h1`은 페이지당 1개가 되도록 유지한다.
   - 관련 강의/목록/학습 링크가 자연스럽게 연결되어 있는지 확인한다.
   - UI 디자인은 기존 Apple 스타일 톤을 유지하고 불필요한 문구를 늘리지 않는다.

## 수정 대상

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/courses/page.tsx`
- `src/app/courses/[slug]/page.tsx`
- `src/app/learn/[slug]/page.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- 필요할 경우 `src/lib/courses.ts`

## 금지사항

- 서비스 화면에 실습/가짜/데모 목적을 노출하지 않는다.
- SEO 키워드를 과도하게 반복하지 않는다.
- 기존 강의 데이터, 이미지 경로, 라우트 구조를 깨지 않는다.
- DB, 외부 CMS, 별도 서버 API를 추가하지 않는다.
- favicon과 Open Graph 전용 작업은 이 프롬프트에서 처리하지 않는다.

## 검증 명령

```bash
npm run typecheck
npm run build
npm audit --omit=dev
```

빌드 후 HTML과 route output을 확인한다.

```bash
rg -n "<title|name=\"description\"|rel=\"canonical\"|robots|sitemap" .next/server/app --glob "*.html"
rg -n "SEO 적용 실습용|진짜 서비스|가짜|실습용" src public
```

로컬 서버 또는 배포 URL에서 `/`, `/courses`, `/courses/ai-foundations`의 head 정보를 확인한다.

## 최종 보고 형식

아래 항목만 간결하게 보고하라.

- 변경한 SEO 항목
- 추가/수정한 주요 파일
- 검증 명령 결과
- 확인한 URL
- 남은 리스크 또는 후속 작업
