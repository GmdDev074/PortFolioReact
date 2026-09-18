import type { ProjectDetail } from "@/types/project";

const whisperrImages = [
  "/projects/whisperr/Whisperr1.webp",
  "/projects/whisperr/Whisperr2.webp",
  "/projects/whisperr/Whisperr3.webp",
  "/projects/whisperr/Whisperr4.webp",
  "/projects/whisperr/Whisperr5.webp",
  "/projects/whisperr/Whisperr6.webp",
  "/projects/whisperr/Whisperr7.webp",
  "/projects/whisperr/Whisperr8.webp",
  "/projects/whisperr/Whisperr9.webp",
  "/projects/whisperr/Whisperr10.webp",
];

export const whisperrDetail: ProjectDetail = {
  id: "whisperr",
  name: "Whisperr",
  tagline: "Live voice translator with real-time transcription, translation, and floating subtitles.",
  summary:
    "Whisperr delivers the fastest real-time voice transcription and translation across 100+ languages — for business calls, in-person meetings, travel, entertainment, and language learning. Built natively for iOS and Android with MVVM architecture, streaming audio pipelines, and proactive subtitle rendering that breaks language barriers instantly.",
  category: "mobile",
  links: {
    playStore:
      "https://play.google.com/store/apps/details?id=com.whisperr.whisperr",
    appStore:
      "https://apps.apple.com/us/app/live-voice-translator-whisperr/id6504528888",
  },
  images: whisperrImages,
  servicesSectionTitle: "Four Modes, One Translator",
  architectureSectionTitle: "Streaming Audio, Built for Latency",
  architectureSectionIntro:
    "A layered architecture on iOS and Android keeps capture, transcription, translation, and spoken output in sync across long sessions.",
  flowsSectionTitle: "From Language Pick to Live Subtitles",
  devSectionTitle: "Low-Latency Streaming & Session Resilience",
  featuresSectionTitle: "Built to Break Language Barriers",
  services: [
    {
      title: "Live Voice Translation",
      description:
        "Two-way simultaneous translation in 100+ languages. Speak naturally — Whisperr transcribes, translates, and speaks the result in real time through the device microphone.",
    },
    {
      title: "Floating Subtitles",
      description:
        "Overlay translated subtitles on video playing on the same device. Watch foreign news, entertainment, or lectures without a language barrier — subtitles follow the audio live.",
    },
    {
      title: "Conference & Meeting Mode",
      description:
        "Optimized for Zoom, Teams, Meet, and in-person meetings. Capture audio from speakers or microphone and translate continuously for business and travel use cases.",
    },
    {
      title: "Language Learning",
      description:
        "Hear what is actually spoken in the target language with real-time transcription. Practice speaking and verify pronunciation against live translated output.",
    },
  ],
  features: [
    "Two-way simultaneous translation in 100+ languages",
    "Real-time speech transcription from device microphone",
    "Floating subtitles over on-device video playback",
    "Real-time spoken translation output in your language",
    "Business conference call support (Zoom, Teams, Meet audio capture)",
    "In-person meeting translation mode",
    "Travel mode for unfamiliar languages abroad",
    "Language learning with live transcription verification",
    "Live in-app chat support",
    "Weekly and yearly subscription plans with free trial",
  ],
  techStack: [
    {
      category: "iOS",
      items: [
        "Swift",
        "UIKit",
        "MVVM",
        "Combine",
        "Speech Framework",
        "AVFoundation",
        "StoreKit",
      ],
    },
    {
      category: "Android",
      items: [
        "Java",
        "XML Layouts",
        "MVVM",
        "LiveData",
        "SpeechRecognizer API",
        "MediaProjection",
        "Google Play Billing",
      ],
    },
    {
      category: "AI & Translation",
      items: [
        "Real-time STT engine",
        "Neural machine translation",
        "Streaming audio pipeline",
        "100+ language models",
        "TTS output synthesis",
      ],
    },
    {
      category: "Integrations",
      items: [
        "In-app subscriptions",
        "Live chat support SDK",
        "Firebase Analytics",
        "Audio session management",
      ],
    },
  ],
  architecture: [
    {
      title: "View Layer",
      description:
        "Native UI renders translation sessions, floating subtitle overlays, language pickers, and subscription screens. Subtitle overlay uses platform-specific window management for on-device video.",
    },
    {
      title: "ViewModel Layer",
      description:
        "ViewModels orchestrate audio capture, streaming transcription, translation requests, and TTS playback. Session state (idle, listening, translating, speaking) drives UI reactively.",
    },
    {
      title: "Audio Pipeline",
      description:
        "A dedicated streaming pipeline captures microphone or speaker audio, buffers chunks, and feeds them to the STT engine. Low-latency design keeps subtitles and spoken output in sync with live speech.",
    },
    {
      title: "Translation State Machine",
      description:
        "Clear states — capture, transcribe, translate, render, speak — with error recovery at each step. Network interruptions resume gracefully without losing session context.",
    },
  ],
  flows: [
    {
      step: "01",
      title: "Language Setup",
      description:
        "User selects source and target languages from 100+ options. Preferences persist across sessions for one-tap re-entry into translation mode.",
    },
    {
      step: "02",
      title: "Live Translation",
      description:
        "Microphone captures speech in real time. STT transcribes, the translation engine converts, and TTS speaks the result — all within seconds of the original utterance.",
    },
    {
      step: "03",
      title: "Floating Subtitles",
      description:
        "For on-device video, Whisperr overlays translated subtitles that follow the audio track live — enabling foreign content consumption without switching apps.",
    },
    {
      step: "04",
      title: "Meeting & Travel Mode",
      description:
        "Conference mode captures speaker audio for Zoom/Teams/Meet sessions. Travel mode optimizes for ambient conversation translation in unfamiliar languages.",
    },
    {
      step: "05",
      title: "Subscription & Support",
      description:
        "Weekly or yearly plans unlock full translation. In-app live chat support handles technical issues, billing, and feature requests without leaving the app.",
    },
  ],
  developmentApproach: [
    {
      title: "MVVM with Streaming State",
      description:
        "Both platforms use MVVM where ViewModels manage streaming audio sessions as observable state sequences — transcription chunks, translation results, and TTS events flow reactively to the UI.",
    },
    {
      title: "Low-Latency Audio Pipeline",
      description:
        "Proactive buffering and chunk-based STT keep translation latency minimal. The pipeline starts processing before the speaker finishes — subtitles and speech output feel instant.",
    },
    {
      title: "Cross-Platform Parity",
      description:
        "iOS (Swift) and Android (Java) share the same translation API contracts and session state machine. Feature parity ensures consistent behavior across both app stores.",
    },
    {
      title: "Resilient Session Management",
      description:
        "Network drops, audio interruptions, and app backgrounding are handled with state persistence. Sessions resume proactively when connectivity returns — no lost context.",
    },
  ],
  problem: {
    title: "The Challenge",
    points: [
      "Existing translators couldn't handle real-time, two-way conversation — latency made business meetings and travel conversations impractical.",
      "Watching foreign-language video required switching between apps or missing content entirely — users needed subtitles overlaid directly on playback.",
      "100+ language support with streaming audio demanded a low-latency pipeline that wouldn't drain battery or crash on long sessions.",
      "Conference apps (Zoom, Teams) block overlay permissions — Whisperr needed a speaker-audio capture workaround that still delivered translation.",
    ],
  },
  solution: {
    title: "Our Approach",
    points: [
      "Streaming STT + neural translation + TTS pipeline on iOS and Android — two-way simultaneous translation with sub-second latency.",
      "Floating subtitle overlay for on-device video lets users watch foreign content without leaving the player or switching apps.",
      "MVVM session state machine handles capture → transcribe → translate → speak with graceful recovery at every step.",
      "Conference mode captures speaker audio as a workaround for platform overlay restrictions — keeping business meetings translatable.",
    ],
  },
};
