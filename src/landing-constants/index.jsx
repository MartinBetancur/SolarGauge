import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";


export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. This software transformed how I manage my energy usage.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. A must-have tool for energy efficiency.",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this software was a pleasure. Incredible insights and easy to use.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Solar-Gauge helped me save on energy costs significantly. After using their platform, I was able to monitor my energy consumption in real-time and identify areas where I could reduce waste.",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "SolarGauge has helped me save significantly on my energy costs. With its detailed tracking and insights, I can monitor my usage patterns, optimize my consumption, and even sell excess energy to others.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "Highly recommend SolarGauge for anyone looking to optimize their energy usage. The platform is incredibly intuitive, providing detailed insights into energy consumption and available solar energy.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Real-Time Monitoring",
    description:
      "Track your energy consumption and generation in real-time with our intuitive dashboard",
  },
  {
    icon: <Fingerprint />,
    text: "Peer-to-Peer Market",
    description:
      "Engage in a community-driven energy market to buy and sell energy with peers.",
  },
  {
    icon: <ShieldHalf />,
    text: "Future Projections",
    description:
      "Use our tools to project future energy consumption and production accurately.",
  },
  {
    icon: <BatteryCharging />,
    text: "Energy Storage",
    description:
      "Gestiona el estado de tu batería, consulta el historial y carga datos para un análisis energético completo.",
  },
  {
    icon: <PlugZap />,
    text: "Cost Projections",
    description:
      "Get detailed projections of your energy costs to plan your budget effectively.",
  },
  {
    icon: <GlobeLock />,
    text: "Customer Insights",
    description:
      "Analyze energy purchases, customer satisfaction, and user interaction with the platform.",
  },
];

export const checklistItems = [
  {
    title: "Sell Your Excess Energy",
    description:
      "Easily manage energy sales, track how much you’ve sold, and view earnings.",
  },
  {
    title: "Order Management",
    description:
      "Organize and review your energy orders easily to ensure timely and accurate delivery.",
  },
  {
    title: "Advanced Forecasting",
    description:
      "Plan ahead with smart predictions for energy usage and solar generation based on past data.",
  },
  {
    title: "Customer Satisfaction Tracking",
    description:
      "Keep a pulse on customer feedback and engagement for a better user experience for future sells.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Basic Energy Monitoring",
      "Energy Overview",
      "Energy Storage Status",
      "Basic Customer Insights",
      "Community Marketplace Access",
      "Monthly Energy Report",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Free plan stuff",
      "Detailed Energy Analytics",
      "Order Management System",
      "Market Analytics Dashboard",
      "Customer Satisfaction Tracking",
      "Weekly Energy Reports",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
];

export const platformLinks = [
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
];