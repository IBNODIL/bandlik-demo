const CDN = "https://framerusercontent.com/images/";
export const img = (id: string, w = 1600) => `${CDN}${id}?width=${w}`;

export const IMG = {
  logo: "MSzLVPfBESPwe0bJBvJ3gtj7o.png",
  hero: "er9fWzr0MKGDKkCGuOKrVMDg7N8.png",
  globe: "er9fWzr0MKGDKkCGuOKrVMDg7N8.png",
  worker: "npLjciRgjp7swB8xiJU6txfQHZ4.jpg",
  chef: "deKn0DV39zs7JsuqdoroAavHvU8.jpg",
  warehouse: "dg92cJ4goWk2ohOhNEQxJY6XIc.jpg",
  man: "YfRiFWog0MZpjhEtl8SLoYo0.png",
  woman: "4l3NLjkPKI7TZ23kJgS4HYiHaVc.png",
  course: "7FBttFiToGenl340iEdNgmqGbQ.png",
  footerLogo: "CMpoUuGPM72OKxPWrhF5Mu0C4M.png",
};

/** Section anchor of each menu item; labels live in messages/*.json (`nav`, same order). */
export const NAV_HREFS = ["#top", "#about", "#about", "#process", "#vacancies", "#vacancies", "#contact", "#faq"];

/** Language-independent numbers of the sample vacancy; its texts live in messages/*.json (`content.job`). */
export const JOB = {
  likes: 100,
  salary: "$1,850",
  deadline: "10.10.2026",
  hired: "54/100",
  applied: "120",
};

export const CLIENTS = ["oslo.", "SAVANNAH", "Basel", "Cactus", "Manila."];
