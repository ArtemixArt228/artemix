import { SectionHeader } from "#/components/portfolio/section-header";
import { STACK } from "#/data/cv";

/** Toolkit — a hairline grid of stack categories. */
export function StackGrid() {
	const total = STACK.reduce((n, g) => n + g.items.length, 0);

	return (
		<section className="border-t border-white/12 py-[60px]" id="stack">
			<SectionHeader
				eyebrow="§ 02 · Toolkit"
				title="Stack"
				count={`${total} tools`}
			/>
			<div className="grid grid-cols-4 gap-px border border-white/12 bg-white/12 max-[960px]:grid-cols-2 max-[560px]:grid-cols-1">
				{STACK.map((g, i) => (
					<div
						className="relative flex min-h-[220px] flex-col gap-[18px] bg-charcoal px-6 py-7 transition-colors hover:bg-[#131313]"
						key={g.name}
					>
						<div className="flex items-baseline justify-between">
							<span className="font-cond text-xl uppercase tracking-[-0.02em]">
								{g.name}
							</span>
							<span className="shrink-0 whitespace-nowrap font-mono text-[11px] tracking-[-0.22px] text-steel">
								{String(i + 1).padStart(2, "0")} /{" "}
								{String(STACK.length).padStart(2, "0")}
							</span>
						</div>
						<ul className="flex list-none flex-col gap-2">
							{g.items.map((it) => (
								<li
									key={it}
									className="flex items-baseline gap-2.5 font-mono text-[13px] leading-[1.2] tracking-[-0.26px] text-ash"
								>
									<span className="h-px w-1 shrink-0 -translate-y-[3px] bg-steel" />
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
