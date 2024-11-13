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
    text: "Estoy extremadamente satisfecho con los servicios proporcionados. Este software transformó la forma en que gestiono mi consumo de energía.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "No podría estar más feliz con el resultado de nuestro proyecto. Una herramienta imprescindible para la eficiencia energética.",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Trabajar con este software fue un placer. Ideas increíbles y fácil de usar.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Solar-Gauge me ayudó a ahorrar significativamente en costos de energía. Después de usar su plataforma, pude monitorear mi consumo de energía en tiempo real e identificar áreas donde podía reducir el desperdicio.",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "SolarGauge me ha ayudado a ahorrar significativamente en mis costos de energía. Con su seguimiento detallado y análisis, puedo monitorear mis patrones de uso, optimizar mi consumo e incluso vender energía excedente a otros.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "Recomiendo altamente SolarGauge para cualquiera que busque optimizar su uso de energía. La plataforma es increíblemente intuitiva, proporcionando información detallada sobre el consumo de energía y la energía solar disponible.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Monitoreo en Tiempo Real",
    description:
      "Rastrea tu consumo y generación de energía en tiempo real con nuestro panel intuitivo",
  },
  {
    icon: <Fingerprint />,
    text: "Mercado Peer-to-Peer",
    description:
      "Participa en un mercado energético impulsado por la comunidad para comprar y vender energía con tus pares.",
  },
  {
    icon: <ShieldHalf />,
    text: "Proyecciones Futuras",
    description:
      "Usa nuestras herramientas para proyectar con precisión el consumo y la producción de energía futuros.",
  },
  {
    icon: <BatteryCharging />,
    text: "Almacenamiento de Energía",
    description:
      "Gestiona el estado de tu batería, consulta el historial y carga datos para un análisis energético completo.",
  },
  {
    icon: <PlugZap />,
    text: "Proyecciones de Costos",
    description:
      "Obtén proyecciones detalladas de tus costos de energía para planificar tu presupuesto de manera efectiva.",
  },
  {
    icon: <GlobeLock />,
    text: "Información del Cliente",
    description:
      "Analiza las compras de energía, la satisfacción del cliente y la interacción del usuario con la plataforma.",
  },
];

export const checklistItems = [
  {
    title: "Vende tu Energía Excedente",
    description:
      "Gestiona fácilmente las ventas de energía, rastrea cuánto has vendido y visualiza tus ganancias.",
  },
  {
    title: "Gestión de Pedidos",
    description:
      "Organiza y revisa fácilmente tus pedidos de energía para asegurar una entrega puntual y precisa.",
  },
  {
    title: "Pronósticos Avanzados",
    description:
      "Planifica con predicciones inteligentes para el uso de energía y la generación solar basadas en datos pasados.",
  },
  {
    title: "Seguimiento de Satisfacción del Cliente",
    description:
      "Mantén un pulso sobre la retroalimentación y la interacción del cliente para mejorar la experiencia del usuario en futuras ventas.",
  },
];

export const pricingOptions = [
  {
    title: "Gratis",
    price: "$0",
    features: [
      "Monitoreo Básico de Energía",
      "Resumen de Energía",
      "Estado de Almacenamiento de Energía",
      "Información Básica del Cliente",
      "Acceso al Mercado Comunitario",
      "Informe Mensual de Energía",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Lo que incluye el plan gratis",
      "Análisis Detallado de Energía",
      "Sistema de Gestión de Pedidos",
      "Panel de Análisis de Mercado",
      "Seguimiento de Satisfacción del Cliente",
      "Informes Semanales de Energía",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Documentación" },
  { href: "#", text: "Tutoriales" },
  { href: "#", text: "Referencia de API" },
];

export const platformLinks = [
  { href: "#", text: "Dispositivos Compatibles" },
  { href: "#", text: "Requisitos del Sistema" },
  { href: "#", text: "Notas de la Versión" },
];

export const communityLinks = [
  { href: "#", text: "Eventos" },
  { href: "#", text: "Encuentros" },
  { href: "#", text: "Conferencias" },
];
