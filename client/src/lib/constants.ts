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
      id: 'ticket-draws',
      title: 'Ticket Draws',
      shortDescription: 'Feature-rich Lottery app with secure payment integration and automated winner declaration.',
      description: 'Developed a feature-rich Lottery app with separate server-side and user-side modules. Admins can launch draws from the backend, while users submit tickets to participate. Implemented secure API integration, user authentication, and email verification for both account creation and updates. Users can manage profiles with update/delete options, while payments are seamlessly integrated for transactions. If a user\'s ticket matches the announced draw, the app automatically declares the winner, ensuring transparency, reliability, and smooth user experience.',
      image: '/project_images/lotteryCollage.jpg',
      techStack: ['Java', 'XML', 'Firebase', 'REST API', 'Firebase Notifications', 'Login Auth'],
      category: 'Lottery App',
      githubUrl: null,
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.growmoredevs.thefreelottery',
      features: ['Secure payment integration', 'Automated winner declaration', 'Email verification', 'Admin dashboard', 'Real-time draw updates']
    },
    {
      id: 'fussball-europa',
      title: 'FUSSBALL EUROPA',
      shortDescription: 'Lightweight European Fußball app with modern UI for team history and match statistics.',
      description: 'Developed a lightweight and responsive European Fußball app with a modern and intuitive UI. The app allows users to explore their favorite teams\' complete history, track match records, and view detailed statistics with just a few taps. Designed with performance and user engagement in mind, it ensures smooth navigation, fast loading, and a visually appealing experience. Built with best practices in Android development, the app balances functionality with an attractive design, making it a go-to solution for football enthusiasts who want quick access to team insights and match data.',
      image: '/project_images/fussballCollage.jpg',
      techStack: ['Java', 'XML', 'Firebase', 'REST API', 'Firebase Notifications', 'Firebase Auth'],
      category: 'Sports & Entertainment',
      githubUrl: null,
      playStoreUrl: 'https://play.google.com/store/apps/details?id=barca99com.androidapp',
      features: ['Team history tracking', 'Match statistics', 'Fast loading', 'Modern UI/UX', 'Real-time updates']
    },
    {
      id: 'grhi-health-catalyst',
      title: 'GRHI Health Catalyst',
      shortDescription: 'Healthcare app with multi-language support and offline functionality for health management.',
      description: 'Developed a healthcare app using XML, Kotlin, and API integration, enabling secure login and signup. Users can add family members, log daily health reports, and easily view submitted records. The app supports multiple languages to ensure accessibility for diverse users. Implemented both online and offline functionality, allowing reports to be saved without internet access and automatically synced with the server once connectivity is restored. Focused on delivering a reliable, user-friendly, and scalable solution for healthcare management.',
      image: '/project_images/catalystCollage.jpg',
      techStack: ['Java', 'XML', 'Firebase', 'REST API', 'Room', 'Firebase Auth'],
      category: 'Health',
      githubUrl: null,
      playStoreUrl: 'https://play.google.com/store/apps/details?id=catalyst.lob.group',
      features: ['Multi-language support', 'Offline functionality', 'Family health tracking', 'Auto-sync', 'Secure data storage']
    },
    {
      id: 'versus-sports-simulator',
      title: 'Versus Sports Simulator',
      shortDescription: 'Sports analytics app trusted by handicappers for over 10 years with accurate predictions.',
      description: 'Developed and maintained Versus Sports Simulator, a sports analytics app trusted by handicappers for over 10 years. The app delivers accurate game predictions, team rankings, and detailed statistics across hundreds of matchups. Enhanced user decision-making for betting through data-driven insights, supported by intuitive data visualization and analytics features. Integrated a subscription model with premium multi-sport coverage while optimizing performance, reliability, and usability to serve both professional and casual users effectively.',
      image: '/project_images/versusCollage.jpg',
      techStack: ['Java', 'XML', 'Firebase', 'REST API', 'Firebase Notifications'],
      category: 'Sports & Entertainment',
      githubUrl: null,
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.compughter.ratings',
      features: ['Game predictions', 'Team rankings', 'Multi-sport coverage', 'Subscription model', 'Data visualization']
    },
    {
      id: 'my-locksmith',
      title: 'My Locksmith',
      shortDescription: 'All-in-one locksmith service app for key requests and maintenance in three simple steps.',
      description: 'My Locksmith is your all-in-one solution for locksmith services, designed to make key requests and maintenance easy and hassle-free. With just a few taps, you can explore a complete list of our professional locksmith services, from lock repair and replacement to key cutting and duplication. The app provides a simple and intuitive way to connect with our team, submit service requests, and order new keys in only three quick steps. Whether you need emergency locksmith help or routine maintenance, Order My Key ensures fast, reliable, and convenient service directly from your phone.',
      image: '/project_images/orderMyKeyCollage.jpg',
      techStack: ['Java', 'XML', 'Firebase', 'REST API', 'Room Database'],
      category: 'Business',
      githubUrl: null,
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.danco.discount.lock.smith',
      features: ['Service booking', 'Key ordering', 'Emergency services', 'Service tracking', 'Easy navigation']
    },
    {
      id: 'event-management',
      title: 'Event Management',
      shortDescription: 'Modern event management system with real-time chat and admin controls for event organization.',
      description: 'Developed an Event Management System in Java and XML with Firebase integration to deliver a modern and efficient Android app. Users can sign up, log in, reset passwords, view events, update profiles, and chat in real time. Admins can upload, update, and delete events with ease. Firebase Authentication and Realtime Database ensure secure, real-time data handling. Designed with a sleek UI and responsive experience, the app streamlines event creation, attendee management, and administration for both users and organizers.',
      image: '/project_images/eventManagementCollage.jpg',
      techStack: ['Java', 'XML', 'Firebase', 'REST API', 'Room Database'],
      category: 'Local Business',
      githubUrl: 'https://github.com/Salmanhy074/Event-Management/',
      playStoreUrl: null,
      features: ['Real-time chat', 'Admin dashboard', 'Event CRUD', 'User authentication', 'Password reset']
    },
    {
      id: 'attendance-management-system',
      title: 'Attendance Management System',
      shortDescription: 'Student attendance tracking app with PDF export and automatic absentee tracking.',
      description: 'Developed an Attendance Management System Android app using Java, XML, and Firebase Authentication & Storage. The system enables secure login/registration, student attendance tracking, and exporting/sharing records. Users can view student lists, mark daily attendance at specific times, and automatically track absentees. Attendance data can be exported or shared in PDF format with details of present/absent days across selected dates. Built with a responsive design, it works seamlessly across devices, ensuring reliability for teachers and administrators.',
      image: '/project_images/attendanceSystemCollage.jpg',
      techStack: ['Java', 'XML', 'Firebase', 'REST API', 'Room Database', 'Firestore', 'Realtime Database'],
      category: 'Office Management',
      githubUrl: 'https://github.com/Salmanhy074/Attendance-System/',
      playStoreUrl: null,
      features: ['PDF export', 'Automatic absentee tracking', 'Time-based attendance', 'Multi-user support', 'Data sharing']
    },
    {
      id: 'csm-logistics',
      title: 'CSM Logistics',
      shortDescription: 'Real-time parcel tracking app with shipment history and instant delivery notifications.',
      description: 'Developed a mobile application that allows users to track parcels in real time directly from their mobile devices, ensuring full visibility of shipments at every stage. The app provides a complete shipment history, enabling users to review past deliveries and monitor ongoing ones. It also delivers instant alerts and notifications about delays, delivery updates, or issues, helping users stay informed on the move. Designed with a clean and intuitive interface, the app makes parcel tracking simple, fast, and accessible anywhere, enhancing customer convenience and trust in the logistics process.',
      image: '/project_images/csm_collage..jpg',
      techStack: ['Java', 'XML', 'Firebase', 'REST API', 'Room Database', 'Realtime Database'],
      category: 'Business',
      githubUrl: null,
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.logicstics.csm',
      features: ['Real-time tracking', 'Shipment history', 'Push notifications', 'Delivery updates', 'Clean interface']
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

  // Professional Skillset
  PROFESSIONAL_SKILLSET: [
    { name: 'Java', icon: 'Coffee' },
    { name: 'Kotlin', icon: 'Code' },
    { name: 'XML', icon: 'Code' },
    { name: 'Documentation', icon: 'Layout' },
    { name: 'Flutter', icon: 'Smartphone' },
    { name: 'Figma', icon: 'Layers' },
    { name: 'MySQL', icon: 'Database' },
    { name: 'Git', icon: 'Cpu' }
  ],

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

