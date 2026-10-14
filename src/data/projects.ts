import type { ProjectListItem } from "@/types/project"

export const projects: ProjectListItem[] = [
  {
    id: "crowdwave",
    name: "CrowdWave",
    tagline: "Send anything, anywhere — by travelers already on the way.",
    description:
      "Peer-to-peer parcel marketplace connecting senders with verified travelers. Dual Sending / Traveling modes, escrow payments, KYC, live chat, and a full wallet — built for planned routes, not last-mile fleets.",
    category: "mobile",
    featured: true,
    coverImage: "/projects/crowdwave/CrowdWave03.webp",
    tech: ["React Native", "TypeScript", "Stripe", "SignalR"],
    detailPath: "/projects/crowdwave",
    playStore:
      "https://play.google.com/store/apps/details?id=com.crowdwave.courier&hl=en",
  },
  {
    id: "courial",
    name: "Courial",
    tagline: "Premium chauffeur, valet, delivery & concierge — all in one app.",
    description:
      "On-demand lifestyle services in one app — chauffeur rides, valet parking, package delivery, and concierge. Real-time tracking, multi-city support, and native iOS + Android with a shared booking flow.",
    category: "mobile",
    featured: true,
    coverImage: "/projects/courial/Courial04.webp",
    tech: ["Kotlin", "Swift", "MVVM", "Maps"],
    detailPath: "/projects/courial",
    playStore:
      "https://play.google.com/store/apps/details?id=com.courial.user&hl=en",
    appStore: "https://apps.apple.com/us/app/courial/id1521638262",
  },
  {
    id: "versus",
    name: "Versus Sports Simulator",
    tagline: "Sports predictions & power rankings across 13 leagues.",
    description:
      "Power rankings and game projections across major leagues. Compare model lines to sportsbook spreads, simulate matchups, and dig into team ratings — built for fans who want more than scores.",
    category: "mobile",
    coverImage: "/projects/versus/Versus8.webp",
    tech: ["Kotlin", "Swift", "REST APIs"],
    detailPath: "/projects/versus",
    playStore:
      "https://play.google.com/store/apps/details?id=com.compughter.ratings",
    appStore:
      "https://apps.apple.com/us/app/versus-sports-simulator/id658521240",
  },
  {
    id: "fussball",
    name: "Fussball Europa",
    tagline: "European football news, transfers, and rumors — fast & free.",
    description:
      "Fast football news for European clubs — transfers, rumors, and match updates in a clean native reader. Built to stay snappy on Android and iOS for daily fans.",
    category: "mobile",
    coverImage: "/projects/fussball/Fussball01.webp",
    tech: ["Kotlin", "Java", "Android", "iOS"],
    detailPath: "/projects/fussball",
    playStore:
      "https://play.google.com/store/apps/details?id=barca99com.androidapp",
    appStore: "https://apps.apple.com/bg/app/fussball-europa/id442924872",
  },
  {
    id: "ticketdraws",
    name: "Ticket Draws",
    tagline: "Free sweepstakes — watch an ad, earn a ticket, win big.",
    description:
      "Sweepstakes app where users earn free tickets by watching ads or buy entries directly. Tracks earnings and draw status with a clear, responsible-play focused experience.",
    category: "mobile",
    coverImage: "/projects/ticketdraws/TicketDraws1.webp",
    tech: ["Kotlin", "Android", "Ads SDK"],
    detailPath: "/projects/ticketdraws",
    playStore:
      "https://play.google.com/store/apps/details?id=com.growmoredevs.thefreelottery",
  },
  {
    id: "whisperr",
    name: "Whisperr",
    tagline: "Live voice translation with real-time subtitles in 100+ languages.",
    description:
      "Real-time voice transcription and translation for calls, meetings, and travel. Floating subtitles, multi-language support, and low-latency streaming on iOS and Android.",
    category: "mobile",
    coverImage: "/projects/whisperr/Whisperr1.webp",
    tech: ["Kotlin", "Swift", "Speech", "MVVM"],
    detailPath: "/projects/whisperr",
    playStore:
      "https://play.google.com/store/apps/details?id=com.whisperr.whisperr",
    appStore:
      "https://apps.apple.com/us/app/live-voice-translator-whisperr/id6504528888",
  },
]

export const mobileProjects = projects.filter((p) => p.category === "mobile")
