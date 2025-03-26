export const resumeData = {
  personalInfo: {
    name: "Rostyslav (Ross) Muretov",
    title: "Computer Programming & Analysis Student | Aspiring Software Developer",
    email: "muretovr@gmail.com",
    phone: "(365) 355-7723",
    location: "Concord, ON",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
  },
  
  about: {
    summary: "Highly motivated and adaptable Computer Programming & Analysis student (5th Semester) at Seneca College seeking a challenging Co-op opportunity within the tech industry. Combines a strong academic foundation in full-stack development, database management, cloud computing (AWS), and CI/CD practices with extensive international experience fostering exceptional communication, problem-solving, and cross-cultural collaboration skills.",
    keyAttributes: [
      "Strong problem-solving abilities",
      "Exceptional communication skills",
      "Cross-cultural collaboration expertise",
      "Quick learner with adaptability"
    ],
    careerGoals: "I am currently seeking a challenging Co-op opportunity within the tech industry where I can apply my technical knowledge and soft skills to contribute to meaningful projects while continuing to grow as a developer.",
    interests: [
      "Full-stack Development",
      "Cloud Computing",
      "Software Engineering"
    ]
  },
  
  education: {
    degree: "Diploma in Computer Programming & Analysis (CPA)",
    institution: "Seneca College, Toronto, ON",
    graduationDate: "August 2025",
    status: "Currently in 5th Semester of a 6-Semester Program",
    gpa: "3.8",
    honors: "Recipient of President's Honour List in 2nd and 4th semesters",
    coursework: [
      "Object-Oriented Programming (Java, C++)",
      "Web Development (JavaScript, Node.js)",
      "Database Design & SQL",
      "Cloud Computing (AWS)",
      "Data Structures & Algorithms"
    ]
  },
  
  skills: {
    programmingLanguages: [
      "Java", "C#", "Python", "JavaScript", "Node.js", "SQL", "C++", "C", "HTML5", "CSS3", "Lua (Basic)"
    ],
    databases: [
      "MongoDB", "Oracle SQL", "MySQL", "SQL Server", "DynamoDB (AWS)"
    ],
    cloudTechnologies: [
      "AWS (ECS, ECR, S3)", "AWS (DynamoDB, Cognito)", "AWS (EC2 Basics)", "Docker", "Docker Compose"
    ],
    developmentTools: [
      "Git", "GitHub Actions (CI/CD)", "Visual Studio Code", "IntelliJ IDEA", "Eclipse", "Hurl (API Testing)"
    ],
    operatingSystems: [
      "Windows", "Linux/Unix"
    ],
    methodologies: [
      "Object-Oriented Programming", "Data Structures & Algorithms", "MVC Architecture", "RESTful APIs", 
      "Agile/Scrum Principles", "Microservices Architecture", "CI/CD", "Test-Driven Development"
    ]
  },
  
  projects: [
    {
      title: "Cloud-Native Fragments Microservice",
      description: "Full-stack microservice application for creating, managing, and converting multi-format user fragments, deployed on AWS.",
      icon: "bx-cloud",
      features: [
        "RESTful API server using Node.js",
        "Containerized with Docker & deployed on AWS ECS",
        "AWS S3 for fragment storage & DynamoDB for metadata",
        "CI/CD pipeline using GitHub Actions",
        "Integration testing with Hurl and Docker Compose",
        "AWS Cognito for secure user authentication"
      ],
      technologies: [
        "Node.js", "Docker", "AWS Services", "GitHub Actions", "JavaScript", "HTML/CSS", "Sharp"
      ],
      github: "https://github.com/",
      liveDemo: null
    },
    {
      title: "ABC Hotel Management Application",
      description: "Java application simulating hotel management operations, emphasizing OOP and MVC patterns.",
      icon: "bx-building-house",
      features: [
        "Applied core Object-Oriented Programming principles",
        "Implemented MVC architectural pattern",
        "User authentication functionality",
        "Room browsing and booking management",
        "MongoDB integration for persistent data storage"
      ],
      technologies: [
        "Java", "MVC Pattern", "OOP Principles", "MongoDB", "JavaFX"
      ],
      github: "https://github.com/",
      liveDemo: null
    },
    {
      title: "Museum Exhibit Web Application",
      description: "Dynamic website showcasing museum exhibits, featuring a RESTful API backend and deployed frontend.",
      icon: "bx-building",
      features: [
        "RESTful API backend using Node.js",
        "CRUD operations for exhibit management",
        "MongoDB database integration",
        "Responsive UI using React",
        "Deployed to Vercel"
      ],
      technologies: [
        "Node.js", "MongoDB", "React", "JavaScript", "Vercel", "Git"
      ],
      github: "https://github.com/",
      liveDemo: "https://example.com"
    }
  ],
  
  experience: [
    {
      title: "Ukraine Arrivals Support Interpreter",
      company: "Canadian Red Cross",
      location: "Toronto, ON",
      period: "Jul 2022 - Dec 2022",
      responsibilities: [
        "Provided critical real-time oral interpretation (Ukrainian/Russian <> English) in high-pressure situations",
        "Performed written translations of documents with attention to detail",
        "Facilitated effective interactions between clients and service providers"
      ]
    },
    {
      title: "Reservations & Sales Agent",
      company: "Accor",
      location: "Moncton, NB",
      period: "Sep 2019 - Jul 2021",
      responsibilities: [
        "Managed high-volume international client reservations via phone and email",
        "Resolved complex client inquiries and issues with strong problem-solving abilities",
        "Clearly communicated product/service information to a diverse global clientele"
      ]
    },
    {
      title: "Client Service & Communication Roles",
      company: "Various (Incl. Sunwing, Prime Travel)",
      location: "International",
      period: "Sep 2013 - May 2022",
      responsibilities: [
        "Excelled in dynamic, client-facing roles requiring exceptional multilingual communication",
        "Demonstrated cultural awareness and adaptability across tourism and humanitarian aid contexts",
        "Successfully managed logistics and ensured positive client experiences in fast-paced environments"
      ]
    }
  ],
  
  languages: [
    {
      name: "Ukrainian",
      level: "Fluent"
    },
    {
      name: "Russian",
      level: "Fluent"
    },
    {
      name: "English",
      level: "Fluent"
    },
    {
      name: "Spanish",
      level: "Basic"
    }
  ]
};
