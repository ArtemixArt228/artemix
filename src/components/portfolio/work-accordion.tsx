import { Plus } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/portfolio/section-header";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { WORK } from "@/data/cv";
import { cn } from "@/lib/utils";

/** Selected work — catalog rows built on the Base UI accordion. Controlled
 *  single-open so each row can rotate its own "+" indicator. */
export function WorkAccordion() {
	const [open, setOpen] = useState<string[]>(["hoverla"]);

	return (
		<section className="py-15" id="work">
			<SectionHeader
				eyebrow="§ 01 · Selected work"
				title="Things I've shipped"
				count={`${WORK.length} entries`}
			/>
			<Accordion
				multiple={false}
				value={open}
				onValueChange={(value) => setOpen(value as string[])}
			>
				{WORK.map((w, i) => {
					const isOpen = open.includes(w.id);
					return (
						<AccordionItem
							key={w.id}
							value={w.id}
							className="group relative border-white/12 first:border-t last:border-b"
						>
							<span
								aria-hidden="true"
								className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100"
							/>
							<AccordionTrigger className="grid grid-cols-[60px_1.6fr_1fr_130px_40px] items-baseline gap-6 py-7 hover:no-underline max-[960px]:grid-cols-[40px_1fr_auto_24px] max-[560px]:grid-cols-[30px_1fr_28px]">
								<span className="font-mono text-xs text-steel">
									№ {String(i + 1).padStart(2, "0")}
								</span>
								<div className="font-cond text-[clamp(28px,3.2vw,40px)] uppercase leading-none tracking-tight text-white transition-transform duration-400 ease-out group-hover:translate-x-2">
									{w.company}
								</div>
								<div className="font-cond text-base uppercase tracking-tight text-ash max-[960px]:hidden">
									{w.role}
								</div>
								<div className="whitespace-nowrap text-right font-mono text-sm text-ash max-[560px]:hidden">
									{w.years}
								</div>
								<span
									aria-hidden="true"
									className={cn(
										"inline-flex w-5 justify-center justify-self-end text-white transition-transform duration-400 ease-out",
										isOpen && "rotate-45 text-brand",
									)}
								>
									<Plus className="size-5 max-[560px]:size-4" />
								</span>
							</AccordionTrigger>
							<AccordionContent className="pl-21 pr-16 max-[960px]:pl-16 max-[960px]:pr-0 max-[560px]:pl-13.5">
								<div className="grid grid-cols-[1.4fr_1fr] gap-8 pb-7 max-[960px]:grid-cols-1">
									<div>
										{w.body.map((p) => (
											<p
												key={p}
												className="max-w-[60ch] font-mono text-sm leading-normal text-ash [&+p]:mt-3"
											>
												{p}
											</p>
										))}
									</div>
									<div className="flex flex-wrap content-start gap-1.5">
										{w.stack.map((s) => (
											<Badge
												key={s}
												className="h-auto whitespace-nowrap rounded-pill border-white/20 bg-transparent px-2.5 py-1.5 font-mono text-xs text-ash"
											>
												{s}
											</Badge>
										))}
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</section>
	);
}
