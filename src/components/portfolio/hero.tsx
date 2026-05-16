import { MeshGradient } from "@paper-design/shaders-react";
import { useRef } from "react";
import { HeroCursor } from "@/components/portfolio/hero-cursor";
import { SiteNav } from "@/components/portfolio/site-nav";

/** Full-bleed hero — animated mesh-gradient background, "Anthem" title plate
 *  at the bottom, and a circular photo cursor that replaces the OS cursor. */
export function Hero() {
	const headerRef = useRef<HTMLElement>(null);

	return (
		<header
			ref={headerRef}
			className="relative flex h-screen min-h-180 cursor-none flex-col overflow-hidden"
		>
			<div className="absolute inset-0 z-0 overflow-hidden">
				<MeshGradient
					colors={["#0b0b0b", "#272a2a", "#cecece", "#858585"]}
					speed={0.3}
					scale={1}
					style={{ width: "100%", height: "100%" }}
				/>
				<div className="hero-legibility" />
				<div className="hero-grain" />
			</div>

			<div className="relative z-1 mx-auto flex w-full max-w-350 flex-1 flex-col justify-between px-8 pb-7 pt-6 max-[560px]:px-4.5">
				<SiteNav overlay />

				<div className="flex items-start justify-between font-mono text-xs uppercase text-ash [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
					<div className="flex flex-col gap-1">
						<span>Fig. 01</span>
						<span>Artem, in studio</span>
					</div>
					<div className="flex flex-col gap-1">
						<span>Lviv · 49.84°N 24.03°E</span>
					</div>
				</div>

				<div className="self-stretch">
					<span className="mb-4.5 inline-flex items-center gap-3 font-mono text-sm uppercase text-ash">
						<span className="h-px w-7 shrink-0 bg-ash" />
						Full-Stack Engineer · MMXXVI
					</span>
					<div className="font-cond text-[clamp(80px,16vw,260px)] font-normal uppercase leading-none tracking-tighter text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.45)] max-[960px]:text-[clamp(56px,14vw,110px)]">
						<span className="block">ARTEM</span>
						<span className="block">KOVALITSKYI</span>
					</div>
				</div>

				<div className="flex items-start justify-between font-mono text-xs uppercase text-ash [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
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

			<HeroCursor targetRef={headerRef} />
		</header>
	);
}
