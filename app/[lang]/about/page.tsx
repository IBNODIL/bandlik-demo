import { AboutPage } from "@/components/Pages";
import { pageMetadata } from "@/lib/page-meta";

export const generateMetadata = pageMetadata("about", "/about");

export default function Page() {
  return <AboutPage />;
}
