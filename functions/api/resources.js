const resources = [
  {
    id: 1,
    title: "Cloud Computing Fundamentals",
    category: "Cloud Computing",
    type: "Learning Resource",
    description: "Introduction to cloud computing concepts and services."
  },
  {
    id: 2,
    title: "Web Development Basics",
    category: "Web Development",
    type: "Learning Resource",
    description: "Learn the fundamentals of HTML, CSS and JavaScript."
  },
  {
    id: 3,
    title: "Artificial Intelligence",
    category: "Artificial Intelligence",
    type: "Learning Resource",
    description: "Explore the basics of AI and machine learning."
  },
  {
    id: 4,
    title: "Data Science Fundamentals",
    category: "Data Science",
    type: "Learning Resource",
    description: "An introduction to data analysis and visualization."
  },
  {
    id: 5,
    title: "Cyber Security Basics",
    category: "Cyber Security",
    type: "Learning Resource",
    description: "Learn basic cybersecurity concepts and practices."
  }
];

export async function onRequest(context) {
  return Response.json({
    success: true,
    total: resources.length,
    resources: resources
  });
}
