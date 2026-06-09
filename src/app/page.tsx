import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MonitorPlay, Sparkles, WandSparkles } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/lib/courses";

export default function HomePage() {
  const featured = courses.filter((course) => ["Popular", "Build", "RAG"].includes(course.badge));
  const paths = [
    { icon: Sparkles, title: "기초부터", text: "AI가 뭔지, 프롬프트는 어떻게 쓰는지 짧은 강의로 차근차근 익힙니다." },
    { icon: WandSparkles, title: "업무에 바로", text: "매일 하는 업무에 AI를 끼워 넣어 실제로 어떻게 쓸 수 있는지 해봅니다." },
    { icon: MonitorPlay, title: "제품처럼", text: "챗봇이나 검색 봇을 직접 만들면서 AI 제품 설계를 경험합니다." }
  ];

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">AI Course Studio</p>
          <h1>AI 학습을 더 선명하게.</h1>
          <p>
            기초 개념부터 제품형 AI 앱까지, 지금 필요한 강의를 고르고 바로 이어서 학습하세요.
          </p>
          <div className="hero-actions">
            <Link href="/courses" className="primary-button">
              강의 둘러보기
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/learn/ai-foundations" className="secondary-button">
              바로 학습하기
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/images/hero/ai-learning-hero.png"
            alt="AI 학습 경험을 표현한 프리미엄 비주얼"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 64vw"
          />
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <p className="eyebrow">Featured</p>
          <h2>가장 많이 이어 보는 강의</h2>
          <Link href="/courses">
            전체 보기
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="featured-grid">
          {featured.map((course) => (
            <CourseCard key={course.slug} course={course} compact />
          ))}
        </div>
      </section>

      <section className="path-section" aria-labelledby="path-heading">
        <div className="section-heading">
          <p className="eyebrow">Learning Paths</p>
          <h2 id="path-heading">오늘의 목표에 맞춰 시작하세요.</h2>
        </div>
        <div className="path-grid">
          {paths.map(({ icon: Icon, title, text }) => (
            <article className="path-item" key={title}>
              <Icon size={24} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
