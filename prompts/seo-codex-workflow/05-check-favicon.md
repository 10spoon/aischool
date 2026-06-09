너는 OpenAI Codex에서 실행 중인 코딩 에이전트다.

# 05. Favicon 적용 검증 프롬프트

## 목표

공개 GitHub 레포 `10spoon/aischool`의 favicon 적용 상태를 감사하라. 이 프롬프트는 검증 전용이다. 소스 코드를 수정하지 말고 발견 사항과 통과/실패 여부만 보고한다.

강의자료 기준으로 favicon은 브라우저 탭, 북마크, 검색 결과에서 브랜드 인식과 신뢰 신호를 높이는 요소다.

## 작업 순서

1. 새 작업 폴더에서 레포를 가져온다.

   ```bash
   gh repo clone 10spoon/aischool
   cd aischool
   npm install
   ```

2. favicon 관련 파일을 확인한다.

   ```bash
   rg --files src/app public | rg "favicon|icon|apple|manifest|brand"
   rg -n "favicon|icon|apple-touch-icon|icons|manifest" src public
   ```

3. 이미지 파일 속성을 확인한다.
   - 원본 아이콘이 프로젝트 안에 저장되어 있는지
   - `src/app/icon.png` 또는 Next.js가 인식하는 icon 파일이 있는지
   - `src/app/apple-icon.png` 또는 Apple touch icon 대응 파일이 있는지
   - `public/favicon.ico`가 있다면 정상 크기와 용량인지
   - 이미지가 텍스트 없이 작은 크기에서도 식별 가능한지

4. 빌드한다.

   ```bash
   npm run typecheck
   npm run build
   npm audit --omit=dev
   ```

5. HTML과 브라우저에서 적용 여부를 확인한다.
   - 빌드된 HTML에 icon link가 생성되는지
   - 브라우저 탭에서 기본 Next 아이콘이 아닌 Aischool 아이콘이 보이는지
   - 북마크/홈 화면용 아이콘 파일이 누락되지 않았는지

## 수정 대상

없음. 이 프롬프트에서는 소스 파일을 수정하지 않는다.

## 금지사항

- 어떤 파일도 편집하지 않는다.
- favicon을 새로 만들거나 이미지 변환을 실행하지 않는다.
- 기본 아이콘이 남아 있어도 자동으로 삭제하지 않는다.
- SEO metadata나 Open Graph 문제를 고치지 않는다.

## 검증 명령

```bash
npm run typecheck
npm run build
npm audit --omit=dev
rg --files src/app public | rg "favicon|icon|apple|brand"
rg -n "rel=\"icon\"|apple-touch-icon|favicon|icon.png|apple-icon" .next/server/app --glob "*.html"
```

가능하면 브라우저로 다음을 확인한다.

- `http://localhost:3000/`
- `https://aischool-zeta-ten.vercel.app/`

## 최종 보고 형식

아래 형식으로 보고하라.

- 결론: 통과 / 부분 통과 / 실패
- 발견한 favicon 파일 목록
- 브라우저 탭 확인 결과
- 기본 Next 아이콘 잔존 여부
- 문제별 파일 또는 URL 근거
- 학생이 다음에 수정해야 할 우선순위
