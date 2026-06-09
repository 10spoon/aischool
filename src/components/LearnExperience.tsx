"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Circle, ListChecks, Play, RotateCcw } from "lucide-react";
import { getAllLessons, type Course } from "@/lib/courses";

type LearnExperienceProps = {
  course: Course;
};

export function LearnExperience({ course }: LearnExperienceProps) {
  const lessons = useMemo(() => getAllLessons(course), [course]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const storageKey = `aischool-progress-${course.slug}`;

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const stored = JSON.parse(raw) as string[];
      setCompleted(stored.filter((id) => lessons.some((lesson) => lesson.id === id)));
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [lessons, storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed, storageKey]);

  const currentLesson = lessons[currentIndex];
  const progress = Math.round((completed.length / lessons.length) * 100);

  const toggleCurrent = () => {
    setCompleted((items) =>
      items.includes(currentLesson.id)
        ? items.filter((id) => id !== currentLesson.id)
        : [...items, currentLesson.id]
    );
  };

  const move = (direction: -1 | 1) => {
    setCurrentIndex((index) => Math.min(Math.max(index + direction, 0), lessons.length - 1));
  };

  const reset = () => {
    setCompleted([]);
    setCurrentIndex(0);
  };

  return (
    <div className="learn-layout">
      <section className="player-area" aria-labelledby="lesson-title">
        <Link href={`/courses/${course.slug}`} className="back-link">
          <ChevronLeft size={16} aria-hidden="true" />
          강의 정보
        </Link>
        <div className="lesson-player">
          <Image
            src={course.image}
            alt={`${course.title} 플레이어 커버`}
            fill
            priority
            sizes="(max-width: 960px) 100vw, 66vw"
          />
          <div className="player-overlay">
            <button type="button" className="play-button" aria-label="강의 재생">
              <Play size={28} fill="currentColor" aria-hidden="true" />
            </button>
            <div>
              <p>Lesson {currentIndex + 1}</p>
              <h1 id="lesson-title">{currentLesson.title}</h1>
            </div>
          </div>
        </div>
        <div className="lesson-actions">
          <button type="button" className="secondary-button" onClick={() => move(-1)} disabled={currentIndex === 0}>
            <ChevronLeft size={17} aria-hidden="true" />
            이전
          </button>
          <button type="button" className="primary-button" onClick={toggleCurrent}>
            {completed.includes(currentLesson.id) ? (
              <CheckCircle2 size={18} aria-hidden="true" />
            ) : (
              <Circle size={18} aria-hidden="true" />
            )}
            {completed.includes(currentLesson.id) ? "완료 취소" : "완료 표시"}
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => move(1)}
            disabled={currentIndex === lessons.length - 1}
          >
            다음
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </div>
      </section>

      <aside className="lesson-sidebar" aria-label="강의 목차">
        <div className="progress-summary">
          <div>
            <p className="eyebrow">Progress</p>
            <strong>{progress}%</strong>
          </div>
          <button type="button" className="icon-button" onClick={reset} aria-label="진행률 초기화">
            <RotateCcw size={17} aria-hidden="true" />
          </button>
        </div>
        <div className="progress-track large">
          <span style={{ width: `${progress}%`, background: course.accent }} />
        </div>
        <div className="lesson-list-heading">
          <ListChecks size={18} aria-hidden="true" />
          <span>{lessons.length}개 레슨</span>
        </div>
        <ol className="lesson-list">
          {lessons.map((lesson, index) => {
            const isActive = index === currentIndex;
            const isDone = completed.includes(lesson.id);
            return (
              <li key={lesson.id}>
                <button type="button" className={isActive ? "active" : ""} onClick={() => setCurrentIndex(index)}>
                  {isDone ? (
                    <CheckCircle2 size={18} aria-hidden="true" />
                  ) : (
                    <Circle size={18} aria-hidden="true" />
                  )}
                  <span>
                    <strong>{lesson.title}</strong>
                    <small>
                      {lesson.focus} · {lesson.duration}
                    </small>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </aside>
    </div>
  );
}
