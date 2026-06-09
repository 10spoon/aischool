export type Lesson = {
  id: string;
  title: string;
  duration: string;
  focus: string;
};

export type Module = {
  title: string;
  summary: string;
  lessons: Lesson[];
};

export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  instructor: string;
  role: string;
  category: string;
  difficulty: "입문" | "초급" | "중급" | "실전";
  duration: string;
  rating: number;
  students: string;
  badge: string;
  image: string;
  accent: string;
  outcomes: string[];
  modules: Module[];
};

const sharedModules = {
  fundamentals: [
    {
      title: "개념 정리",
      summary: "핵심 용어와 작동 방식을 부담 없이 훑습니다.",
      lessons: [
        { id: "intro", title: "강의 방향과 결과물", duration: "08:12", focus: "목표 설정" },
        { id: "map", title: "AI 서비스 구조 한눈에 보기", duration: "13:44", focus: "구조 이해" },
        { id: "practice", title: "작은 예제로 감 잡기", duration: "16:20", focus: "체험" }
      ]
    },
    {
      title: "적용 연습",
      summary: "업무와 제품 화면에서 바로 쓰는 관점으로 연결합니다.",
      lessons: [
        { id: "workflow", title: "좋은 입력과 좋은 결과", duration: "12:05", focus: "판단 기준" },
        { id: "review", title: "결과 검토 루틴 만들기", duration: "10:18", focus: "품질 관리" }
      ]
    }
  ],
  build: [
    {
      title: "설계",
      summary: "문제 정의부터 사용 흐름까지 작게 설계합니다.",
      lessons: [
        { id: "problem", title: "사용자 문제 정의", duration: "11:32", focus: "기획" },
        { id: "flow", title: "데이터와 화면 흐름", duration: "15:10", focus: "설계" },
        { id: "guardrails", title: "실패 상태와 제한 조건", duration: "09:46", focus: "안전장치" }
      ]
    },
    {
      title: "제작",
      summary: "동작하는 데모를 만들고 개선점을 찾습니다.",
      lessons: [
        { id: "prototype", title: "첫 번째 프로토타입", duration: "18:33", focus: "제작" },
        { id: "iterate", title: "평가와 반복 개선", duration: "14:28", focus: "개선" }
      ]
    }
  ]
};

