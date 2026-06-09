import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock, Star, Users } from "lucide-react";
import { courses, getAllLessons, getCourse } from "@/lib/courses";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const lessons = getAllLessons(course);

  return (
    <main>
      <section className="detail-hero">
        <div className="detail-copy">
          <p className="eyebrow">{course.category}</p>
          <h1>{course.title}</h1>
          <p>{course.subtitle}</p>
          <div className="detail-meta">
            <span>
              <Star size={16} aria-hidden="true" />
              {course.rating}
            </span>
            <span>
              <Users size={16} aria-hidden="true" />
              {course.students}
            </span>
            <span>
              <Clock size={16} aria-hidden="true" />
              {course.duration}
            </span>
          </div>
          <div className="hero-actions">
            <Link href={`/learn/${course.slug}`} className="primary-button">
              학습 시작
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/courses" className="secondary-button">
              다른 강의 보기
            </Link>
          </div>
        </div>
        <div className="detail-visual">
          <Image
            src={course.image}
            alt={`${course.title} 강의 대표 이미지`}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        </div>
      </section>

      <section className="detail-content">
        <div className="outcomes">
          <p className="eyebrow">Outcomes</p>
          <h2>수강 후 할 수 있는 것</h2>
          <ul>
            {course.outcomes.map((item) => (
              <li key={item}>
                <CheckCircle2 size={18} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="curriculum">
          <div className="section-heading tight">
            <div>
              <p className="eyebrow">Curriculum</p>
              <h2>{lessons.length}개 레슨 구성</h2>
            </div>
          </div>
          {course.modules.map((module) => (
            <article className="module-block" key={module.title}>
              <div>
                <h3>{module.title}</h3>
                <p>{module.summary}</p>
              </div>
              <ol>
                {module.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <span>{lesson.title}</span>
                    <small>{lesson.duration}</small>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
