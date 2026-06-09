import Image from "next/image";
import Link from "next/link";
import { Clock, Star } from "lucide-react";
import type { Course } from "@/lib/courses";

type CourseCardProps = {
  course: Course;
  compact?: boolean;
  progress?: number;
};

export function CourseCard({ course, compact = false, progress }: CourseCardProps) {
  return (
    <article className={`course-card ${compact ? "course-card-compact" : ""}`}>
      <Link href={`/courses/${course.slug}`} className="course-image-link" aria-label={`${course.title} 상세 보기`}>
        <span className="course-badge">{course.badge}</span>
        <Image
          src={course.image}
          alt={`${course.title} 강의 썸네일`}
          fill
          sizes={compact ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 420px"}
          className="course-image"
        />
      </Link>
      <div className="course-card-body">
        <div className="course-meta-row">
          <span>{course.category}</span>
          <span>{course.difficulty}</span>
        </div>
        <h3>
          <Link href={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>
        <p>{course.subtitle}</p>
        <div className="course-stat-row">
          <span>
            <Star size={15} aria-hidden="true" />
            {course.rating}
          </span>
          <span>
            <Clock size={15} aria-hidden="true" />
            {course.duration}
          </span>
        </div>
        {typeof progress === "number" ? (
          <div className="progress-track" aria-label={`${course.title} 진행률 ${progress}%`}>
            <span style={{ width: `${progress}%`, background: course.accent }} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
