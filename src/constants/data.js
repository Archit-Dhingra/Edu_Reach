export const QUOTES = [
  "Education is the most powerful weapon which you can use to change the world.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Every child is a different kind of flower, and altogether make this world a beautiful garden.",
  "The roots of education are bitter, but the fruit is sweet.",
  "In learning you will teach, and in teaching you will learn."
];

export const SUBJECTS_LIST = ["Math", "Science", "English", "History", "Geography", "Computer Science", "Art", "Hindi"];

export const SUBJECT_ICONS = {
  Math: "∑",
  Science: "⚗",
  English: "✏",
  History: "⌛",
  Geography: "🌍",
  "Computer Science": "</>",
  Art: "🎨",
  Hindi: "अ"
};

export const SUBJECT_COLORS = {
  Math: "#0D9488",
  Science: "#F5A623",
  English: "#3B82F6",
  History: "#8B5CF6",
  Geography: "#10B981",
  "Computer Science": "#EC4899",
  Art: "#F97316",
  Hindi: "#EF4444"
};

export const TUTORS = [
  { id: 1, name: "Priya Sharma", subject: "Math & Science", bio: "IIT graduate with 5 years teaching experience. Passionate about making math fun!", rating: 4.9, online: true, avatar: "PS" },
  { id: 2, name: "Rohit Verma", subject: "English & History", bio: "Literature lover and history buff. Believes stories make the best teachers.", rating: 4.7, online: true, avatar: "RV" },
  { id: 3, name: "Ananya Singh", subject: "Computer Science", bio: "Software engineer turned teacher. Loves introducing kids to the world of coding.", rating: 4.8, online: false, avatar: "AS" },
  { id: 4, name: "Deepak Mishra", subject: "Geography & Art", bio: "Traveled to 30 countries. Brings the world alive through maps and colors.", rating: 4.6, online: false, avatar: "DM" }
];

export const INIT_ASSIGNMENTS = [
  { id: 1, subject: "Math", assignedBy: "AI Tutor (Asha)", dueDate: "2024-01-20", topic: "Fractions & Mixed Numbers", difficulty: "Medium", completed: false, score: null },
  { id: 2, subject: "Science", assignedBy: "Priya Sharma", dueDate: "2024-01-18", topic: "Newton's Laws of Motion", difficulty: "Hard", completed: false, score: null },
  { id: 3, subject: "English", assignedBy: "AI Tutor (Arjun)", dueDate: "2024-01-15", topic: "Parts of Speech", difficulty: "Easy", completed: true, score: 85, feedback: "Great work! Minor grammar issues to review." },
  { id: 4, subject: "Computer Science", assignedBy: "Ananya Singh", dueDate: "2024-01-14", topic: "Introduction to Loops", difficulty: "Medium", completed: true, score: 92, feedback: "Excellent understanding of concepts!" }
];

export const INIT_NOTIFICATIONS = [
  { id: 1, type: "assignment", title: "New quiz added", body: "AI Tutor added a Fractions quiz to your assignments", time: "2 min ago", read: false },
  { id: 2, type: "message", title: "Message from Priya Sharma", body: "Your homework on quadratic equations looks great!", time: "1 hr ago", read: false },
  { id: 3, type: "meet", title: "Session link from Rohit Verma", body: "Google Meet session starting in 10 minutes — join now!", time: "3 hr ago", read: true, link: "https://meet.google.com/abc-defg-hij" },
  { id: 4, type: "performance", title: "Weekly performance report", body: "You studied 4 days this week. Avg score: 88%. Keep it up!", time: "1 day ago", read: true },
  { id: 5, type: "grade", title: "Assignment graded", body: "Parts of Speech quiz scored: 85/100", time: "2 days ago", read: true }
];

export const QUIZ_QUESTIONS = {
  Math: [
    { q: "What is 3/4 + 1/4?", opts: ["1", "1/2", "3/8", "5/4"], ans: 0 },
    { q: "Which fraction is largest?", opts: ["1/2", "3/4", "2/3", "5/8"], ans: 1 },
    { q: "What is 2 × 1/3?", opts: ["2/3", "1/6", "2", "3/2"], ans: 0 },
    { q: "Simplify 6/8", opts: ["3/4", "2/3", "1/2", "6/8"], ans: 0 },
    { q: "What is 1/2 of 20?", opts: ["5", "10", "15", "8"], ans: 1 }
  ],
  Science: [
    { q: "Unit of Force?", opts: ["Watt", "Newton", "Joule", "Pascal"], ans: 1 },
    { q: "What causes rain?", opts: ["Evaporation", "Condensation", "Precipitation", "All of these"], ans: 3 },
    { q: "Nearest planet to Sun?", opts: ["Venus", "Earth", "Mercury", "Mars"], ans: 2 },
    { q: "Photosynthesis produces?", opts: ["CO2", "O2", "N2", "H2"], ans: 1 },
    { q: "Speed of light?", opts: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10⁴ m/s", "3×10² m/s"], ans: 0 }
  ],
  default: [
    { q: "How many continents are there?", opts: ["5", "6", "7", "8"], ans: 2 },
    { q: "Capital of India?", opts: ["Mumbai", "Delhi", "Kolkata", "Chennai"], ans: 1 },
    { q: "2 + 2 = ?", opts: ["3", "4", "5", "6"], ans: 1 },
    { q: "Which is largest ocean?", opts: ["Atlantic", "Indian", "Arctic", "Pacific"], ans: 3 },
    { q: "How many days in a week?", opts: ["5", "6", "7", "8"], ans: 2 }
  ]
};
