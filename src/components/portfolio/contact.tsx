import { ArrowUpRight } from "lucide-react";
import { CONTACTS } from "@/data/cv";

/** Closing contact strip — oversized headline + a list of links. */
export function Contact() {
	return (
		<section
			className="grid grid-cols-2 items-end gap-12 pb-15 pt-25 max-[960px]:grid-cols-1"
			id="contact"
		>
			<div>
				<h2 className="font-cond text-[clamp(48px,8vw,120px)] uppercase leading-none tracking-tighter">
					Let's
					<br />
					build
					<br />
					<span className="text-brand">/</span> something.
				</h2>
			</div>
			<div className="flex flex-col gap-3.5">
				{CONTACTS.map((c) => (
					<a
						key={c.lbl}
						href={c.href}
						target={c.href.startsWith("http") ? "_blank" : undefined}
						rel="noreferrer"
						className="group grid grid-cols-[80px_1fr_16px] items-baseline gap-4 border-t border-white/12 py-3.5 transition-[padding] last:border-b hover:pl-2"
					>
						<span className="font-mono text-xs uppercase text-steel">
							{c.lbl}
						</span>
						<span className="font-cond text-xl uppercase tracking-tight">
							{c.val}
						</span>
						<span className="transition-transform group-hover:translate-x-1 group-hover:text-brand">
							<ArrowUpRight className="size-4" />
						</span>
					</a>
				))}
			</div>
		</section>
	);
}
