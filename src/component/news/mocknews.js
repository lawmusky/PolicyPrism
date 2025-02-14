const mockNews = [
  {
    id: 1,
    title: "Major Tech Coalition Forms to Address AI Governance",
    summary:
      "Leading technology companies join forces to establish comprehensive AI governance framework...",
    content: `A groundbreaking coalition of technology industry leaders has announced the formation of a new alliance focused on developing comprehensive AI governance standards. The initiative aims to address growing concerns about AI safety and ethics while promoting innovation.
  
  The coalition, which includes representatives from major tech companies, research institutions, and policy groups, will work to establish guidelines for responsible AI development and deployment. Key areas of focus include data privacy, algorithmic bias, and transparency in AI decision-making processes.`,
    category: "Industry News",
    date: "2025-02-09",
    readTime: "5 min",
    trending: true,
    source: "Tech Policy Review",
    impact: "High",
    tags: ["AI Governance", "Industry Coalition", "Policy"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 2,
    title: "New Data Privacy Framework Proposed",
    summary:
      "Regulatory bodies outline new data protection standards affecting tech sector...",
    content: `A comprehensive new data privacy framework has been proposed by regulatory authorities, setting new standards for data protection and user privacy.`,
    category: "Regulation",
    date: "2025-02-08",
    readTime: "4 min",
    trending: false,
    source: "Policy Insights",
    impact: "Medium",
    tags: ["Privacy", "Regulation", "Data Protection"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 3,
    title: "Digital Markets Act Implementation Update",
    summary:
      "Latest developments in the rollout of key digital market regulations...",
    content: `Recent updates to the Digital Markets Act implementation timeline indicate significant changes to compliance requirements.`,
    category: "Regulation",
    date: "2025-02-07",
    readTime: "3 min",
    trending: true,
    source: "Digital Policy Weekly",
    impact: "High",
    tags: ["DMA", "Digital Markets", "Compliance"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 4,
    title: "Digital Competition Bill Advances Through Committee",
    summary:
      "Key legislative proposal gains support with new amendments addressing platform competition...",
    content:
      "Detailed coverage of the Digital Competition Bill's progress through committee.",
    category: "Legislation",
    date: "2025-02-06",
    readTime: "6 min",
    source: "Policy Watch",
    impact: "High",
    tags: ["Competition", "Digital Markets", "Regulation"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 5,
    title: "Industry Response to New Privacy Standards",
    summary:
      "Major stakeholders react to proposed privacy framework with mixed feedback...",
    content: "Analysis of industry responses to the new privacy standards.",
    category: "Privacy",
    date: "2025-02-05",
    readTime: "4 min",
    source: "Tech Brief",
    impact: "Medium",
    tags: ["Privacy", "Industry Standards"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 6,
    title: "Global Tech Summit Announces Key Themes",
    summary:
      "Annual technology policy conference to focus on AI governance and digital rights...",
    content: "Preview of the upcoming Global Tech Summit themes and speakers.",
    category: "Events",
    date: "2025-02-04",
    readTime: "3 min",
    source: "Tech Policy Today",
    impact: "Medium",
    tags: ["Events", "AI", "Digital Rights"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 7,
    title: "Tech Industry Forms Cybersecurity Alliance",
    summary:
      "Leading tech companies establish joint taskforce to address emerging cyber threats and share security intelligence...",
    content:
      "Major technology companies have announced the formation of a new cybersecurity alliance aimed at combating sophisticated cyber threats. The initiative will facilitate real-time threat intelligence sharing and establish industry-wide security standards.",
    category: "Industry News",
    date: "2025-02-03",
    readTime: "5 min",
    trending: true,
    source: "Tech Security Weekly",
    impact: "High",
    tags: ["Cybersecurity", "Industry Collaboration", "Security Standards"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 8,
    title: "Cloud Providers Announce Green Computing Initiative",
    summary:
      "Major cloud service providers commit to carbon-neutral data centers by 2030, investing in renewable energy...",
    content:
      "Leading cloud computing providers have jointly announced a comprehensive initiative to achieve carbon neutrality in their data centers. The plan includes massive investments in renewable energy and innovative cooling technologies.",
    category: "Industry News",
    date: "2025-02-02",
    readTime: "4 min",
    trending: false,
    source: "Tech Sustainability Report",
    impact: "High",
    tags: ["Sustainability", "Cloud Computing", "Green Tech"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 9,
    title: "Tech Giants Launch Digital Skills Program",
    summary:
      "Industry-wide initiative aims to upskill 1 million workers in emerging technologies over next five years...",
    content:
      "A consortium of technology companies has unveiled a comprehensive digital skills program targeting workforce development. The initiative will provide free training in AI, cloud computing, and cybersecurity.",
    category: "Industry News",
    date: "2025-02-01",
    readTime: "6 min",
    trending: true,
    source: "Education Tech Review",
    impact: "Medium",
    tags: ["Education", "Workforce Development", "Digital Skills"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 10,
    title: "Industry Leaders Standardize AI Model Documentation",
    summary:
      "Tech companies agree on universal format for AI model documentation to improve transparency and accountability...",
    content:
      "Major AI developers have reached consensus on a standardized format for documenting AI models, aiming to enhance transparency and facilitate better understanding of AI systems across the industry.",
    category: "Industry News",
    date: "2025-01-31",
    readTime: "4 min",
    trending: false,
    source: "AI Industry Journal",
    impact: "Medium",
    tags: ["AI", "Documentation Standards", "Transparency"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 11,
    title: "Tech Industry Launches Cross-Platform Privacy Framework",
    summary:
      "New collaborative initiative aims to standardize privacy controls across different platforms and services...",
    content:
      "Leading technology companies have announced a unified approach to privacy controls, developing a cross-platform framework that will allow users to manage their privacy settings consistently across different services and applications.",
    category: "Industry News",
    date: "2025-01-30",
    readTime: "5 min",
    trending: true,
    source: "Privacy Tech Insider",
    impact: "High",
    tags: ["Privacy", "Standardization", "User Control"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 12,
    title: "EU Commission Proposes New AI Liability Rules",
    summary:
      "New regulations aim to clarify liability for AI-related damages, impacting tech companies across Europe...",
    content: `The European Commission has introduced a proposal to establish clear liability frameworks for damages caused by AI systems. This move is expected to impact both developers and users of AI technologies, focusing on accountability and consumer protection.

Key aspects of the proposal include mandatory transparency reports, risk assessments, and compensation mechanisms for affected parties.`,
    category: "Regulation",
    date: "2025-02-10",
    readTime: "5 min",
    trending: true,
    source: "EU Policy Digest",
    impact: "High",
    tags: ["AI Liability", "EU Regulation", "Tech Policy"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 13,
    title: "Digital Services Act Enforcement Begins",
    summary:
      "Major platforms face new compliance deadlines as the Digital Services Act takes effect...",
    content: `The enforcement phase of the Digital Services Act (DSA) has officially begun, with significant implications for major online platforms. Companies are required to implement new measures for content moderation, transparency, and user protection.`,
    category: "Regulation",
    date: "2025-02-09",
    readTime: "4 min",
    trending: true,
    source: "Tech Regulation Weekly",
    impact: "High",
    tags: ["DSA", "Platform Regulation", "Compliance"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 14,
    title: "AI Ethics Consortium Expands Global Membership",
    summary:
      "International expansion of AI ethics consortium brings in diverse perspectives on responsible AI...",
    content: `The Global AI Ethics Consortium has announced the inclusion of new members from Asia, Africa, and South America, aiming to incorporate a broader range of ethical considerations into AI development guidelines.`,
    category: "Industry News",
    date: "2025-02-08",
    readTime: "5 min",
    trending: false,
    source: "Global Tech Ethics Journal",
    impact: "Medium",
    tags: ["AI Ethics", "Global Collaboration", "Responsible AI"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 15,
    title: "New Cybersecurity Directive Proposed by EU",
    summary:
      "Enhanced cybersecurity measures proposed for critical infrastructure and tech firms...",
    content: `The European Union has proposed a new directive aimed at strengthening cybersecurity across critical infrastructure and technology sectors. The proposal includes stricter compliance requirements and increased penalties for breaches.`,
    category: "Legislation",
    date: "2025-02-07",
    readTime: "4 min",
    trending: true,
    source: "Cybersecurity Policy Update",
    impact: "High",
    tags: ["Cybersecurity", "EU Directive", "Critical Infrastructure"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 16,
    title: "Big Tech Faces New Antitrust Probes in EU",
    summary:
      "European regulators launch fresh antitrust investigations targeting major tech companies...",
    content: `The European Commission has initiated new antitrust investigations into several major technology firms, focusing on potential abuses of market dominance and anti-competitive practices.`,
    category: "Regulation",
    date: "2025-02-06",
    readTime: "5 min",
    trending: true,
    source: "EU Competition Watch",
    impact: "High",
    tags: ["Antitrust", "EU Regulation", "Big Tech"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 17,
    title: "Tech Industry Pushes Back Against New Data Localization Laws",
    summary:
      "Major tech firms express concerns over proposed data localization requirements in key markets...",
    content: `Leading technology companies have raised concerns over new data localization laws proposed in several jurisdictions, arguing that such measures could stifle innovation and increase operational costs.`,
    category: "Policy",
    date: "2025-02-05",
    readTime: "4 min",
    trending: false,
    source: "Data Policy Insights",
    impact: "Medium",
    tags: ["Data Localization", "Tech Policy", "Innovation"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 18,
    title: "Global Digital Rights Conference Highlights Key Challenges",
    summary:
      "Annual conference addresses pressing issues in digital rights and internet governance...",
    content: `The Global Digital Rights Conference has convened experts and stakeholders from around the world to discuss challenges in internet governance, digital privacy, and freedom of expression.`,
    category: "Events",
    date: "2025-02-04",
    readTime: "5 min",
    trending: false,
    source: "Digital Rights Journal",
    impact: "Medium",
    tags: ["Digital Rights", "Internet Governance", "Privacy"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 19,
    title: "Startups Drive Innovation in AI Safety Tools",
    summary:
      "Emerging companies develop cutting-edge tools to enhance AI safety and reliability...",
    content: `A wave of startups is leading the charge in developing innovative tools designed to improve the safety and reliability of AI systems. These tools aim to detect biases, ensure compliance with ethical guidelines, and enhance transparency.`,
    category: "Industry News",
    date: "2025-02-03",
    readTime: "4 min",
    trending: true,
    source: "AI Innovation Weekly",
    impact: "Medium",
    tags: ["AI Safety", "Innovation", "Startups"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
  {
    id: 20,
    title: "EU Launches Digital Sovereignty Strategy",
    summary:
      "New strategy aims to strengthen Europe’s digital independence and resilience...",
    content: `The European Union has unveiled a comprehensive strategy to bolster digital sovereignty, focusing on reducing dependence on non-EU technology providers and enhancing local innovation.`,
    category: "Policy",
    date: "2025-02-02",
    readTime: "5 min",
    trending: true,
    source: "EU Digital Policy Review",
    impact: "High",
    tags: ["Digital Sovereignty", "EU Policy", "Innovation"],
    image:
      "https://archive.org/download/placeholder-image/placeholder-image.jpg",
  },
];

export default mockNews;
