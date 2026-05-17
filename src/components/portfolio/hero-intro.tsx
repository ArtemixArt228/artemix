import { Circle } from "lucide-react";

const META = [
	{ label: "Discipline", value: "Full-Stack Engineering" },
	{ label: "Based in", value: "Reykjavík, Iceland" },
	{ label: "Stack", value: "TS · Next · Hono · LLMs" },
] as const;

/** Tagline + meta grid that sits directly below the hero. */
export function HeroIntro() {
	return (
		<section className="pb-15 pt-10">
			<div className="flex flex-wrap items-end justify-between gap-6 pb-6 pt-8">
				<p className="max-w-155 font-cond text-[clamp(20px,1.5vw,24px)] leading-none text-ash">
					Full-stack engineer with{" "}
					<strong className="font-normal text-white">four years</strong>{" "}
					shipping production TypeScript end-to-end — from Postgres schema to
					RSC UI, with LLM APIs wired into the products people actually use.
				</p>
				<span className="whitespace-nowrap font-mono text-xs uppercase text-steel">
					Portfolio · v1.0 · ARTEMIX
				</span>
			</div>

			<div className="grid grid-cols-4 gap-6 border-y border-white/12 py-6 max-[960px]:grid-cols-2">
				{META.map((m) => (
					<div className="flex flex-col gap-2" key={m.label}>
						<span className="font-mono text-xs uppercase leading-none text-steel">
							{m.label}
						</span>
						<span className="font-cond text-base uppercase leading-none tracking-tight text-white">
							{m.value}
						</span>
					</div>
				))}
				<div className="flex flex-col gap-2">
					<span className="font-mono text-xs uppercase leading-none text-steel">
						Status
					</span>
					<span className="inline-flex items-center gap-1.5 font-cond text-base uppercase leading-none tracking-tight text-white">
						<Circle className="size-2 fill-brand text-brand" />
						Open to work
					</span>
				</div>
			</div>
		</section>
	);
}
