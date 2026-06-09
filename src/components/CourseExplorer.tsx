"use client";

import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { categories, difficulties, getAllLessons, type Course } from "@/lib/courses";
import { CourseCard } from "./CourseCard";

type CourseExplorerProps = {
  courses: Course[];
};

function getProgress(course: Course) {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(`aischool-progress-${course.slug}`);
  if (!raw) return 0;
  try {
    const completed = JSON.parse(raw) as string[];
    const total = getAllLessons(course).length;
    return total ? Math.round((completed.length / total) * 100) : 0;
  } catch {
    return 0;
  }
}

export function CourseExplorer({ courses }: CourseExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("전체");
  const [progressSeed, setProgressSeed] = useState(0);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const nextProgress = Object.fromEntries(courses.map((course) => [course.slug, getProgress(course)]));
    setProgressMap(nextProgress);
  }, [courses, progressSeed]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesQuery =
        !normalized ||
        [course.title, course.subtitle, course.instructor, course.category, ...course.outcomes]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      const matchesCategory = category === "전체" || course.category === category;
      const matchesDifficulty = difficulty === "전체" || course.difficulty === difficulty;
      return matchesQuery && matchesCategory && matchesDifficulty;
    });
  }, [category, courses, difficulty, query]);

  const reset = () => {
    setQuery("");
    setCategory("전체");
    setDifficulty("전체");
    setProgressSeed((value) => value + 1);
  };

  return (
    <section className="catalog-shell" aria-labelledby="catalog-heading">
      <div className="catalog-toolbar">
        <div>
          <p className="eyebrow">Course Library</p>
          <h1 id="catalog-heading">지금 필요한 AI 강의를 빠르게 찾으세요.</h1>
        </div>
        <button className="ghost-button" type="button" onClick={reset}>
          <X size={16} aria-hidden="true" />
          초기화
        </button>
      </div>

      <div className="filter-panel" aria-label="강의 필터">
        <label className="search-field">
          <SlidersHorizontal size={18} aria-hidden="true" />
          <span className="sr-only">검색어</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="강의, 강사, 목표 검색"
          />
        </label>
        <div className="segmented" aria-label="카테고리">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={item === category ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="segmented compact" aria-label="난이도">
          {difficulties.map((item) => (
            <button
              key={item}
              type="button"
              className={item === difficulty ? "active" : ""}
              onClick={() => setDifficulty(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="result-summary" aria-live="polite">
        <strong>{filtered.length}</strong>개 강의
      </div>

      <div className="course-grid">
        {filtered.map((course) => (
          <CourseCard key={course.slug} course={course} progress={progressMap[course.slug] ?? 0} />
        ))}
      </div>
    </section>
  );
}
