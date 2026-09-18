import type { ProjectDetail } from "@/types/project";

const courialImages = [
  "/projects/courial/Courial01.webp",
  "/projects/courial/Courial02.webp",
  "/projects/courial/Courial03.webp",
  "/projects/courial/Courial04.webp",
  "/projects/courial/Courial05.webp",
  "/projects/courial/Courial06.webp",
  "/projects/courial/Courial07.webp",
  "/projects/courial/Courial08.webp",
  "/projects/courial/Courial09.webp",
  "/projects/courial/Courial010.webp",
];

export const courialDetail: ProjectDetail = {
  id: "courial",
  name: "Courial",
  tagline: "Premium chauffeur & lifestyle services — one app for everything on the go.",
  summary:
    "Courial connects users with trusted service partners for chauffeur rides, valet parking, package delivery, and concierge assistance. Built natively for iOS and Android with a custom backend, real-time tracking, and a scalable MVVM architecture designed for multi-city growth.",
  category: "mobile",
  links: {
    playStore:
      "https://play.google.com/store/apps/details?id=com.courial.user&hl=en",
    appStore: "https://apps.apple.com/us/app/courial/id1521638262",
  },
  images: courialImages,
  servicesSectionTitle: "Four Services, One Seamless App",
  architectureSectionTitle: "MVVM, Built for Scale",
  architectureSectionIntro:
    "A layered architecture on both iOS and Android keeps features modular, testable, and ready for multi-city expansion.",
  flowsSectionTitle: "End-to-End Booking Flow",
  devSectionTitle: "Reactive & Proactive Development",
  featuresSectionTitle: "Built for Convenience & Reliability",
  services: [
    {
      title: "Chauffeur Services",
      description:
        "Book professional drivers for one-way rides or hourly reservations. Set pickup and drop-off, get matched with a nearby driver in minutes, and track the trip live until arrival.",
    },
    {
      title: "Valet Parking",
      description:
        "Skip the parking hunt. Request a valet to park and retrieve your car at restaurants, events, or appointments — handled end-to-end inside the app.",
    },
    {
      title: "Delivery",
      description:
        "Pick-up and drop-off across the city with reliable routing, status updates, and partner assignment built into the same booking flow.",
    },
    {
      title: "Concierge",
      description:
        "From errands to special requests, concierge partners assist with personalized tasks — extending Courial beyond transportation into everyday lifestyle support.",
    },
  ],
  features: [
    "Real-time driver tracking on a live map",
    "Book now or schedule rides in advance",
    "Hourly chauffeur reservations for meetings, tours, and errands",
    "Multiple secure payment options in-app",
    "Saved places for home, work, and frequent destinations",
    "Favorite partners — rebook preferred drivers quickly",
    "Promo codes and checkout discounts",
    "Multi-city support with ongoing expansion",
    "Push notifications for ride status, arrival, and promotions",
    "Secure sign-in via phone, Google, or Apple",
  ],
  techStack: [
    {
      category: "iOS",
      items: ["Swift", "UIKit", "MVVM", "Combine", "Core Location", "MapKit"],
    },
    {
      category: "Android",
      items: [
        "Kotlin",
        "XML Layouts",
        "MVVM",
        "LiveData",
        "StateFlow",
        "Google Maps SDK",
      ],
    },
    {
      category: "Backend",
      items: [
        "Custom REST API",
        "Real-time location sync",
        "Push notification service",
        "Payment gateway integration",
        "Multi-tenant city routing",
      ],
    },
    {
      category: "Integrations",
      items: [
        "Google Sign-In",
        "Apple Sign-In",
        "Phone OTP auth",
        "Firebase Cloud Messaging",
        "In-app payments",
      ],
    },
  ],
  architecture: [
    {
      title: "View Layer",
      description:
        "Native UI on each platform — Swift/UIKit on iOS and Kotlin/XML on Android — focused purely on rendering state and capturing user intent.",
    },
    {
      title: "ViewModel Layer",
      description:
        "Platform ViewModels expose observable state, orchestrate use cases, and keep views free of business logic. Shared patterns across features for consistency and testability.",
    },
    {
      title: "Domain & Repository Layer",
      description:
        "Repositories abstract the custom backend API, caching, and local persistence. Each service module (chauffeur, valet, delivery, concierge) plugs into the same core booking pipeline.",
    },
    {
      title: "Real-time Services",
      description:
        "Location streams, booking status, and partner assignment updates flow through dedicated reactive channels so the UI updates proactively without manual refresh.",
    },
  ],
  flows: [
    {
      step: "01",
      title: "Authentication",
      description:
        "Users sign in with phone OTP, Google, or Apple. Profile and preferences sync to the backend for a personalized experience across devices.",
    },
    {
      step: "02",
      title: "Service Selection",
      description:
        "Choose chauffeur, valet, delivery, or concierge. Saved places and favorite partners surface immediately to reduce repeat booking friction.",
    },
    {
      step: "03",
      title: "Booking & Scheduling",
      description:
        "Book instantly or schedule ahead. Hourly chauffeur reservations, route selection, and promo codes are handled in a unified checkout flow.",
    },
    {
      step: "04",
      title: "Live Tracking",
      description:
        "Once a partner is assigned, the map updates in real time from dispatch through arrival and completion — with push notifications at every milestone.",
    },
    {
      step: "05",
      title: "Payment & Rebooking",
      description:
        "Secure in-app payment closes the loop. Favorite partners and saved addresses make the next booking faster than the first.",
    },
  ],
  developmentApproach: [
    {
      title: "MVVM by Design",
      description:
        "Every feature — booking, tracking, payments, and profile — follows MVVM on both platforms. Views stay thin, ViewModels own state and side effects, and repositories isolate backend complexity.",
    },
    {
      title: "Reactive State Management",
      description:
        "Combine on iOS and LiveData/StateFlow on Android drive UI updates from asynchronous backend events. Booking status, driver location, and payment state propagate automatically.",
    },
    {
      title: "Proactive User Experience",
      description:
        "Push notifications, saved places, and favorite partners anticipate what the user needs next — reducing taps and keeping users informed before they ask.",
    },
    {
      title: "Modular Service Architecture",
      description:
        "Chauffeur, valet, delivery, and concierge share core infrastructure (auth, maps, payments) while keeping service-specific logic isolated for faster iteration.",
    },
  ],
  problem: {
    title: "The Challenge",
    points: [
      "On-demand lifestyle services were fragmented — users needed separate solutions for rides, parking, delivery, and errands.",
      "Manual booking flows created friction: re-entering addresses, no visibility into partner arrival, and no way to rebook trusted drivers.",
      "Scaling to multiple cities required a backend flexible enough to handle different service types without rewriting the mobile apps.",
      "Real-time tracking and notifications had to feel instant on both platforms without compromising battery or reliability.",
    ],
  },
  solution: {
    title: "Our Approach",
    points: [
      "Unified iOS and Android apps under one brand — chauffeur, valet, delivery, and concierge in a single, consistent experience.",
      "MVVM architecture on both platforms with reactive bindings keeps complex booking and tracking logic maintainable as features grow.",
      "Custom backend tailored to Courial's business rules — multi-city routing, partner matching, payments, and live location sync.",
      "Proactive UX patterns — saved places, favorite partners, scheduled bookings, and push updates — so users spend less time booking and more time moving.",
    ],
  },
};
