import { CourseExplorer } from "@/components/CourseExplorer";
import { courses } from "@/lib/courses";

export default function CoursesPage() {
  return (
    <main className="page-shell">
      <CourseExplorer courses={courses} />
    </main>
  );
}
