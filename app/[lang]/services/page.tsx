import { ServicesPage } from "@/components/Pages";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = pageMetadata("services", "/services");

export default function Page() {
  return <ServicesPage />;
}
