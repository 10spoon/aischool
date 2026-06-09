너는 OpenAI Codex에서 실행 중인 코딩 에이전트다.

# 03. Aischool Open Graph 및 Twitter Card 생성 프롬프트

## 목표

공개 GitHub 레포 `10spoon/aischool`을 가져와서 Aischool 서비스의 Open Graph와 Twitter Card 정보를 생성하고 적용하라. 카카오톡, Facebook, LinkedIn, X 같은 플랫폼에 공유했을 때 제목, 설명, 이미지가 서비스답게 표시되어야 한다.

강의자료 기준으로 Open Graph는 공유 클릭률과 체류 시간에 간접 영향을 주는 SEO 보조 신호다.

## 작업 순서

1. 새 작업 폴더에서 레포를 가져온다.

   ```bash
   gh repo clone 10spoon/aischool
   cd aischool
   npm install
   ```

2. 현재 metadata와 이미지 자산을 확인한다.

   ```bash
   rg -n "metadata|openGraph|twitter|metadataBase|generateMetadata" src
   rg --files public src/app | rg "og|open-graph|twitter|images"
   ```

3. 공통 Open Graph 기본값을 추가한다.
   - `metadataBase`: `https://aischool-zeta-ten.vercel.app`
   - `siteName`: `Aischool`
   - `locale`: `ko_KR`
   - `type`: `website`
   - 기본 title과 description은 AI 강의 탐색/학습 서비스로 자연스럽게 작성한다.

4. 공유 이미지를 준비한다.
   - 기존 hero 이미지를 활용하거나 별도 OG 이미지를 만든다.
   - 권장 크기: 1200x630.
   - 이미지에는 작은 화면에서 깨지는 문구를 넣지 않는다.
   - 저장 경로 예: `public/images/og/aischool-og.png`

5. 페이지별 OG 정보를 설정한다.
   - `/`: 서비스 기본 OG
   - `/courses`: 강의 목록 OG
   - `/courses/[slug]`: `generateMetadata`로 강의명, subtitle, 강의 이미지 또는 공통 OG 이미지를 사용한다.
   - `/learn/[slug]`: 학습 화면 공유 시 과도한 노출보다 강의명 중심으로 표시한다.

6. Twitter Card를 추가한다.
   - `card`: `summary_large_image`
   - title, description, images가 Open Graph와 일관되게 보이도록 한다.

## 수정 대상

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/courses/page.tsx`
- `src/app/courses/[slug]/page.tsx`
- `src/app/learn/[slug]/page.tsx`
- `public/images/og/`
- 필요할 경우 `src/lib/courses.ts`

## 금지사항

- 공유 이미지에 실습/가짜/데모 목적을 쓰지 않는다.
- Apple, OpenAI, SNS 플랫폼 로고를 이미지 안에 넣지 않는다.
- favicon 생성 작업은 이 프롬프트에서 처리하지 않는다.
- SEO robots/sitemap만 수정하는 작업과 섞지 않는다. 필요한 metadata 범위만 변경한다.

## 검증 명령

```bash
npm run typecheck
npm run build
npm audit --omit=dev
```

빌드 결과와 배포 URL에서 OG 태그를 확인한다.

```bash
rg -n "property=\"og:|name=\"twitter:|metadataBase|openGraph|twitter" src .next/server/app --glob "*.tsx" --glob "*.html"
```

가능하면 로컬 서버 또는 배포 URL에서 다음 페이지의 HTML head를 확인한다.

- `/`
- `/courses`
- `/courses/prompt-engineering`

## 최종 보고 형식

아래 항목만 간결하게 보고하라.

- 추가한 OG/Twitter 항목
- 사용한 공유 이미지 경로
- 동적 강의 상세 metadata 처리 방식
- 검증 명령 결과
- 확인한 URL
