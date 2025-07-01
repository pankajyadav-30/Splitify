import { Bell, CreditCard, PieChart, Receipt, Users } from "lucide-react";

export const FEATURES = [
  {
    title: "Team Budget",
    Icon: Users,
    bg: "bg-red-100",
    color: "text-red-600",
    description:
      "Set up groups for roommates, travel, or events to manage shared expenses effortlessly.",
  },
  {
    title: "Smart Clearing",
    Icon: CreditCard,
    bg: "bg-violet-100",
    color: "text-violet-600",
    description:
      "Our approach reduces the total number of transactions required for settlement.",
  },
  {
    title: "Cost Analytics",
    Icon: PieChart,
    bg: "bg-red-100",
    color: "text-red-600",
    description:
      "Analyze your spending trends and understand joint expenses better.",
  },
  {
    title: "Payment Reminders",
    Icon: Bell,
    bg: "bg-amber-100",
    color: "text-amber-600",
    description:
      "Smart alerts for unpaid dues and detailed analysis of your spending habits.",
  },
  {
    title: "Various Splitting Methods",
    Icon: Receipt,   
    bg: "bg-red-100", 
    color: "text-red-600",
    description:
      "Split equally, by percentage, or by exact amounts to fit any scenario.",
  },
  {
    title: "Real‑time Updates",
    Icon: () => (
      /* custom inline icon (no Lucide equivalent) */
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 14v8M15 14v8M9 2v6M15 2v6" />
      </svg>
    ),
    bg: "bg-teal-100",
    color: "text-teal-600",
    description:
      "Stay instantly updated whenever your friends add new expenses or repayments.",
  },
];

export const STEPS = [
  {
    label: "1",
    title: "Create/Join a Group",
    description:
      "Create a group for your roommates, travel plans, or special events and bring your friends together",
  },
  {
    label: "2",
    title: "Add New Expenses",
    description:
      "Record the payment details and assign each member’s portion of the expense.",
  },
  {
    label: "3",
    title: "Clear the balance",
    description: "Check pending dues and mark debts as paid upon receiving payment.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "If I had Splitr, I’d stop Shankar from selling my things. He owes me, and I’ll make sure he pays",
    name: "Shankar",
    image: "/testimonials/babubhaiya.png",
    role: "Student",
  },
  {
    quote:
      "Splitr's precision makes my money-doubling hacks look like guesswork.",
    name: "Satyam",
    image: "/testimonials/raju.jpg",
    role: "Businessman",
  },
  {
    quote:
      "Dost yaar ho ya party sharty — Splitr ke bina hisaab mushkil hi nahi, namumkin tha!",
    name: "RaoSahab",
    image: "/testimonials/shyam.png",
    role: "Full Time Job Searcher",
  },
];