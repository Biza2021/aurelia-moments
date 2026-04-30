export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE_NAME = "aurelia_locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getLocaleFromPathname(pathname: string | undefined | null) {
  const segment = pathname?.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
}

export function getLocalizedPath(pathname: string, locale: Locale) {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length > 0 && isLocale(parts[0])) {
    parts[0] = locale;
  } else {
    parts.unshift(locale);
  }

  return `/${parts.join("/")}`;
}

export const messages = {
  en: {
    meta: {
      title: "Aurelia Moments | Luxury Abaya Valet in Qatar",
      description:
        "Premium abaya valet service for weddings, private gatherings, and elegant women's events in Qatar.",
      keywords: [
        "abaya valet Qatar",
        "luxury abaya service",
        "wedding abaya organization",
        "private events Qatar",
        "Aurelia Moments"
      ],
      ogAlt: "Luxury abaya valet setup by Aurelia Moments"
    },
    brand: "Aurelia Moments",
    header: {
      nav: {
        home: "Home",
        experience: "Experience",
        gallery: "Gallery",
        packages: "Packages",
        booking: "Booking",
        contact: "Contact"
      },
      bookNow: "Book Now",
      menu: "Toggle navigation menu",
      language: "Language"
    },
    hero: {
      eyebrow: "Aurelia Moments",
      headline: "Luxury Abaya Valet for Elegant Occasions in Qatar",
      subheadline:
        "We receive, organize, and return every guest's abaya with care, discretion, and elegance.",
      primaryCta: "Book Your Event",
      secondaryCta: "See How It Works",
      trustLabels: ["Weddings", "Private Events", "Women's Gatherings"]
    },
    about: {
      eyebrow: "Refined Arrival Care",
      title: "A calm welcome, arranged with grace.",
      text: "Aurelia Moments brings a refined abaya valet service to weddings and private women's gatherings in Qatar. We help hosts create a smooth, organized, and graceful arrival experience for every guest."
    },
    experience: {
      eyebrow: "The Experience",
      title: "A Graceful Abaya Valet Experience",
      steps: [
        {
          title: "Guest Arrives",
          text: "Your guests arrive at the dedicated reception area and are welcomed with care."
        },
        {
          title: "Abaya is Received",
          text: "Each abaya is discreetly and respectfully received by our trained hostess."
        },
        {
          title: "Tagged & Organized",
          text: "Every abaya is carefully tagged and placed on a luxury rack for safe keeping."
        },
        {
          title: "Returned Smoothly",
          text: "At the end of the event, each abaya is returned quickly and gracefully."
        }
      ]
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Curated Details",
      subtitle:
        "Refined racks, simple tagging, warm reception, and polished event presentation for private women's occasions.",
      labels: {
        rack: "Abaya Rack",
        tags: "Numbered Tags",
        hostess: "Hostess Service",
        entrance: "Event Entrance",
        setup: "Wedding Setup",
        details: "Gold Details"
      }
    },
    packages: {
      eyebrow: "Offerings",
      title: "Curated Service Offerings",
      quoteOnly: "Quote Only",
      requestQuote: "Request Quote",
      items: [
        {
          value: "Private Gathering",
          name: "Private Gathering",
          description: "For intimate family events and small celebrations."
        },
        {
          value: "Wedding Experience",
          name: "Wedding Experience",
          description: "For weddings and larger women's gatherings."
        },
        {
          value: "Signature Luxury Setup",
          name: "Signature Luxury Setup",
          description:
            "A premium presentation with refined styling, hostess service, and full abaya organization."
        }
      ]
    },
    booking: {
      imageEyebrow: "Qatar Events",
      imageText:
        "Tell us the occasion. We will shape the arrival with care.",
      eyebrow: "Booking Inquiry",
      title: "Inquire About Our Service",
      subtitle:
        "Tell us about your event, and we'll help you create a graceful guest experience.",
      labels: {
        fullName: "Full name",
        phoneNumber: "Phone number",
        eventDate: "Event date",
        eventLocation: "Event location",
        eventType: "Event type",
        estimatedGuests: "Estimated number of guests",
        preferredPackage: "Preferred package",
        additionalNotes: "Additional notes"
      },
      placeholders: {
        phoneNumber: "+974",
        eventLocation: "Villa, hotel, majlis, venue",
        estimatedGuests: "Optional",
        additionalNotes:
          "Arrival timing, venue access, hostess requirements, or other details"
      },
      select: {
        eventType: "Select event type",
        preferredPackage: "Select package"
      },
      submit: "Send Booking Request",
      submitting: "Sending Request",
      success:
        "Thank you. Your booking request has been received. Aurelia Moments will contact you soon.",
      error: "Please review the booking request.",
      genericError: "Something went wrong. Please try again soon.",
      eventTypes: {
        "Private Gathering": "Private Gathering",
        Wedding: "Wedding",
        Engagement: "Engagement",
        "Family Celebration": "Family Celebration",
        "Corporate Women's Event": "Corporate Women's Event",
        Other: "Other"
      },
      packages: {
        "Private Gathering": "Private Gathering",
        "Wedding Experience": "Wedding Experience",
        "Signature Luxury Setup": "Signature Luxury Setup",
        "Not sure yet": "Not sure yet"
      }
    },
    contact: {
      eyebrow: "Contact",
      title:
        "Tell us about your event, and we'll help you create a graceful guest experience.",
      location: "Location: Qatar",
      phone: "Phone: +974 0000 0000",
      instagram: "Instagram: @aureliamoments",
      tiktok: "TikTok: @aureliamoments"
    },
    footer: {
      tagline: "Luxury Abaya Valet in Qatar",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      instagram: "Instagram",
      tiktok: "TikTok",
      copyright: "© 2026 Aurelia Moments. Luxury Abaya Valet."
    },
    privacy: {
      title: "Privacy Policy",
      text: "Aurelia Moments uses booking inquiry information only to respond to event requests, coordinate service details, and manage client communication. Admin notes remain private to the Aurelia Moments team."
    },
    terms: {
      title: "Terms of Service",
      text: "Booking requests submitted through this website are inquiries only. Service confirmation, availability, package details, and event logistics are finalized directly with Aurelia Moments."
    }
  },
  ar: {
    meta: {
      title: "Aurelia Moments | خدمة راقية لتنظيم العبايات في قطر",
      description:
        "خدمة راقية لتنظيم العبايات في الأعراس والمناسبات الخاصة والتجمعات النسائية الأنيقة في قطر.",
      keywords: [
        "تنظيم العبايات قطر",
        "خدمة عبايات راقية",
        "تنظيم عبايات الأعراس",
        "مناسبات خاصة قطر",
        "Aurelia Moments"
      ],
      ogAlt: "تجهيز راق لتنظيم العبايات من Aurelia Moments"
    },
    brand: "Aurelia Moments",
    header: {
      nav: {
        home: "الرئيسية",
        experience: "التجربة",
        gallery: "المعرض",
        packages: "الباقات",
        booking: "الحجز",
        contact: "التواصل"
      },
      bookNow: "احجزي الآن",
      menu: "فتح أو إغلاق قائمة التنقل",
      language: "اللغة"
    },
    hero: {
      eyebrow: "Aurelia Moments",
      headline: "خدمة راقية لتنظيم العبايات في مناسبات قطر",
      subheadline:
        "نستقبل عبايات الضيفات، ننظمها بعناية، ونعيدها بسلاسة وأناقة في نهاية المناسبة.",
      primaryCta: "احجزي مناسبتك",
      secondaryCta: "تعرّفي على آلية العمل",
      trustLabels: ["الأعراس", "المناسبات الخاصة", "التجمعات النسائية"]
    },
    about: {
      eyebrow: "رقي في الاستقبال",
      title: "استقبال هادئ وتنظيم راقٍ",
      text: "تقدّم Aurelia Moments خدمة راقية لتنظيم العبايات في الأعراس والمناسبات النسائية الخاصة في قطر. نساعدك على خلق تجربة استقبال منظمة، أنيقة، ومريحة لكل ضيفة."
    },
    experience: {
      eyebrow: "التجربة",
      title: "تجربة راقية لتنظيم العبايات",
      steps: [
        {
          title: "وصول الضيفة",
          text: "تصل الضيفة إلى منطقة الاستقبال المخصصة، ويتم الترحيب بها بكل لطف واهتمام."
        },
        {
          title: "استلام العباءة",
          text: "تُستلم العباءة بعناية واحترام من قِبل المضيفة المسؤولة."
        },
        {
          title: "ترقيم وتنظيم",
          text: "تُعلّق كل عباءة على علاقة أنيقة وتُنظّم بطريقة واضحة وآمنة."
        },
        {
          title: "إرجاع سلس",
          text: "في نهاية المناسبة، تُعاد العباءة إلى صاحبتها بسهولة وبكل رقي."
        }
      ]
    },
    gallery: {
      eyebrow: "المعرض",
      title: "تفاصيل راقية",
      subtitle: "لمسات أنيقة تعكس جودة الخدمة وتنظيمها.",
      labels: {
        rack: "رف العبايات",
        tags: "البطاقات المرقمة",
        hostess: "خدمة المضيفة",
        entrance: "مدخل المناسبة",
        setup: "تجهيز العرس",
        details: "تفاصيل ذهبية"
      }
    },
    packages: {
      eyebrow: "الخدمة",
      title: "باقات الخدمة",
      quoteOnly: "حسب الطلب",
      requestQuote: "طلب عرض",
      items: [
        {
          value: "Private Gathering",
          name: "اللقاءات الخاصة",
          description:
            "مناسبة للتجمعات العائلية الصغيرة والمناسبات الحميمة."
        },
        {
          value: "Wedding Experience",
          name: "تجربة الأعراس",
          description: "مصممة للأعراس والتجمعات النسائية الأكبر."
        },
        {
          value: "Signature Luxury Setup",
          name: "التجهيز الفاخر",
          description:
            "تجربة متكاملة تشمل تنسيقًا راقيًا، مضيفة مسؤولة، وتنظيمًا كاملاً للعبايات."
        }
      ]
    },
    booking: {
      imageEyebrow: "مناسبات قطر",
      imageText: "أخبرينا عن مناسبتك. ننسّق الاستقبال بعناية.",
      eyebrow: "استفسار الحجز",
      title: "استفسري عن الخدمة",
      subtitle:
        "أخبرينا عن مناسبتك، وسنساعدك على خلق تجربة استقبال راقية ومنظمة.",
      labels: {
        fullName: "الاسم الكامل",
        phoneNumber: "رقم الهاتف",
        eventDate: "تاريخ المناسبة",
        eventLocation: "مكان المناسبة",
        eventType: "نوع المناسبة",
        estimatedGuests: "العدد المتوقع للضيفات",
        preferredPackage: "الباقة المفضلة",
        additionalNotes: "ملاحظات إضافية"
      },
      placeholders: {
        phoneNumber: "+974",
        eventLocation: "فيلا، فندق، مجلس، قاعة",
        estimatedGuests: "اختياري",
        additionalNotes: "وقت الوصول، تفاصيل المكان، احتياج المضيفات، أو أي ملاحظات أخرى"
      },
      select: {
        eventType: "اختاري نوع المناسبة",
        preferredPackage: "اختاري الباقة"
      },
      submit: "إرسال طلب الحجز",
      submitting: "جاري إرسال الطلب",
      success:
        "شكرًا لكِ. تم استلام طلبك بنجاح، وسيتواصل معكِ فريق Aurelia Moments قريبًا.",
      error: "يرجى مراجعة بيانات طلب الحجز.",
      genericError: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى قريبًا.",
      eventTypes: {
        "Private Gathering": "تجمع خاص",
        Wedding: "عرس",
        Engagement: "خطوبة",
        "Family Celebration": "احتفال عائلي",
        "Corporate Women's Event": "فعالية نسائية",
        Other: "أخرى"
      },
      packages: {
        "Private Gathering": "اللقاءات الخاصة",
        "Wedding Experience": "تجربة الأعراس",
        "Signature Luxury Setup": "التجهيز الفاخر",
        "Not sure yet": "لست متأكدة بعد"
      }
    },
    contact: {
      eyebrow: "التواصل",
      title:
        "أخبرينا عن مناسبتك، وسنساعدك على خلق تجربة استقبال راقية لكل ضيفة.",
      location: "الموقع: قطر",
      phone: "الهاتف: +974 0000 0000",
      instagram: "إنستغرام: @aureliamoments",
      tiktok: "تيك توك: @aureliamoments"
    },
    footer: {
      tagline: "خدمة راقية لتنظيم العبايات في قطر",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      instagram: "إنستغرام",
      tiktok: "تيك توك",
      copyright: "© 2026 Aurelia Moments. جميع الحقوق محفوظة."
    },
    privacy: {
      title: "سياسة الخصوصية",
      text: "تستخدم Aurelia Moments بيانات استفسارات الحجز للرد على الطلبات، وتنسيق تفاصيل الخدمة، وإدارة التواصل مع العميلات فقط. تبقى الملاحظات الداخلية خاصة بفريق Aurelia Moments."
    },
    terms: {
      title: "الشروط والأحكام",
      text: "طلبات الحجز المرسلة عبر الموقع هي طلبات استفسار فقط. يتم تأكيد الخدمة، والتوفر، وتفاصيل الباقة، وترتيبات المناسبة مباشرة مع فريق Aurelia Moments."
    }
  }
} as const;

export type Messages = (typeof messages)[Locale];

export function getMessages(locale: Locale) {
  return messages[locale];
}
