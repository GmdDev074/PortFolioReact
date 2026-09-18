import type { ProjectDetail } from "@/types/project";

const versusImages = [
  "/projects/versus/Versus1.webp",
  "/projects/versus/Versus2.webp",
  "/projects/versus/Versus3.webp",
  "/projects/versus/Versus4.webp",
  "/projects/versus/Versus5.webp",
  "/projects/versus/Versus6.webp",
  "/projects/versus/Versus7.webp",
  "/projects/versus/Versus8.webp",
];

export const versusDetail: ProjectDetail = {
  id: "versus",
  name: "Versus Sports Simulator",
  tagline: "Computer-generated sports predictions, power rankings, and market comparisons across 13 sports.",
  summary:
    "Versus delivers daily sports predictions, team ratings, and a Game Simulator powered by a mathematical model created by mathematician Steve Pugh. Built natively for iOS and Android with MVVM architecture, cross-platform premium sync, and reactive state that keeps predictions and market lines side by side in real time.",
  category: "mobile",
  links: {
    playStore:
      "https://play.google.com/store/apps/details?id=com.compughter.ratings",
    appStore:
      "https://apps.apple.com/us/app/versus-sports-simulator/id658521240",
    website: "https://versussportssimulator.com",
  },
  images: versusImages,
  servicesSectionTitle: "Four Pillars of Versus",
  architectureSectionTitle: "Built for 13 Sports, One Model",
  architectureSectionIntro:
    "A layered architecture on iOS and Android keeps rankings, predictions, and the simulator modular while premium state syncs across app and web.",
  flowsSectionTitle: "Rankings to Simulator Flow",
  devSectionTitle: "Reactive Rankings & Cross-Platform Premium",
  featuresSectionTitle: "Predictions, Rankings, and Unlimited Sims",
  services: [
    {
      title: "Predictions vs. Market",
      description:
        "For every scheduled game, Versus shows projected final score, point spread, and total — placed side by side with the sportsbook's line so users see the gap instantly.",
    },
    {
      title: "Team Rankings",
      description:
        "Overall performance rankings, power rankings, offensive and defensive ratings, schedule strength, and win/loss records for hundreds of professional and college teams.",
    },
    {
      title: "Game Simulator",
      description:
        "Simulate matchups between any two teams at home, away, or neutral site. Free tier offers select matchups; Premium unlocks unlimited simulations with full side-by-side statistics.",
    },
    {
      title: "Cross-Platform Premium",
      description:
        "One Versus Premium subscription unlocks every sport on both the app and versussportssimulator.com. Sign in once — premium access follows across devices.",
    },
  ],
  features: [
    "13 sports: NFL, NBA, MLB, NHL, MLS, UFC, college football & basketball, WNBA, Premier League, La Liga, UFL, and more",
    "Daily updated ratings, predictions, and market lines during season",
    "Projected final score, spread, and total for every scheduled game (Premium)",
    "Side-by-side Versus prediction vs. sportsbook line comparison",
    "Conference and divisional strength rankings",
    "Full-season team summaries and performance analytics",
    "Game Simulator with home/away/neutral site options",
    "One subscription across app and website",
    "Free tier: rankings, summaries, one prediction per sport per day",
    "Ratings powered by Steve Pugh's model — publishing since 2007",
  ],
  techStack: [
    {
      category: "iOS",
      items: ["Swift", "UIKit", "MVVM", "Combine", "StoreKit", "Charts"],
    },
    {
      category: "Android",
      items: [
        "Kotlin",
        "XML Layouts",
        "MVVM",
        "LiveData",
        "StateFlow",
        "Google Play Billing",
      ],
    },
    {
      category: "Backend & Model",
      items: [
        "Ratings computation engine",
        "Prediction API",
        "Market line integration",
        "Subscription management",
        "Daily batch refresh pipeline",
      ],
    },
    {
      category: "Cross-Platform",
      items: [
        "Shared auth & premium sync",
        "Unified subscription state",
        "App + web feature parity",
        "Consistent prediction data models",
      ],
    },
  ],
  architecture: [
    {
      title: "View Layer",
      description:
        "Native UI renders prediction cards, ranking tables, and simulator results. Side-by-side market comparison layouts are built once per platform with shared data contracts.",
    },
    {
      title: "ViewModel Layer",
      description:
        "ViewModels orchestrate sport selection, prediction fetching, premium gating, and simulator inputs. Observable state drives UI updates as daily ratings refresh.",
    },
    {
      title: "Domain & Repository Layer",
      description:
        "Repositories fetch ratings, predictions, and market lines from the backend. The mathematical model runs server-side; mobile apps consume computed results via typed API responses.",
    },
    {
      title: "Subscription State",
      description:
        "Premium status syncs across iOS, Android, and web through a unified auth and subscription service — one login, one subscription, all platforms.",
    },
  ],
  flows: [
    {
      step: "01",
      title: "Sport Selection",
      description:
        "Users browse 13 sports and drill into conferences, divisions, or leagues. Sport context persists across rankings, predictions, and simulator screens.",
    },
    {
      step: "02",
      title: "Rankings & Summaries",
      description:
        "Free tier users explore team rankings, conference strength, and full-season summaries. Data refreshes daily during active seasons.",
    },
    {
      step: "03",
      title: "Predictions & Market Compare",
      description:
        "Premium users see every game's projected score, spread, and total alongside the sportsbook line. The gap is highlighted for quick analysis.",
    },
    {
      step: "04",
      title: "Game Simulator",
      description:
        "Pick two teams, set home/away/neutral, and run a simulation. Side-by-side statistics show projected outcomes based on the ratings model.",
    },
    {
      step: "05",
      title: "Premium Sync",
      description:
        "Subscribe once on any platform. Auth syncs premium access to the app and versussportssimulator.com automatically.",
    },
  ],
  developmentApproach: [
    {
      title: "MVVM with Reactive Bindings",
      description:
        "Both platforms use MVVM with Combine (iOS) and LiveData/StateFlow (Android). Prediction data, premium state, and simulator results propagate reactively from ViewModel to UI.",
    },
    {
      title: "Cross-Platform State Sync",
      description:
        "Subscription and auth state are shared across iOS, Android, and web. Users sign in once and premium features unlock everywhere — no duplicate purchases.",
    },
    {
      title: "Proactive Daily Refresh",
      description:
        "Ratings and predictions refresh automatically during season. Background sync and push-ready architecture keep data current without user-initiated refresh.",
    },
    {
      title: "Modular Sport Architecture",
      description:
        "Each sport plugs into shared ranking, prediction, and simulator infrastructure. Adding a new sport means extending the model — not rewriting the app.",
    },
  ],
  problem: {
    title: "The Challenge",
    points: [
      "Sports fans wanted model-driven predictions compared directly against sportsbook lines — not just raw numbers in isolation.",
      "Covering 13 sports with hundreds of teams required a scalable architecture that wouldn't break as new leagues were added.",
      "Premium subscribers expected seamless access across mobile app and website without managing separate accounts.",
      "Daily rating refreshes during season demanded efficient data pipelines and reactive UI updates on both platforms.",
    ],
  },
  solution: {
    title: "Our Approach",
    points: [
      "Side-by-side prediction vs. market comparison UI on iOS and Android — the Versus number and the sportsbook number in one view.",
      "MVVM architecture with modular sport plugins scales from college football to UFC without platform-specific rewrites.",
      "Unified subscription and auth sync across app and versussportssimulator.com — one purchase, all platforms.",
      "Reactive state management ensures rankings, predictions, and simulator results update automatically as daily data refreshes.",
    ],
  },
};
