너는 OpenAI Codex에서 실행 중인 코딩 에이전트다.

# 04. SEO 적용 검증 프롬프트

## 목표

공개 GitHub 레포 `10spoon/aischool`의 SEO 적용 상태를 감사하라. 이 프롬프트는 검증 전용이다. 소스 코드를 수정하지 말고 발견 사항과 통과/실패 여부만 보고한다.

강의자료의 SEO 기본기인 크롤링, 인덱싱, 랭킹, 온페이지 SEO, 내부 링크 구조를 기준으로 점검한다.

## 작업 순서

1. 새 작업 폴더에서 레포를 가져온다.

   ```bash
   gh repo clone 10spoon/aischool
   cd aischool
   npm install
   ```

2. SEO 관련 소스와 라우트를 확인한다.

   ```bash
   rg --files src public | rg "robots|sitemap|layout|page"
   rg -n "metadata|generateMetadata|title|description|alternates|canonical|robots|sitemap" src
   ```

3. 빌드한다.

   ```bash
   npm run typecheck
   npm run build
   npm audit --omit=dev
   ```

4. 생성 HTML과 라우트 결과를 점검한다.
   - `<title>` 존재 여부
   - `meta name="description"` 존재 여부
   - canonical 존재 여부
   - robots/sitemap 제공 여부
   - `/`, `/courses`, `/courses/[slug]`, `/learn/[slug]` 라우트의 metadata 차별화 여부
   - 페이지당 `h1`이 과도하게 중복되지 않는지
   - 내부 링크가 홈, 목록, 상세, 학습 흐름을 연결하는지

5. 검색 의도 관점에서 문구를 평가한다.
   - 헤드 키워드: AI 강의, AI 교육
   - 바디 키워드: AI 강의 추천, 생성형 AI 강의, 프롬프트 엔지니어링 강의
   - 롱테일 키워드: 프롬프트 엔지니어링 실전 강의, RAG 지식 챗봇 만들기 강의
   - 키워드 반복이 자연스러운지 확인한다.

## 수정 대상

없음. 이 프롬프트에서는 소스 파일을 수정하지 않는다.

## 금지사항

- 어떤 파일도 편집하지 않는다.
- format, lint fix, codegen, image generation, deploy를 실행하지 않는다.
- 발견한 문제를 자동으로 고치지 않는다.
- 서비스에 실습/가짜/데모 문구가 있는지 발견하면 보고만 한다.

## 검증 명령

```bash
npm run typecheck
npm run build
npm audit --omit=dev
rg -n "<title|name=\"description\"|rel=\"canonical\"|robots|sitemap" .next/server/app --glob "*.html"
rg -n "SEO 적용 실습용|진짜 서비스|가짜|실습용" src public
```

배포 URL이 있다면 다음도 확인한다.

```bash
curl -L https://aischool-zeta-ten.vercel.app/
curl -L https://aischool-zeta-ten.vercel.app/courses
curl -L https://aischool-zeta-ten.vercel.app/courses/prompt-engineering
```

## 최종 보고 형식

아래 형식으로 보고하라.

- 결론: 통과 / 부분 통과 / 실패
- 통과한 항목
- 발견한 문제
- 문제별 파일 또는 URL 근거
- 학생이 다음에 수정해야 할 우선순위
