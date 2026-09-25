import { ConsultantProfile, ExperienceItem, ProjectItem, SkillItem, OfficeLocation } from '../types/portfolio';
import dikshaAvatar from '../assets/images/diksha_profile_alpine_square.jpg';

export const DEFAULT_PROFILE: ConsultantProfile = {
  name: "Diksha Agarwal",
  designation: "Assistant Manager · ServiceNow Knowledge Management & Governance",
  practice: "Offices of US-India · Enterprise Technology & Knowledge Governance",
  firm: "Deloitte — Offices of US-India",
  headline: "Assistant Manager with 7+ years at Deloitte specializing in ServiceNow Knowledge Management, stakeholder consulting, solution design, and enterprise governance.",
  summary: "Assistant Manager with 7+ years at Deloitte specializing in ServiceNow Knowledge Management, stakeholder consulting, solution design, and governance. Experienced partnering with global business teams to design scalable knowledge management solutions, configure platform access, establish governance frameworks, and drive user adoption across enterprise teams. Strong background in training, process improvement, and supporting global stakeholders (US-India) through effective knowledge management practices. Additional cross-functional experience spans pricing strategy and governance, audit support coordination, and fraud analysis.",
  email: "dikshaagarwal798@gmail.com",
  phone: "+91 98490 54321",
  location: "Hyderabad, Telangana, India",
  linkedin: "https://linkedin.com/in/dikshaagarwal-605a13a6",
  avatarUrl: dikshaAvatar,
  certifications: [
    "Professional Scrum Master I (PSM I)",
    "ServiceNow IT Leadership — Professional Certificate",
    "Prompt Engineering: ChatGPT & AI",
    "Prompts For Work Success",
    "Atlassian Agile Project Management — Professional Certificate",
    "AI for Business Leaders",
    "Project Management Professional (PMP) — In Progress"
  ],
  statHighlights: [
    { label: "Global Professionals Trained", value: "300+", subtext: "Across Canadian & US teams" },
    { label: "Training Hours Saved", value: "100+", subtext: "SABA automated self-training" },
    { label: "Pricing Productivity Gain", value: "+15%", subtext: "Public Pricing Initiative" },
    { label: "Deloitte Consulting Tenure", value: "7+ Years", subtext: "Continuous career progression" }
  ],
  keyAchievements: [
    "Trained approximately 300 professionals across Canadian business teams on ServiceNow Knowledge Management.",
    "Enabled multiple business units to independently manage Knowledge Management through structured training and governance.",
    "Designed scalable Knowledge Management structures aligned with business requirements, reducing duplication by recommending reuse of existing Knowledge Bases.",
    "Implemented access models using User Criteria and Knowledge Roles.",
    "Acted as a trusted advisor to business teams for Knowledge Management implementation and governance.",
    "Developing a learning curriculum hosted on SABA with 3 modules enabling users to self-train on MySupport/ServiceNow article lifecycle, projected to reduce instructor-led training by 100 hours and additional support effort by 50–60 hours.",
    "Led the Public Pricing initiative at Deloitte, providing strategic direction that contributed to a 15% improvement in team productivity.",
    "Recognized as lead for Public Pricing and ServiceNow initiatives; served as reviewer in the expedited private pricing process.",
    "Led an acquisition project, collaborating closely with directors and partners.",
    "Certified Professional Scrum Master (PSM)."
  ],
  education: [
    {
      degree: "Bachelor of Commerce (B.Com), Business/Commerce, General",
      institution: "St. George's Degree College for Women",
      years: "2014 – 2017"
    }
  ],
  languages: ["English", "Hindi", "Telugu"]
};

