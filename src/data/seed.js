// All demo content for Curriculum Bridge — matches the approved design mockups.

export const DASHBOARD = {
  academicYear: "ACADEMIC YEAR 2023/24",
  studentName: "Fatima",
  semesterPct: 72,
  intro:
    "Your semester is 72% complete. Here's how your current academic trajectory aligns with the evolving tech landscape.",
  radar: {
    labels: ["Architecture", "Data Ops", "Security", "UX Design", "API Dev", "DevOps"],
    academic: [0.66, 0.6, 0.52, 0.48, 0.56, 0.5],
    industry: [0.84, 0.78, 0.72, 0.68, 0.76, 0.86],
  },
  gaps: [
    {
      n: "01",
      title: "Serverless Architecture",
      desc: "Required for 85% of Senior DevOps roles in your tracked region.",
      hot: true,
    },
    {
      n: "02",
      title: "NoSQL Data Modeling",
      desc: "High demand in full-stack engineering vacancies.",
      hot: false,
    },
  ],
  marketFit: "B+",
  skillRank: "Top 15%",
  projects: [
    {
      id: "lambda",
      tag: "Gap Focused",
      tagTone: "green",
      title: "AWS Lambda Event Orchestration",
      desc: "Build a triggered pipeline using serverless functions.",
      due: "Due in 14 days",
      art: "servers",
    },
    {
      id: "dynamo",
      tag: "Core Curriculum",
      tagTone: "navy",
      title: "DynamoDB Schema Optimization",
      desc: "Redesign a relational schema for NoSQL performance.",
      due: "Due in 5 days",
      art: "swirl",
    },
    {
      id: "iam",
      tag: "Optional",
      tagTone: "gray",
      title: "Identity Access Management",
      desc: "Implement OAuth2.0 and JWT in a demo environment.",
      due: "Self-paced",
      art: "dash",
    },
  ],
};

export const WORKSPACE = {
  projectLabel: "ACTIVE PROJECT",
  projectTitle: "Real-time Weather API",
  progress: 75,
  progressStep: "Step 3 of 4: API Integration & Data Binding",
  task: {
    title: "Connect OpenWeatherMap API",
    desc: "Implement the asynchronous fetch request to retrieve data from the OpenWeatherMap endpoint. Ensure you handle potential errors using a try-catch block and update the state accordingly.",
    snippet: "fetch(`api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)",
  },
  badge: {
    label: "UPCOMING",
    title: "API Wizard Badge",
    desc: "Earn this badge by successfully fetching and displaying external data with 90% accuracy.",
  },
  community: [
    { initials: "SM", name: "Sarah M. just completed Step 2", time: "2 mins ago", icon: "check", tint: "#0C7B66" },
    { initials: "AL", name: "Alex L. shared a resource", time: "15 mins ago", icon: "link", tint: "#14304F" },
    { initials: "LK", name: "Leo K. is asking for help", time: "1 hr ago", icon: "chat", tint: "#7C5CBF" },
  ],
  banner: {
    big: "Mastering",
    rest: "Async JavaScript",
    sub: "A 12-minute deep-dive matched to your current task.",
  },
  student: { name: "John Doe", initials: "JD", role: "Beta Student" },
  chatSeed: [
    {
      from: "tutor",
      time: "10:42 AM",
      text: "Hi John! I see you're working on the **API Integration**. Having trouble with the `fetch` syntax or the response mapping?",
    },
    {
      from: "me",
      time: "10:43 AM",
      text: "I'm getting a 401 Unauthorized error. I think it's the API key.",
    },
    {
      from: "tutor",
      time: "10:43 AM",
      text: "A 401 usually means the key isn't being sent correctly in the headers. Double-check if you're using the `?appid=` query param as required by OpenWeatherMap.",
    },
  ],
};

