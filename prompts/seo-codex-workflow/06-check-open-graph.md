너는 OpenAI Codex에서 실행 중인 코딩 에이전트다.

# 06. Open Graph 적용 검증 프롬프트

## 목표

공개 GitHub 레포 `10spoon/aischool`의 Open Graph와 Twitter Card 적용 상태를 감사하라. 이 프롬프트는 검증 전용이다. 소스 코드를 수정하지 말고 발견 사항과 통과/실패 여부만 보고한다.

강의자료 기준으로 Open Graph는 SNS 공유 시 표시 정보를 정의하며 클릭률과 체류 시간에 간접 영향을 줄 수 있다.

## 작업 순서

1. 새 작업 폴더에서 레포를 가져온다.

   ```bash
   gh repo clone 10spoon/aischool
   cd aischool
   npm install
   ```

2. OG/Twitter 관련 소스를 확인한다.

   ```bash
   rg -n "openGraph|twitter|metadataBase|generateMetadata|og:|twitter:" src
   rg --files public src/app | rg "og|open-graph|twitter|images"
   ```

3. 빌드한다.

   ```bash
   npm run typecheck
   npm run build
   npm audit --omit=dev
   ```

4. 생성 HTML을 점검한다.
   - `og:title`
   - `og:description`
   - `og:image`
   - `og:url`
   - `og:type`
   - `og:site_name`
   - `twitter:card`
   - `twitter:title`
   - `twitter:description`
   - `twitter:image`

5. 상세 페이지 동적 OG를 점검한다.
   - `/courses/ai-foundations`
   - `/courses/prompt-engineering`
   - `/courses/rag-knowledge-bots`
   - 각 상세 페이지가 서로 다른 title/description/url을 갖는지 확인한다.

6. 원격 배포 URL이 있다면 실제 HTML을 확인한다.

   ```bash
   curl -L https://aischool-zeta-ten.vercel.app/
   curl -L https://aischool-zeta-ten.vercel.app/courses
   curl -L https://aischool-zeta-ten.vercel.app/courses/rag-knowledge-bots
   ```

## 수정 대상

없음. 이 프롬프트에서는 소스 파일을 수정하지 않는다.

## 금지사항

- 어떤 파일도 편집하지 않는다.
- OG 이미지 생성, favicon 생성, metadata 수정, deploy를 실행하지 않는다.
- 발견한 문제를 자동으로 고치지 않는다.
- 공유 이미지에 실습/가짜/데모 문구가 있는지 발견하면 보고만 한다.

## 검증 명령

```bash
npm run typecheck
npm run build
npm audit --omit=dev
rg -n "property=\"og:|name=\"twitter:" .next/server/app --glob "*.html"
rg -n "openGraph|twitter|metadataBase|generateMetadata" src
```

가능하면 브라우저 개발자 도구 또는 HTML 응답으로 다음 URL을 확인한다.

- `https://aischool-zeta-ten.vercel.app/`
- `https://aischool-zeta-ten.vercel.app/courses`
- `https://aischool-zeta-ten.vercel.app/courses/prompt-engineering`

## 최종 보고 형식

아래 형식으로 보고하라.

- 결론: 통과 / 부분 통과 / 실패
- 공통 OG/Twitter 통과 항목
- 상세 페이지 동적 OG 통과 항목
- 발견한 문제
- 문제별 파일 또는 URL 근거
- 학생이 다음에 수정해야 할 우선순위
