import { notFound } from "next/navigation";
import { LearnExperience } from "@/components/LearnExperience";
import { courses, getCourse } from "@/lib/courses";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <main className="learn-shell">
      <LearnExperience course={course} />
    </main>
  );
}