export const QUEUE = {
  pending: 6,
  tracks: 4,
  items: [
    {
      id: "web-frameworks",
      icon: "code",
      iconTone: "gray",
      title: "Intro to Web Frameworks",
      tag: "COURSE UPDATE",
      tagTone: "teal",
      note: "Suggested by Industry Engine",
      impact: 78,
      reviewer: "Dr. Emily Chen (Curriculum Lead)",
      rationale: [
        {
          icon: "trend",
          title: "Component frameworks in 54% of postings",
          desc: "React and Vue dominate regional frontend vacancies for junior roles.",
        },
        {
          icon: "spark",
          title: "Refreshes CS205 Intro to JS",
          desc: "Replaces the legacy jQuery unit with component-based patterns.",
        },
      ],
    },
    {
      id: "cloud-native",
      icon: "cloud",
      iconTone: "mint",
      title: "Cloud-Native API Development",
      tag: "NEW MODULE RECOMMENDATION",
      tagTone: "teal",
      note: "Semantic Alignment Level: 92%",
      impact: 92,
      reviewer: "Dr. Emily Chen (Curriculum Lead)",
      defaultOpen: true,
      rationale: [
        {
          icon: "trend",
          title: "Market Demand for Cloud-Native APIs (68%)",
          desc: "Analysis of 12,000 regional job postings shows a surge in REST/gRPC requirements.",
        },
        {
          icon: "spark",
          title: "Fills Sem 3 backend gap",
          desc: "Identified structural missing link between Basic Java and Distributed Systems.",
        },
      ],
    },
    {
      id: "graphql",
      icon: "braces",
      iconTone: "gray",
      title: "Advanced GraphQL Patterns",
      tag: "ELECTIVE UPDATE",
      tagTone: "soft",
      note: "Trending Skill: High Growth",
      impact: 71,
      reviewer: "Dr. Emily Chen (Curriculum Lead)",
      rationale: [
        {
          icon: "trend",
          title: "GraphQL mentions up 31% QoQ",
          desc: "Growth concentrated in fintech and gov-tech vacancies across the region.",
        },
        {
          icon: "spark",
          title: "Extends the Cloud-Native module",
          desc: "Natural elective sequence after REST/gRPC foundations are in place.",
        },
      ],
    },
  ],
};

export const HEALTH = {
  title: "Curriculum Health Report",
  subtitle: "Institutional Academic Performance & Industry Alignment Analysis",
  healthIndex: 72,
  alignment: {
    title: "Strong Alignment",
    desc: "Your curriculum is performing above the regional average for Computer Science programs.",
  },
  trend: {
    title: "Skill Alignment Trend",
    subtitle: "Market Demand vs. Curriculum Coverage (12 Months)",
    months: ["JAN 24", "MAR 24", "JUN 24", "SEP 24", "DEC 24"],
    coverage: [30, 32, 34, 36, 38, 40, 41, 43, 44, 46, 48, 52],
    demand: [34, 40, 47, 54, 60, 63, 66, 70, 72, 75, 78, 83],
  },
  outdated: [
    { title: "Legacy PHP Patterns", course: "Course: CS301 Web Dev I", pill: "Phase Out" },
    { title: "Physical Server Management", course: "Course: IT402 Systems Admin", pill: "Replace" },
    { title: "jQuery Architecture", course: "Course: CS205 Intro to JS", pill: "Update" },
  ],
  missing: [
    { title: "Vector Databases", course: "Recommended for: CS450 AI/ML", pill: "Critical Gap" },
    { title: "Prompt Engineering", course: "Recommended for: GEN101 Literacy", pill: "New Skill" },
    { title: "Cloud Native Security", course: "Recommended for: CS380 Cybersecurity", pill: "High Demand" },
  ],
  plan: [
    {
      courseId: "CS301",
      courseName: "Full-Stack Web",
      change: "Replace Unit 3 'LAMP Stack' with 'Modern MERN & Next.js'",
      bolts: 3,
      effort: "Moderate (New Labs)",
    },
    {
      courseId: "CS450",
      courseName: "Artificial Intelligence",
      change: "Integrate 'Vector Search & Embeddings' module into Syllabus",
      bolts: 4,
      effort: "High (Faculty Training)",
    },
  ],
  nextSteps: {
    title: "Next Steps: Faculty Alignment Workshop",
    desc: "Based on these findings, we recommend a curriculum audit session scheduled for next week to finalize module transitions.",
    cta: "Schedule Session",
  },
};

export const REPORTS = [
  { id: "r1", title: "Institutional Health Report — Q2", meta: "PDF · refreshed weekly" },
  { id: "r2", title: "Cohort Skill Audit — SE 2023/24", meta: "CSV · refreshed nightly" },
  { id: "r3", title: "Market Alignment Brief — GCC Region", meta: "PDF · refreshed monthly" },
];
