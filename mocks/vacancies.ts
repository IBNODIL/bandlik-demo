// Fake data for development only (see lib/api/config.ts). Not real people, employers or prices.
import type { Vacancy } from "@/lib/api/types";

export const vacancies: Vacancy[] = [
  {
    "id": "v001",
    "status": "active",
    "countryCode": "SK",
    "salaryNetUsd": 1850,
    "salaryLocalUzs": 23500000,
    "employmentType": "fullTime",
    "durationMonths": {
      "min": 6,
      "max": 12
    },
    "deadline": "2026-12-10",
    "hired": 54,
    "capacity": 100,
    "applied": 120,
    "likes": 100,
    "title": {
      "uz": "Oşpaz",
      "en": "Chef",
      "ru": "Повар",
      "de": "Koch",
      "tr": "Aşçı"
    },
    "place": {
      "uz": "Bratislava, Slovakiya",
      "en": "Bratislava, Slovakia",
      "ru": "Братислава, Словакия",
      "de": "Bratislava, Slowakei",
      "tr": "Bratislava, Slovakya"
    }
  },
  {
    "id": "v002",
    "status": "active",
    "countryCode": "SK",
    "salaryNetUsd": 2100,
    "salaryLocalUzs": 26700000,
    "employmentType": "fullTime",
    "durationMonths": {
      "min": 12,
      "max": 24
    },
    "deadline": "2026-12-20",
    "hired": 18,
    "capacity": 40,
    "applied": 87,
    "likes": 64,
    "title": {
      "uz": "Payvandçi",
      "en": "Welder",
      "ru": "Сварщик",
      "de": "Schweißer",
      "tr": "Kaynakçı"
    },
    "place": {
      "uz": "Koşitse, Slovakiya",
      "en": "Košice, Slovakia",
      "ru": "Кошице, Словакия",
      "de": "Košice, Slowakei",
      "tr": "Košice, Slovakya"
    }
  },
  {
    "id": "v003",
    "status": "closingSoon",
    "countryCode": "DE",
    "salaryNetUsd": 3200,
    "salaryLocalUzs": 40600000,
    "employmentType": "fullTime",
    "durationMonths": {
      "min": 12,
      "max": 12
    },
    "deadline": "2026-11-09",
    "hired": 9,
    "capacity": 25,
    "applied": 310,
    "likes": 212,
    "title": {
      "uz": "Yuk maşinasi haydovçisi",
      "en": "Truck driver",
      "ru": "Водитель-дальнобойщик",
      "de": "LKW-Fahrer",
      "tr": "Tır şoförü"
    },
    "place": {
      "uz": "Myunxen, Germaniya",
      "en": "Munich, Germany",
      "ru": "Мюнхен, Германия",
      "de": "München, Deutschland",
      "tr": "Münih, Almanya"
    }
  },
  {
    "id": "v004",
    "status": "active",
    "countryCode": "PL",
    "salaryNetUsd": 1500,
    "salaryLocalUzs": 19000000,
    "employmentType": "fullTime",
    "durationMonths": {
      "min": 6,
      "max": 12
    },
    "deadline": "2026-12-31",
    "hired": 120,
    "capacity": 200,
    "applied": 640,
    "likes": 88,
    "title": {
      "uz": "Ombor xodimi",
      "en": "Warehouse worker",
      "ru": "Работник склада",
      "de": "Lagermitarbeiter",
      "tr": "Depo çalışanı"
    },
    "place": {
      "uz": "Varşava, Polşa",
      "en": "Warsaw, Poland",
      "ru": "Варшава, Польша",
      "de": "Warschau, Polen",
      "tr": "Varşova, Polonya"
    }
  },
  {
    "id": "v005",
    "status": "active",
    "countryCode": "DE",
    "salaryNetUsd": 2600,
    "salaryLocalUzs": 33000000,
    "employmentType": "contract",
    "durationMonths": {
      "min": 3,
      "max": 6
    },
    "deadline": "2026-11-30",
    "hired": 31,
    "capacity": 60,
    "applied": 205,
    "likes": 41,
    "title": {
      "uz": "Quriliş işçisi",
      "en": "Construction worker",
      "ru": "Строитель",
      "de": "Bauarbeiter",
      "tr": "İnşaat işçisi"
    },
    "place": {
      "uz": "Gamburg, Germaniya",
      "en": "Hamburg, Germany",
      "ru": "Гамбург, Германия",
      "de": "Hamburg, Deutschland",
      "tr": "Hamburg, Almanya"
    }
  },
  {
    "id": "v006",
    "status": "active",
    "countryCode": "CZ",
    "salaryNetUsd": 2300,
    "salaryLocalUzs": 29200000,
    "employmentType": "fullTime",
    "durationMonths": {
      "min": 12,
      "max": 24
    },
    "deadline": "2026-12-15",
    "hired": 5,
    "capacity": 15,
    "applied": 94,
    "likes": 17,
    "title": {
      "uz": "Elektrik",
      "en": "Electrician",
      "ru": "Электрик",
      "de": "Elektriker",
      "tr": "Elektrikçi"
    },
    "place": {
      "uz": "Praga, Çexiya",
      "en": "Prague, Czechia",
      "ru": "Прага, Чехия",
      "de": "Prag, Tschechien",
      "tr": "Prag, Çekya"
    }
  },
  {
    "id": "v007",
    "status": "active",
    "countryCode": "LT",
    "salaryNetUsd": 1300,
    "salaryLocalUzs": 16500000,
    "employmentType": "partTime",
    "durationMonths": {
      "min": 6,
      "max": 12
    },
    "deadline": "2026-12-25",
    "hired": 12,
    "capacity": 30,
    "applied": 71,
    "likes": 9,
    "title": {
      "uz": "Tozalaş xodimi",
      "en": "Cleaner",
      "ru": "Уборщик",
      "de": "Reinigungskraft",
      "tr": "Temizlik görevlisi"
    },
    "place": {
      "uz": "Vilnyus, Litva",
      "en": "Vilnius, Lithuania",
      "ru": "Вильнюс, Литва",
      "de": "Vilnius, Litauen",
      "tr": "Vilnius, Litvanya"
    }
  },
  {
    "id": "v008",
    "status": "filled",
    "countryCode": "HU",
    "salaryNetUsd": 1250,
    "salaryLocalUzs": 15900000,
    "employmentType": "seasonal",
    "durationMonths": {
      "min": 3,
      "max": 5
    },
    "deadline": "2026-11-20",
    "hired": 40,
    "capacity": 40,
    "applied": 156,
    "likes": 23,
    "title": {
      "uz": "Qadoqlovçi",
      "en": "Packer",
      "ru": "Упаковщик",
      "de": "Verpacker",
      "tr": "Paketleme işçisi"
    },
    "place": {
      "uz": "Budapeşt, Vengriya",
      "en": "Budapest, Hungary",
      "ru": "Будапешт, Венгрия",
      "de": "Budapest, Ungarn",
      "tr": "Budapeşte, Macaristan"
    }
  },
  {
    "id": "v009",
    "status": "active",
    "countryCode": "CZ",
    "salaryNetUsd": 2400,
    "salaryLocalUzs": 30500000,
    "employmentType": "fullTime",
    "durationMonths": {
      "min": 24,
      "max": 36
    },
    "deadline": "2027-01-15",
    "hired": 2,
    "capacity": 10,
    "applied": 49,
    "likes": 31,
    "title": {
      "uz": "CNC stanok operatori",
      "en": "CNC machine operator",
      "ru": "Оператор станка с ЧПУ",
      "de": "CNC-Maschinenbediener",
      "tr": "CNC makine operatörü"
    },
    "place": {
      "uz": "Brno, Çexiya",
      "en": "Brno, Czechia",
      "ru": "Брно, Чехия",
      "de": "Brünn, Tschechien",
      "tr": "Brno, Çekya"
    }
  },
  {
    "id": "v010",
    "status": "closingSoon",
    "countryCode": "PL",
    "salaryNetUsd": 1400,
    "salaryLocalUzs": 17800000,
    "employmentType": "seasonal",
    "durationMonths": {
      "min": 4,
      "max": 8
    },
    "deadline": "2026-11-10",
    "hired": 66,
    "capacity": 80,
    "applied": 512,
    "likes": 54,
    "title": {
      "uz": "Fermer xöjaligi işçisi",
      "en": "Farm worker",
      "ru": "Сельскохозяйственный рабочий",
      "de": "Landarbeiter",
      "tr": "Çiftlik işçisi"
    },
    "place": {
      "uz": "Vrotslav, Polşa",
      "en": "Wrocław, Poland",
      "ru": "Вроцлав, Польша",
      "de": "Breslau, Polen",
      "tr": "Vroclav, Polonya"
    }
  },
  {
    "id": "v011",
    "status": "active",
    "countryCode": "DE",
    "salaryNetUsd": 2200,
    "salaryLocalUzs": 27900000,
    "employmentType": "fullTime",
    "durationMonths": {
      "min": 12,
      "max": 12
    },
    "deadline": "2026-12-18",
    "hired": 0,
    "capacity": 12,
    "applied": 0,
    "likes": 0,
    "title": {
      "uz": "Parvariş böyiça yordamçi",
      "en": "Care assistant",
      "ru": "Помощник по уходу",
      "de": "Pflegehelfer",
      "tr": "Bakım asistanı"
    },
    "place": {
      "uz": "Myunxen, Germaniya",
      "en": "Munich, Germany",
      "ru": "Мюнхен, Германия",
      "de": "München, Deutschland",
      "tr": "Münih, Almanya"
    }
  },
  {
    "id": "v012",
    "status": "active",
    "countryCode": "SK",
    "salaryNetUsd": 1550,
    "employmentType": "fullTime",
    "durationMonths": {
      "min": 6,
      "max": 12
    },
    "deadline": "2026-12-28",
    "hired": 7,
    "capacity": 20,
    "applied": 33,
    "likes": 5,
    "title": {
      "uz": "Tikuvçi",
      "en": "Tailor",
      "ru": "Портной",
      "de": "Schneider",
      "tr": "Terzi"
    },
    "place": {
      "uz": "Koşitse, Slovakiya",
      "en": "Košice, Slovakia",
      "ru": "Кошице, Словакия",
      "de": "Košice, Slowakei",
      "tr": "Košice, Slovakya"
    }
  },
  {
    "id": "v013",
    "status": "active",
    "countryCode": "DE",
    "salaryNetUsd": 2750,
    "salaryLocalUzs": 34900000,
    "employmentType": "fullTime",
    "hired": 3,
    "capacity": 25,
    "applied": 140,
    "likes": 77,
    "title": {
      "uz": "Pizzayolo / Qandolat & desert oşpazi",
      "en": "Pizzaiolo / Pastry & Dessert Chef",
      "ru": "Пиццайоло / кондитер и повар десертов",
      "de": "Pizzaiolo / Konditor & Dessertkoch",
      "tr": "Pizzaiolo / Pasta & Tatlı Şefi"
    },
    "place": {
      "uz": "Gamburg, Germaniya",
      "en": "Hamburg, Germany",
      "ru": "Гамбург, Германия",
      "de": "Hamburg, Deutschland",
      "tr": "Hamburg, Almanya"
    }
  },
  {
    "id": "v014",
    "status": "active",
    "countryCode": "DE",
    "salaryNetUsd": 4200,
    "salaryLocalUzs": 53300000,
    "employmentType": "fullTime",
    "durationMonths": {
      "min": 24,
      "max": 36
    },
    "deadline": "2026-12-30",
    "hired": 1,
    "capacity": 3,
    "applied": 12480,
    "likes": 389,
    "title": {
      "uz": "Avtomobil işlab çiqariş liniyalari uçun elektr örnatiş va işga tuşiriş böyiça katta muhandis (sanoat avtomatlaştiriş)",
      "en": "Senior Industrial Electrical Installation and Commissioning Engineer for Automotive Production Lines",
      "ru": "Старший инженер по монтажу и пусконаладке промышленного электрооборудования автомобильных производственных линий",
      "de": "Leitender Ingenieur für industrielle Elektroinstallation und Inbetriebnahme von Automobil-Produktionslinien",
      "tr": "Otomotiv Üretim Hatları için Kıdemli Endüstriyel Elektrik Montaj ve Devreye Alma Mühendisi"
    },
    "place": {
      "uz": "Myunxen, Germaniya",
      "en": "Munich, Germany",
      "ru": "Мюнхен, Германия",
      "de": "München, Deutschland",
      "tr": "Münih, Almanya"
    }
  },
  {
    "id": "v015",
    "status": "filled",
    "countryCode": "SK",
    "salaryNetUsd": 1200,
    "salaryLocalUzs": 15200000,
    "employmentType": "partTime",
    "durationMonths": {
      "min": 3,
      "max": 6
    },
    "deadline": "2026-11-18",
    "hired": 20,
    "capacity": 20,
    "applied": 98,
    "likes": 2,
    "title": {
      "uz": "Tozalaş xodimi",
      "en": "Cleaner",
      "ru": "Уборщик",
      "de": "Reinigungskraft",
      "tr": "Temizlik görevlisi"
    },
    "place": {
      "uz": "Bratislava, Slovakiya",
      "en": "Bratislava, Slovakia",
      "ru": "Братислава, Словакия",
      "de": "Bratislava, Slowakei",
      "tr": "Bratislava, Slovakya"
    }
  },
  {
    "id": "v016",
    "status": "active",
    "countryCode": "CZ",
    "salaryNetUsd": 2000,
    "salaryLocalUzs": 25400000,
    "employmentType": "contract",
    "durationMonths": {
      "min": 6,
      "max": 12
    },
    "deadline": "2026-12-12",
    "hired": 14,
    "capacity": 30,
    "applied": 175,
    "likes": 36,
    "title": {
      "uz": "Payvandçi",
      "en": "Welder",
      "ru": "Сварщик",
      "de": "Schweißer",
      "tr": "Kaynakçı"
    },
    "place": {
      "uz": "Praga, Çexiya",
      "en": "Prague, Czechia",
      "ru": "Прага, Чехия",
      "de": "Prag, Tschechien",
      "tr": "Prag, Çekya"
    }
  },
  {
    "id": "v017",
    "status": "active",
    "countryCode": "LT",
    "salaryNetUsd": 2900,
    "salaryLocalUzs": 36800000,
    "employmentType": "fullTime",
    "durationMonths": {
      "min": 12,
      "max": 24
    },
    "deadline": "2026-12-22",
    "hired": 22,
    "capacity": 50,
    "applied": 288,
    "likes": 99,
    "title": {
      "uz": "Yuk maşinasi haydovçisi",
      "en": "Truck driver",
      "ru": "Водитель-дальнобойщик",
      "de": "LKW-Fahrer",
      "tr": "Tır şoförü"
    },
    "place": {
      "uz": "Vilnyus, Litva",
      "en": "Vilnius, Lithuania",
      "ru": "Вильнюс, Литва",
      "de": "Vilnius, Litauen",
      "tr": "Vilnius, Litvanya"
    }
  },
  {
    "id": "v018",
    "status": "closingSoon",
    "countryCode": "HU",
    "salaryNetUsd": 1450,
    "salaryLocalUzs": 18400000,
    "employmentType": "fullTime",
    "durationMonths": {
      "min": 6,
      "max": 12
    },
    "deadline": "2026-11-12",
    "hired": 70,
    "capacity": 100,
    "applied": 355,
    "likes": 14,
    "title": {
      "uz": "Ombor xodimi",
      "en": "Warehouse worker",
      "ru": "Работник склада",
      "de": "Lagermitarbeiter",
      "tr": "Depo çalışanı"
    },
    "place": {
      "uz": "Budapeşt, Vengriya",
      "en": "Budapest, Hungary",
      "ru": "Будапешт, Венгрия",
      "de": "Budapest, Ungarn",
      "tr": "Budapeşte, Macaristan"
    }
  },
  {
    "id": "v019",
    "status": "active",
    "countryCode": "PL",
    "salaryNetUsd": 1350,
    "employmentType": "partTime",
    "durationMonths": {
      "min": 3,
      "max": 6
    },
    "deadline": "2026-12-08",
    "hired": 0,
    "capacity": 50,
    "applied": 0,
    "likes": 0,
    "title": {
      "uz": "Qadoqlovçi",
      "en": "Packer",
      "ru": "Упаковщик",
      "de": "Verpacker",
      "tr": "Paketleme işçisi"
    },
    "place": {
      "uz": "Vrotslav, Polşa",
      "en": "Wrocław, Poland",
      "ru": "Вроцлав, Польша",
      "de": "Breslau, Polen",
      "tr": "Vroclav, Polonya"
    }
  },
  {
    "id": "v020",
    "status": "active",
    "countryCode": "SK",
    "salaryNetUsd": 2450,
    "salaryLocalUzs": 31100000,
    "employmentType": "fullTime",
    "durationMonths": {
      "min": 12,
      "max": 24
    },
    "deadline": "2026-12-29",
    "hired": 11,
    "capacity": 35,
    "applied": 202,
    "likes": 58,
    "title": {
      "uz": "Quriliş işçisi",
      "en": "Construction worker",
      "ru": "Строитель",
      "de": "Bauarbeiter",
      "tr": "İnşaat işçisi"
    },
    "place": {
      "uz": "Bratislava, Slovakiya",
      "en": "Bratislava, Slovakia",
      "ru": "Братислава, Словакия",
      "de": "Bratislava, Slowakei",
      "tr": "Bratislava, Slovakya"
    }
  }
];
