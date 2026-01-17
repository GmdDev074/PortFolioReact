export const Constants = {
  // Personal Information
  PERSONAL: {
    name: "Muhammad Salman",
    title: "Android Developer",
    email: "salmanhy123456@gmail.com",
    phone: "+92 308 2456659",
    phoneRaw: "923082456659",
    location: "Lahore, Punjab, Pakistan",
    address: {
      street: "",
      city: "Lahore",
      state: "Punjab",
      zip: "",
      country: "Pakistan"
    },
    github: "https://github.com/GmdDev074",
    linkedin: "https://www.linkedin.com/in/muhammad-salman-5672a0203/",
    twitter: "",
    playStore: ""
  },

  // Hero Section
  HERO: {
    badge: "Available for Projects",
    title: "Hi, I'm Muhammad Salman",
    titleHighlight: "Android Developer",
    description: "Crafting beautiful and functional Android applications with modern technologies. Specialized in Kotlin, Jetpack Compose, Firebase, and building scalable mobile solutions.",
    primaryButton: "View My Projects",
    secondaryButton: "Contact Me",
    features: [
      "3+ Years Experience",
      "20+ Published Apps"
    ]
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

  // Projects
  PROJECTS: [
    {
      id: 'ecommerce-app',
      title: 'E-Commerce Mobile App',
      description: 'Full-featured e-commerce application with Firebase backend, real-time cart synchronization, and payment integration.',
      image: '/images/ecommerce-app.jpg',
      techStack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Room Database', 'MVVM'],
      category: 'Mobile App',
      githubUrl: 'https://github.com/username/ecommerce-app',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=...',
      features: ['Real-time sync', 'Offline support', 'Payment gateway', 'User reviews']
    },
    {
      id: 'social-network',
      title: 'Social Network App',
      description: 'Social networking platform with real-time messaging, photo sharing, and Firebase authentication.',
      techStack: ['Kotlin', 'Jetpack Compose', 'Firestore', 'Cloud Functions', 'FCM'],
      category: 'Social Media',
      githubUrl: 'https://github.com/username/social-app',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=...',
      features: ['Real-time chat', 'Push notifications', 'Image upload', 'Social feed']
    },
    {
      id: 'task-manager',
      title: 'Task Manager App',
      description: 'Productivity app with offline-first architecture, Room database, and Material 3 design.',
      techStack: ['Kotlin', 'Jetpack Compose', 'Room Database', 'MVVM', 'Hilt'],
      category: 'Productivity',
      githubUrl: 'https://github.com/username/task-manager',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=...',
      features: ['Offline-first', 'Task synchronization', 'Reminders', 'Categories']
    }
  ],

  // Testimonials
  TESTIMONIALS: [
    {
      name: "John Smith",
      rating: 5.0,
      text: "Excellent Android developer who delivered our app on time and exceeded expectations. Highly professional and skilled.",
      avatar: "JS"
    },
    {
      name: "Sarah Johnson",
      rating: 4.9,
      text: "The best mobile developer we've worked with. Clean code, modern architecture, and great communication throughout the project.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      rating: 5.0,
      text: "Outstanding work on our Android application. The developer's expertise in Kotlin and Jetpack Compose is impressive.",
      avatar: "MC"
    },
    {
      name: "Emily Davis",
      rating: 4.8,
      text: "Professional, responsive, and technically excellent. Our app is now live on the Play Store and performing great!",
      avatar: "ED"
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
    { name: 'WhyMe', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ],

  // Contact Section
  CONTACT_SECTION: {
    subtitle: 'Get In Touch',
    title: "Have a project in mind? Let's build something amazing together.",
    description: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
    formTitle: 'Send Me a Message',
    formEmailPlaceholder: 'your.email@example.com',
    formMessagePlaceholder: 'Your message...',
    formSubmitButton: 'Send Message'
  },

  // Footer
  FOOTER: {
    description: 'Passionate Android developer creating innovative mobile solutions. Let\'s build the next great app together.',
    links: [
      { name: 'WhyMe', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' }
    ],
    social: [
      { name: 'GitHub', href: 'https://github.com/GmdDev074', icon: 'Github' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-salman-5672a0203/', icon: 'Linkedin' }
    ]
  }
} as const

