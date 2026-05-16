import { createFileRoute } from "@tanstack/react-router";
import { type CSSProperties, useEffect, useState } from "react";
import portfolioCss from "../styles/portfolio.css?url";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Artem Kovalitskyi — Full-Stack Engineer" },
			{
				name: "description",
				content:
					"Artem Kovalitskyi — Full-stack engineer. Production TypeScript end-to-end, Next.js, Hono, Drizzle, LLM APIs. Based in Lviv, Ukraine.",
			},
		],
		links: [
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300;700&family=Open+Sans:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap",
			},
			{ rel: "stylesheet", href: portfolioCss },
		],
	}),
	component: Home,
});

// ============================================================
// Data — sourced directly from CV
// ============================================================
interface WorkEntry {
	id: string;
	company: string;
	role: string;
	years: string;
	location: string;
	body: string[];
	stack: string[];
}

const WORK: WorkEntry[] = [
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

const STACK: { name: string; items: string[] }[] = [
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

const EDUCATION: { years: string; degree: string; school: string }[] = [
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

const LANGUAGES: { name: string; level: string; pct: number }[] = [
	{ name: "Ukrainian", level: "Native", pct: 100 },
	{ name: "English", level: "Upper-Intermediate", pct: 75 },
];

const CONTACTS: { lbl: string; val: string; href: string }[] = [
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

// ============================================================
// Background — cursor light + ambient bokeh
// ============================================================
function Background() {
	useEffect(() => {
		const onMove = (e: PointerEvent) => {
			document.documentElement.style.setProperty("--cx", `${e.clientX}px`);
			document.documentElement.style.setProperty("--cy", `${e.clientY}px`);
		};
		window.addEventListener("pointermove", onMove);
		return () => window.removeEventListener("pointermove", onMove);
	}, []);
	return (
		<div className="bg" aria-hidden="true">
			<div className="grid-lines" />
			<div className="blob a" />
			<div className="blob b" />
			<div className="blob c" />
			<div className="cursor-light" />
			<div className="noise" />
		</div>
	);
}

// ============================================================
// Nav
// ============================================================
function Nav({ overlay }: { overlay?: boolean }) {
	return (
		<nav className={`nav${overlay ? " nav-overlay" : ""}`}>
			<div className="nav-mark">
				<span className="dot" />
				<span>
					Artem Kovalitskyi{" "}
					<span className="label-long">— Full-Stack Engineer</span>
				</span>
			</div>
			<div className="nav-right">
				<span className="badge">
					<span className="dot" />
					Available · Jun 2026
				</span>
				<a className="ghost-btn" href="#contact">
					Get in touch
				</a>
			</div>
		</nav>
	);
}

// ============================================================
// Hero — full-bleed photo, "Anthem" title layout
// ============================================================
function Hero() {
	return (
		<header className="hero" data-layout="anthem">
			<div className="hero-bg">
				<img src="/portrait.jpg" alt="" aria-hidden="true" />
				<div className="grain" />
			</div>

			<div className="hero-inner">
				<Nav overlay />

				<div className="hero-frame-top">
					<div className="fr-l">
						<span>Fig. 01</span>
						<span>Artem, in studio</span>
					</div>
					<div className="fr-r">
						<span>Lviv · 49.84°N 24.03°E</span>
					</div>
				</div>

				<div className="hero-title">
					<span className="hero-role">Full-Stack Engineer · MMXXVI</span>
					<div className="display">
						<span className="row">ARTEM</span>
						<span className="row">KOVALITSKYI</span>
					</div>
				</div>

				<div className="hero-frame-bottom">
					<div className="fr-l">
						<span>Portfolio · v1.0</span>
						<span>MMXXVI</span>
					</div>
					<div className="fr-r">
						<span>Scroll for index ↓</span>
						<span>04 sections</span>
					</div>
				</div>
			</div>
		</header>
	);
}

function HeroBelow() {
	return (
		<section className="hero-below">
			<div className="hero-tagline">
				<p>
					Full-stack engineer with <strong>four years</strong> shipping
					production TypeScript end-to-end — from Postgres schema to RSC UI,
					with LLM APIs wired into the products people actually use.
				</p>
				<span className="hero-index">Portfolio · v1.0 · MMXXVI</span>
			</div>

			<div className="hero-meta">
				<div className="meta-cell">
					<span className="meta-label">Discipline</span>
					<span className="meta-value">Full-Stack Engineering</span>
				</div>
				<div className="meta-cell">
					<span className="meta-label">Based in</span>
					<span className="meta-value">Lviv, Ukraine</span>
				</div>
				<div className="meta-cell">
					<span className="meta-label">Stack</span>
					<span className="meta-value">TS · Next · Hono · LLMs</span>
				</div>
				<div className="meta-cell">
					<span className="meta-label">Status</span>
					<span className="meta-value">
						<span className="acc">●</span> Open to work
					</span>
				</div>
			</div>
		</section>
	);
}

// ============================================================
// Selected work — catalog rows w/ expand
// ============================================================
function WorkRow({
	item,
	idx,
	open,
	onToggle,
}: {
	item: WorkEntry;
	idx: number;
	open: boolean;
	onToggle: () => void;
}) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: the row expands to reveal block-level content (paragraphs), which is invalid inside a native <button>; div + role + keyboard handler is the accessible alternative
		<div
			className={`work-row${open ? " open" : ""}`}
			role="button"
			tabIndex={0}
			aria-expanded={open}
			onClick={onToggle}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onToggle();
				}
			}}
		>
			<span className="idx">№ {String(idx + 1).padStart(2, "0")}</span>
			<div>
				<div className="company">{item.company}</div>
			</div>
			<div className="role">{item.role}</div>
			<div className="years">{item.years}</div>
			<span className="toggle" aria-hidden="true">
				+
			</span>

			<div className="work-body">
				<div className="work-body-inner">
					<div>
						{item.body.map((p) => (
							<p key={p}>{p}</p>
						))}
					</div>
					<div className="stack">
						{item.stack.map((s) => (
							<span key={s} className="chip">
								{s}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function SelectedWork() {
	const [openIdx, setOpenIdx] = useState(0);
	return (
		<section className="section" id="work">
			<div className="section-head">
				<span className="section-eyebrow">§ 01 · Selected work</span>
				<h2 className="section-title">Things I've shipped</h2>
				<span className="section-count">{WORK.length} entries</span>
			</div>
			<div className="work-list">
				{WORK.map((w, i) => (
					<WorkRow
						key={w.id}
						item={w}
						idx={i}
						open={openIdx === i}
						onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
					/>
				))}
			</div>
		</section>
	);
}

// ============================================================
// Stack
// ============================================================
function Stack() {
	const total = STACK.reduce((n, g) => n + g.items.length, 0);
	return (
		<section className="section" id="stack">
			<div className="section-head">
				<span className="section-eyebrow">§ 02 · Toolkit</span>
				<h2 className="section-title">Stack</h2>
				<span className="section-count">{total} tools</span>
			</div>
			<div className="stack-grid">
				{STACK.map((g, i) => (
					<div className="stack-cell" key={g.name}>
						<div className="cat">
							<span className="cat-name">{g.name}</span>
							<span className="cat-num">
								{String(i + 1).padStart(2, "0")} /{" "}
								{String(STACK.length).padStart(2, "0")}
							</span>
						</div>
						<ul>
							{g.items.map((it) => (
								<li key={it}>{it}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}

// ============================================================
// Education + Languages
// ============================================================
function EduLang() {
	return (
		<section className="section" id="background">
			<div className="section-head">
				<span className="section-eyebrow">§ 03 · Background</span>
				<h2 className="section-title">Education & tongues</h2>
				<span className="section-count">since 2020</span>
			</div>
			<div className="two-col">
				<div>
					<h3>
						Education <span className="n">{EDUCATION.length} entries</span>
					</h3>
					{EDUCATION.map((e) => (
						<div className="edu-item" key={e.degree}>
							<span className="edu-years">{e.years}</span>
							<div>
								<div className="edu-degree">{e.degree}</div>
								<div className="edu-school">{e.school}</div>
							</div>
						</div>
					))}
				</div>
				<div>
					<h3>
						Languages <span className="n">{LANGUAGES.length} entries</span>
					</h3>
					<div className="lang-rows">
						{LANGUAGES.map((l) => (
							<div className="lang-row" key={l.name}>
								<span className="lang-name">{l.name}</span>
								<span
									className="lang-bar"
									style={{ "--lvl": `${l.pct}%` } as CSSProperties}
								/>
								<span className="lang-level">{l.level}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

// ============================================================
// Contact
// ============================================================
function Contact() {
	return (
		<section className="contact-strip" id="contact">
			<div>
				<h2>
					Let's
					<br />
					build
					<br />
					<span className="slash">/</span> something.
				</h2>
			</div>
			<div className="contact-list">
				{CONTACTS.map((c) => (
					<a
						key={c.lbl}
						href={c.href}
						target={c.href.startsWith("http") ? "_blank" : undefined}
						rel="noreferrer"
					>
						<span className="lbl">{c.lbl}</span>
						<span className="val">{c.val}</span>
						<span className="arrow">↗</span>
					</a>
				))}
			</div>
		</section>
	);
}

// ============================================================
// Footer
// ============================================================
function Footer() {
	return (
		<footer className="footer">
			<span>© MMXXVI · Artem Kovalitskyi</span>
			<span>Lviv 49.84°N 24.03°E</span>
			<span>Last updated · May 2026</span>
		</footer>
	);
}

// ============================================================
// Page
// ============================================================
function Home() {
	return (
		<div className="portfolio">
			<Background />
			<Hero />
			<main className="page">
				<HeroBelow />
				<SelectedWork />
				<Stack />
				<EduLang />
				<Contact />
				<Footer />
			</main>
		</div>
	);
}
