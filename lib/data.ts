const F = "/framer";

export const MEDIA = {
  logo: `${F}/shared/logo-bandlik.png`,
  hero: `${F}/home/hero-workers-airplane.png`,
  worker: `${F}/home/employers-card-1-worker-helmet.jpg`,
  chef: `${F}/home/employers-card-2-chef.jpg`,
  warehouse: `${F}/home/employers-card-3-warehouse-worker.jpg`,
  man: `${F}/home/parallax-man-traveller.png`,
  woman: `${F}/home/parallax-woman-traveller.png`,
  phone: `${F}/home/app-phone-mockup.png`,
  phoneVideo: `${F}/home/app-phone-screen.mp4`,
  qrAppStore: `${F}/home/app-qr-1.png`,
  qrGooglePlay: `${F}/home/app-qr-2.png`,
  course: `${F}/home/course-card-cover.png`,
  cta: `${F}/shared/cta-workers-background.png`,
  journey: `${F}/shared/process-section-image.png`,
  about: {
    hero: `${F}/biz-haqimizda/hero-flag.png`,
    approach: `${F}/biz-haqimizda/approach-image.png`,
    problemA: `${F}/biz-haqimizda/problem-image-passport-plane.png`,
    problemB: `${F}/biz-haqimizda/solution-image-laptop.png`,
    solution: `${F}/biz-haqimizda/platform-image-luggage.png`,
    closing: `${F}/shared/about-wide-image.png`,
  },
  employers: {
    hero: `${F}/ish-beruvchilarga/hero.png`,
    steps: [1, 2, 3, 4].map((n) => `${F}/ish-beruvchilarga/step-${n}.jpeg`),
    parallax: `${F}/ish-beruvchilarga/parallax-office.png`,
  },
  jobSeekers: { hero: `${F}/ish-qidiruvchilar/hero.jpg` },
  services: {
    hero: `${F}/service/hero.png`,
    cards: [
      `${F}/service/card-01-documents.jpg`,
      `${F}/service/card-02-translation.jpg`,
      `${F}/service/card-03-notary.jpg`,
      `${F}/service/card-04-insurance.jpg`,
      `${F}/service/card-05-courses.jpg`,
      `${F}/service/card-06-online-interview.jpg`,
    ],
  },
  vacancies: { hero: `${F}/vacancy/hero.png` },
  contact: { hero: `${F}/contact/hero.png` },
};

export const CLIENT_LOGOS = [
  { src: `${F}/home/client-logo-oslo.png`, name: "oslo." },
  { src: `${F}/home/client-logo-savannah.png`, name: "Savannah" },
  { src: `${F}/home/client-logo-basel.png`, name: "Basel" },
  { src: `${F}/home/client-logo-cactus.png`, name: "Cactus" },
  { src: `${F}/home/client-logo-manila.png`, name: "Manila." },
];

export const STATS = { partners: 150, vacancies: 5000, countries: 100, placed: 5000 } as const;

/** Public contact details (same in every language). */
export const CONTACT = {
  email: "info@bandlik.uz",
  phone: "+998 90 123 45 67",
  phoneHref: "tel:+998901234567",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || "#",
};

/** Login of the web app; set NEXT_PUBLIC_LOGIN_URL once it exists. */
export const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL || "#";
/** Store links of the mobile app; set them once the app is published. */
export const STORE = {
  appStore: process.env.NEXT_PUBLIC_APP_STORE_URL || "#",
  googlePlay: process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL || "#",
};
