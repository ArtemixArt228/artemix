export interface WorkEntry {
	id: string;
	company: string;
	role: string;
	years: string;
	location: string;
	body: string[];
	stack: string[];
}

export const WORK: WorkEntry[] = [
	{
		id: "hoverla",
		company: "Hoverla Soft",
		role: "Full-Stack Engineer",
		years: "Feb 2025 — Present",
		location: "Remote",
		body: [
			"Building production applications on a modern type-safe stack: Next.js (App Router, RSC), TanStack ecosystem on the front end, with Hono APIs, Drizzle ORM, and oRPC end-to-end.",
			"Shipped a voice-controlled admin panel that makes shipment management accessible for users with disabilities — integrating LLM APIs for natural-language command parsing and intent recognition.",
			"Own features end-to-end across a 5-person team — schema design through UI — and maintain the GitHub Actions workflows (lint, type-check, test, deploy) running a Bun-driven Turborepo monorepo.",
		],
		stack: [
			"Next.js",
			"TanStack",
			"Hono",
			"Drizzle",
			"oRPC",
			"Turborepo",
			"Bun",
			"LLM APIs",
		],
	},
	{
		id: "cgs",
		company: "CGS-team",
		role: "Full-Stack Engineer",
		years: "Dec 2022 — Feb 2025",
		location: "Lviv",
		body: [
			"Built the front-end for a parking application in React and Next.js with TypeScript, shipped as both a responsive web app and a native-feeling mobile app via Capacitor.",
			"Designed a library of custom UI components from scratch in Tailwind CSS and Framer Motion — animations, transitions, and gesture-based interactions handled in-house.",
			"Worked alongside designers to translate Figma into production-ready, responsive interfaces; also built React/Next.js front-ends and NestJS/Express APIs for a corporate platform spanning public site and admin tools.",
		],
		stack: [
			"React",
			"Next.js",
			"TypeScript",
			"Tailwind",
			"Framer Motion",
			"Capacitor",
			"NestJS",
			"Express",
		],
	},
	{
		id: "developstoday",
		company: "DevelopsToday",
		role: "Front-End Engineer",
		years: "Mar 2022 — Dec 2022",
		location: "Lviv",
		body: [
			"Built and consumed GraphQL APIs for a karaoke web application — powering song catalog search, real-time session sync, user playlists, and scoring.",
			"Designed PostgreSQL schemas backing the catalog and session data, and worked across MySQL and MongoDB on adjacent client projects.",
		],
		stack: ["React", "GraphQL", "PostgreSQL", "MySQL", "MongoDB"],
	},
];

export const STACK: { name: string; items: string[] }[] = [
	{
		name: "Front-end",
		items: [
			"React",
			"Next.js (App Router, RSC)",
			"TanStack Ecosystem",
			"Tailwind CSS",
			"Framer Motion",
			"Capacitor",
		],
	},
	{
		name: "Back-end & APIs",
		items: [
			"Hono",
			"Node.js",
			"Express.js",
			"NestJS",
			"oRPC",
			"GraphQL",
			"REST",
		],
	},
	{
		name: "Data",
		items: ["Drizzle ORM", "Prisma", "PostgreSQL", "MongoDB", "MySQL"],
	},
	{
		name: "AI & Tooling",
		items: [
			"OpenAI API",
			"Anthropic API",
			"Vercel AI SDK",
			"Turborepo",
			"Bun",
			"GitHub Actions",
		],
	},
];

export const EDUCATION: { years: string; degree: string; school: string }[] = [
	{
		years: "2024 — 2025",
		degree: "Master of Computer Science",
		school: "Lviv Polytechnic National University",
	},
	{
		years: "2020 — 2024",
		degree: "Bachelor of Computer Science",
		school: "Lviv Polytechnic National University",
	},
];

export const LANGUAGES: { name: string; level: string; pct: number }[] = [
	{ name: "Ukrainian", level: "Native", pct: 100 },
	{ name: "English", level: "Upper-Intermediate", pct: 75 },
];

export const CONTACTS: { lbl: string; val: string; href: string }[] = [
	{
		lbl: "Email",
		val: "artemix.portfolio@gmail.com",
		href: "mailto:artemix.portfolio@gmail.com",
	},
	{ lbl: "Phone", val: "+380 68 371 1267", href: "tel:+380683711267" },
	{
		lbl: "Location",
		val: "Lviv, Ukraine",
		href: "https://maps.google.com/?q=Lviv,Ukraine",
	},
	{ lbl: "GitHub", val: "github.com/artemix", href: "https://github.com" },
];
