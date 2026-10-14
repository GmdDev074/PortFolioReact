import type { ProjectDetail } from "@/types/project";

const crowdwaveImages = [
  "/projects/crowdwave/CrowdWave01.webp",
  "/projects/crowdwave/CrowdWave02.webp",
  "/projects/crowdwave/CrowdWave03.webp",
  "/projects/crowdwave/CrowdWave04.webp",
  "/projects/crowdwave/CrowdWave05.webp",
  "/projects/crowdwave/CrowdWave06.webp",
  "/projects/crowdwave/CrowdWave07.webp",
];

export const crowdwaveDetail: ProjectDetail = {
  id: "crowdwave",
  name: "CrowdWave",
  tagline: "Send anything, anywhere — by travelers already on the way.",
  summary:
    "CrowdWave is a people-to-people parcel marketplace that matches senders with verified travelers heading to the same destination. Built with React Native for iOS and Android, it supports dual Sending / Traveling modes, escrow-style payments, KYC, live order chat, trip capacity, and a full wallet — so parcels move with people who were already going that way.",
  category: "mobile",
  links: {
    playStore:
      "https://play.google.com/store/apps/details?id=com.crowdwave.courier&hl=en",
  },
  images: crowdwaveImages,
  servicesSectionTitle: "One App, Two Ways to Move",
  architectureSectionTitle: "Cross-Platform, Built for Marketplace Scale",
  architectureSectionIntro:
    "A shared React Native codebase keeps Sending and Traveling experiences in sync while isolating auth, orders, wallet, and realtime chat behind clear layers.",
  flowsSectionTitle: "From Listing to Confirmed Delivery",
  devSectionTitle: "Typed Forms, Cached Data & Live Updates",
  featuresSectionTitle: "Built for Trust & Trip Economics",
  services: [
    {
      title: "Send a Package",
      description:
        "Post pickup and destination, photos, weight, and size. See a suggested fare, publish the listing, and review offers from travelers. Choose traveler pickup or drop-off — payment stays held until the receiver confirms delivery with a code.",
    },
    {
      title: "Travel and Earn",
      description:
        "Switch to Traveling, post your trip and capacity, then browse packages along your route. Accept or bid, pick up, deliver, and get paid after a successful drop-off.",
    },
    {
      title: "Wallet & Escrow",
      description:
        "Track available balance, income, expenses, and pending payouts. Withdraw to bank, view earnings charts, and keep escrow releases tied to delivery confirmation.",
    },
    {
      title: "Trust & Messaging",
      description:
        "Identity verification unlocks marketplace features. Live order status, in-app chat, and directions to pickup and drop-off keep both sides aligned while a delivery is active.",
    },
  ],
  features: [
    "Dual Sending / Traveling home modes with role-aware feeds",
    "Post packages with route, weight, size, photos, and package type",
    "Post trips with capacity and browse matching posted packages",
    "Offers / bids between senders and travelers",
    "Escrow-style payment held until delivery confirmation code",
    "KYC identity verification before marketplace access",
    "In-app chat and live order status updates",
    "Wallet with balance, withdrawals, and weekly earnings chart",
    "Google Sign-In and secure email/password auth",
    "Push notifications for orders, offers, and wallet events",
    "Profile management with photo, phone, and preferences",
    "Clothing and sealed-food listings only — planned routes, not last-mile fleets",
  ],
  techStack: [
    {
      category: "Mobile",
      items: [
        "React Native",
        "TypeScript",
        "React Navigation",
        "React Hook Form",
        "Zod",
        "Zustand",
        "TanStack React Query",
      ],
    },
    {
      category: "Realtime & Payments",
      items: [
        "Microsoft SignalR",
        "Stripe React Native",
        "Firebase Cloud Messaging",
      ],
    },
    {
      category: "Platform Services",
      items: [
        "Google Sign-In",
        "Apple Authentication",
        "Geolocation",
        "Image Picker",
        "MMKV",
        "Keychain",
      ],
    },
    {
      category: "Backend Integration",
      items: [
        "REST API client",
        "Secure token auth",
        "Orders & trips endpoints",
        "Wallet & KYC flows",
        "Push notification service",
      ],
    },
  ],
  architecture: [
    {
      title: "UI & Navigation",
      description:
        "React Native screens with bottom tabs for Home, Orders, Chat, Wallet, and Profile. Native stack flows cover auth, package posting, trip details, and profile editing.",
    },
    {
      title: "State & Data Layer",
      description:
        "Zustand holds session and UI preferences; TanStack React Query caches API data for packages, trips, orders, and wallet. Forms use React Hook Form with Zod schemas for reliable validation.",
    },
    {
      title: "Auth & Security",
      description:
        "Email/password and Google Sign-In, with Apple Authentication on iOS. Tokens and secrets stay in Keychain / secure storage; MMKV handles fast local preferences.",
    },
    {
      title: "Realtime & Payments",
      description:
        "SignalR keeps chat and order status live. Stripe powers payments and wallet movements, while FCM delivers push alerts for offers, pickups, and escrow releases.",
    },
  ],
  flows: [
    {
      step: "01",
      title: "Create Account",
      description:
        "Sign up with name, email, phone, and a strong password — or continue with Google. Profile basics sync so the marketplace can personalize Sending and Traveling home.",
    },
    {
      step: "02",
      title: "Choose a Mode",
      description:
        "Toggle Sending or Traveling on Home. Senders see package CTAs and offers; travelers see trip capacity, earnings, and packages posted along their route.",
    },
    {
      step: "03",
      title: "List or Match",
      description:
        "Senders publish a package with route and details. Travelers post a trip, browse listings, then accept or bid. Both sides negotiate inside the same order flow.",
    },
    {
      step: "04",
      title: "Deliver & Confirm",
      description:
        "Active deliveries surface chat, status, and directions. Payment stays protected until the receiver confirms with a code — then the traveler is paid.",
    },
    {
      step: "05",
      title: "Wallet & Withdraw",
      description:
        "Earnings land in the wallet with income, expenses, and pending amounts. Travelers withdraw to bank while senders track escrow and payouts in one place.",
    },
  ],
  developmentApproach: [
    {
      title: "Single Codebase, Native Feel",
      description:
        "React Native + TypeScript ships Sending and Traveling on iOS and Android from one project, with platform-specific auth (Google / Apple) wired cleanly.",
    },
    {
      title: "Schema-Driven Forms",
      description:
        "React Hook Form and Zod keep signup, profile, package posting, and trip creation validated at the edges — fewer invalid API calls and clearer field errors.",
    },
    {
      title: "Cached Marketplace Data",
      description:
        "React Query isolates fetching for packages, trips, orders, and wallet so mode switches and refreshes stay snappy without reinventing loading and error states.",
    },
    {
      title: "Trust Before Transaction",
      description:
        "KYC gates marketplace features, escrow holds funds until confirmation, and chat + notifications keep both parties informed — matching CrowdWave's planned-trip model, not instant courier fleets.",
    },
  ],
  problem: {
    title: "The Challenge",
    points: [
      "Traditional shipping is expensive for small parcels, while empty luggage space on planned trips goes unused.",
      "Senders and travelers needed one marketplace — not separate courier apps — with clear dual roles and matching on real routes.",
      "Trust and money movement had to be first-class: identity checks, escrow until delivery confirmation, and a transparent wallet.",
      "iOS and Android had to share the same product logic for packages, trips, offers, chat, and KYC without doubling delivery cost.",
    ],
  },
  solution: {
    title: "Our Approach",
    points: [
      "People-to-people parcel matching: post packages or trips, bid/accept offers, and move clothing or sealed food with verified travelers already on the way.",
      "Dual-mode Home (Sending / Traveling) so one account can switch context without losing packages, orders, chat, or wallet.",
      "React Native architecture with typed forms, React Query caching, SignalR chat/status, Stripe payments, and FCM push — production-ready on both stores' platforms.",
      "Escrow + KYC + delivery confirmation codes turn informal trip capacity into a controlled marketplace experience.",
    ],
  },
};