export const DEFAULT_EXPERIENCES: ExperienceItem[] = [
  {
    id: "deloitte-am-servicenow",
    role: "Assistant Manager · ServiceNow Knowledge Management & Governance",
    company: "Deloitte — Offices of US-India",
    department: "Enterprise Technology & Governance",
    location: "Hyderabad, Telangana, India",
    startDate: "Jun 2026",
    endDate: "Present",
    current: true,
    clientSector: "Enterprise Operations & Knowledge Governance",
    description: "Partnering with global business teams to understand operational requirements and design enterprise ServiceNow Knowledge Management solutions.",
    responsibilities: [
      "Partner with business teams to understand operational requirements and design ServiceNow Knowledge Management solutions.",
      "Evaluate business requirements and recommend reuse of existing Knowledge Bases to maintain governance and avoid duplication.",
      "Define category and subcategory hierarchies for logical content organization; configure User Criteria and assign Knowledge Roles.",
      "Developing a learning curriculum hosted on SABA with 3 modules to enable users to self-train on MySupport/ServiceNow article lifecycle, projected to reduce instructor-led training by 100 hours and support effort by 50–60 hours.",
      "Serve as advisor to teams to understand requirements for hosting content in MySupport and help bridge content gaps.",
      "Continue to train professionals across different teams on ServiceNow Knowledge Management.",
      "Review and pull reports on a regular basis to ensure articles remain up to date with active content owners, coordinating with owners to keep content current."
    ],
    metrics: [
      { label: "Trained Professionals", value: "300+", subtext: "Canadian & Global teams" },
      { label: "Training Reduction", value: "100 Hrs", subtext: "Self-paced SABA curriculum" },
      { label: "Support Efficiency", value: "50-60 Hrs", subtext: "Fewer ticket inquiries" }
    ],
    technologies: ["ServiceNow KM", "User Criteria", "Knowledge Roles", "SABA Learning", "MySupport", "Agile / Scrum", "PMP"]
  },
  {
    id: "deloitte-sr-analyst-km",
    role: "Senior Analyst · Knowledge Architecture & Solution Design",
    company: "Deloitte — Offices of US-India",
    department: "Knowledge Management & Platform Adoption",
    location: "Hyderabad, Telangana, India",
    startDate: "Aug 2025",
    endDate: "Jun 2026",
    current: false,
    clientSector: "Platform Modernization & Information Architecture",
    description: "Advised business teams on governance-compliant Knowledge Management solutions and information architecture design.",
    responsibilities: [
      "Advised business teams on governance-compliant Knowledge Management solutions and information architecture design.",
      "Explained design decisions to stakeholders and built alignment through consultation.",
      "Established standard workflows for content authoring, review cycles, and retirement across multi-functional stakeholder groups."
    ],
    metrics: [
      { label: "Compliance Score", value: "100%", subtext: "Governance audit" },
      { label: "Taxonomy Restructuring", value: "14 Units", subtext: "Streamlined hierarchies" }
    ],
    technologies: ["ServiceNow", "Information Architecture", "Taxonomy Design", "Stakeholder Consulting", "Governance"]
  },
  {
    id: "deloitte-pricing-lead",
    role: "Senior Analyst – Pricing Lead / Engagement Support",
    company: "Deloitte — Offices of US-India",
    department: "Pricing Strategy, Commercial & Engagement Support",
    location: "Hyderabad, Telangana, India",
    startDate: "Dec 2022",
    endDate: "Aug 2025",
    current: false,
    clientSector: "Strategic Pricing & Practice Leadership",
    description: "Led Public and Private Pricing strategy, stakeholder consulting, tooling migration, and commercial enablement for Partners and Directors.",
    responsibilities: [
      "Delivered stakeholder consulting: requirement gathering, solution recommendation, and adoption planning.",
      "Developed learning materials and led instructor-led training to drive self-service enablement.",
      "Led the Public Pricing initiative for several months, providing strategic direction and ensuring smooth implementation, improving team productivity by 15%.",
      "Trained cross-functional teams and assisted Partners on new pricing applications, enhancing their efficiency and software proficiency.",
      "Developed comprehensive reference materials for Public Pricing, from initial drafts to finalized documents.",
      "Proactively managed project risks and fostered a problem-solving culture, ensuring successful project delivery within deadlines.",
      "Supported the RADC team in migrating Excel-based tools to the NPA system.",
      "Authored process guidance documentation and contributed ideas to streamline Public and Private Pricing review processes.",
      "Collaborated with the IT team to test deployment phases for both private and public pricing tools.",
      "Supported Partners and teams with the Client Acceptance and Engagement Acceptance (CAEA) process for both Audit Public and Audit Assurance."
    ],
    metrics: [
      { label: "Productivity Increase", value: "+15%", subtext: "Public pricing execution" },
      { label: "System Migration", value: "100%", subtext: "Excel to NPA Platform" },
      { label: "Partner Enablement", value: "High", subtext: "Streamlined CAEA & pricing" }
    ],
    technologies: ["NPA System", "Public/Private Pricing", "CAEA Process", "Excel Advanced", "Risk Management", "Agile", "ServiceNow"]
  },
  {
    id: "deloitte-audit-coordinator",
    role: "Coordinator, Audit Central Team (Offices of US-India)",
    company: "Deloitte — Offices of US-India",
    department: "Audit Central Operations",
    location: "Hyderabad, Telangana, India",
    startDate: "Jun 2021",
    endDate: "Dec 2022",
    current: false,
    clientSector: "Global Audit Operations & Cross-Border Delivery",
    description: "Coordinated audit support processes between US and India offices, ensuring consistency and quality across workflows.",
    responsibilities: [
      "Coordinated audit support processes between US and India offices, ensuring consistency and quality across workflows.",
      "Monitored platform adoption and supported data-driven governance discussions using reports and dashboards.",
      "Created and tracked ServiceNow tickets for audit reports, tax reports, e-filings, and financial statements.",
      "Acted as primary point of contact between clients, engagement managers, and analysts."
    ],
    metrics: [
      { label: "Workflow SLA", value: "99.4%", subtext: "Cross-border delivery" },
      { label: "Ticket Turnaround", value: "<4 Hrs", subtext: "High-priority audits" }
    ],
    technologies: ["ServiceNow Ticketing", "Audit Reports", "Dashboards & Reporting", "CCI Compliance", "US-India Workflow"]
  },
  {
    id: "deloitte-admin-associate",
    role: "Administrative Analyst & Associate Analyst",
    company: "Deloitte — Offices of US-India",
    department: "Engagement Services & Administrative Operations",
    location: "Hyderabad, Telangana, India",
    startDate: "Apr 2019",
    endDate: "Jun 2021",
    current: false,
    clientSector: "Canadian Practice Support & Operations",
    description: "Provided executive operational and administrative support to senior member staff, Partners, and Directors in Canada.",
    responsibilities: [
      "Provided efficient administrative support to senior member staff in Canada.",
      "Assisted directors and partners with Concur expenses, project performance, billings, and revenue reports.",
      "Pulled sales reports and individual performance reports from CRM; updated CRM with accounts and opportunities.",
      "Supported the team throughout the billing process, including generating WIP reports.",
      "Built foundational ServiceNow platform administration experience."
    ],
    metrics: [
      { label: "WIP Billing Accuracy", value: "99.8%", subtext: "Revenue reporting" },
      { label: "Foundation Built", value: "7+ Yrs", subtext: "ServiceNow trajectory" }
    ],
    technologies: ["ServiceNow", "Concur", "CRM Systems", "Visio", "Qualtrics", "PowerPoint", "Excel"]
  },
  {
    id: "synchrony-analyst",
    role: "Analyst — Payment Solutions & Fraud Analysis",
    company: "Synchrony (Payment Solutions)",
    department: "Risk & Fraud Operations",
    location: "Hyderabad, Telangana, India",
    startDate: "Mar 2018",
    endDate: "Dec 2018",
    current: false,
    clientSector: "Payment Solutions & Risk Mitigation",
    description: "Observed customer transactions to flag suspicious activity, placed fraud blocks, and trained new hires.",
    responsibilities: [
      "Supported payment solutions operations and observed customer transactions to identify suspicious activity.",
      "Placed fraud holds ('red flags') with descriptive fraud blocks.",
      "Determined existing fraud trends by analyzing accounts and transaction patterns.",
      "Trained new hires on schedule adherence and process improvement."
    ],
    metrics: [
      { label: "Fraud Pattern Detection", value: "High", subtext: "Loss prevention" },
      { label: "Team Onboarding", value: "100%", subtext: "New hire training" }
    ],
    technologies: ["Transaction Monitoring", "Fraud Analytics", "Risk Mitigation", "Training"]
  }
];

