import type { ProjectDetail } from "@/types/project";

const ticketDrawsImages = [
  "/projects/ticketdraws/TicketDraws1.webp",
  "/projects/ticketdraws/TicketDraws2.webp",
  "/projects/ticketdraws/TicketDraws3.webp",
  "/projects/ticketdraws/TicketDraws4.webp",
  "/projects/ticketdraws/TicketDraws5.webp",
  "/projects/ticketdraws/TicketDraws6.webp",
  "/projects/ticketdraws/TicketDraws7.webp",
  "/projects/ticketdraws/TicketDraws8.webp",
  "/projects/ticketdraws/TicketDraws9.webp",
  "/projects/ticketdraws/TicketDraws10.webp",
  "/projects/ticketdraws/TicketDraws11.webp",
];

export const ticketDrawsDetail: ProjectDetail = {
  id: "ticketdraws",
  name: "Ticket Draws",
  tagline: "Free sweepstakes — watch an ad, earn a ticket, and track your winnings.",
  summary:
    "Ticket Draws is a sweepstakes app that lets users join draws without spending a penny — watch a short video ad to earn entries or buy tickets directly. Built natively for iOS and Android with MVVM architecture, reactive state for earnings tracking, and responsible gaming patterns baked into the experience.",
  category: "mobile",
  links: {
    playStore:
      "https://play.google.com/store/apps/details?id=com.growmoredevs.thefreelottery",
    appStore: "https://ticket-draws.en.softonic.com/iphone",
  },
  images: ticketDrawsImages,
  servicesSectionTitle: "Four Ways Ticket Draws Works",
  architectureSectionTitle: "Built for Draws, Ads, and Earnings",
  architectureSectionIntro:
    "A layered architecture on iOS and Android keeps draw state, ad rewards, and earnings tracking consistent and trustworthy.",
  flowsSectionTitle: "From Draw to Payout",
  devSectionTitle: "Reactive Earnings & Responsible by Design",
  featuresSectionTitle: "Free to Play, Easy to Track",
  services: [
    {
      title: "Ad-Supported Entries",
      description:
        "Watch a short video ad to earn sweepstakes tickets for free. The ad-to-ticket flow is streamlined for minimal friction — watch, earn, enter.",
    },
    {
      title: "Direct Ticket Purchase",
      description:
        "Prefer the direct route? Users can buy tickets in-app alongside the free ad-supported entry path — both flows share the same draw engine.",
    },
    {
      title: "Earnings Tracker",
      description:
        "A dedicated Earnings tab shows winnings history, success tracking, and payout status — keeping users informed about their sweepstakes activity.",
    },
    {
      title: "Responsible Gaming",
      description:
        "Built-in responsible gaming commitments ensure the experience stays fun. Clear messaging, spending limits, and play-smart prompts throughout the app.",
    },
  ],
  features: [
    "Free entry via short video ads — no purchase required",
    "Direct ticket purchase option for users who prefer it",
    "Dedicated Earnings tab to track winnings and success",
    "Multiple active draws with clear odds and entry counts",
    "Push notifications for draw results and new sweepstakes",
    "Responsible gaming messaging and play-smart guidance",
    "Secure in-app payment for ticket purchases",
    "Cross-platform draw sync — enter on iOS or Android",
    "Clean, engaging UI designed for repeat daily use",
    "Ad mediation for optimized video ad delivery",
  ],
  techStack: [
    {
      category: "iOS",
      items: ["Swift", "UIKit", "MVVM", "Combine", "StoreKit", "AdMob SDK"],
    },
    {
      category: "Android",
      items: [
        "Java",
        "XML Layouts",
        "MVVM",
        "LiveData",
        "Google Play Billing",
        "AdMob SDK",
      ],
    },
    {
      category: "Backend",
      items: [
        "Draw management engine",
        "Ticket validation service",
        "Earnings & payout API",
        "Ad reward verification",
        "Push notification service",
      ],
    },
    {
      category: "Integrations",
      items: [
        "Video ad mediation",
        "In-app purchases",
        "Firebase Analytics",
        "Firebase Cloud Messaging",
      ],
    },
  ],
  architecture: [
    {
      title: "View Layer",
      description:
        "Native UI on iOS (Swift) and Android (Java/XML) renders draw cards, ad entry flows, earnings dashboards, and ticket purchase screens with platform-native patterns.",
    },
    {
      title: "ViewModel Layer",
      description:
        "ViewModels manage draw state, ad reward callbacks, earnings totals, and purchase flows. Reactive bindings update ticket counts and winnings in real time.",
    },
    {
      title: "Repository Layer",
      description:
        "Repositories handle draw data, ticket submission, ad verification callbacks, and earnings history. Local caching keeps draw lists responsive offline.",
    },
    {
      title: "State Management",
      description:
        "Clear UI states for draw lifecycle — upcoming, active, drawing, completed — plus earnings states (pending, confirmed, paid). Every screen handles transitions gracefully.",
    },
  ],
  flows: [
    {
      step: "01",
      title: "Discover Draws",
      description:
        "Browse active and upcoming sweepstakes. Each draw shows entry count, deadline, and prize details — users pick which draws to enter.",
    },
    {
      step: "02",
      title: "Earn Free Tickets",
      description:
        "Watch a short video ad to earn a free entry. Ad completion triggers backend verification and ticket credit — reflected instantly in the UI.",
    },
    {
      step: "03",
      title: "Buy Tickets",
      description:
        "Alternatively, purchase tickets directly through in-app billing. Purchase confirmation syncs ticket count to the active draw immediately.",
    },
    {
      step: "04",
      title: "Track Earnings",
      description:
        "The Earnings tab aggregates winnings across draws. Users see history, pending payouts, and success metrics in one dashboard.",
    },
    {
      step: "05",
      title: "Results & Re-engagement",
      description:
        "Draw results trigger push notifications. Winners see earnings update proactively; non-winners are surfaced new draws to re-engage.",
    },
  ],
  developmentApproach: [
    {
      title: "MVVM on Both Platforms",
      description:
        "iOS (Swift/Combine) and Android (Java/LiveData) both follow MVVM. Draw logic, ad callbacks, and earnings calculations live in ViewModels — views stay presentation-only.",
    },
    {
      title: "Reactive Earnings State",
      description:
        "Earnings totals, ticket counts, and draw statuses propagate reactively. When an ad completes or a purchase confirms, the UI updates without manual refresh.",
    },
    {
      title: "Proactive Notifications",
      description:
        "Push notifications for draw results, new sweepstakes, and earnings updates keep users engaged proactively — surfacing the next action before they open the app.",
    },
    {
      title: "Responsible by Design",
      description:
        "Gaming responsibility isn't an afterthought — spending prompts, clear odds display, and play-smart messaging are integrated into the draw and purchase flows.",
    },
  ],
  problem: {
    title: "The Challenge",
    points: [
      "Sweepstakes apps often feel predatory — users wanted a free, fun entry path without forced purchases.",
      "Ad-to-ticket flows needed to be seamless: watch ad, verify completion, credit ticket — all without user confusion or double-counting.",
      "Tracking earnings across multiple draws required a clear, trustworthy dashboard — not buried in settings.",
      "Responsible gaming expectations demanded transparent odds, spending awareness, and play-smart messaging throughout.",
    ],
  },
  solution: {
    title: "Our Approach",
    points: [
      "Dual entry paths — free via video ads or direct purchase — sharing one draw engine with consistent ticket validation.",
      "MVVM with reactive earnings state keeps ticket counts and winnings accurate across ad rewards and purchases in real time.",
      "Dedicated Earnings tab with full history and payout tracking — users always know where they stand.",
      "Responsible gaming integrated into every flow: clear odds, spending prompts, and proactive play-smart guidance.",
    ],
  },
};
