import { notFound } from "next/navigation";

// Any path under a language that has no page renders that language's 404 (app/[lang]/not-found.tsx).
export default function Page() {
  notFound();
}
