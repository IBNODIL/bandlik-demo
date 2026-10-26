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

export const NAV = [
  { label: "Bosh sahifa", href: "#top" },
  { label: "Biz haqimizda", href: "#about" },
  { label: "Ish beruvchilarga", href: "#about" },
  { label: "Xizmatlar", href: "#process" },
  { label: "Ish qidiruvchilar uchun", href: "#vacancies" },
  { label: "Vakansiyalar", href: "#vacancies" },
  { label: "Aloqa", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

export const FOOTER_NAV = ["Asosiy", "Biz haqimizda", "Ish beruvchilarga", "Xizmatlar", "Vakansiyalar", "Aloqa"];

export const STEPS = [
  ["Ishchi so‘rovini yuborish", "Ish beruvchi kerakli kasb, ishchilar soni va ish shartlarini ko‘rsatadi."],
  ["Talablarni aniqlashtirish", "Ish beruvchining talablari va nomzodlarga qo‘yiladigan mezonlar kelishiladi."],
  ["Nomzodlarni tanlash", "Belgilangan talablar asosida mos nomzodlar ko‘rib chiqiladi."],
  ["Hujjatlarni tayyorlash", "Ishga joylashish uchun zarur hujjatlar va tegishli jarayonlar muvofiqlashtiriladi."],
  ["Safarga tayyorgarlik", "Kelishilgan ish shartlariga muvofiq, zarur rasmiylashtirish va tayyorgarlik ishlari bajariladi."],
];

export const FAQ = [
  ["Bandlik.uz qanday xizmatlarni taqdim etadi?", "Platforma ish beruvchilarga kerakli kasb bo‘yicha ishchi topishda, nomzodlarga esa xorijdagi tekshirilgan vakansiyalarga murojaat qilishda va tayyorlov kurslaridan o‘tishda yordam beradi."],
  ["Ishchi so‘rovini qanday yuboraman?", "“Ishchi so‘rash” tugmasini bosing va kerakli kasb, ishchilar soni, til darajasi hamda mehnat shartlarini ko‘rsating. So‘rovingiz ko‘rib chiqilib, siz bilan bog‘lanamiz."],
  ["Xizmatlar narxi qancha?", "Xizmat narxi so‘rov hajmi va ish shartlariga qarab belgilanadi. Aniq narxni so‘rov yuborganingizdan so‘ng mas’ul mutaxassis aytib beradi."],
  ["Vakansiyalar tekshiriladimi?", "Ha, platformadagi har bir vakansiya ish beruvchi va mehnat shartlari bo‘yicha oldindan tekshiriladi."],
  ["Qanday vakansiyalar mavjud?", "Oshpazlik, qurilish, ombor, ishlab chiqarish va boshqa ko‘plab yo‘nalishlarda xorijdagi ish o‘rinlari mavjud. To‘liq ro‘yxat “Vakansiyalar” bo‘limida."],
  ["Vakansiyaga qanday murojaat qilaman?", "Kerakli vakansiyani tanlang, “Batafsil” tugmasini bosing va talab qilingan hujjatlar bilan ariza topshiring."],
  ["Til va kasb kurslariga qanday yozilaman?", "“Tayyorlov kurslari” bo‘limidan mos kursni tanlab, ro‘yxatdan o‘ting. Darslar haqida ma’lumot sizga yuboriladi."],
  ["Hamkor sifatida qanday qo‘shilish mumkin?", "“Aloqa” bo‘limi orqali bizga yozing yoki qo‘ng‘iroq qiling. Hamkorlik shartlarini birgalikda muhokama qilamiz."],
];

export const JOB = {
  title: "Oshipaz",
  place: "Bratislava, Slovakia",
  likes: 100,
  salary: "$1,850",
  salaryUzs: "(≈ 23 500 000 so'm)",
  type: "To’liq stavka • 6-12 oy",
  deadline: "10.10.2026",
  hired: "54/100",
  applied: "120",
};

export const COURSE = {
  tag: "Suhbatga tayyorgarlik",
  title: "Nemis tilida asosiy suhbatlashish va grammatika",
  price: "240 000 so’m",
  hours: "40 soat",
  lessons: "20 dars",
};

export const CLIENTS = ["oslo.", "SAVANNAH", "Basel", "Cactus", "Manila."];
