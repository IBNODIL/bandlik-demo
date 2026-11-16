import { JobSeekersPage } from "@/components/Pages";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = pageMetadata("jobSeekers", "/job-seekers");

export default function Page() {
  return <JobSeekersPage />;
}
