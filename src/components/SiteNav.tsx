import Link from "next/link";
import { Search, Sparkles } from "lucide-react";

export function SiteNav() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="주요 메뉴">
        <Link href="/" className="brand" aria-label="Aischool 홈">
          <span className="brand-mark">
            <Sparkles size={16} aria-hidden="true" />
          </span>
          <span>Aischool</span>
        </Link>
        <div className="nav-links">
          <Link href="/courses">강의</Link>
          <Link href="/courses/ai-foundations">시작하기</Link>
          <Link href="/learn/prompt-engineering">학습하기</Link>
        </div>
        <Link href="/courses" className="nav-icon" aria-label="강의 검색">
          <Search size={17} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
