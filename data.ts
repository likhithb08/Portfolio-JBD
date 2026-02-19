
import { Project, SkillGroup, ExperienceItem } from './types';

export const SKILLS: SkillGroup[] = [
    {
        category: "Technical Skills",
        items: ["Java", "SQL", "JavaScript", "Core Java", "OOPs"]
    },
    {
        category: "Frameworks & Security",
        items: ["Spring Boot", "Hibernate (ORM Basics)", "REST APIs", "JWT (Authentication Basics)"]
    },
    {
        category: "Tools & Platforms",
        items: ["Git & GitHub", "Postman", "Eclipse", "VS Code", "n8n Workflows"]
    },
    {
        category: "Web & Database",
        items: ["MySQL", "MongoDB"]
    }
];

export const PROJECTS: Project[] = [
    {
        title: "Shadow AI",
        problem: "A Java-based backend application designed for task and user management (In Progress).",
        points: [
            "Designing and developing a Java-based backend application using Spring Boot for task and user management.",
            "Implementing multiple RESTful APIs with CRUD operations and core business logic.",
            "Integrating MySQL with Hibernate ORM for data persistence and data modeling.",
            "Building user authentication and authorization using JWT and role-based access control."
        ],
        tech: ["Java", "Spring Boot", "MySQL", "Hibernate", "JWT"],
        githubUrl: "https://github.com/likhithb08/shadow-companion"
    },
    {
        title: "Banking Dashboard",
        problem: "A full-stack banking dashboard with a Java Spring Boot backend and MySQL database.",
        points: [
            "Developed a full-stack banking dashboard with a Java Spring Boot backend and MySQL database.",
            "Implemented multiple RESTful APIs using Spring Boot and Hibernate for transaction and user data management.",
            "Built frontend functionality using JavaScript to interact with backend services.",
            "Integrated an n8n-powered AI Chatbot to automate customer support and banking workflows."
        ],
        tech: ["Java", "Spring Boot", "MySQL", "JavaScript", "n8n"],
        githubUrl: "https://github.com/likhithb08/BankEasY"
    }
];

export const EXPERIENCE: ExperienceItem[] = [
    {
        role: "Web Development Intern",
        company: "Zidio Development",
        period: "January 2025 - April 2025",
        description: [
            "Contributed to the development of a task management web application using the MERN stack.",
            "Developed multiple RESTful APIs using Node.js and Express.js to handle user and task data.",
            "Designed and managed MongoDB collections to ensure efficient data storage and retrieval.",
            "Collaborated with the frontend team to integrate APIs and improve application functionality."
        ]
    }
];
