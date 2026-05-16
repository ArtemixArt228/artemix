import { SectionHeader } from "#/components/portfolio/section-header";
import { EDUCATION, LANGUAGES } from "#/data/cv";

/** Background — education history and language proficiency. */
export function EducationLanguages() {
	return (
		<section className="border-t border-white/12 py-[60px]" id="background">
			<SectionHeader
				eyebrow="§ 03 · Background"
				title="Education & tongues"
				count="since 2020"
			/>
			<div className="grid grid-cols-2 gap-px border border-white/12 bg-white/12 max-[960px]:grid-cols-1">
				<div className="bg-charcoal p-8">
					<h3 className="mb-5 flex items-baseline justify-between font-cond text-xl uppercase tracking-[-0.02em]">
						Education{" "}
						<span className="font-mono text-[11px] tracking-[-0.22px] text-steel">
							{EDUCATION.length} entries
						</span>
					</h3>
					{EDUCATION.map((e) => (
						<div
							className="grid grid-cols-[100px_1fr] items-baseline gap-6 border-t border-white/8 py-4 first-of-type:border-t-0 first-of-type:pt-0"
							key={e.degree}
						>
							<span className="font-mono text-[11px] uppercase tracking-[-0.22px] text-steel">
								{e.years}
							</span>
							<div>
								<div className="font-cond text-lg uppercase tracking-[-0.02em]">
									{e.degree}
								</div>
								<div className="mt-1.5 font-mono text-xs tracking-[-0.24px] text-ash">
									{e.school}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="bg-charcoal p-8">
					<h3 className="mb-5 flex items-baseline justify-between font-cond text-xl uppercase tracking-[-0.02em]">
						Languages{" "}
						<span className="font-mono text-[11px] tracking-[-0.22px] text-steel">
							{LANGUAGES.length} entries
						</span>
					</h3>
					<div className="flex flex-col gap-[18px]">
						{LANGUAGES.map((l) => (
							<div
								className="grid grid-cols-[1fr_2fr_auto] items-center gap-4"
								key={l.name}
							>
								<span className="font-cond text-base uppercase tracking-[-0.02em]">
									{l.name}
								</span>
								<span className="relative h-0.5 overflow-hidden bg-white/10">
									<span
										className="absolute left-0 top-0 h-full bg-white"
										style={{ width: `${l.pct}%` }}
									/>
								</span>
								<span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[-0.22px] text-steel">
									{l.level}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