export const DEFAULT_SKILLS: SkillItem[] = [
  {
    name: "ServiceNow Knowledge Management",
    category: "servicenow",
    proficiency: 98,
    years: 7,
    highlight: "Knowledge Base administration, information architecture, category & subcategory design, knowledge governance, lifecycle management, content organization, user enablement, adoption strategy.",
    tags: ["ServiceNow KM", "Information Architecture", "Taxonomy", "Lifecycle Governance", "User Enablement"]
  },
  {
    name: "ServiceNow Platform Administration",
    category: "servicenow",
    proficiency: 95,
    years: 6,
    highlight: "Knowledge Base creation & management, User Criteria configuration, Knowledge Role assignment, group management, access governance, dashboard interpretation, report analysis.",
    tags: ["User Criteria", "Knowledge Roles", "Access Governance", "Dashboards", "Reporting Analysis"]
  },
  {
    name: "Stakeholder Consulting & Solution Design",
    category: "consulting",
    proficiency: 94,
    years: 7,
    highlight: "Requirement gathering, solution recommendation, best-practice advisory, governance consultation, process standardization, change enablement.",
    tags: ["Stakeholder Advisory", "Solution Design", "Process Standardization", "Change Enablement"]
  },
  {
    name: "Enterprise Training & User Adoption",
    category: "agile",
    proficiency: 96,
    years: 6,
    highlight: "Trained 300+ Canadian & global professionals; instructor-led training, user onboarding, self-service enablement, learning curriculum design (SABA), knowledge transfer.",
    tags: ["300+ Trained", "SABA Learning", "Self-Service Enablement", "Curriculum Design", "User Onboarding"]
  },
  {
    name: "Delivery & Agile Methodology (PSM I)",
    category: "agile",
    proficiency: 92,
    years: 5,
    highlight: "Certified Professional Scrum Master (PSM I). Business analysis, Scrum/Agile project management, process improvement, enterprise training, removing impediments.",
    tags: ["PSM I Certified", "Scrum Master", "Agile Delivery", "Process Improvement", "Sprint Facilitation"]
  },
  {
    name: "Pricing Strategy & Governance",
    category: "pricing",
    proficiency: 90,
    years: 4,
    highlight: "Public and private pricing strategy, reference material development, charge code and reporting support, NPA tool migration, risk management, CAEA process.",
    tags: ["Public Pricing Lead", "+15% Productivity", "NPA System Migration", "CAEA Process", "Partner Advisory"]
  }
];

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "proj-sn-km-architecture",
    title: "Global ServiceNow Knowledge Base Architecture & Multi-Unit Governance",
    clientIndustry: "Deloitte Global Operations & Canadian Practice",
    category: "servicenow",
    heroImage: "/src/assets/images/project_health_ai_1790341859114.jpg",
    headline: "Architected scalable ServiceNow Knowledge Management structures, trained 300+ professionals, and enabled multiple business units to operate independently under governance.",
    challenge: "Dispersed global business units experienced duplicated knowledge bases, fragmented categorization hierarchies, and lack of standardized User Criteria access controls, leading to inefficient information retrieval and redundant maintenance overhead.",
    solution: "Designed and implemented centralized Knowledge Base architectures with granular User Criteria access models and Knowledge Roles. Established standardized category and subcategory hierarchies, evaluated operational requirements, and drove enterprise adoption through structured instructor-led training.",
    outcomes: [
      { label: "Professionals Trained", value: "300+", subtext: "Across Canadian business units" },
      { label: "Content Duplication Avoided", value: "High", subtext: "Reused existing Knowledge Bases" },
      { label: "Operational Independence", value: "Multi-Unit", subtext: "Decentralized authoring with governance" }
    ],
    architecturePoints: [
      "Configured robust User Criteria and assigned Knowledge Roles for secure role-based access control.",
      "Designed logical taxonomy hierarchies with multi-level category and subcategory structures.",
      "Established review and reporting cycles to keep articles fresh and actively owned by verified contributors."
    ],
    techStack: ["ServiceNow Knowledge Management", "User Criteria", "Knowledge Roles", "Information Architecture", "Governance Framework"],
    deloitteRole: "Assistant Manager · Solution Designer & Adoption Lead",
    deliverableLink: "#"
  },
  {
    id: "proj-saba-curriculum",
    title: "SABA Interactive Digital Learning Curriculum & MySupport Automation",
    clientIndustry: "Enterprise Learning & Platform Enablement",
    category: "transformation",
    heroImage: "/src/assets/images/project_cloud_banking_1790341847745.jpg",
    headline: "Developed 3-module self-paced learning curriculum on SABA covering MySupport/ServiceNow article lifecycles, projecting 100+ hours in instructor-led training savings.",
    challenge: "Onboarding new professionals to the ServiceNow article publishing lifecycle required continuous, high-touch instructor-led sessions, taking dozens of hours away from core solution architecture and creating support ticket bottlenecks.",
    solution: "Created an interactive 3-module digital training curriculum hosted on SABA, enabling global teams to self-train on authoring, reviewing, publishing, and retiring articles in MySupport. Served as advisor bridging content gaps.",
    outcomes: [
      { label: "Instructor Training Hours Saved", value: "100+ Hrs", subtext: "Projected annual reduction" },
      { label: "Support Effort Reduced", value: "50–60 Hrs", subtext: "Decreased basic inquiries" },
      { label: "Learning Modules Hosted", value: "3 Modules", subtext: "Full article lifecycle mastery" }
    ],
    architecturePoints: [
      "Modular SABA learning track tailored to MySupport authoring standards and platform policies.",
      "Interactive knowledge checks and simulated article submission workflows.",
      "Integrated feedback loops and automated compliance completion tracking."
    ],
    techStack: ["SABA LMS", "MySupport", "ServiceNow Article Lifecycle", "Curriculum Design", "Self-Service Enablement"],
    deloitteRole: "Lead Curriculum Designer & Platform Enablement Lead",
    deliverableLink: "#"
  },
  {
    id: "proj-pricing-transformation",
    title: "Public Pricing Strategic Initiative & NPA Platform Migration",
    clientIndustry: "Deloitte Strategic Pricing & Commercial Operations",
    category: "pricing",
    heroImage: "/src/assets/images/deloitte_office_campus_1790341870112.jpg",
    headline: "Led the Public Pricing initiative for several months, driving a 15% team productivity improvement and migrating legacy Excel-based tools to the NPA system.",
    challenge: "Managing public and private pricing reviews across engagement teams relied on disparate Excel calculators, causing review delays, potential charge code inconsistencies, and high turnaround times for Partners.",
    solution: "Led strategic direction for Public Pricing, authored comprehensive reference manuals from initial drafts to final guidance, trained cross-functional teams, assisted Partners with CAEA reviews, and partnered with IT to migrate tools to the NPA platform.",
    outcomes: [
      { label: "Team Productivity Gain", value: "+15%", subtext: "Measured execution improvement" },
      { label: "Tool Modernization", value: "NPA System", subtext: "Migrated from legacy Excel models" },
      { label: "Executive Alignment", value: "Partners/Directors", subtext: "Streamlined CAEA & expedited reviews" }
    ],
    architecturePoints: [
      "End-to-end process guidance documentation streamlining Public and Private Pricing workflows.",
      "Collaborated with IT during deployment test phases to validate pricing tool reliability.",
      "Conducted conflict checks, background verifications, and charge code governance within ServiceNow."
    ],
    techStack: ["NPA Tooling", "Public & Private Pricing", "ServiceNow Task Management", "CAEA Process", "Agile Techniques"],
    deloitteRole: "Pricing Lead & Senior Analyst",
    deliverableLink: "#"
  }
];

