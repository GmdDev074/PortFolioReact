export const Constants = {
  // Personal Information
  PERSONAL: {
    name: "Muhammad Salman",
    email: "salmanhy123456@gmail.com",
    phone: "+92 308 2456659",
    phoneRaw: "923082456659",
    location: "Lahore, Punjab, Pakistan",
    github: "https://github.com/GmdDev074",
  },

  // Hero Section
  HERO: {
    badge: "Available for Projects",
    title: "Hi, I'm Muhammad Salman",
    titleHighlight: "Android Developer",
    description: "Crafting beautiful and functional Android applications with modern technologies. Specialized in Kotlin, Jetpack Compose, Firebase, and building scalable mobile solutions.",
    primaryButton: "View My Projects",
    secondaryButton: "Contact Me",
    viewResume: "View Resume",
    features: [
      "3+ Years Experience",
      "20+ Published Apps"
    ]
  },

  // Skills section headings
  SKILLS_SECTION: {
    title: "Technologies & Tools",
    subtitle: "Modern tools and technologies I use to build exceptional Android applications",
    toolsIUse: "Tools I use",
    daysICode: "Days I Code",
  },

  // About section
  ABOUT: {
    subtitle: "About Me",
    title: "Why Choose Me",
    description:
      "I bring years of experience in Android development, delivering high-quality mobile applications that exceed expectations.",
  },

  // Process section headings
  PROCESS_SECTION: {
    title: "My Development Process",
    subtitle: "A structured approach to delivering high-quality Android applications",
  },

  // Skills/Technologies
  SKILLS: [
    {
      id: 'kotlin',
      title: 'Kotlin',
      description: 'Primary language for modern Android development. Expert in Kotlin coroutines, flows, and modern language features.',
      icon: 'Code'
    },
    {
      id: 'java',
      title: 'Java',
      description: 'Proficient in Java for Android development, legacy code maintenance, and enterprise applications.',
      icon: 'Coffee'
    },
    {
      id: 'jetpack-compose',
      title: 'Jetpack Compose',
      description: 'Building modern, declarative UIs with Jetpack Compose. Experienced in Material 3 design and custom composables.',
      icon: 'Layout'
    },
    {
      id: 'firebase',
      title: 'Firebase',
      description: 'Comprehensive Firebase integration including Firestore, Realtime Database, Authentication, and Cloud Functions.',
      icon: 'Flame'
    },
    {
      id: 'room-database',
      title: 'Room Database',
      description: 'Local data persistence using Room database with type-safe queries, migrations, and reactive data flows.',
      icon: 'Database'
    },
    {
      id: 'firebase-messaging',
      title: 'Push Notifications',
      description: 'Firebase Cloud Messaging (FCM) implementation for real-time push notifications and in-app messaging.',
      icon: 'Bell'
    },
    {
      id: 'gradle',
      title: 'Gradle',
      description: 'Build automation with Gradle, including multi-module projects, build variants, and dependency management.',
      icon: 'Settings'
    },
    {
      id: 'android-sdk',
      title: 'Android SDK',
      description: 'Deep knowledge of Android SDK APIs, platform features, and best practices for various Android versions.',
      icon: 'Smartphone'
    },
    {
      id: 'sqlite',
      title: 'SQLite',
      description: 'Direct SQLite database management for complex queries and custom database implementations.',
      icon: 'Database'
    },
    {
      id: 'mongodb',
      title: 'MongoDB',
      description: 'Backend database integration with MongoDB for scalable cloud-based data storage and retrieval.',
      icon: 'Server'
    },
    {
      id: 'android-ndk',
      title: 'Android NDK',
      description: 'Native development with Android NDK for performance-critical components and C/C++ integration.',
      icon: 'Cpu'
    },
    {
      id: 'mvvm',
      title: 'MVVM Architecture',
      description: 'Clean architecture patterns including MVVM with ViewModels, LiveData, StateFlow, and dependency injection.',
      icon: 'Layers'
    }
  ],

  // Statistics
  STATS: [
    { value: '20+', label: 'Published Apps' },
    { value: '50+', label: 'Projects Completed' },
    { value: '3+', label: 'Years Experience' },
    { value: '4.8+', label: 'Average Rating' }
  ],

  // Why Choose Me Features
  WHY_CHOOSE_ME: [
    'Proven Track Record',
    'Published Apps on Play Store',
    'Modern Tech Stack',
    'Clean Architecture',
    'On-Time Delivery',
    'Continuous Support'
  ],

  // Development Process Steps
  PROCESS_STEPS: [
    {
      number: '01',
      title: 'Discovery',
      description: 'Understanding your requirements, target audience, and business goals through detailed consultation.'
    },
    {
      number: '02',
      title: 'Design',
      description: 'Creating intuitive UI/UX designs and system architecture aligned with Material Design guidelines.'
    },
    {
      number: '03',
      title: 'Development',
      description: 'Building robust, scalable Android applications using modern technologies and best practices.'
    },
    {
      number: '04',
      title: 'Deployment',
      description: 'Thorough testing, Play Store submission, and ongoing maintenance and updates.'
    }
  ],

  // Navigation Links
  NAV_LINKS: [
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Why Me', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ],

  // Contact Section
  CONTACT_SECTION: {
    subtitle: 'Get In Touch',
    title: "Have a project in mind? Let's build something amazing together.",
    description: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
  },

  // Tools I Use
  TOOLS_I_USE: [
    { name: 'Android Studio', icon: 'Smartphone' },
    { name: 'VS Code', icon: 'Code' },
    { name: 'Git', icon: 'GitBranch' },
    { name: 'GitHub', icon: 'Github' },
    { name: 'Figma', icon: 'PenTool' },
    { name: 'Postman', icon: 'Send' },
    { name: 'Gradle', icon: 'Package' },
    { name: 'Firebase', icon: 'Flame' },
    { name: 'Play Console', icon: 'Play' },
    { name: 'Slack', icon: 'Hash' }
  ],

  // Footer
  FOOTER: {
    description: 'Passionate Android developer creating innovative mobile solutions. Let\'s build the next great app together.',
    quickLinks: 'Quick Links',
    connect: 'Connect',
    allRightsReserved: 'All rights reserved.',
    links: [
      { name: 'Why Me', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' }
    ],
    social: [
      { name: 'GitHub', href: 'https://github.com/GmdDev074', icon: 'Github' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-salman-5672a0203/', icon: 'Linkedin' }
    ]
  }
} as const

