import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Top navigation. `overlay` removes spacing and adds a text shadow so the
 *  nav can sit on top of the hero photo. */
export function SiteNav({ overlay = false }: { overlay?: boolean }) {
	return (
		<nav
			className={cn(
				"flex items-center justify-between",
				overlay ? "mb-0 pt-0" : "mb-20 pt-3",
			)}
		>
			<div
				className={cn(
					"inline-flex items-center gap-2.5 font-cond text-base uppercase leading-none tracking-tight",
					overlay && "[text-shadow:0_1px_8px_rgba(0,0,0,0.6)]",
				)}
			>
				<span className="portfolio-pulse inline-block size-2 rounded-full bg-brand shadow-[0_0_12px_var(--color-brand)]" />
				<span>
					Artem Kovalitskyi{" "}
					<span className="max-[560px]:hidden">— Full-Stack Engineer</span>
				</span>
			</div>

			<div className="flex items-center gap-3">
				<Badge
					className={cn(
						"h-auto gap-1.5 rounded-pill border-white/35 bg-transparent px-4.5 py-2.5 font-cond text-sm uppercase leading-none tracking-tight text-white",
						overlay && "[text-shadow:0_1px_8px_rgba(0,0,0,0.6)]",
					)}
				>
					<span className="portfolio-pulse size-1.5 rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)]" />
					Available
				</Badge>
				<Button
					variant="outline"
					nativeButton={false}
					render={<a href="#contact">Get in touch</a>}
					className="h-auto cursor-pointer gap-2 whitespace-nowrap rounded-pill border-white bg-transparent px-4.5 py-2.5 font-cond text-sm uppercase leading-none tracking-tight text-white transition-colors hover:bg-white hover:text-charcoal max-[560px]:px-3.5 max-[560px]:py-2 max-[560px]:text-sm"
				/>
				<Button
					variant="outline"
					nativeButton={false}
					render={
						<a
							href="/artem-kovalitskyi-cv.pdf"
							download="Artem Kovalitskyi CV.pdf"
						>
							<Download />
							Download CV
						</a>
					}
					className="h-auto cursor-pointer gap-2 whitespace-nowrap rounded-pill bg-white px-4.5 py-2.5 font-cond text-sm uppercase leading-none tracking-tight text-charcoal transition-colors hover:bg-ash max-[560px]:px-3.5 max-[560px]:py-2 max-[560px]:text-sm"
				/>
			</div>
		</nav>
	);
}
