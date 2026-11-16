import { ContactPage } from "@/components/Pages";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = pageMetadata("contact", "/contact");

export default function Page() {
  return <ContactPage />;
}
