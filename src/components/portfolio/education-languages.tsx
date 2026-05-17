import { SectionHeader } from "@/components/portfolio/section-header";
import { EDUCATION, LANGUAGES } from "@/data/cv";

/** Background — education history and language proficiency. */
export function EducationLanguages() {
	return (
		<section className="py-15" id="background">
			<SectionHeader
				eyebrow="§ 03 · Background"
				title="Education & tongues"
				count="since 2020"
			/>
			<div className="grid grid-cols-2 gap-px border border-white/12 bg-white/12 max-[960px]:grid-cols-1">
				<div className="bg-charcoal p-8">
					<h3 className="mb-5 flex items-baseline justify-between font-cond text-xl uppercase tracking-tight">
						Education{" "}
						<span className="font-mono text-xs text-steel">
							{EDUCATION.length} entries
						</span>
					</h3>
					{EDUCATION.map((e) => (
						<div
							className="grid grid-cols-[100px_1fr] items-baseline gap-6 border-t border-white/8 py-4 first-of-type:border-t-0 first-of-type:pt-0"
							key={e.degree}
						>
							<span className="font-mono text-xs uppercase text-steel">
								{e.years}
							</span>
							<div>
								<div className="font-cond text-lg uppercase tracking-tight">
									{e.degree}
								</div>
								<div className="mt-1.5 font-mono text-xs text-ash">
									{e.school}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="bg-charcoal p-8">
					<h3 className="mb-5 flex items-baseline justify-between font-cond text-xl uppercase tracking-tight">
						Languages{" "}
						<span className="font-mono text-xs text-steel">
							{LANGUAGES.length} entries
						</span>
					</h3>
					{LANGUAGES.map((l) => (
						<div
							className="border-t border-white/8 py-4 first-of-type:border-t-0 first-of-type:pt-0"
							key={l.name}
						>
							<div className="flex items-baseline justify-between gap-4">
								<span className="font-cond text-lg uppercase tracking-tight">
									{l.name}
								</span>
								<span className="whitespace-nowrap font-mono text-xs uppercase text-steel">
									{l.level}
								</span>
							</div>
							<span className="mt-3 block h-0.5 overflow-hidden bg-white/10">
								<span
									className="block h-full bg-white"
									style={{ width: `${l.pct}%` }}
								/>
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
