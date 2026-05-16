import { SectionHeader } from "@/components/portfolio/section-header";
import { STACK } from "@/data/cv";

/** Toolkit — a hairline grid of stack categories. */
export function StackGrid() {
	const total = STACK.reduce((n, g) => n + g.items.length, 0);

	return (
		<section className="py-15" id="stack">
			<SectionHeader
				eyebrow="§ 02 · Toolkit"
				title="Stack"
				count={`${total} tools`}
			/>
			<div className="grid grid-cols-4 gap-px border border-white/12 bg-white/12 max-[960px]:grid-cols-2 max-[560px]:grid-cols-1">
				{STACK.map((g, i) => (
					<div
						className="relative flex min-h-55 flex-col gap-4.5 bg-charcoal px-6 py-7 transition-colors hover:bg-[#131313]"
						key={g.name}
					>
						<div className="flex items-baseline justify-between">
							<span className="font-cond text-xl uppercase tracking-tight">
								{g.name}
							</span>
							<span className="shrink-0 whitespace-nowrap font-mono text-xs text-steel">
								{String(i + 1).padStart(2, "0")} /{" "}
								{String(STACK.length).padStart(2, "0")}
							</span>
						</div>
						<ul className="flex list-none flex-col gap-2">
							{g.items.map((it) => (
								<li
									key={it}
									className="flex items-baseline gap-2.5 font-mono text-sm leading-tight text-ash"
								>
									<span className="h-px w-1 shrink-0 -translate-y-1 bg-steel" />
									{it}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}
