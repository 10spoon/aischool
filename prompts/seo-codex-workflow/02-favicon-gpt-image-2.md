너는 OpenAI Codex에서 실행 중인 코딩 에이전트다.

# 02. Aischool Favicon 생성 및 적용 프롬프트

## 목표

공개 GitHub 레포 `10spoon/aischool`을 가져와서 Aischool 브랜드용 favicon을 제작하고 Next.js App Router 프로젝트에 적용하라. favicon은 GPT Image 2를 사용해 생성한다.

강의자료 기준으로 favicon은 브라우저 탭, 북마크, 검색 결과에서 브랜드 인식과 신뢰 신호를 높이는 요소다.

## 작업 순서

1. 새 작업 폴더에서 레포를 가져온다.

   ```bash
   gh repo clone 10spoon/aischool
   cd aischool
   npm install
   ```

2. 현재 아이콘 상태를 확인한다.

   ```bash
   rg --files public src/app | rg "favicon|icon|apple|manifest"
   rg -n "icons|apple|favicon|manifest" src public
   ```

3. GPT Image 2로 1024x1024 원본 favicon 이미지를 생성한다.
   - OpenAI Codex의 image generation 기능을 사용한다.
   - 모델 지정이 가능한 환경이면 `gpt-image-2`를 사용한다.
   - 생성 프롬프트는 아래 방향을 따른다.

   ```text
   Use case: logo-brand
   Asset type: favicon source image for Aischool
   Primary request: a premium minimal symbol for an AI course learning service, no text
   Subject: abstract spark and learning path mark inside a simple circular form
   Style/medium: clean vector-like raster icon, high contrast, Apple-like restraint without copying Apple
   Composition/framing: centered 1:1 icon, generous padding, readable at 16x16
   Color palette: black, white, electric blue accent
   Constraints: no letters, no words, no logo imitation, no watermark, no complex details, no gradients that disappear at small sizes
   ```

4. 생성된 원본을 프로젝트에 보존한다.
   - 예: `public/images/brand/aischool-favicon-source.png`
   - Codex 기본 생성 폴더에만 두지 말고 반드시 프로젝트 안으로 복사한다.

5. favicon 세트를 만든다.
   - `src/app/icon.png` 또는 Next.js가 인식하는 `app/icon.*` 경로에 512x512 이상 아이콘을 둔다.
   - `src/app/apple-icon.png`를 180x180으로 추가한다.
   - 필요하면 `public/favicon.ico`도 생성한다.
   - 이미지 변환은 사용 가능한 도구를 확인해 `sharp`, ImageMagick, PowerShell, Node 스크립트 중 가장 안정적인 방법을 선택한다.

6. metadata 아이콘 설정을 확인한다.
   - App Router의 파일 기반 icon 규칙만으로 충분하면 별도 metadata를 추가하지 않아도 된다.
   - metadata를 추가할 경우 `src/app/layout.tsx`의 `icons` 설정과 실제 파일 경로가 일치해야 한다.

## 수정 대상

- `public/images/brand/`
- `src/app/icon.png`
- `src/app/apple-icon.png`
- 필요할 경우 `public/favicon.ico`
- 필요할 경우 `src/app/layout.tsx`

## 금지사항

- 텍스트, 이니셜, 워터마크를 favicon 이미지에 넣지 않는다.
- Apple, OpenAI, 학교, 기업 로고를 모방하지 않는다.
- 기존 강의 썸네일 이미지를 favicon으로 단순 축소하지 않는다.
- SEO metadata나 Open Graph 정보는 이 프롬프트에서 수정하지 않는다.

## 검증 명령

```bash
npm run typecheck
npm run build
npm audit --omit=dev
```

파일과 HTML을 확인한다.

```bash
rg --files src/app public | rg "favicon|icon|apple|brand"
rg -n "rel=\"icon\"|apple-touch-icon|favicon|icon.png|apple-icon" .next/server/app --glob "*.html"
```

브라우저로 로컬 앱을 열어 탭 아이콘이 기본 Next 아이콘이 아닌지 확인한다.

## 최종 보고 형식

아래 항목만 간결하게 보고하라.

- 생성한 favicon 원본과 파생 파일 경로
- 사용한 이미지 생성 방식과 모델
- 적용한 Next.js 아이콘 방식
- 검증 명령 결과
- 브라우저 확인 결과
