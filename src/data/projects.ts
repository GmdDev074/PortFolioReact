import type { ProjectListItem } from "@/types/project"

export const projects: ProjectListItem[] = [
  {
    id: "courial",
    name: "Courial",
    tagline: "Premium chauffeur, valet, delivery & concierge — all in one app.",
    category: "mobile",
    featured: true,
    detailPath: "/projects/courial",
    playStore:
      "https://play.google.com/store/apps/details?id=com.courial.user&hl=en",
    appStore: "https://apps.apple.com/us/app/courial/id1521638262",
  },
  {
    id: "versus",
    name: "Versus Sports Simulator",
    tagline: "Sports predictions & power rankings across 13 leagues.",
    category: "mobile",
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
    category: "mobile",
    detailPath: "/projects/fussball",
    playStore:
      "https://play.google.com/store/apps/details?id=barca99com.androidapp",
    appStore: "https://apps.apple.com/bg/app/fussball-europa/id442924872",
  },
  {
    id: "ticketdraws",
    name: "Ticket Draws",
    tagline: "Free sweepstakes — watch an ad, earn a ticket, win big.",
    category: "mobile",
    detailPath: "/projects/ticketdraws",
    playStore:
      "https://play.google.com/store/apps/details?id=com.growmoredevs.thefreelottery",
    appStore: "https://ticket-draws.en.softonic.com/iphone",
  },
  {
    id: "whisperr",
    name: "Whisperr",
    tagline: "Live voice translation with real-time subtitles in 100+ languages.",
    category: "mobile",
    detailPath: "/projects/whisperr",
    playStore:
      "https://play.google.com/store/apps/details?id=com.whisperr.whisperr",
    appStore:
      "https://apps.apple.com/us/app/live-voice-translator-whisperr/id6504528888",
  },
]

export const mobileProjects = projects.filter((p) => p.category === "mobile")