export const courses: Course[] = [
  {
    slug: "ai-foundations",
    title: "AI 기초 마스터 클래스",
    subtitle: "개념, 모델, 데이터 흐름을 한 번에 연결하는 입문 코스",
    instructor: "한서윤",
    role: "AI Education Lead",
    category: "기초",
    difficulty: "입문",
    duration: "4시간 20분",
    rating: 4.9,
    students: "18.2k",
    badge: "Start",
    image: "/images/courses/ai-foundations.png",
    accent: "#0071e3",
    outcomes: ["AI 용어와 모델 구조 이해", "생성형 AI 결과 평가", "업무 적용 아이디어 정리"],
    modules: sharedModules.fundamentals
  },
  {
    slug: "prompt-engineering",
    title: "프롬프트 엔지니어링 실전",
    subtitle: "명령, 맥락, 예시, 평가 기준을 조합해 결과 품질을 높입니다",
    instructor: "김도현",
    role: "LLM Workflow Designer",
    category: "생성형 AI",
    difficulty: "초급",
    duration: "5시간 10분",
    rating: 4.8,
    students: "24.6k",
    badge: "Popular",
    image: "/images/courses/prompt-engineering.png",
    accent: "#5856d6",
    outcomes: ["목적별 프롬프트 구조화", "반복 개선 루틴 설계", "업무 템플릿 제작"],
    modules: sharedModules.fundamentals
  },
  {
    slug: "generative-image-design",
    title: "AI 이미지 디자인 스튜디오",
    subtitle: "콘셉트, 스타일, 구도 지시로 완성도 높은 비주얼을 만듭니다",
    instructor: "이유진",
    role: "Creative AI Director",
    category: "크리에이티브",
    difficulty: "초급",
    duration: "3시간 45분",
    rating: 4.7,
    students: "11.8k",
    badge: "New",
    image: "/images/courses/generative-image-design.png",
    accent: "#ff7a59",
    outcomes: ["이미지 프롬프트 작성", "무드보드와 썸네일 제작", "결과물 검수 기준 수립"],
    modules: sharedModules.build
  },
  {
    slug: "ai-productivity",
    title: "AI 생산성 워크플로",
    subtitle: "문서, 회의, 리서치, 일정 관리에 AI를 실용적으로 붙입니다",
    instructor: "박민재",
    role: "Productivity Systems Coach",
    category: "업무 활용",
    difficulty: "입문",
    duration: "4시간 05분",
    rating: 4.8,
    students: "20.1k",
    badge: "Daily",
    image: "/images/courses/ai-productivity.png",
    accent: "#30d158",
    outcomes: ["반복 업무 자동화", "회의록과 문서 초안화", "개인 업무 운영체계 설계"],
    modules: sharedModules.fundamentals
  },
  {
    slug: "llm-applications",
    title: "LLM 애플리케이션 빌드",
    subtitle: "챗봇, 요약, 도구 호출을 묶어 제품형 데모를 설계합니다",
    instructor: "정우석",
    role: "AI Application Engineer",
    category: "개발",
    difficulty: "실전",
    duration: "7시간 30분",
    rating: 4.9,
    students: "15.4k",
    badge: "Build",
    image: "/images/courses/llm-applications.png",
    accent: "#0a84ff",
    outcomes: ["LLM 앱 아키텍처 이해", "도구 호출 흐름 설계", "사용자 피드백 기반 개선"],
    modules: sharedModules.build
  },
  {
    slug: "data-analysis-python",
    title: "Python AI 데이터 분석",
    subtitle: "데이터 정리부터 인사이트 도출까지 분석 흐름을 익힙니다",
    instructor: "최나래",
    role: "Data Science Mentor",
    category: "데이터",
    difficulty: "중급",
    duration: "6시간 15분",
    rating: 4.7,
    students: "13.7k",
    badge: "Data",
    image: "/images/courses/data-analysis-python.png",
    accent: "#00a884",
    outcomes: ["데이터 전처리 루틴", "AI 보조 분석 프롬프트", "차트와 리포트 구성"],
    modules: sharedModules.build
  },
  {
    slug: "ai-automation-agents",
    title: "AI 자동화와 에이전트",
    subtitle: "작업 분해, 도구 연결, 검증 루프를 갖춘 자동화 흐름을 만듭니다",
    instructor: "윤태오",
    role: "Automation Architect",
    category: "자동화",
    difficulty: "실전",
    duration: "6시간 55분",
    rating: 4.8,
    students: "9.9k",
    badge: "Agent",
    image: "/images/courses/ai-automation-agents.png",
    accent: "#ff9f0a",
    outcomes: ["에이전트 작업 흐름 설계", "검증과 중단 조건 구성", "자동화 운영 체크리스트"],
    modules: sharedModules.build
  },
  {
    slug: "ai-business-strategy",
    title: "AI 비즈니스 전략",
    subtitle: "시장, 고객, 비용 구조 관점에서 AI 도입 우선순위를 정합니다",
    instructor: "서지후",
    role: "Strategy Consultant",
    category: "비즈니스",
    difficulty: "중급",
    duration: "4시간 50분",
    rating: 4.6,
    students: "8.6k",
    badge: "Strategy",
    image: "/images/courses/ai-business-strategy.png",
    accent: "#bf8f2c",
    outcomes: ["AI 기회 영역 도출", "도입 비용과 리스크 계산", "실행 로드맵 작성"],
    modules: sharedModules.fundamentals
  },
  {
    slug: "computer-vision",
    title: "컴퓨터 비전 입문",
    subtitle: "이미지 분류, 객체 탐지, 비전 모델 활용의 기본기를 다집니다",
    instructor: "강하린",
    role: "Computer Vision Engineer",
    category: "개발",
    difficulty: "중급",
    duration: "5시간 35분",
    rating: 4.7,
    students: "7.4k",
    badge: "Vision",
    image: "/images/courses/computer-vision.png",
    accent: "#af52de",
    outcomes: ["비전 태스크 구분", "데이터셋 품질 판단", "모델 결과 해석"],
    modules: sharedModules.build
  },
  {
    slug: "responsible-ai",
    title: "Responsible AI와 거버넌스",
    subtitle: "AI 결과의 신뢰성, 편향, 보안, 정책 기준을 실무적으로 점검합니다",
    instructor: "문예린",
    role: "AI Governance Advisor",
    category: "거버넌스",
    difficulty: "중급",
    duration: "4시간 40분",
    rating: 4.8,
    students: "6.8k",
    badge: "Trust",
    image: "/images/courses/responsible-ai.png",
    accent: "#64d2ff",
    outcomes: ["AI 리스크 체크리스트", "정책과 가이드라인 설계", "검수 워크플로 구축"],
    modules: sharedModules.fundamentals
  },
  {
    slug: "no-code-ai",
    title: "노코드 AI 툴킷",
    subtitle: "코딩 없이 자동화, 분석, 콘텐츠 제작 도구를 조합합니다",
    instructor: "오세빈",
    role: "No-code Builder",
    category: "업무 활용",
    difficulty: "초급",
    duration: "3시간 25분",
    rating: 4.6,
    students: "10.3k",
    badge: "No-code",
    image: "/images/courses/no-code-ai.png",
    accent: "#ff6b6b",
    outcomes: ["툴 선택 기준 정리", "업무별 자동화 설계", "팀 공유용 템플릿 제작"],
    modules: sharedModules.fundamentals
  },
  {
    slug: "rag-knowledge-bots",
    title: "RAG 지식 챗봇 만들기",
    subtitle: "문서 검색, 답변 생성, 출처 확인을 묶어 신뢰도 높은 봇을 설계합니다",
    instructor: "백지안",
    role: "Knowledge Systems Engineer",
    category: "개발",
    difficulty: "실전",
    duration: "7시간 05분",
    rating: 4.9,
    students: "12.5k",
    badge: "RAG",
    image: "/images/courses/rag-knowledge-bots.png",
    accent: "#00c7be",
    outcomes: ["문서 검색 흐름 설계", "답변 품질 평가", "지식봇 프로토타입 구성"],
    modules: sharedModules.build
  }
];

export const categories = ["전체", ...Array.from(new Set(courses.map((course) => course.category)))];
export const difficulties = ["전체", "입문", "초급", "중급", "실전"] as const;

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getAllLessons(course: Course) {
  return course.modules.flatMap((module) => module.lessons);
}
