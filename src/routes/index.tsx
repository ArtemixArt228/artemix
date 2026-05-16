import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/portfolio/background";
import { Contact } from "@/components/portfolio/contact";
import { EducationLanguages } from "@/components/portfolio/education-languages";
import { Hero } from "@/components/portfolio/hero";
import { HeroIntro } from "@/components/portfolio/hero-intro";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { StackGrid } from "@/components/portfolio/stack-grid";
import { WorkAccordion } from "@/components/portfolio/work-accordion";
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

function Home() {
	return (
		<div className="min-h-screen overflow-x-hidden bg-charcoal font-mono text-sm leading-none text-white antialiased">
			<Background />
			<Hero />
			<main className="relative z-1 mx-auto max-w-350 px-8 pb-15 max-[560px]:px-4.5">
				<HeroIntro />
				<WorkAccordion />
				<StackGrid />
				<EducationLanguages />
				<Contact />
				<SiteFooter />
			</main>
		</div>
	);
}
