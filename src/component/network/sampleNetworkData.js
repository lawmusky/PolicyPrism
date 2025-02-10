const sampleNetworkData = {
    nodes: [
      // Industry Groups
      {
        id: 1,
        name: "Tech Industry Association",
        category: "industry",
        influence: 85,
        positions: {
          "Data Privacy": -0.7,
          "AI Regulation": -0.8,
          "Platform Liability": -0.9,
          "Digital Competition": -0.6,
          "Content Moderation": -0.4,
        },
      },
      {
        id: 2,
        name: "Platform Companies Alliance",
        category: "industry",
        influence: 90,
        positions: {
          "Data Privacy": -0.8,
          "AI Regulation": -0.7,
          "Platform Liability": -0.9,
          "Digital Competition": -0.9,
          "Content Moderation": -0.6,
        },
      },
      {
        id: 3,
        name: "SME Tech Coalition",
        category: "industry",
        influence: 60,
        positions: {
          "Data Privacy": -0.3,
          "AI Regulation": -0.4,
          "Platform Liability": -0.2,
          "Digital Competition": 0.8,
          "Content Moderation": -0.3,
        },
      },
      {
        id: 4,
        name: "Digital Infrastructure Council",
        category: "industry",
        influence: 75,
        positions: {
          "Data Privacy": -0.5,
          "AI Regulation": -0.6,
          "Platform Liability": -0.7,
          "Digital Competition": -0.4,
          "Content Moderation": -0.3,
        },
      },
      {
        id: 5,
        name: "Startup Association",
        category: "industry",
        influence: 55,
        positions: {
          "Data Privacy": -0.4,
          "AI Regulation": -0.3,
          "Platform Liability": -0.2,
          "Digital Competition": 0.7,
          "Content Moderation": -0.2,
        },
      },
      {
        id: 6,
        name: "Telecom Industry Group",
        category: "industry",
        influence: 80,
        positions: {
          "Data Privacy": -0.6,
          "AI Regulation": -0.4,
          "Platform Liability": -0.5,
          "Digital Competition": -0.7,
          "Content Moderation": -0.4,
        },
      },
  
      // Civil Society Organizations
      {
        id: 7,
        name: "Consumer Rights Group",
        category: "advocacy",
        influence: 65,
        positions: {
          "Data Privacy": 0.9,
          "AI Regulation": 0.8,
          "Platform Liability": 0.7,
          "Digital Competition": 0.9,
          "Content Moderation": 0.6,
        },
      },
      {
        id: 8,
        name: "Digital Rights Foundation",
        category: "advocacy",
        influence: 70,
        positions: {
          "Data Privacy": 0.9,
          "AI Regulation": 0.7,
          "Platform Liability": 0.8,
          "Digital Competition": 0.8,
          "Content Moderation": 0.7,
        },
      },
      {
        id: 9,
        name: "Privacy Watch",
        category: "advocacy",
        influence: 60,
        positions: {
          "Data Privacy": 1.0,
          "AI Regulation": 0.8,
          "Platform Liability": 0.7,
          "Digital Competition": 0.6,
          "Content Moderation": 0.5,
        },
      },
      {
        id: 10,
        name: "Tech Workers Coalition",
        category: "advocacy",
        influence: 45,
        positions: {
          "Data Privacy": 0.7,
          "AI Regulation": 0.8,
          "Platform Liability": 0.6,
          "Digital Competition": 0.9,
          "Content Moderation": 0.7,
        },
      },
  
      // Research Organizations
      {
        id: 11,
        name: "AI Research Institute",
        category: "research",
        influence: 75,
        positions: {
          "Data Privacy": 0.3,
          "AI Regulation": 0.4,
          "Platform Liability": 0.2,
          "Digital Competition": 0.3,
          "Content Moderation": 0.4,
        },
      },
      {
        id: 12,
        name: "Tech Policy Think Tank",
        category: "research",
        influence: 70,
        positions: {
          "Data Privacy": 0.4,
          "AI Regulation": 0.5,
          "Platform Liability": 0.3,
          "Digital Competition": 0.6,
          "Content Moderation": 0.4,
        },
      },
      {
        id: 13,
        name: "Digital Innovation Lab",
        category: "research",
        influence: 65,
        positions: {
          "Data Privacy": -0.2,
          "AI Regulation": 0.3,
          "Platform Liability": 0.1,
          "Digital Competition": 0.4,
          "Content Moderation": 0.2,
        },
      },
  
      // Government Bodies
      {
        id: 14,
        name: "Data Protection Authority",
        category: "government",
        influence: 85,
        positions: {
          "Data Privacy": 0.8,
          "AI Regulation": 0.7,
          "Platform Liability": 0.6,
          "Digital Competition": 0.5,
          "Content Moderation": 0.6,
        },
      },
      {
        id: 15,
        name: "Competition Commission",
        category: "government",
        influence: 80,
        positions: {
          "Data Privacy": 0.5,
          "AI Regulation": 0.4,
          "Platform Liability": 0.7,
          "Digital Competition": 0.9,
          "Content Moderation": 0.3,
        },
      },
  
      // Standards Organizations
      {
        id: 16,
        name: "Technical Standards Body",
        category: "standards",
        influence: 70,
        positions: {
          "Data Privacy": 0.4,
          "AI Regulation": 0.5,
          "Platform Liability": 0.2,
          "Digital Competition": 0.1,
          "Content Moderation": 0.3,
        },
      },
      {
        id: 17,
        name: "Internet Standards Group",
        category: "standards",
        influence: 65,
        positions: {
          "Data Privacy": 0.5,
          "AI Regulation": 0.4,
          "Platform Liability": 0.3,
          "Digital Competition": 0.2,
          "Content Moderation": 0.4,
        },
      },
  
      // Professional Associations
      {
        id: 18,
        name: "Software Engineers Association",
        category: "professional",
        influence: 55,
        positions: {
          "Data Privacy": 0.6,
          "AI Regulation": 0.5,
          "Platform Liability": 0.3,
          "Digital Competition": 0.4,
          "Content Moderation": 0.5,
        },
      },
      {
        id: 19,
        name: "Digital Ethics Council",
        category: "professional",
        influence: 60,
        positions: {
          "Data Privacy": 0.8,
          "AI Regulation": 0.9,
          "Platform Liability": 0.6,
          "Digital Competition": 0.5,
          "Content Moderation": 0.7,
        },
      },
  
      // Media Organizations
      {
        id: 20,
        name: "Tech News Network",
        category: "media",
        influence: 70,
        positions: {
          "Data Privacy": 0.3,
          "AI Regulation": 0.4,
          "Platform Liability": 0.5,
          "Digital Competition": 0.6,
          "Content Moderation": 0.4,
        },
      },
      {
        id: 21,
        name: "Digital Policy Journal",
        category: "media",
        influence: 65,
        positions: {
          "Data Privacy": 0.4,
          "AI Regulation": 0.5,
          "Platform Liability": 0.4,
          "Digital Competition": 0.5,
          "Content Moderation": 0.5,
        },
      },
  
      // Additional Industry Players
      {
        id: 22,
        name: "Cloud Services Alliance",
        category: "industry",
        influence: 75,
        positions: {
          "Data Privacy": -0.6,
          "AI Regulation": -0.5,
          "Platform Liability": -0.7,
          "Digital Competition": -0.8,
          "Content Moderation": -0.4,
        },
      },
      {
        id: 23,
        name: "Digital Payments Coalition",
        category: "industry",
        influence: 70,
        positions: {
          "Data Privacy": -0.7,
          "AI Regulation": -0.4,
          "Platform Liability": -0.6,
          "Digital Competition": -0.7,
          "Content Moderation": -0.3,
        },
      },
  
      // Additional Advocacy Groups
      {
        id: 24,
        name: "Algorithm Justice Project",
        category: "advocacy",
        influence: 55,
        positions: {
          "Data Privacy": 0.9,
          "AI Regulation": 1.0,
          "Platform Liability": 0.8,
          "Digital Competition": 0.7,
          "Content Moderation": 0.9,
        },
      },
      {
        id: 25,
        name: "Digital Inclusion Network",
        category: "advocacy",
        influence: 50,
        positions: {
          "Data Privacy": 0.7,
          "AI Regulation": 0.8,
          "Platform Liability": 0.6,
          "Digital Competition": 0.8,
          "Content Moderation": 0.7,
        },
      },
  
      // International Organizations
      {
        id: 26,
        name: "Global Tech Policy Forum",
        category: "international",
        influence: 85,
        positions: {
          "Data Privacy": 0.6,
          "AI Regulation": 0.7,
          "Platform Liability": 0.5,
          "Digital Competition": 0.6,
          "Content Moderation": 0.6,
        },
      },
      {
        id: 27,
        name: "International Digital Coalition",
        category: "international",
        influence: 80,
        positions: {
          "Data Privacy": 0.5,
          "AI Regulation": 0.6,
          "Platform Liability": 0.4,
          "Digital Competition": 0.5,
          "Content Moderation": 0.5,
        },
      },
  
      // Academic Institutions
      {
        id: 28,
        name: "Center for Digital Society",
        category: "academic",
        influence: 65,
        positions: {
          "Data Privacy": 0.7,
          "AI Regulation": 0.8,
          "Platform Liability": 0.6,
          "Digital Competition": 0.5,
          "Content Moderation": 0.7,
        },
      },
      {
        id: 29,
        name: "Tech Law Research Center",
        category: "academic",
        influence: 60,
        positions: {
          "Data Privacy": 0.6,
          "AI Regulation": 0.7,
          "Platform Liability": 0.7,
          "Digital Competition": 0.6,
          "Content Moderation": 0.6,
        },
      },
      {
        id: 30,
        name: "Digital Economics Institute",
        category: "academic",
        influence: 55,
        positions: {
          "Data Privacy": 0.4,
          "AI Regulation": 0.5,
          "Platform Liability": 0.5,
          "Digital Competition": 0.7,
          "Content Moderation": 0.4,
        },
      },
    ],
  
    links: [
      // Industry collaboration links
      { source: 1, target: 2, type: "collaboration", strength: 0.9 },
      { source: 1, target: 3, type: "collaboration", strength: 0.7 },
      { source: 2, target: 22, type: "collaboration", strength: 0.8 },
      { source: 22, target: 23, type: "collaboration", strength: 0.7 },
      { source: 3, target: 5, type: "collaboration", strength: 0.8 },
      { source: 4, target: 6, type: "collaboration", strength: 0.7 },
  
      // Advocacy network links
      { source: 7, target: 8, type: "collaboration", strength: 0.8 },
      { source: 8, target: 9, type: "collaboration", strength: 0.7 },
      { source: 9, target: 24, type: "collaboration", strength: 0.8 },
      { source: 24, target: 25, type: "collaboration", strength: 0.7 },
      { source: 7, target: 25, type: "collaboration", strength: 0.6 },
  
      // Research and academic links
      { source: 11, target: 12, type: "collaboration", strength: 0.7 },
      { source: 12, target: 13, type: "collaboration", strength: 0.6 },
      { source: 28, target: 29, type: "collaboration", strength: 0.7 },
      { source: 29, target: 30, type: "collaboration", strength: 0.6 },
      { source: 11, target: 28, type: "collaboration", strength: 0.5 },
  
      // Cross-sector links
      { source: 18, target: 19, type: "collaboration", strength: 0.6 },
      { source: 19, target: 28, type: "collaboration", strength: 0.5 },
      { source: 20, target: 21, type: "collaboration", strength: 0.7 },
  
      // Opposition links
      { source: 1, target: 7, type: "opposition", strength: 0.9 },
      { source: 2, target: 8, type: "opposition", strength: 0.8 },
      { source: 22, target: 24, type: "opposition", strength: 0.7 },
      { source: 23, target: 25, type: "opposition", strength: 0.6 },
      { source: 6, target: 9, type: "opposition", strength: 0.7 },
  
      // International cooperation
      { source: 26, target: 27, type: "collaboration", strength: 0.8 },
      { source: 26, target: 14, type: "collaboration", strength: 0.6 },
      { source: 27, target: 15, type: "collaboration", strength: 0.5 },
  
      // Standards body connections
      { source: 16, target: 17, type: "collaboration", strength: 0.7 },
      { source: 16, target: 11, type: "collaboration", strength: 0.6 },
      { source: 17, target: 13, type: "collaboration", strength: 0.5 },
    ],
  };




  export default sampleNetworkData;