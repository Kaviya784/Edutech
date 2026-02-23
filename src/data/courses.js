export const courses = [
    {
        id: 1,
        title: "Mastering React Hooks",
        instructor: "Sarah Drasner",
        enrolled: 1240,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
        description: "Deep dive into advanced React patterns and custom hooks.",
        price: 49.99,
        category: "Development",
        modules: [
            { id: 101, title: "Introduction to State", duration: "10m" },
            { id: 102, title: "Deep dive into useEffect", duration: "25m" },
            { id: 103, title: "Custom Hooks Patterns", duration: "40m" }
        ]
    },
    {
        id: 2,
        title: "UI Design with Tailwind",
        instructor: "Gary Simon",
        enrolled: 850,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
        description: "Learn how to build stunning modern interfaces at light speed.",
        price: 39.99,
        category: "Design",
        modules: [
            { id: 201, title: "Utility First Philosophy", duration: "15m" },
            { id: 202, title: "Responsive Layouts", duration: "30m" }
        ]
    },
    {
        id: 3,
        title: "Fullstack Architecture",
        instructor: "Kent C. Dodds",
        enrolled: 2100,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
        description: "Building scalable applications from scratch with modern tech stack.",
        price: 99.99,
        category: "Development",
        modules: [
            { id: 301, title: "System Design", duration: "45m" },
            { id: 302, title: "Database Modeling", duration: "35m" }
        ]
    }
];
