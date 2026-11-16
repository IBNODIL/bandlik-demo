import { VacanciesPage } from "@/components/Pages";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = pageMetadata("vacancies", "/vacancies");

export default function Page() {
  return <VacanciesPage />;
}
