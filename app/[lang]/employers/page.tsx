import { EmployersPage } from "@/components/Pages";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = pageMetadata("employers", "/employers");

export default function Page() {
  return <EmployersPage />;
}