export const DELOITTE_OFFICES: OfficeLocation[] = [
  {
    id: "deloitte-hyderabad",
    name: "Deloitte Hyderabad Campus (Offices of US-India)",
    country: "India",
    city: "Hyderabad",
    badge: "Primary Office",
    address: "Deloitte Drive, Hitec City, Madhapur, Hyderabad, Telangana 500081",
    lat: 17.4435,
    lng: 78.3772,
    query: "Deloitte+Hitec+City+Hyderabad",
    phone: "+91 40 6762 1000",
    email: "dikshaagarwal798@gmail.com",
    timeZone: "IST (UTC+05:30)"
  },
  {
    id: "deloitte-bengaluru",
    name: "Deloitte Bengaluru",
    country: "India",
    city: "Bengaluru",
    badge: "Major Office",
    address: "Prestige Trade Tower, Palace Road, High Grounds, Sampangi Rama Nagara, Bengaluru, Karnataka 560001",
    lat: 12.9866,
    lng: 77.5925,
    query: "Deloitte+Prestige+Trade+Tower+Bengaluru",
    phone: "+91 80 6627 6000",
    email: "bengaluru.contact@deloitte.com",
    timeZone: "IST (UTC+05:30)"
  },
  {
    id: "deloitte-mumbai",
    name: "Deloitte Mumbai HQ",
    country: "India",
    city: "Mumbai",
    badge: "Corporate Office",
    address: "One International Center, Tower 3, 27th-32nd Floor, Senapati Bapat Marg, Elphinstone Road (West), Mumbai 400013",
    lat: 19.0031,
    lng: 72.8315,
    query: "Deloitte+One+International+Center+Mumbai",
    phone: "+91 22 6185 4000",
    email: "mumbai.contact@deloitte.com",
    timeZone: "IST (UTC+05:30)"
  },
  {
    id: "deloitte-gurugram",
    name: "Deloitte Gurugram Cyber City",
    country: "India",
    city: "Gurugram",
    badge: "Regional Hub",
    address: "7th Floor, Building 10, Tower B, DLF Cyber City, Complex, DLF City Phase 2, Gurugram, Haryana 122002",
    lat: 28.4908,
    lng: 77.0898,
    query: "Deloitte+DLF+Cyber+City+Gurugram",
    phone: "+91 124 679 2000",
    email: "gurugram.contact@deloitte.com",
    timeZone: "IST (UTC+05:30)"
  },
  {
    id: "deloitte-london",
    name: "Deloitte UK London",
    country: "United Kingdom",
    city: "London",
    badge: "Global Partner Hub",
    address: "1 New Street Square, London EC4A 3HQ, United Kingdom",
    lat: 51.5161,
    lng: -0.1086,
    query: "Deloitte+1+New+Street+Square+London",
    phone: "+44 20 7936 3000",
    email: "london.reception@deloitte.co.uk",
    timeZone: "GMT/BST (UTC+01:00)"
  },
  {
    id: "deloitte-newyork",
    name: "Deloitte US New York",
    country: "United States",
    city: "New York",
    badge: "Global Headquarters Hub",
    address: "30 Rockefeller Plaza, New York, NY 10112, United States",
    lat: 40.7587,
    lng: -73.9787,
    query: "Deloitte+30+Rockefeller+Plaza+New+York",
    phone: "+1 212 492 4000",
    email: "newyork.contact@deloitte.com",
    timeZone: "EDT (UTC-04:00)"
  }
];
