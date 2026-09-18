import type { ProjectDetail } from "@/types/project";

const fussballImages = [
  "/projects/fussball/Fussball01.webp",
  "/projects/fussball/Fussball02.webp",
  "/projects/fussball/Fussball03.webp",
  "/projects/fussball/Fussball04.webp",
  "/projects/fussball/Fussball05.webp",
];

export const fussballDetail: ProjectDetail = {
  id: "fussball",
  name: "Fussball Europa",
  tagline: "The number one source for international football — news, transfers, and rumors.",
  summary:
    "Fussball Europa delivers fast, editorially curated football news across Europe's biggest leagues. Built natively for iOS and Android with MVVM architecture, reactive state management, and a personalized feed engine that keeps fans connected to their clubs in real time.",
  category: "mobile",
  links: {
    playStore:
      "https://play.google.com/store/apps/details?id=barca99com.androidapp",
    appStore: "https://apps.apple.com/bg/app/fussball-europa/id442924872",
    website: "https://www.fussballeuropa.com",
  },
  images: fussballImages,
  servicesSectionTitle: "News, Transfers, Favorites, Stars",
  architectureSectionTitle: "Built for Match-Day Volume",
  architectureSectionIntro:
    "A layered architecture on iOS and Android keeps the feed, transfers, and player database fast during match days and transfer windows.",
  flowsSectionTitle: "From Favorites to Breaking News",
  devSectionTitle: "Reactive Feed & Proactive Personalization",
  featuresSectionTitle: "Built for Football Fans",
  services: [
    {
      title: "News Feed",
      description:
        "Editorially selected football news from Germany, Spain, Italy, England, and France — updated in seconds with a clean, scannable reading experience.",
    },
    {
      title: "Personalized Favorites",
      description:
        "Choose favorite clubs and build a custom feed. Push notifications ensure fans never miss breaking news about the teams they care about most.",
    },
    {
      title: "Transfer Hub",
      description:
        "Track confirmed transfers with fees, records, and histories — plus editorial transfer rumors with likelihood assessments from the Fussball Europa team.",
    },
    {
      title: "Player Profiles",
      description:
        "Detailed Stars & Talents profiles with playing time, statistics, transfer history, and titles — all in one searchable player database.",
    },
  ],
  features: [
    "Breaking news from Bundesliga, La Liga, Premier League, Serie A, and Ligue 1",
    "Champions League, national teams, and major tournament coverage",
    "Personalized feed based on favorite clubs",
    "Push notifications for team-specific news",
    "Transfer rumors with editorial likelihood ratings",
    "Confirmed transfers with fees and transfer records",
    "Player profiles with stats, titles, and history",
    "Dark mode for comfortable reading",
    "Completely free — by football fans, for football fans",
    "Social integration with Facebook and Instagram communities",
  ],
  techStack: [
    {
      category: "iOS",
      items: ["Swift", "UIKit", "MVVM", "Combine", "Push Notifications", "Core Data"],
    },
    {
      category: "Android",
      items: [
        "Kotlin",
        "XML Layouts",
        "MVVM",
        "LiveData",
        "StateFlow",
        "Firebase Cloud Messaging",
      ],
    },
    {
      category: "Backend & CMS",
      items: [
        "Content API",
        "Editorial workflow",
        "Push notification service",
        "Transfer data pipeline",
        "Player statistics engine",
      ],
    },
    {
      category: "Cross-Platform",
      items: [
        "Shared content models",
        "Unified feed architecture",
        "Consistent UI state patterns",
        "fussballeuropa.com sync",
      ],
    },
  ],
  architecture: [
    {
      title: "View Layer",
      description:
        "Native UI on iOS (Swift/UIKit) and Android (Kotlin/XML) renders news cards, transfer tables, and player profiles with platform-appropriate navigation patterns.",
    },
    {
      title: "ViewModel Layer",
      description:
        "ViewModels manage feed state, favorite club selections, and notification preferences. Reactive bindings keep lists and detail screens in sync without manual refresh.",
    },
    {
      title: "Repository Layer",
      description:
        "Repositories abstract the content API, local caching, and offline reading. News, transfers, and player data each have dedicated data sources with shared pagination logic.",
    },
    {
      title: "State Management",
      description:
        "Unidirectional data flow with clearly defined UI states — loading, content, empty, and error — so every screen handles network conditions gracefully.",
    },
  ],
  flows: [
    {
      step: "01",
      title: "Onboarding & Favorites",
      description:
        "Users select favorite clubs during setup. Preferences sync to the backend and drive the personalized feed and push notification targeting.",
    },
    {
      step: "02",
      title: "News Discovery",
      description:
        "Browse editorially curated news by league, club, or topic. Pull-to-refresh and background sync keep content current without user intervention.",
    },
    {
      step: "03",
      title: "Transfer Tracking",
      description:
        "Follow confirmed transfers and editorial rumors. Likelihood ratings and fee data help fans separate signal from noise during transfer windows.",
    },
    {
      step: "04",
      title: "Player Deep Dive",
      description:
        "Tap into Stars & Talents profiles for playing time, stats, transfer history, and titles — all rendered from a unified player data model.",
    },
    {
      step: "05",
      title: "Push & Re-engagement",
      description:
        "Breaking news push notifications bring users back. Deep links route directly to the relevant article, transfer, or player profile.",
    },
  ],
  developmentApproach: [
    {
      title: "MVVM Across Platforms",
      description:
        "Both iOS and Android follow MVVM with platform-native reactive frameworks — Combine on iOS, LiveData/StateFlow on Android — keeping business logic testable and UI layers thin.",
    },
    {
      title: "Reactive Feed Engine",
      description:
        "News and transfer feeds use observable state pipelines. Content updates propagate from repository to ViewModel to UI automatically as new articles publish.",
    },
    {
      title: "Proactive Personalization",
      description:
        "Favorite club selections, reading history, and notification preferences shape the feed proactively — surfacing relevant content before the user searches for it.",
    },
    {
      title: "Cross-Platform Consistency",
      description:
        "Shared content models and API contracts ensure iOS, Android, and fussballeuropa.com deliver the same news, transfers, and player data with platform-native presentation.",
    },
  ],
  problem: {
    title: "The Challenge",
    points: [
      "Football fans needed a single, fast source for news and transfers across multiple European leagues — not fragmented apps per league or country.",
      "Transfer windows generate rumor noise; fans wanted editorial context and likelihood ratings alongside confirmed deals.",
      "Personalization was critical — generic feeds couldn't compete with club-specific news delivered instantly via push.",
      "The app had to handle high-volume content updates during match days and transfer windows without degrading performance.",
    ],
  },
  solution: {
    title: "Our Approach",
    points: [
      "Unified iOS and Android apps covering all major European leagues, Champions League, and national teams in one editorially curated experience.",
      "MVVM with reactive state management keeps feed, transfer, and player screens responsive during peak traffic.",
      "Personalized favorites and push notifications deliver club-specific news proactively — fans stay informed without searching.",
      "Dark mode, offline caching, and graceful loading/error states ensure a polished experience across every network condition.",
    ],
  },
};
