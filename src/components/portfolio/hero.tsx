import { SiteNav } from "#/components/portfolio/site-nav";

/** Full-bleed hero — portrait background, "Anthem" title plate at the bottom. */
export function Hero() {
	return (
		<header className="relative flex h-screen min-h-[720px] flex-col overflow-hidden">
			<div className="absolute inset-0 z-0 overflow-hidden">
				<img
					src="/portrait.jpg"
					alt=""
					aria-hidden="true"
					className="absolute inset-0 size-full object-cover object-[50%_72%] grayscale contrast-[1.05] brightness-[0.78]"
				/>
				<div className="hero-legibility" />
				<div className="hero-grain" />
			</div>

			<div className="relative z-[1] mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-8 pb-7 pt-6 max-[560px]:px-[18px]">
				<SiteNav overlay />

				<div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[-0.22px] text-ash [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
					<div className="flex flex-col gap-1">
						<span>Fig. 01</span>
						<span>Artem, in studio</span>
					</div>
					<div className="flex flex-col gap-1">
						<span>Lviv · 49.84°N 24.03°E</span>
					</div>
				</div>

				<div className="self-stretch">
					<span className="mb-[18px] inline-flex items-center gap-3 font-mono text-[13px] uppercase tracking-[-0.26px] text-ash">
						<span className="h-px w-7 shrink-0 bg-ash" />
						Full-Stack Engineer · MMXXVI
					</span>
					<div className="font-cond text-[clamp(80px,16vw,260px)] font-normal uppercase leading-[0.82] tracking-[-0.04em] text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.45)] max-[960px]:text-[clamp(56px,14vw,110px)]">
						<span className="block">ARTEM</span>
						<span className="block">KOVALITSKYI</span>
					</div>
				</div>

				<div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[-0.22px] text-ash [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
					<div className="flex flex-col gap-1">
						<span>Portfolio · v1.0</span>
						<span>MMXXVI</span>
					</div>
					<div className="flex flex-col items-end gap-1 text-right">
						<span>Scroll for index ↓</span>
						<span>04 sections</span>
					</div>
				</div>
			</div>
		</header>
	);
}
